(() => {
  let pending = null;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const bound = new WeakSet();
  let installed = false;
  function syncButton() {
    const donate = document.querySelector('.header-donate');
    if (!donate) return;
    let button = document.getElementById('install');
    if (!button) { button = document.createElement('button'); button.id = 'install'; }
    button.type = 'button'; button.className = 'icon pwa-install';
    if (button.textContent !== 'Install') button.textContent = 'Install';
    button.setAttribute('aria-label', 'Install IELTSquirrel');
    button.title = 'Install IELTSquirrel';
    button.hidden = installed || standalone();
    if (donate.nextElementSibling !== button) donate.after(button);
    if (!bound.has(button)) { button.addEventListener('click', install); bound.add(button); }
  }
  async function install() {
    if (pending) {
      const event = pending; pending = null;
      try { await event.prompt(); await event.userChoice; } catch (_) { showHelp(); }
    } else showHelp();
  }
  function showHelp() {
    let dialog = document.getElementById('install-help');
    if (!dialog) {
      dialog = document.createElement('dialog'); dialog.id = 'install-help';
      dialog.setAttribute('aria-labelledby', 'install-heading');
      dialog.innerHTML = '<h2 id="install-heading">Install IELTSquirrel</h2><p id="install-instructions"></p><p>Add IELTSquirrel to your home screen with its squirrel icon. Audio requires an internet connection.</p><form method="dialog"><button class="icon" type="submit">Close</button></form>';
      document.body.append(dialog);
    }
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const android = /Android/.test(navigator.userAgent);
    document.getElementById('install-instructions').textContent = ios
      ? 'Open this website in Safari, tap Share, then Add to Home Screen. If shown, enable Open as Web App, then tap Add.'
      : android ? 'Open this website in Chrome, tap the three-dot menu, then Install app or Add to Home screen.'
      : 'Use the install icon in your browser address bar or choose Install app from the browser menu. In Safari on Mac, choose File → Add to Dock.';
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', '');
  }
  addEventListener('beforeinstallprompt', event => { event.preventDefault(); pending = event; syncButton(); });
  addEventListener('appinstalled', () => { pending = null; installed = true; const b = document.getElementById('install'); if (b) b.hidden = true; });
  new MutationObserver(syncButton).observe(document.body, {childList:true, subtree:true});
  syncButton();
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    const register = () => navigator.serviceWorker.register('./sw.js', {updateViaCache:'none'}).then(reg => reg.update()).catch(() => {});
    if (document.readyState === 'complete') register(); else addEventListener('load', register, {once:true});
  }
})();

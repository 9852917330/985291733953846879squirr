(() => {
  const root = document.documentElement;
  const installed = navigator.standalone === true ||
    ['standalone', 'fullscreen', 'minimal-ui'].some(mode =>
      window.matchMedia('(display-mode: ' + mode + ')').matches);
  if (!installed) return;
  const started = performance.now();
  root.classList.add('app-launching');
  let finished = false;
  function dismiss() {
    if (finished) return;
    finished = true;
    root.classList.remove('app-launching');
    document.getElementById('appLaunchSplash')?.remove();
  }
  function ready() {
    window.setTimeout(() => requestAnimationFrame(dismiss),
      Math.max(0, 350 - (performance.now() - started)));
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
  window.addEventListener('pageshow', event => {
    if (event.persisted) dismiss();
  });
  // Never leave the app covered if another startup script or request fails.
  window.setTimeout(dismiss, 6000);
})();

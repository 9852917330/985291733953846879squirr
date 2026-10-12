(() => {
  'use strict';
  const entries = window.SPEAKING_PRACTICE_AUDIO || [];
  const normal = text => String(text).replace(/\s+/g, ' ').trim();
  const byQuestion = new Map(entries.map(item => [normal(item.question), item]));
  let player = null;
  let scheduled = false;
  function removePlayer() {
    if (!player) return;
    player.pause();
    player.removeAttribute('src');
    player.load();
    player.remove();
    player = null;
  }
  function syncPlayer() {
    scheduled = false;
    const question = document.getElementById('spQuestion');
    const text = document.getElementById('spAnswerText');
    const answer = document.getElementById('spAnswer');
    const item = question && byQuestion.get(normal(question.textContent));
    if (!text || !answer || !item || normal(text.textContent) !== normal(item.answer)) {
      removePlayer();
      return;
    }
    if (answer.hidden) {
      if (player) player.pause();
      return;
    }
    if (player && player.dataset.practiceId === item.id && player.parentElement === text.parentElement) return;
    removePlayer();
    player = document.createElement('audio');
    player.controls = true;
    player.preload = 'none';
    player.dataset.practiceId = item.id;
    player.setAttribute('aria-label', 'Listen to model answer');
    player.style.cssText = 'display:block;width:100%;margin:0 0 18px;';
    player.src = new URL(item.audio, document.baseURI).href;
    text.before(player);
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(syncPlayer);
  }
  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['hidden']
  });
  window.addEventListener('hashchange', schedule);
  document.addEventListener('visibilitychange', () => { if (document.hidden && player) player.pause(); });
  schedule();
})();

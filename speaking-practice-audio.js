(() => {
  'use strict';
  const entries = window.SPEAKING_PRACTICE_AUDIO || [];
  const normal = text => String(text || '').replace(/\s+/g, ' ').trim();
  const byQuestion = new Map(entries.map(item => [normal(item.question), item]));
  const players = new Map();
  let scheduled = false;
  function removePlayer(version) {
    const player = players.get(version);
    if (!player) return;
    player.pause(); player.removeAttribute('src'); player.load(); player.remove();
    players.delete(version);
  }
  function syncVersion(version, item, answer) {
    const simple = version === 'simple';
    const text = document.getElementById(simple ? 'spSimpleAnswerText' : 'spAnswerText');
    const expected = simple ? item?.simpleAnswer?.text : item?.answer;
    const source = simple ? item?.simpleAudio : item?.audio;
    let player = players.get(version);
    if (!text || !answer || !source || normal(text.textContent) !== normal(expected)) {
      removePlayer(version); return;
    }
    if (player && (player.dataset.practiceId !== item.id || player.parentElement !== text.parentElement)) {
      removePlayer(version); player = null;
    }
    if (answer.hidden) { if (player) player.pause(); return; }
    if (player) return;
    player = document.createElement('audio');
    player.controls = true; player.preload = 'none'; player.dataset.practiceId = item.id;
    player.setAttribute('aria-label', simple ? 'Listen to simple model answer' : 'Listen to model answer');
    player.style.cssText = 'display:block;width:100%;margin:0 0 18px;';
    player.src = new URL(source, document.baseURI).href;
    player.addEventListener('play', () => {
      for (const other of players.values()) if (other !== player) other.pause();
    });
    players.set(version, player); text.before(player);
  }
  function syncPlayers() {
    scheduled = false;
    const question = document.getElementById('spQuestion');
    const item = question && byQuestion.get(normal(question.textContent));
    const answer = document.getElementById('spAnswer');
    syncVersion('simple', item, answer); syncVersion('advanced', item, answer);
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true; queueMicrotask(syncPlayers);
  }
  new MutationObserver(schedule).observe(document.body, {
    childList: true, subtree: true, attributes: true, attributeFilter: ['hidden']
  });
  window.addEventListener('hashchange', schedule);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) for (const player of players.values()) player.pause();
  });
  schedule();
})();

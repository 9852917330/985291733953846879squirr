(() => {
  const routes = window.IELTS_SEO_ROUTES;
  const byFile = new Map(Object.entries(routes).map(([hash, r]) => [r.file, hash]));
  const base = new URL('./', document.currentScript?.src || new URL('router.js', document.baseURI).href);
  function hash() {
    if (location.hash) return location.hash;
    return byFile.get(decodeURIComponent(location.pathname.split('/').pop()) || 'index.html') || '#home';
  }
  function url(key) { return new URL(routes[key]?.file || ('index.html'+key), base).href; }
  function refresh() {
    const key = hash(), entry = routes[key];
    if (!entry) return;
    document.title = entry.title;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', entry.canonical);
    document.querySelector('meta[name="description"]')?.setAttribute('content', entry.description);
    for (const [name, value] of [['og:title',entry.title],['og:description',entry.description],['og:url',entry.canonical]])
      document.querySelector(`meta[property="${name}"]`)?.setAttribute('content', value);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content',entry.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content',entry.description);
    const structured = document.getElementById('seo-structured');
    if (structured) structured.textContent = JSON.stringify({ '@context':'https://schema.org', '@type':'WebPage', name:entry.title, description:entry.description, url:entry.canonical, inLanguage:'en', isPartOf:{'@type':'WebSite',name:'IELTSquirrel',url:'https://ieltsquirrel.com/'} });
    for (const a of document.querySelectorAll('a[href^="#"]')) {
      const value = a.getAttribute('href');
      if (routes[value]) { a.dataset.route = value; a.href = url(value); }
    }
  }
  window.IELTS_ROUTING = {hash,url,refresh};
  const old = location.hash || (new URLSearchParams(location.search).get('page') ? '#'+new URLSearchParams(location.search).get('page') : '');
  if (routes[old]) history.replaceState(history.state,'',url(old));
  for (const name of (window.IELTS_BUILD ? [] : ['pushState','replaceState'])) {
    const original=history[name].bind(history);
    history[name]=(...args)=>{const result=original(...args);queueMicrotask(refresh);return result;};
  }
})();

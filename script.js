document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.querySelector('.theme-toggle');
  function updateThemeToggle() {
    const isLight = document.documentElement.dataset.theme === 'light';
    themeToggle.textContent = isLight ? '☾' : '☀';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.setAttribute('title', isLight ? 'Dark mode' : 'Light mode');
    themeToggle.setAttribute('aria-pressed', String(isLight));
  }
  updateThemeToggle();
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.dataset.theme === 'light';
    document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
    try { localStorage.setItem('portfolio-theme', isLight ? 'dark' : 'light'); } catch (_) {}
    updateThemeToggle();
  });

  /* ---------- Scroll progress bar ---------- */
  const bar = document.querySelector('.scroll-progress span');
  let ticking = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  updateProgress();

  /* ---------- Active nav link ---------- */
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  function setActive() {
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = null;
    sections.forEach(s => { if (s.offsetTop <= y) current = s; });
    navLinks.forEach(a => {
      const on = current && a.getAttribute('href') === '#' + current.id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------- Count-up stats ---------- */
  const counters = document.querySelectorAll('[data-count]');
  function format(n, decimals, suffix) {
    return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  }
  function runCounter(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const dur = 1200;
    function step(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(target * eased, decimals, suffix);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---------- CAD videos: play while on screen ---------- */
  const videos = document.querySelectorAll('.video-grid video');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    videos.forEach(v => { v.controls = true; });
  } else {
    const vio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.play().catch(() => { e.target.controls = true; });
        else e.target.pause();
      });
    }, { threshold: 0.4 });
    videos.forEach(v => vio.observe(v));
  }

  /* ---------- Old deep links (#research, company ids) ---------- */
  const hash = window.location.hash.slice(1);
  if (hash) {
    const target = document.getElementById(hash);
    if (target) {
      target.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }
});

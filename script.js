document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle (dark by default) ---------- */
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

  /* ---------- Scroll progress bar + active nav link ---------- */
  const bar = document.querySelector('.scroll-progress span');
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  let ticking = false;
  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = null;
    sections.forEach(s => { if (s.offsetTop <= y) current = s; });
    navLinks.forEach(a => {
      const on = current && a.getAttribute('href') === '#' + current.id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

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

  /* ---------- Deep links (#boeing, #research, ...) ---------- */
  const hash = window.location.hash.slice(1);
  if (hash) {
    const target = document.getElementById(hash);
    if (target) {
      target.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }
});

/* 3D model: no auto-spin for people who prefer reduced motion */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('model-viewer[auto-rotate]').forEach(m => m.removeAttribute('auto-rotate'));
}

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  function updateThemeToggle() {
    const isLight = document.documentElement.dataset.theme === 'light';
    themeToggle.textContent = isLight ? '☾ Dark' : '☀ Light';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.setAttribute('aria-pressed', String(isLight));
  }
  updateThemeToggle();
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.dataset.theme === 'light';
    document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
    try { localStorage.setItem('portfolio-theme', isLight ? 'dark' : 'light'); } catch (_) {}
    updateThemeToggle();
  });

  function revealProject(id) {
    const target = document.getElementById(id);
    if (!target) return;
    if (target.tagName === 'DETAILS') target.open = true;
    let parent = target.parentElement;
    while (parent) {
      if (parent.tagName === 'DETAILS') parent.open = true;
      parent = parent.parentElement;
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  document.querySelectorAll('[data-open-target]').forEach(link => {
    link.addEventListener('click', () => revealProject(link.dataset.openTarget));
  });
  const initial = decodeURIComponent(location.hash.slice(1));
  if (initial && document.getElementById(initial)?.tagName === 'DETAILS') {
    requestAnimationFrame(() => revealProject(initial));
  }
});
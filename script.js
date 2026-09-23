document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.panel');

  function activate(id) {
    panels.forEach(p => p.classList.toggle('active', p.id === id));
    buttons.forEach(b => b.classList.toggle('active', b.dataset.tab === id));
    history.replaceState(null, '', '#' + id);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => activate(btn.dataset.tab));
  });

  const initial = window.location.hash.replace('#', '');
  const company = document.querySelector('.company-card#' + CSS.escape(initial));
  if (company) {
    activate('internships');
    company.open = true;
  } else if (initial === 'research') {
    activate('education');
  } else if (initial && document.querySelector('.panel#' + CSS.escape(initial))) {
    activate(initial);
  }
});

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
  if (initial && document.getElementById(initial)) {
    activate(initial);
  }
});

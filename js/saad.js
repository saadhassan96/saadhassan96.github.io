// Publication filters.
// Each paper has data-tags="chi full" etc. Each button has data-tag="chi".
// Selecting several buttons shows papers that match ANY of them.

const buttons = document.querySelectorAll('.filters button');
const papers = document.querySelectorAll('.paper');
const years = document.querySelectorAll('.year');
let selected = [];

function tagsOf(paper) {
  return (paper.dataset.tags || '').split(' ').filter(Boolean);
}

// Show a count next to each button
buttons.forEach(function (btn) {
  const tag = btn.dataset.tag;
  const n = tag === 'all'
    ? papers.length
    : [...papers].filter(p => tagsOf(p).includes(tag)).length;
  btn.insertAdjacentHTML('beforeend', ' <span class="count">' + n + '</span>');
});

buttons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const tag = btn.dataset.tag;
    if (tag === 'all') {
      selected = [];
    } else if (selected.includes(tag)) {
      selected = selected.filter(t => t !== tag);
    } else {
      selected.push(tag);
    }

    buttons.forEach(b => {
      const on = b.dataset.tag === 'all' ? selected.length === 0 : selected.includes(b.dataset.tag);
      b.setAttribute('aria-pressed', on);
    });

    papers.forEach(p => {
      p.hidden = selected.length > 0 && !selected.some(t => tagsOf(p).includes(t));
    });

    // Hide a year heading when none of its papers are visible
    years.forEach(y => {
      y.hidden = !y.querySelector('.paper:not([hidden])');
    });
  });
});

// Light/dark switch. Remembers the choice in this browser.
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function isDark() {
  if (root.dataset.theme) return root.dataset.theme === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
function updateToggle() {
  toggle.textContent = isDark() ? 'Light' : 'Dark';
  toggle.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
}
toggle.addEventListener('click', function () {
  root.dataset.theme = isDark() ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  updateToggle();
});
updateToggle();

// "Short bio" toggle
const bioToggle = document.getElementById('bio-toggle');
const bio = document.getElementById('bio');
bioToggle.addEventListener('click', function () {
  const open = bio.hidden;
  bio.hidden = !open;
  bioToggle.setAttribute('aria-expanded', open);
});

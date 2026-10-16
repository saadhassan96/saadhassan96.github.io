// Respect "reduce motion" for scripted scrolling
function motionOK() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Publication filters.
// Each paper has data-tags="chi full" etc. Each button has data-tag="chi".
// Selecting several buttons shows papers that match ANY of them.

const buttons = document.querySelectorAll('.altbar button');
const menus = document.querySelectorAll('.altbar .menu');
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

    // Highlight a dropdown's summary when one of its options is selected
    menus.forEach(m => {
      const tags = [...m.querySelectorAll('[data-tag]')].map(b => b.dataset.tag);
      m.classList.toggle('on', tags.some(t => selected.includes(t)));
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

// Only one filter dropdown open at a time; close on outside click
const altbar = document.querySelector('.altbar');
if (altbar) {
  menus.forEach(m => {
    m.addEventListener('toggle', () => {
      if (m.open) menus.forEach(o => { if (o !== m) o.open = false; });
      const panel = m.querySelector('.menupanel');
      if (m.open && panel) {
        panel.style.left = '';
        panel.style.right = '';
        if (panel.getBoundingClientRect().right > window.innerWidth) {
          panel.style.left = 'auto';
          panel.style.right = '0';
        }
      }
    });
  });
  document.addEventListener('click', e => {
    if (!altbar.contains(e.target)) menus.forEach(m => { m.open = false; });
  });
}

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

// "Show less" buttons at the bottom of long expandables (e.g., past talks):
// close the expandable and bring its section back into view
document.querySelectorAll('.show-less').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const details = btn.closest('details');
    details.open = false;
    details.parentElement.scrollIntoView({ behavior: motionOK() ? 'smooth' : 'auto' });
    details.querySelector('summary').focus({ preventScroll: true });
  });
});

// Mark the nav link for the section being read.
// The reading line sits a third of the way down the window, below the pinned
// header. On a wide screen the main column and the sidebar each get one mark
// (so two links can be marked); on a phone, where everything is one column,
// only one link is marked.
const navLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
const navBar = document.querySelector('.site-header nav');
const header = document.querySelector('.site-header');
const linkFor = {};
navLinks.forEach(a => { linkFor[a.getAttribute('href').slice(1)] = a; });
const mainSections = [...document.querySelectorAll('.main > section[id]')].filter(s => linkFor[s.id]);
const sideSections = [...document.querySelectorAll('.side > div[id]')].filter(s => linkFor[s.id]);
let lastFirst = null;

function sectionAt(sections, line) {
  return sections.find(s => {
    const r = s.getBoundingClientRect();
    return r.top <= line && r.bottom > line;
  });
}

function updateNav() {
  const line = header.offsetHeight + window.innerHeight / 3;
  const oneColumn = window.matchMedia('(max-width: 860px)').matches;
  const marked = oneColumn
    ? [sectionAt(mainSections.concat(sideSections), line)]
    : [sectionAt(mainSections, line), sectionAt(sideSections, line)];
  const ids = marked.filter(Boolean).map(s => s.id);
  // On a wide screen the sidebar's section is the second, fainter mark
  const secondary = oneColumn ? null : (marked[1] && marked[1].id);

  navLinks.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    if (ids.includes(id)) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
    a.classList.toggle('nav-secondary', id === secondary && ids.length > 1);
  });

  // On phones the nav scrolls sideways; keep the marked link in view
  const first = ids.length ? linkFor[ids[0]] : null;
  if (first && first !== lastFirst && navBar.scrollWidth > navBar.clientWidth) {
    navBar.scrollTo({ left: first.offsetLeft - navBar.offsetLeft - 16, behavior: motionOK() ? 'smooth' : 'auto' });
  }
  lastFirst = first;
}

let navTicking = false;
function onScroll() {
  if (navTicking) return;
  navTicking = true;
  requestAnimationFrame(() => { updateNav(); navTicking = false; });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
document.addEventListener('toggle', onScroll, true);
updateNav();

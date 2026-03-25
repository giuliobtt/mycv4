'use strict';

const SECTIONS = ['about', 'experience', 'education', 'skills', 'research', 'articles'];

async function loadSection(name) {
  const container = document.getElementById(`section-${name}`);
  if (!container) return;
  container.innerHTML = `<div class="section-loading">Loading…</div>`;
  try {
    const resp = await fetch(`sections/${name}.html`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    container.innerHTML = await resp.text();
  } catch (err) {
    console.warn(`Could not load sections/${name}.html:`, err.message);
    container.innerHTML = '';
  }
}

async function init() {
  await Promise.all(SECTIONS.map(loadSection));
  setupNavHighlight();
  setupSmoothScroll();
  document.getElementById('footer-year').textContent = new Date().getFullYear();
}

function setupNavHighlight() {
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
  );
  SECTIONS.forEach((name) => {
    const el = document.getElementById(name);
    if (el) observer.observe(el);
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('.nav-link[data-section]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.section);
      if (target) {
        const navHeight = document.getElementById('main-nav')?.offsetHeight ?? 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      document.getElementById('nav-links')?.classList.remove('open');
    });
  });
}

document.getElementById('nav-toggle')?.addEventListener('click', () => {
  document.getElementById('nav-links')?.classList.toggle('open');
});

init();

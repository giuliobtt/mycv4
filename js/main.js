/* ============================================================
   main.js  –  Giulio Leonardo Battista CV
   Responsibilities:
     1. Load each section partial (sections/*.html) via fetch()
     2. Active-nav highlighting on scroll
     3. Mobile nav toggle
   ============================================================ */

'use strict';

// ── 1. Section loader ──────────────────────────────────────────────────────
const SECTIONS = ['about', 'experience', 'education', 'skills', 'research', 'articles'];

/**
 * Fetch a section partial and inject it into its container.
 */
async function loadSection(name) {
  const container = document.getElementById(`section-${name}`);
  if (!container) return;

  container.innerHTML = `<div class="section-loading">Loading ${name}…</div>`;

  try {
    const resp = await fetch(`sections/${name}.html`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const html = await resp.text();
    container.innerHTML = html;
  } catch (err) {
    console.warn(`Could not load sections/${name}.html:`, err.message);
    container.innerHTML = '';
  }
}

/**
 * Load all sections in parallel, then set up the rest of the UI.
 */
async function init() {
  await Promise.all(SECTIONS.map(loadSection));
  setupNavHighlight();
  setupSmoothScroll();
}

// ── 2. Active nav link on scroll ──────────────────────────────────────────
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
    {
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0,
    }
  );

  SECTIONS.forEach((name) => {
    const el = document.getElementById(name);
    if (el) observer.observe(el);
  });
}

// ── 3. Smooth scroll for nav links ────────────────────────────────────────
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
      document.querySelector('.nav-links')?.classList.remove('open');
    });
  });
}

// ── 4. Mobile nav toggle ──────────────────────────────────────────────────
document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('open');
});

// ── Run ───────────────────────────────────────────────────────────────────
init();

'use strict';

const SECTIONS = ['about', 'experience', 'education', 'skills', 'research', 'articles'];

async function loadSection(name) {
  const container = document.getElementById(`page-${name}`);
  if (!container) return;
  try {
    const resp = await fetch(`sections/${name}.html`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    container.innerHTML = await resp.text();
  } catch (err) {
    console.warn(`Could not load sections/${name}.html:`, err.message);
    container.innerHTML = `<div style="padding:20px;color:#888">Section unavailable.</div>`;
  }
}

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${name}`);
  if (target) { target.classList.add('active'); target.scrollTop = 0; }
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === name);
  });
}

function setupNav() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showPage(btn.dataset.page);
      document.querySelector('.mobile-nav-drawer')?.classList.remove('open');
    });
  });
}

function setupMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  btn?.addEventListener('click', () => drawer?.classList.toggle('open'));
}

async function init() {
  setupNav();
  setupMobileMenu();
  await Promise.all(SECTIONS.map(loadSection));
  showPage('about');
}

init();

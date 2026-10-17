'use strict';
const projects = {
  exchango: {
    name: 'Exchango', label: 'INTERACTION DESIGN COURSE PROJECT · 2026',
    intro: 'A travel companion concept for exchange students, supported by a responsive case study that makes the research and design decisions easy to explore.',
    tags: ['Figma', 'React', 'Next.js', 'TypeScript', 'Vercel'],
    context: 'Exchange students need ways to host trips and find people to travel with. The project focused on these two core user journeys.',
    contributions: ['Designed the trip-hosting and travel-partner discovery journeys.', 'Responded to design feedback by adding a missing trip-creation entry point.', 'Published a 10-section responsive web case study covering research, design iterations and an embedded prototype.'],
    focus: 'Connecting research to interface decisions, iterating on feedback, and presenting the rationale alongside the proposed experience.',
    links: [{label: 'View portfolio', url: 'https://exchango-portfolio.framer.website/'}, {label: 'Explore web case study', url: 'https://v0-exchango-social-hub.vercel.app/'}, {label: 'View source', url: 'https://github.com/XJie97/exchango-Social-Hub'}]
  },
  educonnect: {
    name: 'EduConnect', label: 'SOFTWARE ENGINEERING TEAM PROJECT · OCT – NOV 2025',
    intro: 'A Java application for tuition management, with my contributions focused on contact lookup, weekday session retrieval and predictable schedule presentation.',
    tags: ['Java 17', 'JavaFX', 'JUnit 5', 'Gradle', 'PlantUML'],
    context: 'Tutors need to retrieve student contact details and review tuition sessions without ambiguity. Reliable command behaviour and consistent ordering make these workflows easier to use.',
    contributions: ['Implemented two lookup commands for contact details and weekday tuition sessions.', 'Added chronological sorting with student-name tie-breaks for predictable schedule review.', 'Added six test classes covering lookup commands, parsers and formatting, including valid and invalid inputs.', 'Documented the features using UML diagrams and user guides.'],
    focus: 'Focused feature ownership within a team codebase, deterministic output, input validation and maintainable documentation.',
    links: [{label: 'View team repository', url: 'https://github.com/AY2526S1-CS2103-F11-1/tp'}]
  },
  progresspal: {
    screenshots: [
      { src: 'assets/progress-pal-home.jpg', width: 576, height: 1280, alt: 'Progress Pal home screen on Android', caption: 'Home screen — app navigation and quick workout selection. Captured on Xiaomi 13T.' },
      { src: 'assets/progress-pal-workout.jpg', width: 576, height: 1280, alt: 'Progress Pal workout logger with sets, weights, repetitions, RPE and rest timers', caption: 'Workout logging — record sets, weight, repetitions and RPE, with rest-timer controls. Captured on Xiaomi 13T.' }
    ],
    name: 'Progress Pal', label: 'NUS ORBITAL PROJECT · MAY – JUL 2024',
    intro: 'A strength-training application built for Android and iOS from a shared React Native codebase. Delivered at NUS Orbital’s Apollo 11 (Advanced) level.',
    tags: ['JavaScript', 'React Native', 'Expo', 'Firebase', 'AsyncStorage'],
    context: 'Workout planning, exercise logging and training history belong in one consistent mobile experience. This project connects my interest in strength training with practical application development.',
    contributions: ['Developed workout planning, exercise logging and training-history functionality.', 'Used one React Native codebase to support Android and iOS.', 'Integrated Firebase authentication and persistent local storage to retain records between sessions.'],
    focus: 'Cross-platform interface development, authentication and persistence for everyday training workflows.',
    links: []
  },
  tkit: {
    screenshots: [
      { src: 'assets/tkit-windows.png', width: 1393, height: 1032, alt: 'Tkit JavaFX chat interface on Windows, adding a task and marking it complete', caption: 'JavaFX interface on Windows — entering commands to add, complete and list tasks.' }
    ],
    name: 'Tkit', label: 'INDIVIDUAL SOFTWARE ENGINEERING PROJECT · AUG – OCT 2025',
    intro: 'A task manager with ten commands and three task types, accessible through both a command-line interface and a JavaFX interface.',
    tags: ['Java 17', 'JavaFX', 'JUnit', 'Gradle', 'Checkstyle'],
    context: 'Two interfaces should not mean two separate implementations of task-management logic. Tkit shares its parsing, domain and storage modules across both interfaces.',
    contributions: ['Built support for ten commands and three task types.', 'Reused core modules across CLI and JavaFX interfaces to avoid duplicated logic.', 'Protected saved tasks with atomic file replacement and malformed-record handling.', 'Added eleven test classes covering commands, date parsing, task models and storage.'],
    focus: 'Separation of concerns, reliable persistence, defensive input handling and a testable application core.',
    links: [{label: 'View source', url: 'https://github.com/XJie97/ip'}]
  }
};
const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');
function applyTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#17251f' : '#f4f5ef';
}
let savedTheme;
try { savedTheme = localStorage.getItem('xj-portfolio-theme'); } catch { /* Storage may be unavailable in private contexts. */ }
applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeToggle.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('xj-portfolio-theme', theme); } catch { /* The toggle still works without persistence. */ }
});
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation'); }
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const cards = [...document.querySelectorAll('.project')];
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let visible = 0;
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  document.querySelector('#filter-status').textContent = `Showing ${visible} ${visible === 1 ? 'project' : 'projects'}`;
}));
const dialog = document.querySelector('#project-dialog');
let dialogTrigger;
function node(tag, text, className) { const element = document.createElement(tag); if (text) element.textContent = text; if (className) element.className = className; return element; }
function openProject(key, trigger) {
  const project = projects[key];
  if (!project) return;
  dialogTrigger = trigger;
  const content = document.querySelector('#dialog-content');
  content.replaceChildren();
  content.append(node('p', project.label, 'eyebrow'));
  const heading = node('h2', project.name); heading.id = 'dialog-title'; content.append(heading);
  content.append(node('p', project.intro, 'dialog-intro'));
  const tags = node('div', '', 'tags'); project.tags.forEach(tag => tags.append(node('span', tag))); content.append(tags);
  dialog.classList.toggle('has-screenshots', Boolean(project.screenshots?.length));
  if (project.screenshots?.length) {
    content.append(node('h3', 'Inside the app'), node('p', 'Original screenshots. Open an image to inspect it at full size.', 'gallery-hint'));
    const gallery = node('div', '', 'screenshot-gallery' + (project.screenshots.length === 1 ? ' single' : ''));
    project.screenshots.forEach(shot => {
      const figure = node('figure');
      const link = node('a'); link.href = shot.src; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Open full-size image: ' + shot.alt);
      const img = node('img'); img.src = shot.src; img.alt = shot.alt;
      img.width = shot.width; img.height = shot.height; img.decoding = 'async';
      link.append(img); figure.append(link, node('figcaption', shot.caption)); gallery.append(figure);
    });
    content.append(gallery);
  }
  content.append(node('h3', 'The context'), node('p', project.context), node('h3', 'My contribution'));
  const list = node('ul'); project.contributions.forEach(item => list.append(node('li', item))); content.append(list);
  content.append(node('h3', 'Engineering & design focus'), node('p', project.focus));
  if (project.links.length) {
    const links = node('div', '', 'dialog-links');
    project.links.forEach((link, i) => { const a = node('a', `${link.label} ↗`, `button ${i === 0 ? 'primary' : 'secondary'}`); a.href = link.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; links.append(a); });
    content.append(links);
  }
  dialog.showModal(); document.body.classList.add('modal-open');
  dialog.querySelector('.dialog-close').focus();
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project, button)));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); dialogTrigger?.focus(); });
const copyButton = document.querySelector('#copy-email');
let copyTimer;
copyButton.addEventListener('click', async () => {
  const email = 'lohxianjie@u.nus.edu';
  let copied = false;
  try { await navigator.clipboard.writeText(email); copied = true; } catch {
    const field = document.createElement('textarea'); field.value = email; field.style.position = 'fixed'; field.style.opacity = '0'; document.body.append(field); field.select();
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    field.remove(); copyButton.focus();
  }
  clearTimeout(copyTimer);
  copyButton.textContent = copied ? 'Email copied' : 'Select email to copy';
  document.querySelector('#copy-status').textContent = copied ? 'Email address copied to clipboard.' : 'Copy unavailable. Select the email address beside this button.';
  copyTimer = setTimeout(() => { copyButton.textContent = 'Copy email ⧉'; }, 2500);
});
document.querySelector('#year').textContent = String(new Date().getFullYear());

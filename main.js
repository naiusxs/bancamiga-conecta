/* ─── HEADER ON SCROLL ─── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('raised', window.scrollY > 40);
}, { passive: true });

/* ─── SCROLL REVEAL ─── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.reveal-fade').forEach(el => observer.observe(el));

/* ─── HERO REVEAL ON LOAD ─── */
window.addEventListener('load', () => {
  document.querySelector('.hero .reveal-fade')?.classList.add('visible');
});

/* ─── HAMBURGER ─── */
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    navMenu.style.cssText = `
      display: flex; flex-direction: column; gap: 1.5rem;
      position: absolute; top: 76px; left: 0; right: 0;
      background: rgba(5,7,15,0.97); backdrop-filter: blur(16px); padding: 2rem 2.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
  } else {
    navMenu.style.display = 'none';
  }
});

document.querySelectorAll('.nav-menu a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 960) {
      navMenu.style.display = 'none';
      menuOpen = false;
    }
  });
});

/* ─── SUBTLE PARALLAX ON HERO ARCH LINES ─── */
const archSvg = document.querySelector('.arch-svg');
window.addEventListener('scroll', () => {
  if (!archSvg) return;
  const y = window.scrollY;
  if (y < window.innerHeight) {
    archSvg.style.transform = `translateY(${y * 0.12}px)`;
  }
}, { passive: true });

/* ─── NAV ACTIVE STATE ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => { a.style.color = ''; });
        const link = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
        if (link) { link.style.color = 'var(--gold, #B89758)'; }
      }
    });
  },
  { threshold: 0.5 }
);
sections.forEach(s => activeObserver.observe(s));

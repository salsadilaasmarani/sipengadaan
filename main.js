/* ============================================================
   SiPengadaan — Main JavaScript
   ============================================================ */

// ── NAV scroll effect ──────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ── Mobile hamburger ───────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ── Smooth scroll for anchor links ─────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── AOS (Animate on Scroll) — minimal ──────────
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const delays = { '0':0,'100':100,'200':200,'300':300,'400':400,'500':500 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

// ── Terminal typewriter ────────────────────────
function initTerminal() {
  const termBody = document.getElementById('termBody');
  if (!termBody) return;

  const lines = [
    { type: 'cmd',  text: '$ git clone sipengadaan-framework' },
    { type: 'out',  text: 'Cloning into \'sipengadaan\'...' },
    { type: 'out',  text: 'remote: Enumerating objects: 248' },
    { type: 'ok',   text: '✓ Framework core loaded' },
    { type: 'ok',   text: '✓ Database migrations done' },
    { type: 'ok',   text: '✓ Auth module ready' },
    { type: 'ok',   text: '✓ Purchase Request module ready' },
    { type: 'ok',   text: '✓ Approval workflow ready' },
    { type: 'cmd',  text: '$ php sipengadaan serve' },
    { type: 'out',  text: 'SiPengadaan server started.' },
    { type: 'ok',   text: '✓ Running on http://localhost:8000' },
    { type: 'cursor', text: '' },
  ];

  const colorMap = {
    cmd:    'var(--lime)',
    out:    'var(--blue)',
    ok:     '#28C840',
    err:    '#FF5F57',
    cursor: 'var(--text-muted)',
  };

  let lineIndex = 0;

  function renderLine(line) {
    const div = document.createElement('div');
    div.className = 'term-line';

    if (line.type === 'cursor') {
      div.innerHTML = `<span style="color:var(--lime)">$ </span><span class="term-cursor"></span>`;
    } else {
      div.style.color = colorMap[line.type] || 'var(--text-muted)';
      div.textContent = line.text;
    }

    termBody.appendChild(div);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function nextLine() {
    if (lineIndex >= lines.length) return;
    renderLine(lines[lineIndex]);
    lineIndex++;
    if (lineIndex < lines.length) {
      const delay = lines[lineIndex - 1].type === 'cmd' ? 600 : 180;
      setTimeout(nextLine, delay);
    }
  }

  // Start after 800ms
  setTimeout(nextLine, 800);
}

// ── Active nav link on scroll ──────────────────
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--white)';
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ── Init all ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initTerminal();
  initActiveNav();
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

const onScroll = () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', onScroll, { passive: true });

// ===== TIMELINE TABS =====
const timelineTabs = document.querySelectorAll('.timeline-tab');
const timelineContainers = document.querySelectorAll('.timeline-container');

timelineTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;

    timelineTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    timelineContainers.forEach(container => {
      container.classList.remove('active');
      if (container.id === target) {
        container.classList.add('active');

        // Re-trigger reveal for items inside
        const reveals = container.querySelectorAll('.reveal');
        reveals.forEach(el => {
          el.classList.remove('visible');
          void el.offsetWidth; // force reflow
          el.classList.add('visible');
        });
      }
    });
  });
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const inner = item.querySelector('.faq-answer-inner');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      other.querySelector('.faq-answer').style.maxHeight = '0';
    });

    // Open this one if it was closed
    if (!isOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = inner.scrollHeight + 'px';
    }
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== MOBILE TOGGLE (simple) =====
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    navLinks.style.display = isVisible ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = 'var(--header-height)';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
    navLinks.style.padding = '1rem';
    navLinks.style.backdropFilter = 'blur(20px)';
    navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    
    if (isVisible) {
      navLinks.removeAttribute('style');
    }
  });
}

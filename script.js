// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const animateElements = document.querySelectorAll('.animate-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling elements
      const siblings = entry.target.parentElement.querySelectorAll('.animate-up');
      let delay = 0;
      siblings.forEach((el, i) => {
        if (el === entry.target) delay = i * 100;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

animateElements.forEach(el => observer.observe(el));

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
        link.style.color = '#4f8ef7';
      }
    }
  });
});

// ===== DOWNLOAD RESUME BUTTON =====
const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Show a toast notification since no actual resume file is linked
  showToast('Resume download will be available soon!', 'info');
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  // Loading state
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  // Simulate sending
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    showToast('Message sent successfully! I\'ll get back to you soon.', 'success');

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  }, 1500);
});

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';

  const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
  const color = type === 'success' ? '#10b981' : '#4f8ef7';

  toast.innerHTML = `<i class="fas ${icon}" style="color:${color}"></i> ${message}`;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '5rem',
    right: '2rem',
    background: '#111827',
    color: '#e2e8f0',
    padding: '0.9rem 1.4rem',
    borderRadius: '10px',
    border: `1px solid ${color}`,
    boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    zIndex: '9999',
    opacity: '0',
    transform: 'translateY(10px)',
    transition: 'all 0.3s ease',
    maxWidth: '320px'
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  // Animate out
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ===== TYPING EFFECT FOR HERO ROLE =====
const roleEl = document.querySelector('.hero-role');
const roles = [
  'AI & Data Science Student',
  'Full Stack Enthusiast',
  'Cloud & DevOps Explorer',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeRole() {
  const current = roles[roleIndex];

  if (isDeleting) {
    roleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  typingTimeout = setTimeout(typeRole, speed);
}

// Start typing effect after hero animation
setTimeout(typeRole, 1200);

// ===== SKILL TAG HOVER RIPPLE =====
document.querySelectorAll('.skill-tags span').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.08)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
  });
});

// ===== CURSOR GLOW EFFECT (subtle) =====
const glow = document.createElement('div');
Object.assign(glow.style, {
  position: 'fixed',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(79,142,247,0.06) 0%, transparent 70%)',
  pointerEvents: 'none',
  zIndex: '0',
  transform: 'translate(-50%, -50%)',
  transition: 'left 0.15s ease, top 0.15s ease'
});
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

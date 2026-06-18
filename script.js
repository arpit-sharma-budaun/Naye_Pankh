// Navbar scroll effect
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('show');
  }
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Donate amount buttons
document.querySelectorAll('.amt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.amt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Counter animation
const counters = document.querySelectorAll('.counter');
let counted = false;

function runCounters() {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString() + '+';
      }
    };
    update();
  });
}

// Intersection Observer for counters and fade-ins
const observerOptions = { threshold: 0.2 };

const counterSection = document.querySelector('.impact');
const counterObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    runCounters();
  }
}, observerOptions);
if (counterSection) counterObserver.observe(counterSection);

// Fade-in on scroll
document.querySelectorAll('.prog-card, .stat-card, .testi-card, .gal-item, .about-grid, .donate-wrap, .contact-grid').forEach(el => {
  el.classList.add('fade-in');
});

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Contact form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Message Sent! ✓';
  btn.style.background = '#4caf50';
  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fa fa-paper-plane"></i>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  input.value = 'Subscribed! 🎉';
  input.style.color = '#faa307';
  setTimeout(() => { input.value = ''; input.style.color = ''; }, 3000);
});

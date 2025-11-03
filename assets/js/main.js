/* ===============================
   KingVista main.js (site features)
   =============================== */

/* Smooth scroll for internal links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* Sticky header */
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return;
  header.classList.toggle('sticky', window.scrollY > 50);
});

/* WhatsApp floating button animation */
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
  setInterval(() => whatsappBtn.classList.toggle('pulse'), 2000);
}

/* Contact form basic validation */
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert('Please fill in all required fields.');
    }
  });
}

/* Dynamic footer year */
const footerP = document.querySelector('footer p');
if (footerP) {
  footerP.textContent = `© ${new Date().getFullYear()} KingVista | Designed with ❤️`;
}

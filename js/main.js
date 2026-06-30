// main.js — UI interactions

document.addEventListener('DOMContentLoaded', () => {

  // ─── Contact Form ──────────────────────────────────────
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const lang = document.documentElement.getAttribute('data-lang') || 'de';

    btn.textContent = lang === 'de' ? 'Wird gesendet…' : 'Sending…';
    btn.disabled = true;

    // Simulate send (replace with EmailJS or Formspree later)
    await new Promise(r => setTimeout(r, 1000));

    form.querySelectorAll('input, textarea').forEach(el => {
      gsap.to(el, { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in' });
    });
    gsap.to(btn, { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in', onComplete: () => {
      btn.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
        gsap.fromTo(successMsg, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      }
    }});
  });

  // ─── Mobile Nav Burger ─────────────────────────────────
  const burger = document.getElementById('navBurger');
  const navLinks = document.querySelector('.nav-links');
  let mobileOpen = false;

  burger?.addEventListener('click', () => {
    mobileOpen = !mobileOpen;
    if (navLinks) {
      if (mobileOpen) {
        navLinks.style.cssText = `
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 68px; left: 0; right: 0;
          background: rgba(10,10,10,0.97);
          backdrop-filter: blur(20px);
          padding: 2rem;
          gap: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          z-index: 99;
        `;
        gsap.fromTo(navLinks, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(navLinks, { opacity: 0, y: -10, duration: 0.2, onComplete: () => navLinks.style.display = 'none' });
      }
    }
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      if (mobileOpen) { mobileOpen = false; if (navLinks) navLinks.style.display = 'none'; }
    });
  });

});

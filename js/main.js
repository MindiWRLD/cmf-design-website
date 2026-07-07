  // ── Lenis Smooth Scroll ──
  const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // Anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) lenis.scrollTo(t, { offset: -66 });
    });
  });

  // ── Nav scrolled ──
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
  });

  // ── Scroll Reveals ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Hero GSAP entrance ──
  gsap.from('.hero-badge', { opacity: 0, y: 20, duration: .8, delay: .1, ease: 'power3.out' });
  gsap.from('h1', { opacity: 0, y: 40, duration: 1, delay: .25, ease: 'power3.out' });
  gsap.from('.hero-sub', { opacity: 0, y: 20, duration: .8, delay: .5, ease: 'power3.out' });
  gsap.from('.btn-row', { opacity: 0, y: 20, duration: .8, delay: .65, ease: 'power3.out' });

  // ── 3D card tilt on mouse ──
  document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s';
      setTimeout(() => card.style.transition = '', 500);
    });
  });

  // ── FAQ Accordion ──
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ── Contact Form ──
  document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Wird gesendet…'; btn.disabled = true;
    await new Promise(r => setTimeout(r, 900));
    btn.style.display = 'none';
    const s = document.getElementById('formSuccess');
    s.style.display = 'block';
    gsap.fromTo(s, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' });
  });

  // ── Testimonial Marquee: Cards duplizieren für nahtlose Endlosschleife ──
  document.querySelectorAll('.testi-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  // ── Phasen-Animation: nacheinander aufdecken beim Scrollen ──
  const phases = document.querySelectorAll('.phase');
  const lineFill = document.getElementById('phaseLineFill');

  if (phases.length) {
    // Jede Phase einzeln aktivieren wenn sie in den Viewport kommt
    const phaseObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // kleine Verzögerung je nach Phase für gestaffelten Effekt
          const idx = parseInt(entry.target.dataset.phase) - 1;
          setTimeout(() => entry.target.classList.add('active'), idx * 120);
        }
      });
    }, { threshold: 0.35 });
    phases.forEach(p => phaseObserver.observe(p));

    // Verbindungslinie füllt sich basierend auf Scroll-Position
    const phasesWrap = document.querySelector('.phases');
    function updateLine() {
      if (!phasesWrap || !lineFill) return;
      const rect = phasesWrap.getBoundingClientRect();
      const vh = window.innerHeight;
      // Fortschritt: 0 wenn oben am Viewport-Mittelpunkt, 1 wenn unten durch
      const start = vh * 0.75;
      const end = vh * 0.25;
      const total = rect.height;
      let progress = (start - rect.top) / (total + (start - end));
      progress = Math.max(0, Math.min(1, progress));
      lineFill.style.height = (progress * 100) + '%';
    }
    window.addEventListener('scroll', updateLine, { passive: true });
    updateLine();
  }

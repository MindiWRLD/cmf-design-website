// animations.js — GSAP + Lenis setup

document.addEventListener('DOMContentLoaded', () => {

  // ─── Lenis Smooth Scroll ───────────────────────────────
  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Lenis + GSAP ScrollTrigger sync
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) lenis.scrollTo(target, { offset: -68 });
    });
  });

  // ─── Hero Entrance ─────────────────────────────────────
  const heroTl = gsap.timeline({ delay: 0.1 });
  heroTl
    .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to('.hero-headline .line', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }, '-=0.4')
    .to('.hero-sub',     { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to('.hero-scroll-hint', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');

  // ─── Scroll Reveals ────────────────────────────────────
  document.querySelectorAll('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      }
    });
  });

  // ─── Cursor Glow ───────────────────────────────────────
  const glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function animateGlow() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      glow.style.left = cx + 'px';
      glow.style.top  = cy + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  } else if (glow) {
    glow.style.display = 'none';
  }

  // ─── Nav scrolled state ────────────────────────────────
  ScrollTrigger.create({
    start: 'top -10',
    onUpdate: self => {
      document.getElementById('nav')?.classList.toggle('scrolled', self.progress > 0);
    }
  });

  // Nav scroll detection fallback
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  });

});

// ═══════════════════════════════════════════════════════════
//  CMF Designs — main.js  (absturzsicher aufgebaut)
//  Jeder Block ist einzeln abgesichert. Selbst wenn eine
//  Library fehlt, wird der Inhalt trotzdem sichtbar.
// ═══════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ---- 0. SOFORT: Sicherstellen dass Inhalte NIE unsichtbar bleiben ----
  // Falls JS/Libraries später crashen, ist der Inhalt trotzdem da.
  function revealAllNow() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }
  // Notbremse: nach 2 Sekunden ganz sicher alles zeigen
  setTimeout(revealAllNow, 2000);

  function init() {

    // ---- 1. Scroll Reveals (WICHTIGSTER TEIL zuerst) ----
    try {
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              observer.unobserve(e.target);
            }
          });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(function (el) {
          observer.observe(el);
        });
      } else {
        revealAllNow();
      }
    } catch (err) {
      revealAllNow();
    }

    // ---- 2. Lenis Smooth Scroll (optional) ----
    var lenis = null;
    try {
      if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
          duration: 1.2,
          easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
        });
        function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
      }
    } catch (err) { lenis = null; }

    // ---- 3. Anchor Links (smooth scroll, mit Fallback) ----
    try {
      document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var target = document.querySelector(a.getAttribute('href'));
          if (!target) return;
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(target, { offset: -66 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    } catch (err) {}

    // ---- 4. Nav scrolled state ----
    try {
      window.addEventListener('scroll', function () {
        var nav = document.getElementById('nav');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
      }, { passive: true });
    } catch (err) {}

    // ---- 5. Hero Entrance (nur wenn GSAP da ist) ----
    try {
      if (typeof gsap !== 'undefined') {
        gsap.from('.hero-badge', { opacity: 0, y: 20, duration: .8, delay: .1, ease: 'power3.out' });
        gsap.from('h1', { opacity: 0, y: 40, duration: 1, delay: .25, ease: 'power3.out' });
        gsap.from('.hero-sub', { opacity: 0, y: 20, duration: .8, delay: .5, ease: 'power3.out' });
        gsap.from('.btn-row', { opacity: 0, y: 20, duration: .8, delay: .65, ease: 'power3.out' });
      }
    } catch (err) {}

    // ---- 6. 3D Card Tilt ----
    try {
      document.querySelectorAll('.card-3d').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - .5;
          var y = (e.clientY - r.top) / r.height - .5;
          card.style.transform = 'rotateX(' + (-y * 12) + 'deg) rotateY(' + (x * 12) + 'deg) scale(1.04)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = '';
          card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s';
          setTimeout(function () { card.style.transition = ''; }, 500);
        });
      });
    } catch (err) {}

    // ---- 7. FAQ Accordion ----
    try {
      document.querySelectorAll('.faq-q').forEach(function (q) {
        q.addEventListener('click', function () {
          var item = q.parentElement;
          var answer = item.querySelector('.faq-a');
          var isOpen = item.classList.contains('open');
          document.querySelectorAll('.faq-item').forEach(function (i) {
            i.classList.remove('open');
            var a = i.querySelector('.faq-a');
            if (a) a.style.maxHeight = null;
          });
          if (!isOpen && answer) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      });
    } catch (err) {}

    // ---- 8. Phasen-Animation ----
    try {
      var phases = document.querySelectorAll('.phase');
      var lineFill = document.getElementById('phaseLineFill');

      if (phases.length) {
        // Methode 1: IntersectionObserver (schön gestaffelt)
        if ('IntersectionObserver' in window) {
          var phaseObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('active');
                phaseObserver.unobserve(entry.target);
              }
            });
          }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
          phases.forEach(function (p) { phaseObserver.observe(p); });
        }

        // Methode 2: Scroll-Fallback (falls Observer nicht greift)
        function checkPhases() {
          var vh = window.innerHeight;
          phases.forEach(function (p) {
            var rect = p.getBoundingClientRect();
            if (rect.top < vh * 0.9) {
              p.classList.add('active');
            }
          });
        }
        window.addEventListener('scroll', checkPhases, { passive: true });
        checkPhases();

        // Methode 3: Sicherheitsnetz - nach 3 Sek alle sichtbar
        setTimeout(function () {
          phases.forEach(function (p) { p.classList.add('active'); });
        }, 3000);

        // Verbindungslinie füllen
        var phasesWrap = document.querySelector('.phases');
        function updateLine() {
          if (!phasesWrap || !lineFill) return;
          var rect = phasesWrap.getBoundingClientRect();
          var vh2 = window.innerHeight;
          var start = vh2 * 0.75, end = vh2 * 0.25, total = rect.height;
          var progress = (start - rect.top) / (total + (start - end));
          progress = Math.max(0, Math.min(1, progress));
          lineFill.style.height = (progress * 100) + '%';
        }
        window.addEventListener('scroll', updateLine, { passive: true });
        updateLine();
      }
    } catch (err) {
      document.querySelectorAll('.phase').forEach(function (p) { p.classList.add('active'); });
    }

    // ---- 9. Testimonial Marquee (Cards duplizieren) ----
    try {
      document.querySelectorAll('.testi-track').forEach(function (track) {
        track.innerHTML += track.innerHTML;
      });
    } catch (err) {}

    // ---- 10. Contact Form ----
    try {
      var form = document.getElementById('contactForm');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var btn = form.querySelector('button[type="submit"]');
          if (btn) { btn.textContent = 'Wird gesendet…'; btn.disabled = true; }
          setTimeout(function () {
            if (btn) btn.style.display = 'none';
            var s = document.getElementById('formSuccess');
            if (s) {
              s.style.display = 'block';
              if (typeof gsap !== 'undefined') {
                gsap.fromTo(s, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' });
              }
            }
          }, 900);
        });
      }
    } catch (err) {}

  } // init()

  // Starten sobald DOM bereit ist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

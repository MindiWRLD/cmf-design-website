const translations = {
  de: {
    'nav.logo':'Studio','nav.services':'Leistungen','nav.work':'Arbeiten','nav.about':'Über uns','nav.contact':'Erstberatung',
    'hero.eyebrow':'Webdesign Agentur · München','hero.h1a':'Websites die','hero.h1b':'überzeugen.',
    'hero.sub':'Wir bauen digitale Auftritte, die Kunden gewinnen — schnell, modern, messbar.',
    'hero.cta1':'Erstberatung buchen','hero.cta2':'Unsere Arbeiten ↓','hero.scroll':'Scrollen',
    'services.label':'Was wir machen','services.headline':'Alles aus einer Hand.',
    's1.title':'Website & Landing Page','s1.desc':'Von der Idee bis zum Launch. Individuell gestaltet, nicht von der Stange — optimiert für Conversions.',
    's2.title':'Design & Branding','s2.desc':'Logo, Farbpalette, Typografie. Deine Marke bekommt ein Gesicht das man nicht vergisst.',
    's3.title':'Animationen & Interaktion','s3.desc':'Smooth Scroll, GSAP-Animationen, Micro-Interactions. Deine Website fühlt sich an wie ein Produkt.',
    's4.title':'Wartung & Support','s4.desc':'Wir bleiben nach dem Launch. Updates, Anpassungen und neue Features — wenn du sie brauchst.',
    'work.label':'Referenzen','work.headline':'Unsere Arbeiten.',
    'proj1.tag':'Restaurant / Landing Page','proj1.desc':'Griechisches Restaurant in Ebersberg — GSAP-Animationen, Speisekarte, Online-Reservierung.',
    'proj2.tag':'Demnächst','proj2.title':'Dein Projekt hier?','proj2.desc':'Wir haben noch Kapazitäten. Meld dich — lass uns reden.',
    'about.label':'Wer wir sind','about.headline':'Klein. Fokussiert. Schnell.',
    'about.p1':'Wir sind keine Agentur mit 50 Leuten und 3 Monate Wartezeit. Wir sind ein junges, hungriges Team aus München — und wir liefern.',
    'about.p2':'Jedes Projekt wird von uns persönlich betreut. Kein Offshore, kein Template, kein Bullshit. Du redest direkt mit dem der deine Website baut.',
    'about.cta':'Erstgespräch starten','stat1':'Custom Design','stat2':'Tage bis Launch','stat3':'Support danach',
    'contact.label':'Erstberatung','contact.headline':'Lass uns reden.',
    'contact.sub':'Kostenloses Erstgespräch — kein Druck, kein Bullshit. Wir hören zu was du brauchst und sagen dir ehrlich was wir draus machen können.',
    'cl1':'Kostenlos & unverbindlich','cl2':'Antwort innerhalb 24h','cl3':'Direkt mit dem Entwickler',
    'form.name':'Name','form.email':'E-Mail','form.project':'Worum geht\'s?','form.submit':'Erstberatung anfragen',
    'form.success':'✓ Danke! Wir melden uns innerhalb von 24 Stunden.',
    'footer.copy':'© 2025 CMF Designs. Alle Rechte vorbehalten.','footer.imprint':'Impressum','footer.privacy':'Datenschutz',
  },
  en: {
    'nav.logo':'Studio','nav.services':'Services','nav.work':'Work','nav.about':'About','nav.contact':'Free Consultation',
    'hero.eyebrow':'Web Design Agency · Munich','hero.h1a':'Websites that','hero.h1b':'convert.',
    'hero.sub':'We build digital presences that win clients — fast, modern, measurable.',
    'hero.cta1':'Book a free call','hero.cta2':'Our work ↓','hero.scroll':'Scroll',
    'services.label':'What we do','services.headline':'Everything from one source.',
    's1.title':'Website & Landing Page','s1.desc':'From idea to launch. Custom-built, not templated — optimized for conversions.',
    's2.title':'Design & Branding','s2.desc':'Logo, color palette, typography. Your brand gets a face people remember.',
    's3.title':'Animations & Interaction','s3.desc':'Smooth scroll, GSAP animations, micro-interactions. Your site feels like a product.',
    's4.title':'Maintenance & Support','s4.desc':'We stay after launch. Updates, tweaks, and new features — whenever you need them.',
    'work.label':'Portfolio','work.headline':'Our work.',
    'proj1.tag':'Restaurant / Landing Page','proj1.desc':'Greek restaurant in Ebersberg — GSAP animations, menu, online reservation system.',
    'proj2.tag':'Coming soon','proj2.title':'Your project here?','proj2.desc':'We still have capacity. Reach out — let\'s talk.',
    'about.label':'Who we are','about.headline':'Small. Focused. Fast.',
    'about.p1':'We\'re not an agency with 50 people and a 3-month backlog. We\'re a young, hungry team from Munich — and we deliver.',
    'about.p2':'Every project is handled by us personally. No offshore, no templates, no bullshit. You talk directly to the person building your site.',
    'about.cta':'Start the conversation','stat1':'Custom Design','stat2':'Days to launch','stat3':'Ongoing support',
    'contact.label':'Free Consultation','contact.headline':'Let\'s talk.',
    'contact.sub':'A free first call — no pressure, no pitch. We listen to what you need and tell you honestly what we can do.',
    'cl1':'Free & non-binding','cl2':'Reply within 24h','cl3':'Directly with the developer',
    'form.name':'Name','form.email':'Email','form.project':'What\'s it about?','form.submit':'Request consultation',
    'form.success':'✓ Thanks! We\'ll get back to you within 24 hours.',
    'footer.copy':'© 2025 CMF Designs. All rights reserved.','footer.imprint':'Imprint','footer.privacy':'Privacy',
  }
};

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang]?.[key]) el.textContent = translations[lang][key];
  });
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'de';
  applyTranslations(saved);
  const btn = document.getElementById('langSwitch');
  if (btn) btn.textContent = saved === 'de' ? 'EN' : 'DE';
  btn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-lang') || 'de';
    const next = current === 'de' ? 'en' : 'de';
    applyTranslations(next);
    btn.textContent = next === 'de' ? 'EN' : 'DE';
  });
});

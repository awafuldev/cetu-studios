/* ==========================================================================
   CETU STUDIOS — app.js v3
   Animaciones, Navbar interactivo, Scroll Spy, Mobile Drawer,
   y Formulario de contacto con WhatsApp forward.
   ========================================================================== */

(function () {
  'use strict';

  // Número oficial de WhatsApp de Cetu Studios
  const WA_PHONE = '18090000000';

  // 1. Inicializar Lucide Icons
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // 2. Navbar Scroll Effect & Scroll Spy
  const navbar = document.getElementById('navbar');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = ['inicio', 'servicios', 'proyectos', 'proceso', 'nosotros', 'contacto'];

  function handleScroll() {
    const scrollPos = window.scrollY;

    // Navbar pill styling on scroll
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll spy for active link
    const viewCenter = scrollPos + window.innerHeight * 0.35;
    let currentSection = 'inicio';

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (viewCenter >= top && viewCenter < bottom) {
          currentSection = id;
        }
      }
    });

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === '#' + currentSection) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // 3. Mobile Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta-wrap a');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Scroll Reveal Animations (con fallback seguro)
  function initScrollReveal() {
    document.documentElement.classList.add('js-enabled');
    const reveals = document.querySelectorAll('.reveal-on-scroll');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      });

      reveals.forEach(el => observer.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('revealed'));
    }
  }

  // 6. Formulario de Contacto + Forward a WhatsApp
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  const waCopyBtn = document.getElementById('wa-copy-btn');
  const submitBtn = document.getElementById('submit-btn');

  function generateWhatsAppLink(data) {
    const lines = [
      '👋 *Hola Cetu Studios, quiero cotizar un proyecto:*',
      '',
      `👤 *Nombre:* ${data.name}`,
      data.company ? `🏢 *Empresa:* ${data.company}` : '',
      `📧 *Correo:* ${data.email}`,
      `🛠️ *Servicio de interés:* ${data.service}`,
      '',
      '📝 *Mensaje:*',
      data.message
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${WA_PHONE}?text=${text}`;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const company = document.getElementById('form-company')?.value.trim();
      const service = document.getElementById('form-service')?.value;
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !service || !message) {
        alert('Por favor completa todos los campos requeridos (*)');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Enviando mensaje...</span>';
      }

      const formData = { name, email, company, service, message };
      const waUrl = generateWhatsAppLink(formData);

      setTimeout(() => {
        contactForm.style.display = 'none';
        if (contactSuccess) {
          contactSuccess.classList.remove('hidden');
        }
        if (waCopyBtn) {
          waCopyBtn.href = waUrl;
        }
        initIcons();
        contactSuccess?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 600);
    });
  }

  // Lifecycle Initialization
  function init() {
    initIcons();
    initScrollReveal();
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

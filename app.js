/* ==========================================================================
   CETU STUDIOS — app.js v2
   Funcionalidades: Nav sticky, mobile menu, scroll spy, animaciones,
   formulario de contacto con WhatsApp forward.
   ========================================================================== */

(function () {
  'use strict';

  // ─── Elementos ─────────────────────────────────────────────────────────────
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('nav-hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const navLinks    = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
  const sections    = document.querySelectorAll('section[id], section');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const waForward   = document.getElementById('wa-forward');
  const submitBtn   = document.getElementById('form-submit');

  // ─── Número de WhatsApp (editar aquí) ──────────────────────────────────────
  const WA_NUMBER = '18090000000';

  // ─── Mobile Menu Toggle ────────────────────────────────────────────────────
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar al hacer clic en un link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Scroll Spy — Detectar sección activa ────────────────────────────────
  const sectionIds = ['inicio', 'servicios', 'proyectos', 'nosotros', 'contacto'];

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '#' + id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ─── Smooth scroll para anclas ────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── Init ──────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
  });

  function buildWhatsAppUrl(data) {
    const text = [
      '👋 *Nuevo mensaje desde cetustudios.com*',
      '',
      `*Nombre:* ${data.nombre}`,
      data.empresa ? `*Empresa:* ${data.empresa}` : '',
      `*Correo:* ${data.correo}`,
      data.servicio ? `*Servicio de interés:* ${data.servicio}` : '',
      '',
      `*Mensaje:*`,
      data.mensaje
    ].filter(Boolean).join('\n');

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Recolectar datos
      const data = {
        nombre:   document.getElementById('f-name')?.value.trim() || '',
        empresa:  document.getElementById('f-company')?.value.trim() || '',
        correo:   document.getElementById('f-email')?.value.trim() || '',
        servicio: document.getElementById('f-service')?.value || '',
        mensaje:  document.getElementById('f-message')?.value.trim() || ''
      };

      // Validación básica
      if (!data.nombre || !data.correo || !data.mensaje) {
        alert('Por favor completa los campos obligatorios: nombre, correo y mensaje.');
        return;
      }

      // Deshabilitar botón
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }

      // Simular envío (en producción, aquí va la llamada al backend)
      setTimeout(() => {
        // Ocultar form, mostrar éxito
        contactForm.classList.add('hidden');
        contactForm.style.display = 'none';

        if (formSuccess) {
          formSuccess.classList.remove('hidden');
          formSuccess.style.display = 'flex';
        }

        // Configurar enlace de WhatsApp
        if (waForward) {
          waForward.href = buildWhatsAppUrl(data);
        }

        // Scroll suave al success
        formSuccess?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 800);
    });
  }

  // ─── Init ──────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
  });

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    updateActiveLink();
  }

})();

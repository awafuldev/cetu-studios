/* ==========================================================================
   CETU STUDIOS — app.js v4 (Carousel, Stepper & Interactive Conversion)
   ========================================================================== */

(function () {
  'use strict';

  // WhatsApp oficial de Cetu Studios
  const WA_PHONE = '18090000000';

  // 1. Inicializar Lucide Icons
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // 2. Navbar Scroll & Luxury Mobile Sidebar
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarLinks = document.querySelectorAll('.sidebar-link, .sidebar-cta-group a');

  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function openMobileSidebar() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    if (mobileToggle) mobileToggle.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMobileSidebar() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    if (mobileToggle) mobileToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer.classList.contains('open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });

    if (sidebarClose) {
      sidebarClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileSidebar();
      });
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileSidebar);
    }

    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileSidebar();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMobileSidebar();
      }
    });
  }

  // 3. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Horizontal Services Carousel
  const viewport = document.getElementById('services-viewport');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dotsContainer = document.getElementById('services-dots');
  const slides = document.querySelectorAll('.service-slide');

  if (viewport && slides.length > 0) {
    // Generate Pagination Dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (idx === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Ir al servicio ${idx + 1}`);
      dot.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth + 24; // width + gap
        viewport.scrollTo({
          left: idx * slideWidth,
          behavior: 'smooth'
        });
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateActiveDot() {
      const slideWidth = slides[0].offsetWidth + 24;
      const activeIndex = Math.round(viewport.scrollLeft / slideWidth);
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }

    viewport.addEventListener('scroll', updateActiveDot, { passive: true });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth + 24;
        viewport.scrollBy({ left: -slideWidth, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth + 24;
        viewport.scrollBy({ left: slideWidth, behavior: 'smooth' });
      });
    }
  }

  // 5. Featured Projects Tabs Switcher
  const projectTabs = document.querySelectorAll('.project-tab-btn');
  const projectSlides = document.querySelectorAll('.project-slide-item');

  projectTabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const targetIndex = this.getAttribute('data-project-target');

      // Update Tabs
      projectTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Update Slides
      projectSlides.forEach(slide => slide.classList.remove('active'));
      const activeSlide = document.getElementById('project-slide-' + targetIndex);
      if (activeSlide) {
        activeSlide.classList.add('active');
      }
    });
  });

  // 6. Interactive Process Stepper
  const stepItems = document.querySelectorAll('.step-interactive-item');
  const stepperBar = document.getElementById('stepper-bar');

  stepItems.forEach((step, index) => {
    step.addEventListener('click', () => {
      stepItems.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      if (stepperBar) {
        const percentage = ((index + 1) / stepItems.length) * 100;
        stepperBar.style.width = percentage + '%';
      }
    });
  });

  // 7. Direct Conversion Form + WhatsApp Sync
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  const waCopyBtn = document.getElementById('wa-copy-btn');
  const submitBtn = document.getElementById('submit-btn');

  function buildWhatsAppUrl(data) {
    const lines = [
      '👋 *Hola Cetu Studios, quiero cotizar un proyecto:*',
      '',
      `👤 *Nombre:* ${data.name}`,
      `📞 *Contacto:* ${data.contact}`,
      `🛠️ *Servicio de interés:* ${data.service}`,
      '',
      '📝 *Idea o descripción:*',
      data.message
    ].filter(Boolean);

    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const contact = document.getElementById('form-contact')?.value.trim();
      const service = document.getElementById('form-service')?.value;
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !contact || !service || !message) {
        alert('Por favor completa todos los campos requeridos (*)');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Enviando mensaje...</span>';
      }

      const formData = { name, contact, service, message };
      const waUrl = buildWhatsAppUrl(formData);

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
      }, 500);
    });
  }

  // 8. Lifecycle Init
  function init() {
    initIcons();
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

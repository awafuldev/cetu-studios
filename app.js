/**
 * CETU STUDIOS — OFFICIAL LUXURY REDESIGN
 * Interactive Engine & UI Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Navigation Scroll Effect & Active Section Spy
  const navbar = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('bg-[#151613]/95', 'border-b', 'border-[#805C12]/40', 'backdrop-blur-md', 'shadow-2xl');
      navbar.classList.remove('bg-transparent', 'border-transparent');
    } else {
      navbar.classList.remove('bg-[#151613]/95', 'border-b', 'border-[#805C12]/40', 'backdrop-blur-md', 'shadow-2xl');
      navbar.classList.add('bg-transparent', 'border-transparent');
    }

    // Scroll Spy
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-[#D6AF34]', 'font-semibold');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('text-[#D6AF34]', 'font-semibold');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isClosed = mobileMenu.classList.contains('hidden');
      if (isClosed) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }

  // 4. Solutions Section: Interactive Tab Switcher
  const solutionTabs = document.querySelectorAll('.solution-tab-btn');
  const solutionPanels = document.querySelectorAll('.solution-content-panel');

  solutionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.solution;

      solutionTabs.forEach(t => {
        t.classList.remove('border-[#D6AF34]', 'bg-[#232520]', 'text-[#FDFBF3]');
        t.classList.add('border-[#805C12]/30', 'bg-[#1C1D19]', 'text-[#F0E4C4]');
      });

      tab.classList.remove('border-[#805C12]/30', 'bg-[#1C1D19]', 'text-[#F0E4C4]');
      tab.classList.add('border-[#D6AF34]', 'bg-[#232520]', 'text-[#FDFBF3]');

      solutionPanels.forEach(panel => {
        if (panel.id === `solution-${targetId}`) {
          panel.classList.remove('hidden');
          panel.classList.add('grid');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('grid');
        }
      });
    });
  });

  // 5. Methodology / Process Step Interactive Inspector
  const processSteps = document.querySelectorAll('.process-card-step');
  const methodTitle = document.getElementById('method-active-title');
  const methodDesc = document.getElementById('method-active-desc');
  const methodDeliverables = document.getElementById('method-active-deliverables');

  const methodDetails = {
    '01': {
      title: '01. Descubrimiento e Inmersión Estratégica',
      desc: 'Analizamos detenidamente la operación de tu empresa, los flujos de trabajo actuales, los cuellos de botella y los objetivos comerciales para diseñar una arquitectura tecnológica sin fisuras.',
      deliverables: ['Mapeo de Procesos Operativos', 'Matriz de Requerimientos Técnicos', 'Definición de Arquitectura Cloud', 'Cronograma y Alcance Ejecutivo']
    },
    '02': {
      title: '02. Planificación, Arquitectura & Diseño UI/UX',
      desc: 'Elaboramos la estructura completa del software: esquemas de bases de datos relacionales, wireframes de alta fidelidad, flujos de usuario intuitivos y prototipos interactivos antes de escribir la primera línea de código.',
      deliverables: ['Diseño de Interfaz Editorial en Figma', 'Modelado de Base de Datos PostgreSQL', 'Contratos de API REST / GraphQL', 'Prototipo Interactivo de Validación']
    },
    '03': {
      title: '03. Desarrollo de Ingeniería & Pruebas Rigurosas',
      desc: 'Construimos la solución con tipado estricto en TypeScript, microservicios modulares, integraciones bancarias seguras y validaciones fiscales, sometiendo cada módulo a pruebas de carga y seguridad.',
      deliverables: ['Desarrollo Full-Stack Escalable', 'Integración de Pasarelas y Facturación DGII', 'Auditoría de Seguridad y Pruebas Unitarias', 'Ambiente de Staging para Pruebas del Cliente']
    },
    '04': {
      title: '04. Despliegue en Producción & Acompañamiento Continuo',
      desc: 'Publicamos el producto en infraestructura cloud de alta disponibilidad (Vercel / AWS Edge), verificamos la respuesta en vivo, capacitamos a tu equipo y garantizamos soporte técnico continuo.',
      deliverables: ['Puesta en Marcha en Producción CI/CD', 'Capacitación Personalizada al Personal', 'Documentación Técnica de la Plataforma', 'Monitoreo 24/7 y Garantía Cetu']
    }
  };

  processSteps.forEach(card => {
    card.addEventListener('click', () => {
      const step = card.dataset.step;
      const data = methodDetails[step];
      if (!data) return;

      processSteps.forEach(c => {
        c.classList.remove('border-[#D6AF34]', 'bg-[#232520]');
        c.classList.add('border-[#805C12]/30', 'bg-[#1C1D19]');
      });

      card.classList.remove('border-[#805C12]/30', 'bg-[#1C1D19]');
      card.classList.add('border-[#D6AF34]', 'bg-[#232520]');

      if (methodTitle) methodTitle.textContent = data.title;
      if (methodDesc) methodDesc.textContent = data.desc;
      if (methodDeliverables) {
        methodDeliverables.innerHTML = data.deliverables.map(del => `
          <div class="flex items-center gap-2 text-xs font-mono text-[#F0E4C4]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#D6AF34]"></span>
            <span>${del}</span>
          </div>
        `).join('');
      }
    });
  });

  // 6. Portfolio Category Filter
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => {
        b.classList.remove('bg-[#D6AF34]', 'text-[#151613]', 'border-[#F7DE7E]');
        b.classList.add('bg-[#1C1D19]', 'text-[#F0E4C4]', 'border-[#805C12]/40');
      });

      btn.classList.remove('bg-[#1C1D19]', 'text-[#F0E4C4]', 'border-[#805C12]/40');
      btn.classList.add('bg-[#D6AF34]', 'text-[#151613]', 'border-[#F7DE7E]');

      portfolioItems.forEach(item => {
        const cat = item.dataset.category;
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden');
          item.classList.add('flex');
        } else {
          item.classList.add('hidden');
          item.classList.remove('flex');
        }
      });
    });
  });

  // 7. Interactive Project Architecture Modal
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalStack = document.getElementById('modal-stack');
  const modalFeatures = document.getElementById('modal-features');
  const modalImage = document.getElementById('modal-image');

  const projectData = {
    'aurora-erp': {
      title: 'Aurora Enterprise — Sistema Administrativo & Control Operativo',
      category: 'SISTEMAS EMPRESARIALES / ERP',
      desc: 'Plataforma empresarial de misión crítica construida para gestionar compras, inventario multisucursal, facturación fiscal compatible con la DGII de República Dominicana (NCF) y analítica ejecutiva en tiempo real.',
      image: 'assets/software-erp.jpg',
      stack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'DGII Fiscal Engine'],
      features: [
        'Emisión automática y correlativa de comprobantes fiscales NCF (B01, B02, B14, B15)',
        'Sincronización de inventario multisucursal con alertas inteligentes de reabastecimiento',
        'Control de acceso con Roles y Permisos granulares (RBAC) para cajeros, supervisores y directores',
        'Generación y exportación de reportes tributarios formatos 606, 607 y estados de resultados',
        'Panel ejecutivo con visualización en tiempo real de márgenes de beneficio bruto'
      ]
    },
    'aurum-commerce': {
      title: 'Aurum — Plataforma Ecommerce Headless de Alto Rendimiento',
      category: 'ECOMMERCE & RETAIL PREMIUM',
      desc: 'Tienda digital para retail y marcas exclusivas, desarrollada con arquitectura headless de ultra-baja latencia (<0.7s) e integración directa con pasarelas de pago locales (Azul, Cardnet) e internacionales (Stripe).',
      image: 'assets/software-ecommerce.jpg',
      stack: ['React', 'Next.js', 'Azul API', 'Cardnet', 'Stripe Payments', 'Redis Caching'],
      features: [
        'Proceso de pago en un solo paso optimizado para máxima conversión en smartphones',
        'Conexión segura y certificada con adquirentes dominicanos (Azul y Cardnet)',
        'Búsqueda facetada instantánea con filtros dinámicos por colección, precio y atributos',
        'Notificaciones automáticas de confirmación y rastreo de envíos vía WhatsApp Cloud API',
        'Panel de administración de pedidos con trazabilidad de despacho y logística'
      ]
    },
    'nexus-inventory': {
      title: 'Nexus Inventory — Plataforma de Gestión de Inventario & Ventas',
      category: 'INVENTARIO & ANALÍTICA',
      desc: 'Software especializado para empresas comerciales y centros de distribución que requieren trazabilidad milimétrica de stock, rotación de productos, costeo ponderado y proyecciones de demanda.',
      image: 'assets/software-inventory.jpg',
      stack: ['Next.js', 'PostgreSQL', 'Node.js', 'Tailwind CSS', 'Chart.js', 'Webhooks'],
      features: [
        'Trazabilidad por números de serie, lotes y fechas de vencimiento',
        'Métricas de rotación de inventario y detección automática de productos de baja rotación',
        'Control de transferencias entre múltiples almacenes y tiendas físicas',
        'Informes ejecutivos de compras sugeridas según velocidad de venta proyectada'
      ]
    },
    'syncflow-auto': {
      title: 'SyncFlow Core — Motor de Automatización & Conexión Empresarial',
      category: 'AUTOMATIZACIÓN & INTEGRACIÓN',
      desc: 'Infraestructura de microservicios encargada de conectar automáticamente las transacciones bancarias, el sistema contable y la mensajería instantánea hacia el cliente, eliminando el trabajo manual.',
      image: 'assets/software-custom.jpg',
      stack: ['Node.js', 'BullMQ', 'WhatsApp Cloud API', 'Webhooks Engine', 'PostgreSQL'],
      features: [
        'Disparo en tiempo real de recibos de pago digitales directamente a WhatsApp',
        'Sincronización bidireccional entre CRM, ERP y plataformas de marketing',
        'Manejo de colas con reintentos automáticos para garantizar 100% de entrega de eventos',
        'Monitoreo en vivo de telemetría y registros de auditoría de cada transacción'
      ]
    }
  };

  const openProjectModal = (projId) => {
    const proj = projectData[projId];
    if (!proj || !modal) return;

    modalTitle.textContent = proj.title;
    modalCategory.textContent = proj.category;
    modalDesc.textContent = proj.desc;
    if (modalImage) modalImage.src = proj.image;

    modalStack.innerHTML = proj.stack.map(tech => `
      <span class="px-2.5 py-1 text-xs font-mono rounded bg-[#151613] text-[#D6AF34] border border-[#805C12]/40">
        ${tech}
      </span>
    `).join('');

    modalFeatures.innerHTML = proj.features.map(f => `
      <li class="flex items-start gap-2.5 text-xs text-[#F0E4C4]">
        <span class="text-[#D6AF34] mt-0.5 font-bold">✦</span>
        <span>${f}</span>
      </li>
    `).join('');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.dataset.project;
      openProjectModal(projId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 8. Contact Form with Real Validation & Direct WhatsApp Briefing
  const contactForm = document.getElementById('cetu-contact-form');
  const successBox = document.getElementById('contact-success-box');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const company = document.getElementById('form-company').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const projectType = document.getElementById('form-type').value;
      const budget = document.getElementById('form-budget').value;
      const description = document.getElementById('form-desc').value.trim();

      if (!name || !email || !description) {
        alert('Por favor completa todos los campos requeridos (*)');
        return;
      }

      // Visual loading state
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">✦</span>
        Procesando requerimiento...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;

        if (successBox) {
          successBox.classList.remove('hidden');
          successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // WhatsApp prefilled dispatch
        const waText = `*NUEVA SOLICITUD DE PROYECTO — CETU STUDIOS*%0A%0A` +
          `*Nombre:* ${encodeURIComponent(name)}%0A` +
          `*Empresa:* ${encodeURIComponent(company || 'N/A')}%0A` +
          `*Correo:* ${encodeURIComponent(email)}%0A` +
          `*Tipo de Proyecto:* ${encodeURIComponent(projectType)}%0A` +
          `*Presupuesto:* ${encodeURIComponent(budget)}%0A` +
          `*Detalle:* ${encodeURIComponent(description)}`;

        const waLink = document.getElementById('whatsapp-forward-btn');
        if (waLink) {
          waLink.href = `https://wa.me/18090000000?text=${waText}`;
        }

        contactForm.reset();
      }, 900);
    });
  }
});

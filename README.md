# Cetu Studios — Digital Product Studio & Software Engineering

> "We build the digital infrastructure behind ambitious businesses."
> **COMPLEJO POR DENTRO. SIMPLE POR FUERA.**

Sitio web oficial de **Cetu Studios**, estudio de desarrollo digital e ingeniería de software con sede en República Dominicana y alcance global.

---

## ✦ Filosofía & Dirección Visual

Inspirado en la estética técnica y minimalista de **Vercel**, las superficies oscuras de **Linear**, el lenguaje tipográfico orientado a ingenieros de **Resend** y la presentación de producto de **Stripe**.

- **Obsidian (`#000000`)**: Fondo principal mate profundo.
- **Carbon (`#0F0F10`)**: Superficies de tarjetas, paneles y ventanas de interfaz.
- **Graphite (`#27272A`)**: Bordes sutiles de 1px y elementos de división.
- **Paper (`#FFFFFF`)**: Tipografía principal de alto contraste.
- **Fog (`#ABAFB4`)**: Tipografía secundaria y descripciones.
- **Ash (`#6E727A`)**: Metadatos técnicos e información atenuada.
- **Neon Cyan (`#52E1FE`)**: Acentos de marca, estados activos y beacons de estado.
- **Beacon Teal (`#25AEBA`)**: Iluminación radial atmosférica y resplandores controlados.
- **Amber (`#FFB86A`)**: Resaltados puntuales en interfaces y métricas.

---

## ✦ Tipografía

- **Principal**: `Inter` (500/400) — Títulos editoriales con espaciado negativo y textos fluidos.
- **Secundaria**: `JetBrains Mono` — Identificadores de servicios (`SVC-01 // WEB-CORE`), estado de edge servers, hora en vivo AST y código TypeScript.

---

## ✦ Secciones Implementadas

1. **System Status Strip**: Estado en tiempo real del estudio, disponibilidad para proyectos Q1/Q2 y reloj en vivo de República Dominicana (AST UTC-4).
2. **Sticky Navigation Bar**: Altura de 68px, efecto de cristal y desenfoque al hacer scroll, logotipo geométrico y menú interactivo en móviles.
3. **Hero Section (Asymmetric Layout)**:
   - Título de gran impacto tipográfico y botones de acción primario/secundario.
   - Mockup interactivo con selector de vistas: **Dashboard en Vivo**, **Código TypeScript de Arquitectura** y **Terminal de Logs**.
   - Gráfico de transacciones en tiempo real con degradado en cian.
4. **Trust / Value Strip**: Franja minimalista con las capacidades clave del estudio.
5. **Services Section ("01 / WHAT WE BUILD")**: 6 tarjetas de servicios (Desarrollo Web, Ecommerce, Sistemas Administrativos, Software Personalizado, Automatización, Aplicaciones Web) con previsualizaciones realistas de software.
6. **Solutions Section ("02 / BUSINESS SOLUTIONS")**: 4 soluciones con pestañas interactivas y tablas de datos realistas (Business Management con facturación DGII NCF, Online Commerce, Gestión Interna RBAC, y Plataformas a Medida).
7. **Development Process ("03 / HOW WE WORK")**: Línea de tiempo interactiva de 4 fases (Descubrimiento, Planificación & Diseño, Desarrollo, Lanzamiento) con inspector de entregables.
8. **Projects / Portfolio ("04 / SELECTED WORK")**: Catálogo de proyectos demostrativos con filtros por categoría y **modal interactivo de arquitectura** con especificaciones técnicas y simulación.
9. **Why Cetu Studios ("05 / THE DIFFERENCE")**: 4 pilares de diferenciación técnica.
10. **Calculadora de Arquitectura & Alcance**: Estimador interactivo que calcula semanas de entrega sugeridas y genera una consulta pre-formateada para WhatsApp.
11. **Final CTA**: Llamado a la acción con resplandor radial en cian y accesos directos.
12. **Contact Section ("06 / GET IN TOUCH")**: Formulario con validación en el cliente, selección de presupuesto en USD y despacho directo a WhatsApp.
13. **Footer**: Identidad de marca, enlaces jerárquicos, caja de estado de servidores y derechos de autor.

---

## ✦ Estructura de Archivos

```
cetu-studios/
├── index.html                  # Estructura semántica principal y marcado accesible
├── styles.css                  # Sistema de diseño, tokens de color y micro-animaciones
├── app.js                      # Motor interactivo: tabs, reloj AST, modal, filtros y estimador
├── cetu-symbol.png             # Símbolo geométrico optimizado (512x512)
├── cetu-icon-192.png           # Icono de app para dispositivos móviles (192x192)
├── favicon.png                 # Favicon de alta resolución (64x64)
└── test_cetu.py                # Suite de pruebas automatizadas y capturas de pantalla con Playwright
```

---

## ✦ Cómo ejecutar localmente

Puedes servir la carpeta estática con cualquier servidor web:

```bash
# Con Python
python -m http.server 8080

# O con npx
npx serve .
```

Abre en tu navegador: `http://localhost:8080`

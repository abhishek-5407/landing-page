 Prompts.md — AI Interaction Log
Prodesk IT Sprint 01 | Landing Page

> This file documents all AI (Claude / Antigravity IDE) prompts utilized during development, as required by the Sprint 01 AI Policy.
> All output was reviewed, understood, and selectively applied. No blind copy-pasting.

---

Session 1 — Phase 1 & 2 Foundation

Prompt 1
Input: Build a professional landing page for Prodesk IT with Navbar, Hero, Services, About, Contact and Footer sections. Use raw CSS Flexbox and Grid. Include dark mode toggle, glassmorphism navbar, hover animations, and scroll animations.

Output Used: Full HTML structure + CSS custom property system (design tokens), navbar with glassmorphism backdrop-filter, hero section with floating shapes, services 3-card grid, about section, contact form with validation, footer grid layout.

Reviewed & Validated: Yes — verified Flexbox/Grid alignment, ARIA accessibility, CSS variable token structure.

---

Session 2 — Phase 2 Enhancements

Prompt 2
Input: Add scroll-in animations using IntersectionObserver, animated number counter for hero stats, back-to-top button, and WhatsApp floating button.

Output Used: IntersectionObserver pattern for `.scroll-hidden` elements, `animateCounter()` function using `performance.now()` and cubic easing, back-to-top with CSS visibility transition, WhatsApp float button with pulse keyframe.

Reviewed & Validated: Yes — tested counter animation timing, verified observer unobserve to prevent memory leaks.

---

Session 3 — Additional Sections

Prompt 3
Input: Add a "How We Work" 4-step process section with step connectors, a 3-card testimonials section with a featured middle card, and a gradient CTA banner section.

Output Used: Process grid with `.process-connector` responsive hiding, testimonial card variant with pseudo-element quote mark, CTA banner with layered gradient shapes.

Reviewed & Validated: Yes — verified responsive layout collapse on mobile, pseudo-element positioning.

---

    Session 4 — Phase 3 Tailwind Migration

Prompt 4
Input: Migrate the entire index.html from raw CSS classes to Tailwind CSS v3 CDN utility classes. Keep a custom.css for keyframes, backdrop-filter, and gradient utilities that Tailwind cannot express. Use Tailwind darkMode: 'class' config. Add all Lighthouse optimizations: img dimensions, preload, Open Graph, JSON-LD, ARIA labels, semantic HTML.

Output Used: Complete rewrite of index.html with Tailwind utility classes, Tailwind CDN config script with custom colors/shadows/fonts, custom.css supplement for animations and gradients, updated script.js to use `html` element dark class.

Reviewed & Validated: Yes — verified dark mode toggle works with `document.documentElement.classList`, confirmed all IDs preserved for JS selectors, validated semantic HTML5 element usage.

---

       Session 5 — Submission Files

     Prompt 5
    Input: Create README.md with project description, tech stack table, sprint phases completed, project structure, local setup, Lighthouse targets. Create Prompts.md logging all AI interactions.

    Output Used: README.md structure and Prompts.md (this file).

    Reviewed & Validated: Yes.

---

     AI Usage Policy Compliance

- All AI outputs were reviewed line by line before use
- CSS properties were individually validated against MDN documentation
- JavaScript patterns (IntersectionObserver, requestAnimationFrame) were understood before implementation
- No framework code (Bootstrap, Material UI) was blindly copied
- Tailwind utility classes were verified against official Tailwind v3 documentation

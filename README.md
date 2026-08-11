# Prodesk IT — Landing Page

> **Sprint 01 | Prodesk IT Digital Marketing Wing**
> A professional, fully-responsive landing page built in 3 phases following strict sprint specifications.

---

## Live URL

> 🚀 **[Will be updated after Vercel deployment]**

---

## Screenshot

> *(Screenshot will be added after deployment)*

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (Semantic) |
| Styling Phase 1-2 | Vanilla CSS (Flexbox + Grid) |
| Styling Phase 3 | Tailwind CSS v3 (CDN) |
| Logic | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.5 |
| Fonts | Google Fonts (Inter + Outfit) |
| Deployment | Vercel |

---

## Sprint Phases Completed

### ✅ Phase 1 — Base MVP (P0)
- Navbar: Logo aligned left, nav links right, hamburger on mobile
- Hero: High-conversion headline, sub-headline, primary CTA button
- Services: CSS Grid — 3 service cards (SEO, Web Dev, Digital Marketing)
- Footer: Copyright text + social media icons
- Architecture: Pure HTML + raw Flexbox/Grid CSS

### ✅ Phase 2 — UI/UX Enhancements
- Theme Controller: Dark/Light mode toggle using JS class on `<html>`
- Micro-Interactions: Hover states on all CTAs + z-axis lifting on service cards
- Sticky Navigation: Fixed navbar with glassmorphism `backdrop-filter`
- Scroll animations via IntersectionObserver
- Animated number counters in hero stats
- Toast notification system

### ✅ Phase 3 — Stretch Goals & Optimization
- **Tailwind CSS Migration**: Full rewrite using Tailwind v3 CDN utility classes
- Tailwind `darkMode: 'class'` config for dark mode
- Custom CSS supplemental file for keyframes, gradients, backdrop-filter
- **Lighthouse Optimizations**:
  - `<img>` tags with `width` and `height` attributes (CLS fix)
  - `rel="preload"` on hero image (LCP improvement)
  - Full ARIA labels, roles, and `aria-required` attributes
  - JSON-LD Structured Data (Organization schema)
  - Open Graph meta tags for social sharing
  - Semantic HTML5 (`<nav>`, `<section>`, `<article>`, `<footer>`)
  - `aria-hidden="true"` on all decorative icons

### ➕ Bonus Sections
- **How We Work** (Process Steps)
- **Client Testimonials**
- **CTA Banner** with urgency copy
- **WhatsApp Float Button** with pulse animation
- **Back to Top** button with scroll visibility

---

## Project Structure

```
landing-page/
├── index.html     # Main HTML (Tailwind-migrated, Phase 3)
├── custom.css     # Supplemental CSS (keyframes, gradients, glass)
├── script.js      # Vanilla JS (theme, nav, form, animations)
├── style.css      # Original raw CSS (Phase 1 & 2 reference)
├── hero-bg.png    # Hero background image
├── logo.png       # Prodesk IT logo
├── README.md      # This file
└── Prompts.md     # AI prompt log
```

---

## Local Setup

```bash
# No build step required — open directly in browser
open index.html
# or use Live Server in VS Code
```

---

## Lighthouse Targets

| Category | Target |
|---|---|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

---

## Submitted by

**Prodesk IT Engineering Team**
Sprint Deadline: Within 6 days of sprint kickoff

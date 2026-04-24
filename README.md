# Mall of America — Interactive Sales Deck

> A cinematic, browser-based sales tool built for retail tenants, brand sponsors, and event partners. Designed to replace fragmented pitch decks with a single immersive experience.

**Live URL:** [Add Vercel URL here]  
**Built for:** Liat.ai Screening Assignment

---

## What This Is

A fully interactive, video-first sales deck for Mall of America — America's most visited retail destination. Built as a self-contained web application that a salesperson can screen-share on a live call or send as a standalone link.

The goal: within 10 seconds, a prospect feels — *"I need to be here."*

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React + Vite | Frontend framework |
| React Router DOM (hash mode) | Non-linear navigation |
| GSAP + ScrollTrigger | Scroll animations, entrance effects |
| Framer Motion | Page transitions |
| Tailwind CSS v3 | Utility styling |
| Inter + Playfair Display | Typography system |

**Node:** v22.6.0 · **npm:** 10.8.2

---

## Setup Instructions

```bash
# Clone the repo
git clone https://github.com/Rhythm-inCode/mall-of-america
cd mall-of-america

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

**Note:** Videos and images are stored in `src/assets/`. If assets are missing, the pages will fall back to CSS gradients gracefully.

---

## Project Structure

```
src/
├── assets/
│   ├── images/          # Static images + AI-generated visuals
│   └── videos/          # Background videos (Pexels, free license)
├── components/
│   └── Navbar.jsx       # Fixed nav with dropdown + mobile hamburger
├── hooks/
│   └── useResponsive.js # Shared responsive breakpoint hook
├── pages/
│   ├── Intro.jsx        # Cinematic storytelling intro (2-stage)
│   ├── Overview.jsx     # Why MoA — stats, count-up animations
│   ├── Retail.jsx       # Retail environment + tenant modals
│   ├── Luxury.jsx       # Luxury Wing — editorial layout
│   ├── Dining.jsx       # Dining & lifestyle — hover reveals
│   ├── Entertainment.jsx # Nickelodeon Universe — interactive map
│   ├── Events.jsx       # Events platform — live ticker + timeline
│   ├── Sponsorship.jsx  # Sponsorship tiers + brand fit scorer
│   ├── Leasing.jsx      # Leasing paths + ROI estimator
│   └── Contact.jsx      # Typewriter CTA + dynamic inquiry form
├── styles/
│   └── globals.css      # CSS variables, scrollbar, base styles
├── App.jsx              # Router + page transitions + scroll reset
└── main.jsx             # Entry point
```

---

## Design Decisions

**Video-first storytelling**  
Every major section opens with a fullscreen video hero. Video is the primary medium, not decoration. Images and data follow after the emotional hook is set.

**2-stage intro**  
Stage 1 is pure typography — three data beats (40M+, 500+, #1) build tension before the headline reveals. Stage 2 plays the transition video with a Skip button. This mirrors how luxury brands open campaigns — silence, then impact.

**Dark luxury aesthetic**  
Color palette: `#0a0a0a` background, `#c9a84c` gold accent, Playfair Display for editorial weight, Inter for data clarity. Inspired by Saint Laurent, Hermes, and Tesla.com — maximum impact, minimal chrome.

**Non-linear navigation**  
Full navbar available on every page. Users control their journey. No forced progression.

**Interactive features per section**  
Every page has at least one unique interactive element beyond animations:
- Entertainment: clickable park zone map + ride counter animation + MoA vs Online Retail comparison
- Events: live scrolling ticker + hover-reveal timeline + brand activation reach calculator
- Sponsorship: animated demographic visualizer + tier comparator + brand fit scorer
- Leasing: interactive floor plan + real-time ROI estimator with sliders
- Contact: typewriter headline + dynamic inquiry form with per-card fields

**Responsive**  
Fully responsive across desktop, tablet, and mobile. Grid layouts collapse to single column, touch events added for mobile interactions.

---

## AI Integration

| Tool | How It Was Used |
|------|----------------|
| **Claude (Anthropic)** | Full codebase generation — architecture, component logic, GSAP animations, responsive layouts, interactive features, copywriting for all sections |
| **DALL-E (OpenAI)** | AI-generated architectural renderings for Luxury Wing, Overview hero, and Entertainment section |
| **Pexels** | Free-license video assets — mall walkthrough, luxury boutique, dining ambiance, theme park, concert crowd |

AI was not just used for asset generation but as a core part of the build workflow — every component was designed and iterated through Claude, significantly accelerating development speed without sacrificing craft.

---

## Pages & Features

| Route | Section | Key Feature |
|-------|---------|------------|
| `/` | Cinematic Intro | 2-stage: data beats → headline → transition video |
| `/overview` | Why MoA | Count-up stats, #1 badge, editorial layout |
| `/retail` | Retail Environment | Tenant list with clickable modals |
| `/luxury` | Luxury Wing | Full-bleed video hero, floating stat cards, AI rendering |
| `/dining` | Dining & Lifestyle | Hover-reveal restaurant concepts |
| `/entertainment` | Nickelodeon Universe | Interactive park map, ride counter, retail comparison |
| `/events` | Events Platform | Live ticker, cinematic timeline, activation calculator |
| `/sponsorship` | Sponsorship | Demographic visualizer, tier comparator, brand fit scorer |
| `/leasing` | Leasing Paths | Floor plan explorer, ROI estimator |
| `/contact` | Connect | Typewriter CTA, dynamic inquiry form |

---

## What I Would Improve With More Time

- **Lighthouse 90+** — Video assets need compression and lazy loading for performance
- **Real MoA assets** — Replace Pexels footage with official MoA press videos
- **More AI renderings** — Generate visuals for each section
- **Venue module** — Dedicated section for MoA's event spaces and performing arts capabilities
- **Analytics** — Track which sections hold attention longest, optimize CTA placement

---

## License

Built for evaluation purposes. All video assets sourced from Pexels (free commercial license). AI-generated images created with DALL-E.
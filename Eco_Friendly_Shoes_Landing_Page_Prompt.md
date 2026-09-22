# Eco Friendly Shoes — Landing Page Hero Build Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, v0, Bolt, etc.). Paste this entire file as a single prompt. It contains the exact, complete source of every file needed — follow it literally and the output will match the original pixel-for-pixel.

## What this project is

"Eco Friendly Shoes" is a sustainable footwear SaaS/e-commerce landing page inspired by a modern, minimalist "Pathway" style design (bright, natural landscape with a light frosted-pill navbar). This is a **dark-text-on-bright-video** design: a single centered light frosted-glass pill navbar containing the brand name + all nav links together (no separate CTA button in the nav), and hero content anchored near the top of the viewport — a frosted eyebrow pill, a dark-charcoal Inter headline, small dark-grey subtext, a dark filled button + a light outlined button, and a light-colored partner/sustainability brand strip pinned to the bottom (which reads fine even if the lower part of the video is darker).

## Tech stack (required — do not substitute)

- Vite + React 19 + TypeScript
- Tailwind CSS **v4** via the `@tailwindcss/vite` plugin — CSS pulled in with `@import "tailwindcss";` at the top of `src/index.css` (not a v3 config file)
- `framer-motion` for every animation (fade/slide-in on mount, hover/tap scale)
- All typography inline via the `style` prop — reproduce exactly as given below
- Google Fonts via `<link>` tags in `index.html`

### package.json

```json
{
  "name": "eco-friendly-shoes",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@tailwindcss/vite": "^4.2.2",
    "@types/node": "^24.12.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "framer-motion": "^12.38.0",
    "globals": "^17.4.0",
    "tailwindcss": "^4.2.2",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.57.0",
    "vite": "^8.0.1"
  }
}
```

### vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

## Steps to build

1. Scaffold a new Vite React-TS project named `eco-friendly-shoes`. Install the dependencies above.
2. Overwrite `index.html`, `src/index.css`, `src/App.tsx`, `src/main.tsx` with the exact contents below.
3. Create `src/components/Navbar.tsx` and `src/components/Hero.tsx` with the exact contents below.
4. There is **no** `TrustedBy.tsx` — the partner/sustainability strip is inline inside `Hero.tsx`.
5. Fetch a nature/sustainability-themed background video (bright, natural landscape or person wearing eco shoes in natural setting) and save it as `public/hero.mp4`. The video should be bright and clear at the top (for dark text legibility) and may have a slightly darker lower section for the sponsor strip.
6. Add a favicon at `public/favicon.svg` (brand logo or leaf icon is ideal).

## File: `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Eco Friendly Shoes — Walk Your Values</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: `src/index.css`

```css
@import "tailwindcss";

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', sans-serif;
    background: #000;
    color: #fff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #root { width: 100%; min-height: 100svh; }
}
```

## File: `src/main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## File: `src/App.tsx`

```tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './index.css'

function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Hero />
    </div>
  )
}

export default App
```

## File: `src/components/Navbar.tsx`

```tsx
import { motion } from 'framer-motion'

const INK = '#1f1f1f'
const navLinks = ["Collection", "Why Us", "Sustainability", "Stories", "Reviews", "Contact"]

export default function Navbar() {
  return (
    <div style={{ position: 'fixed', top: '18px', left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
      <motion.nav
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          display: 'flex', alignItems: 'center', gap: '36px',
          padding: '11px 22px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(255,255,255,0.65)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
        }}
      >
        <span style={{ fontSize: '17px', fontWeight: 700, color: INK, letterSpacing: '-0.01em' }}>Eco Shoes</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(40,40,40,0.72)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = INK }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(40,40,40,0.72)' }}
            >
              {link}
            </a>
          ))}
        </div>
      </motion.nav>
    </div>
  )
}
```

## File: `src/components/Hero.tsx`

```tsx
import { motion } from 'framer-motion'

const INK = '#1f1f1f'
const partners = ["Patagonia", "Allbirds", "Veja", "Rothy's", "Everlane"]

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <video style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src="/hero.mp4" autoPlay muted loop playsInline />
      {/* Overlays — opacity reduced by 70% for bright video legibility */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.13)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.17) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.25) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.10) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.10) 100%)' }} />
      <div style={{ position: 'absolute', top: '-14%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '720px', background: 'radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.06) 0%, transparent 68%)', pointerEvents: 'none' }} />

      {/* Top-anchored content */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '15vh 24px 0' }}>
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 13px', borderRadius: '999px', background: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', fontSize: '11px', fontWeight: 500, color: 'rgba(40,40,40,0.78)', marginBottom: '20px' }}
        >
          ✓ Steps That Count
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22, ease: 'easeOut' }}
          style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(1.9rem, 4.4vw, 3.1rem)', lineHeight: 1.08, letterSpacing: '-0.025em', color: INK }}
        >
          Walk your values
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.38, ease: 'easeOut' }}
          style={{ margin: '16px 0 0', maxWidth: '460px', fontSize: '14px', lineHeight: 1.6, color: 'rgba(40,40,40,0.7)', fontWeight: 500 }}
        >
          Sustainable sneakers designed for style, comfort, and the planet. Every step creates measurable impact.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.52, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: '13px', marginTop: '28px' }}
        >
          <motion.a
            href="#shop"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '12px 24px', borderRadius: '9px', fontSize: '14px', fontWeight: 600, fontFamily: "'Inter', sans-serif", color: '#fff', textDecoration: 'none', background: '#1a1a1a', boxShadow: '0 6px 20px rgba(0,0,0,0.22)' }}
          >
            Shop Now
          </motion.a>
          <motion.a
            href="#impact"
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.85)' }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '12px 24px', borderRadius: '9px', fontSize: '14px', fontWeight: 600, fontFamily: "'Inter', sans-serif", color: INK, textDecoration: 'none', background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            See Impact
          </motion.a>
        </motion.div>
      </div>

      {/* Partner/Sustainability strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, padding: '20px 24px 30px', textAlign: 'center' }}
      >
        <p style={{ margin: '0 0 16px', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
          Trusted by teams focused on
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '44px', flexWrap: 'wrap', maxWidth: '820px', margin: '0 auto' }}>
          {partners.map((name) => (
            <span
              key={name}
              style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.02em', color: 'rgba(255,255,255,0.72)', transition: 'color 0.25s ease', cursor: 'default', textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = '#fff' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.72)' }}
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

## Design notes (context, not instructions to change anything)

- **Headline:** "Walk your values" is the primary message — positioning eco shoes as a lifestyle and values statement for teens/young adults
- **Subtext:** Emphasizes sustainability, design, comfort, and measurable impact tracking
- **Navigation:** Changed to "Collection, Why Us, Sustainability, Stories, Reviews, Contact" for e-commerce/brand focus
- **CTA Buttons:** "Shop Now" (primary action) and "See Impact" (engagement with sustainability tracker)
- **Partner Strip:** Uses real sustainable fashion brands (Patagonia, Allbirds, Veja, Rothy's, Everlane) — these are reference partners who share the eco mission or represent the competitive/peer landscape. These are **placeholder positions** and can be swapped for actual brand partnerships
- **Eyebrow:** Updated with a checkmark (✓) and "Steps That Count" campaign tagline
- **Color scheme:** Kept dark text on bright background for legibility; the green radial gradient (`rgba(34,197,94,0.06)`) subtly hints at the eco-friendly brand without overwhelming the design
- **Video requirement:** The hero background should be bright and natural (nature landscape, person in eco shoes outdoors, sunrise/sunset in nature, etc.) — bright at top for dark text, can be slightly darker at bottom for sponsor strip contrast
- **If video is dark:** Flip headline/subtext/nav to white/light colors and adjust partner strip to dark background

## Customization suggestions

- **Brand name:** Change "Eco Shoes" to your actual brand name in navbar
- **Colors:** To emphasize green/earth tones, update the gradient color in Hero.tsx from `rgba(34,197,94,0.06)` to `rgba(92,184,92,0.08)` for more visible green tint
- **Partner brands:** Replace Patagonia, Allbirds, Veja, Rothy's, Everlane with actual partnerships or brand affiliations
- **Video:** Use a nature-centric, bright video showing eco shoes in action or sustainable lifestyle context
- **CTA destinations:** Link buttons to `/shop`, `/impact-tracker`, etc. as your routing develops

---

**Ready to build the eco-friendly shoes landing page?** 🌱🚀

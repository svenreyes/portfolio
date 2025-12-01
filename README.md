# Portfolio Foundation

A modern portfolio website inspired by Raw Materials' storytelling aesthetic, built with Next.js 14+, TypeScript, Tailwind CSS, and React Three Fiber.

## Features

- **Golden Cloudy Background**: Custom GLSL shader with animated golden clouds using React Three Fiber
- **Enhanced Glassmorphic UI**: Premium glass-style navigation cards inspired by @react-bits/GlassSurface
  - Advanced backdrop filters with blur, saturation, and brightness
  - Layered shadows for depth (golden-tinted outset + white inset highlights)
  - Gradient overlays for light reflection effects
  - Safari fallback support
- **Responsive Design**: Desktop sidebar + main panel layout that adapts to mobile/tablet
- **Route-Ready**: Pre-configured routes for all sections (Welcome, Approach, Work, Contact, Resume)
- **TypeScript**: Fully typed for better developer experience
- **Performance Optimized**: Static generation for fast page loads

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page
│   ├── welcome/page.tsx          # Welcome section
│   ├── approach/page.tsx         # Approach section
│   ├── work/page.tsx             # Work section
│   ├── contact/page.tsx          # Contact section
│   ├── resume/page.tsx           # Resume section
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles with Tailwind config
│
├── components/
│   ├── background/
│   │   ├── CloudyBackground.tsx  # Canvas wrapper for 3D background
│   │   └── SmokeBackground.tsx   # GLSL shader implementation
│   │
│   └── layout/
│       ├── LandingShell.tsx      # Main layout wrapper
│       ├── SidebarNav.tsx        # Navigation cards (glassmorphic)
│       └── MainPanel.tsx         # Content panel with header & poem
```

## Customization

### Colors

The golden color palette is defined in `src/app/globals.css`:

```css
--gold-base: #C49A6C;
--gold-light: #D1A875;
--gold-highlight: #EAD0A3;
--gold-shadow: #9B7653;
```

### Shader Animation

Modify the cloud animation in `src/components/background/SmokeBackground.tsx`:
- `loopT`: Controls animation speed (default: 36s)
- `offset`: Controls cloud movement intensity
- Color gradients in the fragment shader

### Navigation

Edit navigation items in `src/components/layout/SidebarNav.tsx`:

```typescript
const navItems = [
  { index: '00', label: 'Sven Reyes', href: '/' },
  // Add more items...
];
```

### 3D Model Placeholder

The centered placeholder in `MainPanel.tsx` is ready for a React Three Fiber 3D model. Pass your custom component as children:

```tsx
<LandingShell>
  <YourCustom3DModel />
</LandingShell>
```

## Technology Stack

- **Framework**: Next.js 16.0.2 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **3D Graphics**: React Three Fiber + Three.js
- **React**: React 19.2.0

## Design Inspiration

- Layout inspired by [The Raw Materials](https://www.therawmaterials.com/)
- Golden cloudy aesthetic with glassmorphic UI elements
- Minimal, story-driven navigation structure

## Next Steps

1. Replace the 3D placeholder with an actual React Three Fiber model
2. Add content to each section page
3. Implement scroll-driven animations (GSAP, Framer Motion, etc.)
4. Add page transitions between routes
5. Integrate analytics and SEO optimization

## License

Private portfolio project.

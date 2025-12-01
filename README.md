# Sven Reyes Portfolio

A modern single-page portfolio with split-scroll navigation, built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- **Split-Scroll Interface**: Independent scrolling sidebar navigation and main content panel
- **Dynamic Index Cards**: Navigation cards that expand based on section length with real-time progress indicators
- **Section Entry Headers**: Animated section banners with large hero cards
- **Glass-Morphism Design**: Subtle borders, backdrop blur, and hover states
- **Responsive Layout**: Desktop sidebar + main panel, mobile stacked layout
- **Instant Navigation**: Click any index card to jump directly to that section

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main single-page application
│   ├── layout.tsx            # Root layout with fonts
│   └── globals.css           # Global styles and scrollbar utilities
│
├── components/
│   ├── layout/
│   │   ├── LandingShell.tsx  # Split-scroll layout wrapper
│   │   ├── SidebarNav.tsx    # Index card navigation
│   │   └── CurvedSection.tsx # Content section container
│   │
│   ├── navigation/
│   │   └── IndexCard.tsx     # Navigation card with progress indicator
│   │
│   ├── scroll/
│   │   ├── SectionEntryHeader.tsx  # Section entry banner + hero
│   │   └── SectionMarker.tsx       # Sticky section labels
│   │
│   └── typography/
│       ├── SplitHeadline.tsx # Responsive multi-line headlines
│       └── BodyText.tsx      # Responsive body copy
│
├── hooks/
│   ├── useScrollSpy.ts       # Section visibility tracking
│   └── useSectionProgress.ts # Scroll progress within sections
│
├── config/
│   └── sections.config.ts    # Section definitions
│
└── assets/
    └── Nordique Pro fonts
```

## Sections

| Index | Section  | Description      |
|-------|----------|------------------|
| 00    | Hero     | Landing intro    |
| 01    | Welcome  | About me         |
| 02    | Approach | How I work       |
| 03    | Work     | Experience       |
| 04    | Projects | Selected work    |
| 05    | Contact  | Get in touch     |
| 06    | Resume   | Download CV      |

## Customization

### Adding/Editing Sections

Edit `src/config/sections.config.ts`:

```typescript
export const SECTIONS: Section[] = [
  { id: 'hero', index: '00', label: 'Your Name' },
  { id: 'about', index: '01', label: 'About' },
  // Add more sections...
];
```

### Styling

- Colors and CSS variables in `src/app/globals.css`
- Component-specific styles use Tailwind classes
- Glass-morphism via `border-white/20`, `backdrop-blur-sm`

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP + ScrollTrigger
- **React**: React 19

## License

Private portfolio project.

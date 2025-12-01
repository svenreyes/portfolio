# Scroll-Based Narrative System

Inspired by [The Raw Materials](https://www.therawmaterials.com/talent), this portfolio implements a scroll-driven narrative experience with GSAP ScrollTrigger.

## ✨ Key Features Implemented

### 1. Section-Based Narrative
Each major section has enter/exit animations powered by GSAP ScrollTrigger:
- **ScrollSection** component handles scroll triggers and animations
- Progressive reveal of content as you scroll
- Smooth transitions between sections

### 2. Slide Pagination
Live pagination indicator (bottom-right) shows "● 03 / 23" style progress:
- **SectionPagination** component tracks active section
- **useScrollProgress** hook manages state machine
- Updates based on viewport center position

### 3. Progressive Reveal
Content reveals with stacked animations:
- Elements with `.reveal` class fade in from below (opacity + translateY)
- **Headlines with `.headline-stack`** stack and resolve with scale + opacity
- GSAP timelines with `scrub: 1` for smooth scroll-linked animation

### 4. Split Typography
Large headlines broken across lines with controlled spacing:
- **SplitHeadline** component handles multi-line typography
- CSS `clamp()` for responsive type scales: `text-[clamp(3rem,8vw,8rem)]`
- Font metrics: `leading-[0.9]` (90% line-height), `tracking-tight`

### 5. Sticky Section Markers
Section labels pin during scroll:
- **SectionMarker** component with sticky positioning
- Shows section index (01, 02, etc.) and label
- Animates in from left with GSAP

### 6. Responsive Typography
All text scales fluidly using CSS clamp():
```css
/* H1 Headlines */
text-[clamp(3rem,8vw,8rem)]

/* H2 Headlines */
text-[clamp(2rem,6vw,6rem)]

/* Body Large */
text-[clamp(1.25rem,2.5vw,1.5rem)]

/* Body Medium */
text-[clamp(1rem,2vw,1.25rem)]
```

## 📦 Components Created

### Scroll System
- `ScrollSection.tsx` - Container for scroll-driven sections
- `SectionPagination.tsx` - "● 03 / 23" pagination indicator
- `SectionMarker.tsx` - Sticky section headers

### Typography
- `SplitHeadline.tsx` - Multi-line headlines with clamp() scaling
- `BodyText.tsx` - Responsive body copy

### Hooks
- `useScrollProgress.ts` - Tracks scroll position and active section

## 🎯 Usage Example

```tsx
'use client';

import { ScrollSection } from '@/components/scroll/ScrollSection';
import { SectionMarker } from '@/components/scroll/SectionMarker';
import { SplitHeadline } from '@/components/typography/SplitHeadline';
import { BodyText } from '@/components/typography/BodyText';

export default function Page() {
  return (
    <>
      <ScrollSection sectionId="hero">
        <SplitHeadline as="h1">
          {`Your headline\nacross multiple\nlines`}
        </SplitHeadline>
        
        <BodyText size="lg">
          Body text that scales responsively with clamp()
        </BodyText>
      </ScrollSection>

      <ScrollSection sectionId="about">
        <SectionMarker label="About" index="01" />
        
        <div className="reveal">
          <h2>Content that fades in on scroll</h2>
        </div>
      </ScrollSection>
    </>
  );
}
```

## 🎨 Animation Classes

### `.reveal`
Progressive reveal animation:
- Fades in: `opacity: 0 → 1`
- Slides up: `y: 60 → 0`
- Trigger: When element enters bottom 80% of viewport
- Scrub: Linked to scroll position

### `.headline-stack`
Stacking headline animation:
- Fades in: `opacity: 0 → 1`
- Slides up: `y: 80 → 0`
- Scales up: `scale: 0.95 → 1`
- Stagger: Each line delays by 0.1s

## 🎬 GSAP ScrollTrigger Config

```js
ScrollTrigger.create({
  trigger: element,
  start: 'top 80%',    // When top of element hits 80% viewport
  end: 'top 50%',      // When top of element hits 50% viewport
  scrub: 1,            // Smooth scroll-linked animation
  markers: false,      // Set to true for debugging
});
```

## 📱 Responsive Behavior

- **Desktop**: Full scroll-driven experience with all animations
- **Tablet**: Adjusted typography scales, same animation system
- **Mobile**: Simplified spacing, maintains scroll interactions

## 🔧 Configuration

### Enable Debug Markers
Pass `markers={true}` to ScrollSection:
```tsx
<ScrollSection sectionId="test" markers={true}>
  {/* Content */}
</ScrollSection>
```

### Pin Sections
Enable section pinning (pins section during scroll):
```tsx
<ScrollSection sectionId="pinned" pin={true}>
  {/* Content stays pinned for 200% of viewport height */}
</ScrollSection>
```

### Adjust Animation Timing
Modify in `ScrollSection.tsx`:
```js
scrub: 1.5,        // Slower (more lag)
scrub: 0.5,        // Faster (less lag)
scrub: true,       // Instant (no smoothing)
```

## 🚀 Performance Notes

- GSAP ScrollTrigger is optimized for 60fps
- Uses `will-change` CSS for animation hints
- Passive scroll listeners for better performance
- `gsap.context()` ensures proper cleanup
- Server-side rendering safe (checks for `window`)

## 📚 Inspiration

This system is inspired by the scroll-driven storytelling on [The Raw Materials](https://www.therawmaterials.com/talent), featuring:
- Section-based navigation
- Progressive content reveals
- Sticky section markers
- Fluid typography
- Smooth scroll-linked animations

## 🎯 Next Steps

1. **Case Study Pages**: Create longform project templates
2. **Horizontal Scroll**: Add side-scrolling galleries
3. **Parallax Effects**: Layer content at different scroll speeds
4. **Custom Cursors**: Add interactive cursor effects
5. **Page Transitions**: Smooth transitions between routes


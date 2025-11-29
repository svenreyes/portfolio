# Split-Scroll Layout System

Inspired by [The Raw Materials](https://www.therawmaterials.com/talent), this portfolio implements independent scroll containers for the left sidebar and main content area.

## ✨ Key Features

### 1. **Independent Scroll Containers**
- **Left Sidebar**: Fixed navigation with its own scroll container
- **Main Content**: Independent scroll container for content
- Each side scrolls independently based on hover position

### 2. **Scroll Isolation**
- When hovering over **left sidebar** → only sidebar scrolls
- When hovering over **main content** → only main content scrolls
- Prevents cross-scrolling between containers
- Body scroll is disabled to prevent page-level scrolling

### 3. **Hover-Based Scroll Detection**
- Tracks mouse position using `mouseenter`/`mouseleave` events
- Determines which container should receive scroll events
- Smooth scroll behavior with proper bounds checking

### 4. **Custom Scrollbars**
- Thin, subtle scrollbars (6px width)
- Semi-transparent white (`rgba(255, 255, 255, 0.2)`)
- Hover effects for better visibility
- Cross-browser support (Chrome, Firefox, Safari)

## 🎯 How It Works

### Layout Structure
```tsx
<div className="h-screen overflow-hidden">
  <div className="flex h-full">
    {/* Left Sidebar - Independent Scroll */}
    <aside className="h-full overflow-y-auto">
      <SidebarNav />
    </aside>
    
    {/* Main Content - Independent Scroll */}
    <main className="flex-1 h-full overflow-y-auto">
      <MainPanel>{children}</MainPanel>
    </main>
  </div>
</div>
```

### Scroll Isolation Logic

1. **Hover Detection**: Tracks which container the mouse is over
2. **Wheel Event Handling**: Intercepts wheel events at document level
3. **Container Selection**: Determines target container based on hover
4. **Manual Scrolling**: Programmatically scrolls the selected container
5. **Bounds Checking**: Prevents scrolling beyond container limits

```js
// Track hovered element
let hoveredElement = null;

// On wheel event
if (hoveredElement) {
  // Scroll the hovered container
  hoveredElement.scrollTop += deltaY;
}
```

## 📦 Implementation Details

### LandingShell Component

**Key Features:**
- `useRef` hooks for sidebar and main content containers
- `useEffect` for scroll isolation setup
- Event listeners for hover and wheel events
- Proper cleanup on unmount

**Scroll Behavior:**
- Prevents default scroll behavior
- Manually controls `scrollTop` for smooth scrolling
- Checks scroll bounds before applying scroll
- Stops propagation to prevent bubbling

### Custom Scrollbar Styles

**Webkit (Chrome, Safari, Edge):**
```css
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
```

**Firefox:**
```css
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
```

## 🎨 Visual Behavior

### Left Sidebar
- **Fixed width**: 320px (w-80)
- **Scrollable**: If content exceeds viewport height
- **Sticky**: Stays in place when scrolling main content
- **Glass cards**: Navigation items with glassmorphic styling

### Main Content
- **Flexible width**: Takes remaining space (flex-1)
- **Scrollable**: Independent scroll for long content
- **Border-only**: Transparent background, white border
- **Full height**: Uses `min-height: 100%` for proper scrolling

## 🚀 Usage

The split-scroll system is automatically active on desktop layouts (≥1024px). On mobile/tablet, it falls back to standard vertical scrolling.

### Desktop Behavior
1. Hover over left sidebar → scroll sidebar
2. Hover over main content → scroll main content
3. Each side scrolls independently

### Mobile Behavior
- Standard single-column layout
- Normal page scrolling
- No split-scroll (not needed on small screens)

## 🔧 Configuration

### Adjust Scroll Sensitivity
Modify scroll amount in `LandingShell.tsx`:
```js
// Current: Direct deltaY
scrollContainer.scrollTop += scrollAmount;

// Smoother: Multiply by factor
scrollContainer.scrollTop += scrollAmount * 0.5;
```

### Change Scrollbar Appearance
Update in `globals.css`:
```css
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3); /* More visible */
  width: 8px; /* Thicker */
}
```

### Disable Scroll Isolation
Remove the `useEffect` hook in `LandingShell.tsx` to allow normal scrolling behavior.

## 🐛 Troubleshooting

### Scroll Not Working
- Check that containers have `overflow-y-auto`
- Verify `document.body.style.overflow = 'hidden'` is set
- Ensure event listeners are properly attached

### Both Sides Scroll Together
- Verify hover detection is working
- Check that `e.preventDefault()` is called
- Ensure `stopPropagation()` is used

### Scrollbar Not Visible
- Check custom scrollbar CSS is loaded
- Verify container has scrollable content
- Test in different browsers (Firefox uses different syntax)

## 📚 Inspiration

This split-scroll system is inspired by the sophisticated navigation patterns on [The Raw Materials](https://www.therawmaterials.com/talent), where:
- Navigation stays accessible while browsing content
- Independent scroll zones create focused reading experiences
- Hover-based interaction feels natural and intuitive

## 🎯 Benefits

1. **Better Navigation**: Sidebar always accessible
2. **Focused Reading**: Content scrolls independently
3. **Modern UX**: Matches high-end portfolio sites
4. **Performance**: Smooth, controlled scrolling
5. **Accessibility**: Keyboard navigation still works

## 🔄 Future Enhancements

- [ ] Smooth scroll animations
- [ ] Scroll position synchronization (optional)
- [ ] Touch gesture support for mobile
- [ ] Scroll indicators/position tracking
- [ ] Keyboard shortcuts for navigation


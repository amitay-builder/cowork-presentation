# Cowork Presentation — Design System

## Font
**Poppins** everywhere. No second font. Loaded via Google Fonts.

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#faf9f5` | Slide background (warm off-white) |
| `--text` | `#141413` | Primary text |
| `--orange` | `#d97757` | **Primary accent** — emphasis text, section markers, badges, borders, progress bar |
| `--blue` | `#6a9bcc` | Secondary accent — numbered badges (step 2), secondary labels |
| `--green` | `#788c5d` | **Icon backgrounds only** — never used for text |
| `--mid-gray` | `#b0aea5` | Muted text, subtitles, captions, footer |
| `--light-gray` | `#e8e6dc` | Card backgrounds, sidebar, subtle borders |
| `--card-bg` | `#ffffff` | Card backgrounds |

### Rules
- Text emphasis always uses `--orange`, never `--green`
- `--green` is only for `.icon-green` (icon circle backgrounds)
- `--blue` appears on secondary badges and occasionally labels
- `--mid-gray` for all secondary/muted text

## Typography Scale

| Class | Size Range | Weight | Use |
|-------|-----------|--------|-----|
| `.display-hero` | 100–240px | 900 | Single number/word full-screen (46,782, FOMA, CONTEXT) |
| `.display-huge` | 64–120px | 800 | Section titles, big statements (Skills, Thank You) |
| `.display-large` | 48–80px | 700 | Part divider titles (How Cowork Works) |
| `.display-medium` | 36–56px | 700 | Standard slide titles |
| `.title-large` | 28–42px | 600 | Sub-headings within slides |
| `.title-medium` | 22–32px | 600 | Card titles, category labels |
| `.body-large` | 18–24px | 400 | Primary body text, descriptions |
| `.body-medium` | 16–20px | 400 | Secondary body text, list items |
| `.body-small` | 13–16px | 400 | Captions, footnotes (auto mid-gray) |
| `.label` | 12–14px | 600 | Badges, tags, footer text |

### Inline font-size rules
When a slide needs a custom size (e.g., the LLM slides that match the PPTX), use `clamp()` but pick from these tiers:
- Hero: `clamp(80px, 14vw, 200px)` or `clamp(100px, 16vw, 240px)`
- Statement: `clamp(36px, 5vw, 68px)`
- Slide title: `clamp(28px, 3.5vw, 48px)` or `clamp(32px, 4vw, 52px)`
- Large body: `clamp(20px, 2.5vw, 36px)` or `clamp(24px, 3vw, 40px)`

## Font Weights
| Weight | Use |
|--------|-----|
| 800 | Display headings, big statements, hero numbers |
| 700 | Slide titles, card titles, bold emphasis |
| 600 | Sub-headings, labels, section markers |
| 500 | Emphasized body text (rare) |
| 400 | Body text, descriptions |
| 300 | Light decorative text (part divider subtitles) |

## Slide Types

### 1. Title Slide (`.slide-title`)
Split layout: left panel (title + subtitle) | right panel (objectives/details).

### 2. Big Statement (`.slide-big-statement`)
Centered text, `.statement` class. Max 2-3 lines. 80px padding. Used for rhetorical questions and key phrases.

### 3. Section Divider (`.slide-section-divider`)
Orange vertical line + "Part N" label + large italic title. Pill tags for sub-topics.

### 4. Content Slide (default `.slide`)
Section marker at top → title → subtitle → content area. 60px 80px padding.

### 5. Image Slide
Centered or split layout. Images use `.screenshot` class (rounded, shadow). Full-bleed images go in `center-content` with `max-width:100%`.

### 6. Icon + Text Slide
Centered: large image/icon on left, statement text on right. Used for limitations slides.

## Components

### Section Marker
```html
<div class="section-marker animate-in">Label Text</div>
```
Orange bar + uppercase label. Always the first element in a content slide.

### Cards
- `.card` — 32px padding, white bg, subtle shadow, 16px radius
- `.card-sm` — 24px padding, 12px radius

### Icon Circles
- `.icon-circle` (56px) / `.icon-circle-sm` (44px)
- Color variants: `.icon-orange`, `.icon-blue`, `.icon-green`, `.icon-gray`

### Numbered Badges
- `.num-badge` (40px circle) / `.num-badge-lg` (52px)
- Default orange bg. Override with `style="background:var(--blue)"` for steps 2, 3.

### Pills
```html
<span class="pill">🔒 Label</span>
```

### Screenshots
```html
<img src="..." class="screenshot">   <!-- 12px radius, shadow -->
<img src="..." class="screenshot-sm"> <!-- 8px radius, less shadow -->
```

## Layout Patterns

### Split (50/50)
```html
<div class="split">
  <div>Left content</div>
  <div>Right content (usually image)</div>
</div>
```

### Centered
```html
<div class="center-content">
  <!-- Vertically + horizontally centered -->
</div>
```

### Grids
- `.grid-3` — 3 equal columns
- `.grid-4` — 4 equal columns
- `.grid-2x4` — 4 columns, 2 rows

## Animation

### Slide-level animation
Add `class="animate-in"` to elements. They animate in sequence (0.06s delay between siblings).

### Step animation (within a slide)
```html
<element data-step="1">Appears on first click</element>
<element data-step="2">Appears on second click</element>
```
- Elements with same `data-step` number appear together
- Arrow right reveals next step, then advances slide
- Arrow left hides steps in reverse

## Sidebar
Auto-generated from `data-title` attribute on each `<section class="slide">`. Hidden in fullscreen (F key).

## Image Sizing Guidelines
- Centered full-width screenshots: `max-width:900px` or `max-width:100%`
- Split layout screenshots: `max-width:100%` (fills half)
- Icons/logos in flow: `height:64px` (small) or `height:200px` (large)
- Library/cube images: `max-width:450-500px`
- Movie posters: `max-height:75vh`
- QR codes: `width:120px;height:120px`

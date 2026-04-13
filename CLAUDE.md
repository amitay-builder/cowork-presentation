# CLAUDE.md

This file provides guidance to Claude Code when working on the Cowork Presentation.

## Project Structure

```
Cowork-Presentation/
├── index.html          ← Slides only (no CSS/JS) — edit slides here
├── styles.css          ← Design system CSS — edit styles here
├── engine.js           ← Navigation, sidebar, step animations — edit behavior here
├── DESIGN-SYSTEM.md    ← Design system documentation (colors, type scale, components)
├── CLAUDE.md           ← This file
└── assets/
    └── screenshots/    ← All images (original deck + LLM images)
        ├── image*.png/jpg   ← From original Cowork Master PPTX
        └── llm-image*.png   ← From LLM explainer PPTX
```

## How to Edit

- **Change a slide's content**: Edit `index.html`, find the slide by its `data-title` attribute
- **Change the design/styling**: Edit `styles.css`
- **Change navigation behavior**: Edit `engine.js`
- **Add a new slide**: Add a `<section class="slide" data-title="...">` block in `index.html`

## Slide Map (61 slides)

| # | data-title | Section |
|---|-----------|---------|
| 1 | Title | Intro |
| 2 | Hi I'm Amitay | Intro |
| 3 | 60+ Companies | Intro |
| 4 | Agenda | Intro |
| 5 | 46,782 AI Tools | Intro (has step animation) |
| 6 | FOMA | Intro (has step animation) |
| 7 | How LLMs Work? | LLM Fundamentals |
| 8 | Next Token Prediction | LLM Fundamentals |
| 9 | Like Autocomplete | LLM Fundamentals |
| 10 | Pre Training Process | LLM Fundamentals |
| 11 | Large Language Model | LLM Fundamentals |
| 12 | PhD in Everything | LLM Fundamentals |
| 13 | Limitations of LLMs | LLM Limitations |
| 14 | Constrained to Data | LLM Limitations |
| 15 | Hallucinations | LLM Limitations |
| 16 | Frozen in Time | LLM Limitations |
| 17 | AI Chatbot Usage | The Context |
| 18 | Common AI Uses | The Context |
| 19 | Advanced Use Cases | The Context |
| 20 | Why Simple Tasks? | The Context |
| 21 | The Bottleneck | The Context |
| 22 | 50 First Dates | The Context |
| 23 | Starts from Zero | The Context |
| 24 | Imagine an Assistant | The Context |
| 25 | What Would You Include? | The Context |
| 26 | A Colleague | The Context |
| 27 | Not About the Tool | The Context |
| 28 | Three Shifts | The Context |
| 29 | Why Not Enough | The Context |
| 30 | Claude Ecosystem | The Context |
| 31 | Part 2: How It Works | Section Divider |
| 32 | Markdown Files | How It Works |
| 33 | Local Folder | How It Works |
| 34 | AI Operating System | How It Works |
| 35 | CLAUDE.md | How It Works |
| 36 | Connectors | How It Works |
| 37 | Browser Research | How It Works |
| 38 | Skills | How It Works |
| 39 | What is a Skill? | How It Works |
| 40 | Progressive Disclosure | How It Works |
| 41 | Skills Architecture | How It Works |
| 42 | Skills Panel | How It Works |
| 43 | Skills Evolution | How It Works |
| 44 | Plugins | How It Works |
| 45 | Security Notice | How It Works |
| 46 | Scheduled Tasks | How It Works |
| 47 | Part 3: Use Cases | Section Divider |
| 48 | Morning Briefing | Use Cases |
| 49 | Competitor Research | Use Cases |
| 50 | Meeting Prep | Use Cases |
| 51 | Part 4: Your Turn | Section Divider |
| 52 | Prompting Claude | Your Turn |
| 53 | Claude Interviews You | Your Turn |
| 54 | Hands-On Exercise | Your Turn |
| 55 | Compounding Effect | Your Turn |
| 56 | Vendor Agnostic | Your Turn |
| 57 | FAQ | Your Turn |
| 58 | What's Next? | Closing |
| 59 | Keep Working | Closing |
| 60 | Next Steps | Closing |
| 61 | Thank You | Closing |

## Design System Quick Reference

See `DESIGN-SYSTEM.md` for full documentation.

**Colors**: `--orange` for accent text, `--blue` for secondary, `--mid-gray` for muted. Never use `--green` for text.

**Type classes**: `display-hero` > `display-huge` > `display-large` > `display-medium` > `title-large` > `title-medium` > `body-large` > `body-medium` > `body-small` > `label`

**Slide types**: title, big-statement, section-divider, content (default), image, icon+text

**Step animations**: Add `data-step="1"` to elements that should appear on click within a slide.

## Image Naming

- `image{N}.png/jpg` — From the original Cowork Master PPTX
- `llm-image{N}.png` — From the LLM explainer PPTX

Key images:
- `image14.png` — Company logos grid
- `image25.png` — 50 First Dates poster
- `image46.jpg` — Claude Ecosystem
- `image70.png` — Obsidian file tree
- `image78.png` — Cowork UI
- `image87.png` — Connectors panel
- `image96.png` — Obsidian about-me
- `image103.png` — Skills panel
- `image122.png` — Skills architecture
- `image149.png` — Plugins browser
- `image150.png` — QR code
- `image159.png` — LinkedIn profile
- `llm-image1-10.png` — LLM training data, parameters, autocomplete

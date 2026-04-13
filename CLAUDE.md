# CLAUDE.md

This file provides guidance to Claude Code when working on the Cowork Presentation.

## Project Structure

```
Cowork-Presentation/
├── index.html          ← Slides only (no CSS/JS) — edit slides here
├── styles.css          ← Design system CSS — edit styles here
├── engine.js           ← Navigation, sidebar, steps, hide/show, present mode
├── DESIGN-SYSTEM.md    ← Design system documentation
├── CLAUDE.md           ← This file
└── assets/screenshots/ ← All images
```

## How to Edit

- **Change a slide's content**: Edit `index.html`, find by `data-title` attribute
- **Change design/styling**: Edit `styles.css`
- **Change navigation/features**: Edit `engine.js`
- **Add a new slide**: Add a `<section class="slide" data-title="...">` block

## Hosting

- **GitHub repo**: amitay-builder/cowork-presentation
- **GitHub Pages**: https://amitay-builder.github.io/cowork-presentation/
- **Deploy**: `git add -A && git commit -m "..." && git push`

## Features

- **Sidebar**: Auto-generated from `data-title`. Click to navigate.
- **Present mode**: Click "Present" button or press `F` for fullscreen. Sidebar hides.
- **Hide slides**: Hover sidebar item → click `●` toggle. Persists in localStorage.
- **Step animations**: `data-step="1"` on elements — revealed on click within a slide.
- **Step hide**: `data-step-hide="1"` — element visible initially, fades out on that step.
- **Keyboard**: Arrow keys, Space, PageUp/Down, F for fullscreen.

## Slide Map (65 slides)

| # | Title | Section |
|---|-------|---------|
| 1 | Title | Intro |
| 2 | Hi I'm Amitay | Intro |
| 3 | 60+ Companies | Intro |
| 4 | Agenda | Intro |
| 5 | 46,782 AI Tools | Intro (step: reveal TAAFT) |
| 6 | FOMA | Intro (step: reveal meaning) |
| 7 | How LLMs Work? | LLM Fundamentals |
| 8 | Next Token Prediction | LLM Fundamentals (step: token ≈ ¾ word) |
| 9 | Like Autocomplete | LLM Fundamentals |
| 10 | Pre Training Process | LLM Fundamentals (steps: sources → reveal tuners) |
| 11 | Large Language Model | LLM Fundamentals (steps: input → output → loop) |
| 12 | PhD in Everything | LLM Fundamentals (step: library + PHD text) |
| 13 | Limitations of LLMs | LLM Limitations |
| 14 | Constrained to Data | LLM Limitations |
| 15 | Hallucinations | LLM Limitations |
| 16 | Frozen in Time | LLM Limitations |
| 17 | AI Chatbot Usage | The Context |
| 18 | Common AI Uses | The Context (steps: Writing → Data → Search) |
| 19 | Advanced Use Cases | The Context (steps: pairs of items) |
| 20 | Why Simple Tasks? | The Context |
| 21 | The Bottleneck | The Context |
| 22 | 50 First Dates | The Context |
| 23 | Starts from Zero | The Context (with Gemini screenshot) |
| 24 | Imagine an Assistant | The Context |
| 25 | What Would You Include? | The Context (step: reveal question) |
| 26 | A Colleague | The Context |
| 27 | What We Had | What We Had |
| 28 | ChatGPT Projects | What We Had (with screenshot) |
| 29 | Gemini Gems | What We Had (with screenshot) |
| 30 | Why Not Enough | What We Had |
| 31 | The Method | The Shift (chat vs system comparison) |
| 32 | Three Shifts | The Shift (steps: 3 cards animate) |
| 33 | Claude Cowork | The Shift |
| 34 | Vendor Agnostic | The Shift |
| 35 | Part 2: How It Works | Section Divider |
| 36 | What We'll Cover | Part 2 (steps: 4 topics) |
| 37 | Claude Ecosystem | Part 2 |
| 38 | Local Folder | The Workspace (with Cowork UI screenshot) |
| 39 | Markdown Files | The Workspace |
| 40 | AI Operating System | The Workspace |
| 41 | CLAUDE.md | The Workspace (with CLAUDE.md UI screenshot) |
| 42 | Viewing with Obsidian | The Workspace (tip) |
| 43 | Connectors | Connectors (with panel screenshot) |
| 44 | Browser Research | Connectors (with Claude UI screenshot) |
| 45 | Skills | Skills |
| 46 | What is a Skill? | Skills |
| 47 | Progressive Disclosure | Skills |
| 48 | Skills Architecture | Skills (image) |
| 49 | Skills Panel | Skills (with screenshot) |
| 50 | Skills Evolution | Skills (image) |
| 51 | Plugins | Skills |
| 52 | Security Notice | Skills |
| 53 | Scheduled Tasks | Automation |
| 54 | Part 3: Use Cases | Section Divider |
| 55 | Morning Briefing | Use Cases |
| 56 | Competitor Research | Use Cases |
| 57 | Meeting Prep | Use Cases |
| 58 | Part 4: Your Turn | Section Divider |
| 59 | Claude Interviews You | Your Turn |
| 60 | Hands-On Exercise | Your Turn |
| 61 | Compounding Effect | Closing |
| 62 | Claude Code | Closing (with app + terminal screenshots) |
| 63 | What's Next? | Closing |
| 64 | Next Steps | Closing |
| 65 | Thank You | Closing (QR + LinkedIn) |

## Design System Quick Reference

See `DESIGN-SYSTEM.md` for full docs.

**Colors**: `--orange` for accent, `--blue` secondary, `--mid-gray` muted. Never `--green` for text.
**Type scale**: display-hero > display-huge > display-large > display-medium > title-large > title-medium > body-large > body-medium > body-small
**Slide types**: title, big-statement, section-divider, content (default), split (image+text)

## Image Assets

- `image*.png/jpg` — Original Cowork Master PPTX
- `llm-image*.png` — LLM explainer PPTX
- `gemini-gem.png`, `chatgpt-project.png` — Gems/Projects screenshots
- `claude-md-ui.png` — CLAUDE.md folder instructions UI
- `claude-browser-ui.png` — Claude desktop app UI
- `claude-code-app.png` — Claude Code in desktop app
- `claude-code-terminal.png` — Claude Code in terminal
- `cowork-folder-ui.png` — Cowork folder selection with annotation

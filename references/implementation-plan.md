# Plan: Convert "Mastering Claude Cowork" to HTML Presentation

## Context

The "Cowork Master" Google Slides deck (51 slides) is Amitay's main workshop presentation for teaching Claude Cowork. Many slides are pasted images or AI-generated visuals that can't be edited. Converting to HTML makes the deck fully editable and customizable per audience — you can feed a prep call transcript and adjust content, examples, and use cases on the fly.

## What I Found in the Deck

**51 slides, 4 parts:**
1. **The Context** (slides 1-20): Intro, credibility, FOMA, evolution of AI tools, chatbot → cowork shift
2. **How It Works** (slides 21-40): Markdown brain, connectors, plugins, skills, scheduled tasks
3. **Practical Use Cases** (slides 41-47): Morning Briefing, Competitor Research, Meeting Prep
4. **Your Turn** (slides 48-51): Hands-on exercise, next steps, thank you

**The core problem:** Many slides in the current deck are flat images (made in an external design tool and pasted in). They look good but you can't edit the text. The goal is to rebuild everything as editable HTML except actual product screenshots.

**What stays as images (~10 slides):** Real UI screenshots of actual software — Obsidian window, Cowork interface, ChatGPT project view, connectors panel, plugins browser, skills list in Cowork settings. These show real UIs that can't be meaningfully recreated.

**What gets rebuilt as HTML (~41 slides):** Everything else — big statement slides, card layouts, icon grids, flow diagrams, the "Evolution of AI Tools" illustration, "What is a skill?" infographic, the Anthropic skills evolution diagram, the logo wall, lists with icons, section dividers. All text becomes editable. All layouts become CSS. Icons become SVG or emoji.

**Hybrid slides (~5 of the ~41):** Slides that mix text layout with an embedded screenshot (e.g., "Cowork Works in a Local Folder" has Obsidian sidebar screenshot + Cowork UI screenshot + text annotations). The screenshots stay as `<img>`, everything around them is HTML.

## Recommended Approach

### Architecture: Plain HTML + CSS + vanilla JS

**Why not React (like the PM-OS deck):** That deck is a minified bundle — impossible to hand-edit. The whole point is that you want to be able to quickly customize content. A single HTML file with clean, readable code is the right format.

**Why not Reveal.js:** It adds a dependency and framework opinions. You don't need PDF export or speaker notes for this use case. Plain HTML gives you full control with zero overhead.

**Structure:**
```
PROJECTS/Cowork-Presentation/
├── index.html          ← Single presentation file
├── assets/
│   ├── screenshots/    ← Extracted UI screenshots (~15 images)
│   ├── logos/           ← Company logos for the wall (1 composite image)
│   └── icons/           ← SVG icons used across slides
└── README.md            ← How to customize per audience
```

### Design System — Anthropic Brand

Using Anthropic's official brand styling for a cohesive Claude workshop look.

**Colors:**
- **Background:** `#faf9f5` (Anthropic light)
- **Text:** `#141413` (Anthropic dark)
- **Orange accent:** `#d97757` — section labels, accent bars, highlights (matches existing coral)
- **Blue accent:** `#6a9bcc` — secondary emphasis, links
- **Green accent:** `#788c5d` — tertiary, status indicators
- **Mid gray:** `#b0aea5` — secondary text, subtitles
- **Light gray:** `#e8e6dc` — card backgrounds, subtle sections
- **Cards:** White (`#ffffff`) with subtle shadow, rounded corners

**Typography:**
- **Headings (large):** Poppins (fallback: Arial)
- **Body text:** Lora (fallback: Georgia)
- Google Fonts loaded via `<link>` in the HTML

**Layout conventions (kept from original deck):**
- Section markers: orange bar + label text (e.g., "── The Context")
- Footer: "Mastering Claude Cowork" left, "Slide N" right

### Slide navigation

- Arrow keys (left/right) to navigate
- Slide counter in footer
- Swipe support for touch
- `F` key for fullscreen
- URL hash for direct linking (`#slide-7`)

## Execution Plan

This is a big build (~41 slides recreated as HTML). Best done in focused sessions per section.

### Phase 1: Foundation + Design System
1. Create `PROJECTS/Cowork-Presentation/` with folder structure
2. Sort PPTX images — keep only real UI screenshots (~10-15), discard flat design images
3. Build `index.html` with: CSS design system (colors, fonts, card styles, section markers), JS slide engine (arrow keys, fullscreen, hash navigation), and 3-4 example slides to validate the look

### Phase 2: Part 1 — The Context (slides 1-20)
4. Title slide + Workshop Objectives (two-panel layout)
5. "Hi I'm Amitay" intro slide (recreate as HTML with emoji bullets)
6. Logo wall — 60+ company logos (keep as image OR recreate as CSS grid with company names)
7. 46,782 → TAAFT screenshot slide (number as HTML, screenshot as image)
8. FOMA, chatbot question, use cases grid, "Why simple tasks?" — all text/icon slides
9. CONTEXT, 50 First Dates + Gemini (movie poster as image, Gemini UI as screenshot)
10. "Imagine an assistant" + "What would you include?" + "Colleague" — big statement slides
11. "How can we teach our tools" + ChatGPT/Gemini/Claude comparison
12. ChatGPT Project screenshot slide, Evolution of AI Tools (both variants), Three Shifts (both variants)

### Phase 3: Part 2 — How It Works (slides 21-40)
13. Section divider, Claude Ecosystem (icon grid), AI terms intro
14. Markdown files explainer, Obsidian explainer (Obsidian crystal image = keep as image)
15. Obsidian UI screenshot slide, "How Cowork Works" section divider
16. "Cowork Works in a Local Folder" (hybrid: screenshots + HTML annotations)
17. "Markdown Files = Your AI Operating System" (hybrid: text + Obsidian screenshot)
18. Connectors slide (hybrid: screenshots + HTML header)
19. "Claude in the Browser" (hybrid: screenshot + feature cards)
20. Skills section: "Skills" divider, "Skills are just folders", "What is a skill?", "Core design principles", "Skills: the complete picture", Skills UI screenshot, "Exploring how Skills evolve"
21. Plugins screenshot slide
22. Scheduled Tasks slide

### Phase 4: Parts 3 & 4 — Use Cases + Your Turn (slides 41-51)
23. "Practical Use Cases" section divider
24. Morning Briefing (workflow diagram: inputs → consolidates → deliverable card)
25. Competitor Research (workflow diagram: data sources → synthesizes → analysis card)
26. Meeting Prep (workflow diagram: data sources → synthesizes → briefing card)
27. "Your Turn" section divider, "Hands-On: Build & Execute" steps
28. "What's Next?", "Keep working on your OS", "Next Steps - Build your own system"
29. Thank You slide with QR code (QR as image) + LinkedIn preview

### Phase 5: Polish
30. Slide transitions (subtle fade)
31. Side-by-side comparison with original deck
32. README with customization instructions (how to adapt per audience)

## What You Need To Do

**Nothing extra.** I extracted 128 images from the PPTX (`/Users/amita/Downloads/Cowork Master.pptx`). During implementation I'll:
1. Identify which images are real UI screenshots (keep ~10-15 of them)
2. Discard the rest (flat design images, pasted infographics) since we're rebuilding those as HTML
3. Copy only the needed screenshots to `assets/screenshots/` with descriptive names

## How Screenshots Work in the HTML

Screenshots stay as `<img>` tags within the slide layout. The surrounding text, labels, annotations, and arrows are all HTML/CSS — so you can update the text even on screenshot slides. Only the actual UI screenshot image is static.

For slides that are entirely recreatable (card layouts, lists, diagrams), everything is HTML. No images needed.

## Improvements (from transcript + newsletter analysis)

Based on reviewing the actual workshop delivery (Inficon transcript) and the Cowork newsletter guide (aiwithamitay.com/p/cowork), these enrichments should be included:

### Missing slides to add:

1. **LLM Fundamentals (2-3 slides)** — "What LLMs actually do" (autocomplete with PhD analogy), limitations (hallucinations, knowledge cutoff). You teach this for ~15 min but have no visual support.

2. **Prompt Engineering / RACE framework (1-2 slides)** — Role, Action, Context, Examples, Format. Core teaching moment with no slide.

3. **Meta-prompting technique (1 slide)** — The 3-step loop: rough prompt → ask model to optimize → let it interview you. High-value technique you demo live but have no slide for.

4. **"It's not about the tool, it's the method" framing (1 slide)** — From the newsletter: "even if OpenAI or Google release something similar tomorrow, this approach stays relevant." Sets the right mental model.

5. **Two problems with current tools (1 slide)** — From the newsletter: (1) context stays static and hard to manage, (2) context is monolithic (all or nothing). Cleaner argument than what's currently in the deck.

6. **"Not locked to one vendor" (1 slide)** — Same folder works with Claude Code, Codex, Cursor. Mentioned in transcript + newsletter but missing from slides.

7. **The compounding/learning curve (1 slide)** — From newsletter: "Day 1 it feels like a good chat with file access. After 1-2 weeks it becomes something else entirely." Manages expectations.

8. **CLAUDE.md as the roadmap file (1 slide)** — Newsletter frames it well: "the file that tells Claude where to go and where to look." Currently not clearly explained in the deck.

9. **"Ask Claude to interview you" (1 slide)** — The exercise's emotional high point. People paste a prompt and Claude builds their OS. Deserves its own visual.

10. **FAQ / Common Concerns (1 slide)** — From transcript: "Can I access from another computer?", "How is this different from a Copilot agent?", "What about confidentiality?"

11. **Security warning for third-party Skills (1 slide)** — From newsletter: be cautious about installing Skills/Plugins from unknown sources. Important for enterprise audiences.

### Fixes to existing slides:

12. **Typo**: "Why cowork is diffrenect" → "different" (ChatGPT Project slide)
13. **Agenda timing**: 20+20+40+40 = 120 min shown, but session is 3 hours. Update.
14. **50 First Dates slide**: Give the movie poster its own beat/slide — it's the emotional hook, currently crammed into a split.
15. **"Context" big text slide**: Strengthen with the PhD benchmark contrast — "LLMs outscore PhD students on benchmarks, but give dumb answers at work. Why? No context."
16. **Duplicate slides**: Keep both "Evolution" and both "Three Shifts" variants as toggleable options per audience.

### Content sources:
- Transcript: `/Users/amita/Downloads/Product Management AI Training - Session 1.docx`
- Newsletter: https://www.aiwithamitay.com/p/cowork (scraped to `/tmp/.firecrawl/cowork-guide.md`)
- PDF: `/Users/amita/Downloads/Cowork Master.pdf` (51 slides)
- PPTX images: `/tmp/pptx_extract/ppt/media/` (128 images)

## Verification

- Open `index.html` in Chrome, fullscreen it, and compare side-by-side with the Google Slides
- Navigate through all slides with arrow keys
- Test on a projector/external display (presentation use case)
- Try editing a slide's text directly in the HTML to confirm the customization workflow works
- Verify all screenshots load correctly from assets folder

# Cowork Presentation — Learnings

## Facts
- This is a TEMPLATE presentation — each client workshop gets a customized copy
- The presentation is for Amitay's Claude Cowork workshops (3-hour format)
- Source content: original PPTX deck, workshop transcript (Inficon), newsletter article (aiwithamitay.com/p/cowork)
- Audience is mostly non-technical (PMs, marketers, ops) — explain technical terms simply
- The newsletter article has the best-structured explanation of Cowork — use it as reference

## Customization Workflow
- Before each workshop: read the prep call notes, copy the template, customize per client
- Slides to customize: Agenda timing, AI usage examples (17-19), tools they use (28-29), folder structure (38-42), use cases (55-57), interview prompt (59)
- Slides that stay fixed: LLM fundamentals (7-16), method explanation (31-34), technical features (43-53)
- Use the hide/show toggle to skip irrelevant slides — don't delete them from the template
- Client versions can live as git branches (workshop/{client-name}) or as folder copies under CUSTOMERS/

## Design Decisions
- Single font: Poppins everywhere. No secondary font.
- Orange (#d97757) is the ONLY accent color for text. Green is icon-backgrounds only.
- Images that are screenshots of real UI should stay as images. Only recreate as HTML if the original is a designed infographic.
- When an image already contains a title, don't add an HTML title above it (causes duplication).
- Split layouts with tall screenshots need `max-height` constraints or they overflow.

## Presentation Flow Principles
- Part 1 builds a narrative arc: attention → education → trigger question → problem → vision → what we had → why it failed → the method
- "The Method" slide must actually EXPLAIN the method (chat-based vs system-based), not just name it
- The roadmap/overview slide ("What We'll Cover") should come immediately after a section divider, before any content
- Obsidian is a TIP, not a core concept — comes after the workspace explanation, not before
- Local Folder comes before Markdown Files (show the big picture first, then the details)
- Each building block (Connectors, Skills, Plugins, Scheduled Tasks) should feel like its own mini-section
- "Vendor Agnostic" belongs right after "The Method" — reinforces the portability message while fresh

## Content Principles
- Don't state the obvious in slides — the slides support the speaker, not replace them
- Amitay doesn't want a lot of text on slides
- Step animations (data-step) should be used for reveals during live delivery
- Each limitation of LLMs (constrained, hallucinate, frozen) gets its own slide — not a list
- The "What are you using AI for?" section is a trigger question — the audience answers, then you show the gap

## Technical Notes
- Step system supports both `data-step="N"` (appear) and `data-step-hide="N"` (fade out)
- Elements with the same step number animate together
- Hidden slides persist in localStorage (key: cowork-hidden-slides)
- GitHub Pages deployed at amitay-builder.github.io/cowork-presentation

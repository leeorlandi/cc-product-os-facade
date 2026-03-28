# cc-product-os-facade

**This is a facade. Not a product. Not a real site. A concept made visible.**

---

## What you're looking at

This repo contains a static landing page for an idea I'm working on: a
file-based operating system for product leaders.

The site looks real. The system it describes is real in concept. But the
product itself — the actual folder structure, the conventions, the tooling —
is still being built. Nothing here is downloadable yet. The clone buttons
go nowhere. This is a thinking-out-loud artifact, published so I can share
the concept without pretending it's done.

That's why the repo is called `facade`.

---

## The concept

Product leaders accumulate context in their heads because there's no system
for externalizing it. Strategy decks get presented once. Decisions live in
Slack. Team state lives in someone's memory. When someone asks "what are
we focused on?" or "why did we decide that?" — a human gets interrupted.

The idea: run your product org like a system. Files, not tools. GitHub,
not a dashboard. A small set of markdown conventions that make the
invisible visible — strategy, decisions, team state, now.

I've been building it locally. I'm making the concept public to pressure-test
whether it's legible to anyone but me.

---

## What's in this repo

```
site/
  index.html   — landing page (open directly in browser, no server needed)
  styles.css   — design system: terminal aesthetic, dark bg, pixel font
  main.js      — tab switcher, ~40 lines
README.md      — this file
```

The landing page is self-contained. No build step. No dependencies.
Open `site/index.html` in a browser and it works.

---

## What's not here yet

- The actual OS folder structure
- File templates and conventions
- Real documentation
- Anything you can actually download and use

Those are coming. This facade exists so I have something to point at
while I build the real thing.

---

## Status

`v0.1.0-facade` — the concept is clear enough to show. The system is not
ready to ship. This repo will change significantly as the real OS takes shape.

If this resonates, watch the repo. If you have feedback on the concept,
open an issue. I'm building this to be used, not just read.

---

*Built with Claude Code. The real system is being built in the open.*

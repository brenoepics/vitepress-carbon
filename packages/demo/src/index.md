---
layout: home

hero:
  name: VitePress Carbon
  text: Streamlined Theme
  tagline: GitHub-inspired docs with sharper contrast, balanced spacing, and a polished feel on every screen.
  image:
    src: ./bg.svg
    alt: VitePress Carbon
  actions:
    - theme: brand
      text: Introduction
      link: /guide/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/brenoepics/vitepress-carbon
  icon:
    src: ./logo.svg
    alt: VitePress Carbon

features:
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8" /><path d="M12 16v4" /></svg>
    title: Responsive Design
    details: Deliver a crisp, reliable reading experience with layouts that stay balanced from phones to ultra-wide displays.
    linkText: Learn more
    link: https://github.com/brenoepics/vitepress-carbon
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 9V5a2 2 0 0 0-2-2h-4" /><path d="M8 3H6a2 2 0 0 0-2 2v4" /><path d="M4 15v4a2 2 0 0 0 2 2h4" /><path d="M20 9V5a2 2 0 0 0-2-2h-2" /><path d="M14 21h4a2 2 0 0 0 2-2v-4" /><path d="M9 12a3 3 0 1 1 6 0a3 3 0 1 1-6 0Z" /></svg>
    title: Seamless Integration
    details: Drop the theme into existing VitePress projects without losing the familiar GitHub-like cadence and structure.
    linkText: Learn more
    link: https://github.com/brenoepics/vitepress-carbon
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21v-7" /><path d="M4 10V3" /><path d="M12 21v-9" /><path d="M12 8V3" /><path d="M20 21v-5" /><path d="M20 12V3" /><path d="M2 10h4" /><path d="M10 8h4" /><path d="M18 12h4" /></svg>
    title: Customizable Theming
    details: Fine-tune surfaces, accents, and typography while keeping the interface cohesive, modern, and highly legible.
    linkText: Learn more
    link: https://github.com/brenoepics/vitepress-carbon
---

<div class="home-section home-start home-reveal">

<div class="home-start-copy">

<p class="home-eyebrow">Get started</p>

## Install it, point your config at it, done

Carbon is a drop-in VitePress theme. There is no build step to wire up and no
configuration to port — your existing `config.mts` keeps working.

</div>

<div class="home-start-code">

::: code-group

```sh [npm]
npm install vitepress-carbon
```

```sh [pnpm]
pnpm add vitepress-carbon
```

```sh [yarn]
yarn add vitepress-carbon
```

```sh [bun]
bun add vitepress-carbon
```

:::

```js
// .vitepress/theme/index.js
import { VPCarbon } from 'vitepress-carbon'

export default VPCarbon
```

</div>

</div>

<div class="home-section home-reveal">

<p class="home-eyebrow">Why Carbon</p>

## Docs your readers already know how to use

<div class="home-grid">
  <div class="home-tile" style="--stagger: 0">
    <h3>Your README already fits</h3>
    <p>Paste it in and it renders exactly as it does on GitHub — same headings, tables, code and callouts. Nothing to reformat, nothing to double&#8209;check.</p>
  </div>
  <div class="home-tile" style="--stagger: 1">
    <h3>A dark mode you won't apologise for</h3>
    <p>Both schemes are drawn from Primer's own tokens, so neither is an inverted afterthought. Ship on day one without a contrast audit.</p>
  </div>
  <div class="home-tile" style="--stagger: 2">
    <h3>Zero orientation required</h3>
    <p>Grouped sidebar, an outline that follows your scroll, keyboard search. Anyone who uses GitHub daily already knows where everything is.</p>
  </div>
  <div class="home-tile" style="--stagger: 3">
    <h3>Restyle it without forking it</h3>
    <p>Every surface, accent and radius is a CSS variable. Make it yours by changing a token — not by fighting specificity in someone else's component.</p>
  </div>
</div>

</div>

<div class="home-section home-reveal">

<p class="home-eyebrow">Thank you</p>

## Built by these people

Every kind of contribution counts here — commits, pull requests, issues,
reviews and comments all earn a place on this wall.

<ContributorWall />

</div>

<div class="home-section home-cta home-reveal">

## Read the guide

Full setup, configuration and theming reference — including how to extend Carbon
without forking it.

<div class="home-cta-actions">
  <a class="home-btn home-btn-brand" href="/guide/introduction">Introduction</a>
  <a class="home-btn" href="/guide/getting-started">Getting Started</a>
</div>

</div>

<ScrollReveal />

<style>
/* Sections start just below their resting position and settle as they enter
   the viewport. */
.VPHomeContent .home-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.6s ease,
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.VPHomeContent .home-reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* Tiles cascade rather than landing as one block. */
.VPHomeContent .home-reveal .home-tile,
.VPHomeContent .home-reveal .home-start-code {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.5s ease,
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--stagger, 0) * 90ms + 120ms);
}

.VPHomeContent .home-reveal.is-visible .home-tile,
.VPHomeContent .home-reveal.is-visible .home-start-code {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .VPHomeContent .home-reveal,
  .VPHomeContent .home-reveal .home-tile,
  .VPHomeContent .home-reveal .home-start-code,
  .VPHomeContent .home-eyebrow,
  .VPHomeContent .home-eyebrow::before {
    transition: none;
  }
}

/* Nothing will ever add .is-visible without JS, so opt out of the hidden
   start state entirely rather than leaving the page blank. A <noscript><style>
   block cannot be used here — Vue strips side-effect tags from templates. */
@media (scripting: none) {
  .VPHomeContent .home-reveal,
  .VPHomeContent .home-reveal .home-tile,
  .VPHomeContent .home-reveal .home-start-code {
    opacity: 1;
    transform: none;
  }

  .VPHomeContent .home-eyebrow {
    color: var(--mktg-accent-primary);
  }

  .VPHomeContent .home-eyebrow::before {
    transform: scaleX(1);
  }
}

/* Same 1152px measure as the feature grid above, so section edges line up. */
.VPHomeContent .home-section {
  margin: 0 auto;
  padding-top: 72px;
  max-width: 1152px;
}

.VPHomeContent .home-start {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

@media (min-width: 900px) {
  .VPHomeContent .home-start {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 48px;
  }

  /* Optically centre the copy against the stacked code blocks. */
  .VPHomeContent .home-start-copy {
    padding-top: 8px;
  }
}

.VPHomeContent .home-start-code > :first-child {
  margin-top: 0;
}

.VPHomeContent .home-section h2 {
  margin: 0 0 12px;
  border: 0;
  padding: 0;
  font-size: 30px;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.VPHomeContent .home-section > p {
  max-width: 640px;
  color: var(--vp-c-text-2);
}

/* Must outrank `.home-section > p` above, otherwise only the eyebrow nested
   inside .home-start-copy escapes the muted colour and the rest stay grey. */
.VPHomeContent .home-section .home-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  max-width: none;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  transition: color 0.6s ease 0.15s;
}

/* Accent rule that draws itself in as the section arrives. */
.VPHomeContent .home-eyebrow::before {
  content: '';
  width: 24px;
  height: 2px;
  border-radius: 999px;
  background-color: var(--mktg-accent-primary);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
}

.VPHomeContent .home-reveal.is-visible .home-eyebrow {
  color: var(--mktg-accent-primary);
}

.VPHomeContent .home-reveal.is-visible .home-eyebrow::before {
  transform: scaleX(1);
}

.VPHomeContent .home-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;
}

@media (min-width: 768px) and (max-width: 1099px) {
  .VPHomeContent .home-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.VPHomeContent .home-tile {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 20px;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.VPHomeContent .home-tile:hover {
  border-color: var(--vp-home-card-border-hover-color);
  transform: translateY(-2px);
}

.VPHomeContent .home-tile h3 {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;
}

.VPHomeContent .home-tile p {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.VPHomeContent .home-cta {
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.VPHomeContent .home-cta > p {
  margin-left: auto;
  margin-right: auto;
}

.VPHomeContent .home-cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.VPHomeContent .home-btn {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.VPHomeContent .home-btn:hover {
  border-color: var(--vp-home-card-border-hover-color);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.VPHomeContent .home-btn-brand {
  border-color: transparent;
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.VPHomeContent .home-btn-brand:hover {
  border-color: transparent;
  background-color: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-text);
}

@media (max-width: 767px) {
  .VPHomeContent .home-section {
    padding-top: 48px;
  }

  .VPHomeContent .home-section h2 {
    font-size: 24px;
  }

  .VPHomeContent .home-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .VPHomeContent .home-tile,
  .VPHomeContent .home-btn {
    transition: none;
  }

  .VPHomeContent .home-tile:hover {
    transform: none;
  }
}
</style>

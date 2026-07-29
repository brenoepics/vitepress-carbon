<script lang="ts" setup>
import { createSearchTranslate } from '../support/translation'
import type { ButtonTranslations } from '../../vp-node'

// Button-Translations
const defaultTranslations: { button: ButtonTranslations } = {
  button: {
    buttonText: 'Search...',
    buttonAriaLabel: 'Search'
  }
}

const translate = createSearchTranslate(defaultTranslations)
</script>

<template>
  <button
    type="button"
    class="DocSearch DocSearch-Button"
    :aria-label="translate('button.buttonAriaLabel')"
  >
    <span class="DocSearch-Button-Container">
      <svg
        class="DocSearch-Search-Icon"
        aria-label="search icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path
          d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"
        ></path>
      </svg>
      <span class="DocSearch-Button-Placeholder">{{
        translate('button.buttonText')
      }}</span>
    </span>
    <span class="DocSearch-Button-Keys">
      <kbd class="DocSearch-Button-Key"></kbd>
      <kbd class="DocSearch-Button-Key">K</kbd>
    </span>
  </button>
</template>

<style>
[class*='DocSearch'] {
  --docsearch-primary-color: var(--color-action-list-item-default-active-bg);
  --docsearch-highlight-color: var(
    --color-action-list-item-default-active-border
  );
  --docsearch-search-button-background: transparent;
  --docsearch-key-background: transparent;
  --docsearch-key-color: var(--vp-c-text-1);
  --docsearch-text-color: var(--vp-c-text-2);
  --docsearch-muted-color: var(--vp-c-text-2);
  --docsearch-searchbox-shadow: none;
  --docsearch-searchbox-background: transparent;
  --docsearch-searchbox-focus-background: transparent;
  --docsearch-key-gradient: transparent;
  --docsearch-key-shadow: none;
  --docsearch-modal-background: var(--vp-c-bg-soft);
  --docsearch-footer-background: var(--vp-c-bg);
}

.dark [class*='DocSearch'] {
  --docsearch-modal-shadow: none;
  --docsearch-footer-shadow: none;
  --docsearch-search-button-background: transparent;
  --docsearch-key-background: transparent;
  --docsearch-key-color: var(--vp-c-text-1);
  --docsearch-logo-color: var(--vp-c-text-2);
  --docsearch-hit-background: var(--vp-c-default-soft);
  --docsearch-hit-color: var(--vp-c-text-2);
  --docsearch-hit-shadow: none;
}

/* Below the menu breakpoint this is an icon button on the same 32px box as
   the hamburger beside it — not a 48x55 slab. */
.DocSearch-Button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  /* @docsearch/css resets this to content-box, which made the border add 2px
     on top of the shared control height. */
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: var(--vp-nav-control-height);
  height: var(--vp-nav-control-height);
  border: 1px solid transparent;
  border-radius: var(--vp-nav-control-radius);
  background: transparent;
  /* Otherwise this inherits docsearch's own 16px / purple defaults. */
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-nav-text);
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color, background-color, box-shadow, border-color;
}

.DocSearch-Button:hover {
  background-color: var(--vp-c-nav-hover-bg);
  border-color: var(--vp-c-nav-hover-border);
}

.DocSearch-Button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.DocSearch-Button:focus:not(:focus-visible) {
  outline: none !important;
}

@media (min-width: 768px) {
  .DocSearch-Button {
    justify-content: flex-start;
    border-color: var(--vp-c-border);
    line-height: 20px;
    /* The wrapper owns the width cap — see VPNavBarSearch. */
    width: 100%;
    max-width: 100%;
    height: var(--vp-nav-control-height);
    padding: 0 8px;
  }
}

@media (min-width: 768px) and (max-width: 1279px) {
  .DocSearch-Button .DocSearch-Button-Keys {
    display: none;
  }
}

.DocSearch-Button .DocSearch-Button-Container {
  display: flex;
  align-items: center;
  flex: 1;
}

.DocSearch-Button .DocSearch-Search-Icon {
  position: relative;
  width: 16px;
  height: 16px;
  color: var(--vp-c-nav-title);
  fill: currentColor;
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color, background-color, box-shadow, border-color;
}

@media (min-width: 768px) {
  .DocSearch-Button .DocSearch-Search-Icon {
    top: 0;
    margin-right: 8px;
    width: 16px;
    height: 16px;
    color: var(--vp-c-nav-text);
  }
}

.DocSearch-Button .DocSearch-Button-Placeholder {
  display: none;
  padding: 0 16px 0 0;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-nav-text);
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color, background-color, box-shadow, border-color;
}

@media (min-width: 768px) {
  .DocSearch-Button .DocSearch-Button-Placeholder {
    display: inline-block;
  }
}

.DocSearch-Button .DocSearch-Button-Keys {
  /*rtl:ignore*/
  direction: ltr;
  display: none;
  min-width: auto;
}

@media (min-width: 768px) {
  .DocSearch-Button .DocSearch-Button-Keys {
    display: flex;
    align-items: center;
  }
}

.DocSearch-Button .DocSearch-Button-Key {
  display: block;
  margin: 0;
  border: 1px solid var(--vp-c-border);
  background-color: var(--docsearch-key-background);
  color: var(--vp-c-nav-text);
  /*rtl:begin:ignore*/
  border-right: none;
  border-radius: 4px 0 0 4px;
  padding-left: 6px;
  /*rtl:end:ignore*/
  min-width: 0;
  width: auto;
  height: 20px;
  line-height: 18px;
  font-family: var(--vp-font-family-base);
  font-size: 12px;
  font-weight: 500;
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color, background-color, box-shadow, border-color;
}

.DocSearch-Button .DocSearch-Button-Key + .DocSearch-Button-Key {
  /*rtl:begin:ignore*/
  border-right: 1px solid var(--vp-c-border);
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding-left: 2px;
  padding-right: 6px;
  /*rtl:end:ignore*/
}

.DocSearch-Button .DocSearch-Button-Key:first-child {
  font-size: 0 !important;
}

.DocSearch-Button .DocSearch-Button-Key:first-child:after {
  content: 'Ctrl';
  font-size: 12px;
  letter-spacing: normal;
}

.DocSearch-Button:hover .DocSearch-Button-Keys > * {
  border-color: var(--vp-c-border);
}

.mac .DocSearch-Button .DocSearch-Button-Key:first-child:after {
  content: '\2318';
}

.DocSearch-Button .DocSearch-Button-Key:first-child > * {
  display: none;
}
</style>

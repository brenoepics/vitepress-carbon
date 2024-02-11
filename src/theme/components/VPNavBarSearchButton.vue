<script lang="ts" setup>
import { ButtonTranslations } from 'vitepress/types/local-search';
import { createSearchTranslate } from '../support/translation'

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
  <button type="button" class="DocSearch DocSearch-Button" :aria-label="translate('button.buttonAriaLabel')">
    <span class="DocSearch-Button-Container">
      <svg class="DocSearch-Search-Icon"
        aria-label="search icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16">
          <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
      </svg>
      <span class="DocSearch-Button-Placeholder">{{ translate('button.buttonText') }}</span>
    </span>
    <span class="DocSearch-Button-Keys">
      <kbd class="DocSearch-Button-Key"></kbd>
      <kbd class="DocSearch-Button-Key">K</kbd>
    </span>
  </button>
</template>

<style>
[class*='DocSearch'] {
  --docsearch-primary-color: var(--vp-c-brand-1);
  --docsearch-highlight-color: var(--docsearch-primary-color);
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
  --docsearch-logo-color: var(--vp-c-text-2);
  --docsearch-hit-background: var(--vp-c-default-soft);
  --docsearch-hit-color: var(--vp-c-text-2);
  --docsearch-hit-shadow: none;
}

.DocSearch-Button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 48px;
  height: 55px;
  background: transparent;
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color,background-color,box-shadow,border-color;
}

.DocSearch-Button:hover {
  background: transparent;
}

.DocSearch-Button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

.DocSearch-Button:focus:not(:focus-visible) {
  outline: none !important;
}

@media (min-width: 768px) {
  .DocSearch-Button {
    justify-content: flex-start;
    border: 1px solid var(--vp-c-border);
    border-radius: 6px;
    line-height: 20px;
    padding: 0 10px 0 12px;
    width: 350px;
    height: 32px;
    background-color: var(--vp-c-bg-alt);
    padding: 5px 12px;
  }

  .DocSearch-Button:hover {
    border-color: #6e7681;
    background-color: rgba(177,186,196,0.12);
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
  color: var(--vp-c-text-2);
  fill: currentColor;
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color,background-color,box-shadow,border-color;
}

@media (min-width: 768px) {
  .DocSearch-Button .DocSearch-Search-Icon {
    top: 1px;
    margin-right: 8px;
    width: 14px;
    height: 14px;
    color: var(--vp-c-text-2);
  }
}

.DocSearch-Button .DocSearch-Button-Placeholder {
  display: none;
  margin-top: 2px;
  padding: 0 16px 0 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color,background-color,box-shadow,border-color;
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
  margin: 2px 0 0 0;
  border: 1px solid var(--vp-c-border);
  /*rtl:begin:ignore*/
  border-right: none;
  border-radius: 4px 0 0 4px;
  padding-left: 6px;
  /*rtl:end:ignore*/
  min-width: 0;
  width: auto;
  height: 22px;
  line-height: 22px;
  font-family: var(--vp-font-family-base);
  font-size: 12px;
  font-weight: 500;
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color,background-color,box-shadow,border-color;
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
  border-color: #6e7681;
}

.mac .DocSearch-Button .DocSearch-Button-Key:first-child:after {
  content: '\2318';
}

.DocSearch-Button .DocSearch-Button-Key:first-child > * {
  display: none;
}
</style>

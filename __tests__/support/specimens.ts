/**
 * The set of components exercised with oversized text, shared by the long-text
 * suite and the Storybook "Overflow" stories so both stay in step.
 */
import type { Component } from 'vue'
import { ref } from 'vue'
import VPBadge from '../../packages/theme/src/theme/components/VPBadge.vue'
import VPButton from '../../packages/theme/src/theme/components/VPButton.vue'
import VPDoc from '../../packages/theme/src/theme/components/VPDoc.vue'
import VPDocFooter from '../../packages/theme/src/theme/components/VPDocFooter.vue'
import VPDocOutlineItem from '../../packages/theme/src/theme/components/VPDocOutlineItem.vue'
import VPFeature from '../../packages/theme/src/theme/components/VPFeature.vue'
import VPFeatures from '../../packages/theme/src/theme/components/VPFeatures.vue'
import VPHero from '../../packages/theme/src/theme/components/VPHero.vue'
import VPLink from '../../packages/theme/src/theme/components/VPLink.vue'
import VPMenuGroup from '../../packages/theme/src/theme/components/VPMenuGroup.vue'
import VPSidebarItem from '../../packages/theme/src/theme/components/VPSidebarItem.vue'
import VPTeamMembers from '../../packages/theme/src/theme/components/VPTeamMembers.vue'
import type { HarnessOptions } from '../../shared/vitepress-harness/context.js'
import {
  LONG_PARAGRAPH,
  LONG_SENTENCE_TITLE,
  UNBREAKABLE_TITLE,
  URL_TITLE
} from '../../shared/vitepress-harness/long-text.js'

export interface Specimen {
  name: string
  component: Component
  props?: Record<string, unknown>
  context?: HarnessOptions
  provide?: Record<string, unknown>
  /** Text that must survive intact in the rendered output. */
  expectedText: string[]
  /** Root element to snapshot; defaults to the whole wrapper. */
  snapshotSelector?: string
}

const sidebarWithLongTitles = [
  {
    text: LONG_SENTENCE_TITLE,
    items: [
      { text: UNBREAKABLE_TITLE, link: '/guide/introduction' },
      { text: URL_TITLE, link: '/guide/getting-started' },
      { text: 'Configuration', link: '/guide/configuration' }
    ]
  }
]

export const specimens: Specimen[] = [
  {
    name: 'VPDoc',
    component: VPDoc,
    context: {
      page: { title: UNBREAKABLE_TITLE },
      theme: {
        editLink: { pattern: 'https://example.com/edit/:path', text: 'Edit' }
      }
    },
    expectedText: [UNBREAKABLE_TITLE],
    snapshotSelector: '.content-top'
  },
  {
    name: 'VPDocFooter',
    component: VPDocFooter,
    context: {
      page: { relativePath: 'guide/getting-started.md' },
      theme: { sidebar: sidebarWithLongTitles }
    },
    expectedText: [UNBREAKABLE_TITLE]
  },
  {
    name: 'VPSidebarItem',
    component: VPSidebarItem,
    props: { item: sidebarWithLongTitles[0], depth: 0 },
    context: { theme: { sidebar: sidebarWithLongTitles } },
    expectedText: [LONG_SENTENCE_TITLE, UNBREAKABLE_TITLE]
  },
  {
    name: 'VPDocOutlineItem',
    component: VPDocOutlineItem,
    props: {
      root: true,
      headers: [
        { title: UNBREAKABLE_TITLE, link: '#one', level: 2, children: [] },
        { title: LONG_SENTENCE_TITLE, link: '#two', level: 2, children: [] }
      ]
    },
    expectedText: [UNBREAKABLE_TITLE, LONG_SENTENCE_TITLE]
  },
  {
    name: 'VPFeature',
    component: VPFeature,
    props: {
      title: UNBREAKABLE_TITLE,
      details: LONG_PARAGRAPH,
      link: '/guide/introduction',
      linkText: URL_TITLE
    },
    expectedText: [UNBREAKABLE_TITLE, LONG_PARAGRAPH]
  },
  {
    name: 'VPFeatures',
    component: VPFeatures,
    props: {
      features: [
        { title: UNBREAKABLE_TITLE, details: LONG_PARAGRAPH },
        { title: LONG_SENTENCE_TITLE, details: LONG_PARAGRAPH },
        { title: URL_TITLE, details: LONG_PARAGRAPH }
      ]
    },
    expectedText: [UNBREAKABLE_TITLE, LONG_SENTENCE_TITLE, URL_TITLE]
  },
  {
    name: 'VPHero',
    component: VPHero,
    props: {
      name: UNBREAKABLE_TITLE,
      text: LONG_SENTENCE_TITLE,
      tagline: LONG_PARAGRAPH,
      actions: [
        { theme: 'brand', text: URL_TITLE, link: '/guide/introduction' }
      ]
    },
    provide: { 'hero-image-slot-exists': ref(false) },
    expectedText: [UNBREAKABLE_TITLE, LONG_SENTENCE_TITLE, LONG_PARAGRAPH]
  },
  {
    name: 'VPBadge',
    component: VPBadge,
    props: { text: UNBREAKABLE_TITLE, type: 'tip' },
    expectedText: [UNBREAKABLE_TITLE]
  },
  {
    name: 'VPButton',
    component: VPButton,
    props: { text: UNBREAKABLE_TITLE, href: '/guide/introduction' },
    expectedText: [UNBREAKABLE_TITLE]
  },
  {
    name: 'VPLink',
    component: VPLink,
    props: { href: URL_TITLE },
    // VPLink renders a slot, so the long text is supplied by the test.
    expectedText: []
  },
  {
    name: 'VPMenuGroup',
    component: VPMenuGroup,
    props: {
      text: LONG_SENTENCE_TITLE,
      items: [
        { text: UNBREAKABLE_TITLE, link: '/guide/introduction' },
        { text: URL_TITLE, link: '/guide/configuration' }
      ]
    },
    expectedText: [LONG_SENTENCE_TITLE, UNBREAKABLE_TITLE]
  },
  {
    name: 'VPTeamMembers',
    component: VPTeamMembers,
    props: {
      size: 'medium',
      members: [
        {
          avatar: 'https://www.github.com/brenoepics.png',
          name: UNBREAKABLE_TITLE,
          title: LONG_SENTENCE_TITLE,
          org: URL_TITLE,
          orgLink: 'https://example.com',
          desc: LONG_PARAGRAPH
        }
      ]
    },
    expectedText: [UNBREAKABLE_TITLE, LONG_SENTENCE_TITLE]
  }
]

// @vitest-environment happy-dom
/**
 * Sweeps the theme's text-bearing components with the oversized strings from
 * `shared/vitepress-harness/long-text.ts`.
 *
 * Two things are checked for every specimen: the component still renders (no
 * thrown error, no Vue warning), and the oversized text survives into the DOM
 * verbatim — a component that "fixed" overflow by dropping characters would
 * fail here.
 */
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import VPLink from '../../packages/theme/src/theme/components/VPLink.vue'
import {
  LONG_TEXTS,
  UNBREAKABLE_TITLE
} from '../../shared/vitepress-harness/long-text.js'
import { mountWithContext, resetHarnessContext } from '../support/mount.js'
import { specimens } from '../support/specimens.js'

let warn: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  warn.mockRestore()
  resetHarnessContext()
})

describe('components under oversized text', () => {
  test.each(specimens.map((specimen) => [specimen.name, specimen] as const))(
    '%s renders without warnings',
    (_name, specimen) => {
      const wrapper = mountWithContext(specimen.component, {
        context: specimen.context,
        props: specimen.props,
        provide: specimen.provide
      })

      expect(wrapper.exists()).toBe(true)
      expect(warn).not.toHaveBeenCalled()

      wrapper.unmount()
    }
  )

  test.each(
    specimens
      .filter((specimen) => specimen.expectedText.length > 0)
      .map((specimen) => [specimen.name, specimen] as const)
  )('%s keeps the full text in the DOM', (_name, specimen) => {
    const wrapper = mountWithContext(specimen.component, {
      context: specimen.context,
      props: specimen.props,
      provide: specimen.provide
    })

    const rendered = wrapper.element.textContent ?? ''

    for (const expected of specimen.expectedText) {
      expect(rendered).toContain(expected)
    }

    wrapper.unmount()
  })

  test.each(Object.entries(LONG_TEXTS))(
    'VPLink renders %s slot content in a single element',
    (_kind, text) => {
      const wrapper = mountWithContext(VPLink, {
        props: { href: '/guide/introduction' },
        slots: { default: text }
      })

      expect(wrapper.element.textContent).toBe(text)

      wrapper.unmount()
    }
  )

  test('a title made only of an unbreakable token is not silently dropped', () => {
    const wrapper = mountWithContext(VPLink, {
      props: { href: '/guide/introduction' },
      slots: { default: UNBREAKABLE_TITLE }
    })

    expect(wrapper.element.textContent).toHaveLength(UNBREAKABLE_TITLE.length)

    wrapper.unmount()
  })
})

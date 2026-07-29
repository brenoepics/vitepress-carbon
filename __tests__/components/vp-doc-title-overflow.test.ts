// @vitest-environment happy-dom
/**
 * Regression cover for issue #28 — "post titles exceed the container size
 * limit".
 *
 * The title lives in `.content-top > .content-file > .content-ul > .content-box
 * > .content-box-item > .content-box-text`. Every one of those is a flex item,
 * and a flex item's default `min-width: auto` refuses to shrink below its
 * content width — so a long, unbreakable title pushed the whole row past
 * `.content-container`.
 *
 * happy-dom performs no layout, so these tests assert the two halves of the
 * fix that *are* observable: the rendered markup (the title stays a single
 * truncatable node with its full text preserved in `title`) and the CSS
 * contract that makes truncation possible.
 */
import { afterEach, describe, expect, test } from 'vitest'
import VPDoc from '../../packages/theme/src/theme/components/VPDoc.vue'
import { LONG_TEXTS } from '../../shared/vitepress-harness/long-text.js'
import { declarationsFor, readComponentStyles } from '../support/css.js'
import {
  componentPath,
  mountWithContext,
  resetHarnessContext
} from '../support/mount.js'

const styles = readComponentStyles(componentPath('VPDoc'))

afterEach(() => {
  resetHarnessContext()
})

/**
 * Every flex item between the row and the title text. If any one of them keeps
 * the default `min-width: auto`, the whole chain refuses to shrink and the
 * ellipsis never kicks in.
 */
const SHRINK_CHAIN = [
  '.content-file',
  '.content-ul',
  '.content-box',
  '.content-box-item',
  '.content-box-text'
]

describe('VPDoc title overflow (#28)', () => {
  describe('CSS contract', () => {
    test.each(SHRINK_CHAIN)(
      '`%s` may shrink below its content width',
      (selector) => {
        const declarations = declarationsFor(
          styles,
          selector,
          '@media (min-width: 640px)'
        )

        expect(declarations['min-width']).toBe('0')
      }
    )

    test('the title itself truncates with an ellipsis', () => {
      const declarations = declarationsFor(styles, '.content-box-text')

      expect(declarations).toMatchObject({
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        'min-width': '0'
      })
    })

    test('the title row is clipped to the content column', () => {
      for (const selector of [
        '.content-file',
        '.content-ul',
        '.content-file .content-box-item'
      ]) {
        expect(declarationsFor(styles, selector).overflow).toBe('hidden')
      }
    })

    test('the row wraps rather than overflowing its column', () => {
      // With `flex-wrap: wrap`, a row that cannot fit breaks onto a new line
      // instead of running past `.content-container` — which is what makes
      // `justify-content: flex-end` safe here.
      expect(declarationsFor(styles, '.content-top')['flex-wrap']).toBe('wrap')
    })

    test('clipping does not reach the action items', () => {
      // `.content-box-item` is also the trailing Markdown/Edit actions, and
      // VPLlmsPageActions renders an absolutely positioned menu inside one of
      // them. Clipping there would cut the open dropdown off.
      expect(declarationsFor(styles, '.content-box-item').overflow).toBe(
        undefined
      )
      expect(declarationsFor(styles, '.content-top').overflow).toBe(undefined)
    })

    test('the file icon keeps its size instead of being squashed', () => {
      expect(declarationsFor(styles, '.content-box-icon').flex).toBe('0 0 auto')
    })

    test('the content column is still capped at the doc width token', () => {
      expect(declarationsFor(styles, '.content-container')['max-width']).toBe(
        'var(--vp-doc-content-max-width)'
      )
    })
  })

  describe('rendering', () => {
    test.each(Object.entries(LONG_TEXTS))(
      'renders a %s title as one truncatable node',
      (_kind, title) => {
        const wrapper = mountWithContext(VPDoc, {
          context: { page: { title } }
        })

        const text = wrapper.get('.content-box-text')

        // A single text node — nothing splits the title into wrapping chunks
        // that could each escape the column.
        expect(text.element.childElementCount).toBe(0)
        expect(text.element.textContent).toBe(title)

        wrapper.unmount()
      }
    )

    test.each(Object.entries(LONG_TEXTS))(
      'exposes the untruncated %s title via the link title attribute',
      (_kind, title) => {
        const wrapper = mountWithContext(VPDoc, {
          context: { page: { title } }
        })

        expect(wrapper.get('a.content-box-item').attributes('title')).toBe(
          title
        )

        wrapper.unmount()
      }
    )

    test('the decorative file icon is hidden from assistive tech', () => {
      const wrapper = mountWithContext(VPDoc, {
        context: { page: { title: LONG_TEXTS.unbreakable } }
      })

      expect(
        wrapper.get('a.content-box-item svg').attributes('aria-hidden')
      ).toBe('true')

      wrapper.unmount()
    })

    test('a long title does not displace the trailing actions', () => {
      const wrapper = mountWithContext(VPDoc, {
        context: {
          page: { title: LONG_TEXTS.unbreakable },
          theme: {
            editLink: {
              pattern: 'https://example.com/edit/:path',
              text: 'Edit'
            }
          }
        }
      })

      const top = wrapper.get('.content-top')

      expect(top.find('.content-file').exists()).toBe(true)
      expect(top.find('.edit-link-button').exists()).toBe(true)
      // Actions stay siblings of the title row rather than being pushed into it.
      expect(
        top.get('.edit-link-button').element.closest('.content-file')
      ).toBe(null)

      wrapper.unmount()
    })

    test('omits the title row entirely when the page has no title', () => {
      const wrapper = mountWithContext(VPDoc, {
        context: { page: { title: '' } }
      })

      expect(wrapper.find('.content-box-item[title]').exists()).toBe(false)

      wrapper.unmount()
    })
  })
})

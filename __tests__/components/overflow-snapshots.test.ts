// @vitest-environment happy-dom
/**
 * Snapshots that pin the shape of the fix for issue #28.
 *
 * Two kinds:
 *   - markup snapshots of each component rendered with oversized text (long
 *     strings are collapsed to `«fixture:length»` tokens by
 *     `normalizeSnapshot`, so a truncated or duplicated string still fails);
 *   - a stylesheet snapshot of every overflow-relevant declaration in the
 *     components that render page titles, so quietly dropping `min-width: 0`
 *     or `text-overflow` shows up in review as a snapshot diff.
 */
import { afterEach, describe, expect, test } from 'vitest'
import { parseCss, readComponentStyles } from '../support/css.js'
import {
  componentPath,
  mountWithContext,
  resetHarnessContext
} from '../support/mount.js'
import { normalizeSnapshot } from '../support/snapshot.js'
import { specimens } from '../support/specimens.js'

/** Properties that decide whether a box can overflow its parent. */
const OVERFLOW_PROPERTIES = new Set([
  'flex',
  'flex-shrink',
  'max-width',
  'min-width',
  'overflow',
  'overflow-wrap',
  'overflow-x',
  'text-overflow',
  'white-space',
  'word-break'
])

/** Components whose stylesheets carry the title-truncation contract. */
const TITLE_COMPONENTS = ['VPDoc', 'VPDocFooter']

afterEach(() => {
  resetHarnessContext()
})

describe('overflow snapshots', () => {
  test.each(specimens.map((specimen) => [specimen.name, specimen] as const))(
    '%s markup with oversized text',
    (name, specimen) => {
      const wrapper = mountWithContext(specimen.component, {
        context: specimen.context,
        props: specimen.props,
        provide: specimen.provide
      })

      const root = specimen.snapshotSelector
        ? wrapper.get(specimen.snapshotSelector).element
        : wrapper.element

      expect(normalizeSnapshot(root.outerHTML)).toMatchSnapshot(name)

      wrapper.unmount()
    }
  )

  test.each(TITLE_COMPONENTS)('%s overflow stylesheet', (name) => {
    const rules = parseCss(readComponentStyles(componentPath(name)))

    const overflowRules = rules
      .map((rule) => {
        const declarations = Object.entries(rule.declarations)
          .filter(([property]) => OVERFLOW_PROPERTIES.has(property))
          .map(([property, value]) => `${property}: ${value}`)
          .sort()

        if (declarations.length === 0) return null

        const scope =
          rule.atRules.length > 0 ? `${rule.atRules.join(' ')} ` : ''
        return `${scope}${rule.selectors.join(', ')} { ${declarations.join('; ')} }`
      })
      .filter((entry) => entry !== null)

    expect(overflowRules).toMatchSnapshot(name)
  })
})

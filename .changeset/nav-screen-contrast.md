---
'vitepress-carbon': patch
---

Fix invisible social icons in the mobile nav screen in light mode.

The `--vp-c-nav-*` tokens describe foreground on the nav _bar_, which sits on
`--vp-c-bg-dark` in both colour schemes. `VPNavScreen` sits on `--vp-c-bg-alt`
instead — near-white in light mode — but inherited those near-white values, so
its social links rendered at 1.07:1 against their own background. The screen now
re-points the tokens at the ordinary text roles: 5.66:1 in light, 6.68:1 in
dark, both clear of the 3:1 WCAG minimum for non-text contrast.

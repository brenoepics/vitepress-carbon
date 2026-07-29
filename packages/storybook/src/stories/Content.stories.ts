import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VPBadge from '../../../theme/src/theme/components/VPBadge.vue'
import VPButton from '../../../theme/src/theme/components/VPButton.vue'
import VPImage from '../../../theme/src/theme/components/VPImage.vue'
import VPLink from '../../../theme/src/theme/components/VPLink.vue'
import VPSocialLink from '../../../theme/src/theme/components/VPSocialLink.vue'
import VPSocialLinks from '../../../theme/src/theme/components/VPSocialLinks.vue'
import VPSponsors from '../../../theme/src/theme/components/VPSponsors.vue'
import VPSwitch from '../../../theme/src/theme/components/VPSwitch.vue'
import { socialLinks } from '../fixtures.js'

const meta = {
  title: 'Content/Inline'
} satisfies Meta

export default meta

export const Badges: StoryObj = {
  render: () => ({
    components: { VPBadge },
    template: `
      <p>
        Tip <VPBadge type="tip" text="tip" />
        Info <VPBadge type="info" text="info" />
        Warning <VPBadge type="warning" text="warning" />
        Danger <VPBadge type="danger" text="danger" />
      </p>
    `
  })
}

export const Buttons: StoryObj = {
  render: () => ({
    components: { VPButton },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <VPButton theme="brand" size="big" text="Get Started" href="/guide/introduction" />
        <VPButton theme="alt" size="medium" text="View on GitHub" href="https://github.com" />
        <VPButton theme="sponsor" size="medium" text="Sponsor" href="https://github.com/sponsors" />
      </div>
    `
  })
}

export const Links: StoryObj = {
  render: () => ({
    components: { VPLink },
    template: `
      <p>
        <VPLink href="/guide/introduction">Internal link</VPLink> ·
        <VPLink href="https://vitepress.dev">External link</VPLink> ·
        <VPLink href="/guide/introduction" :no-icon="true">No icon</VPLink>
      </p>
    `
  })
}

export const Image: StoryObj = {
  render: () => ({
    components: { VPImage },
    template: `
      <VPImage
        :image="{ src: 'https://www.github.com/brenoepics.png', alt: 'Avatar' }"
        style="width:96px;border-radius:8px"
      />
    `
  })
}

export const SocialLinks: StoryObj = {
  render: () => ({
    components: { VPSocialLink, VPSocialLinks },
    setup: () => ({ links: socialLinks }),
    template: `
      <VPSocialLinks :links="links" />
      <VPSocialLink icon="github" link="https://github.com" />
    `
  })
}

export const Switch: StoryObj = {
  render: () => ({
    components: { VPSwitch },
    template: '<VPSwitch aria-label="Toggle"><span /></VPSwitch>'
  })
}

export const Sponsors: StoryObj = {
  render: () => ({
    components: { VPSponsors },
    template: `
      <VPSponsors
        tier="Platinum"
        size="big"
        :data="[
          { name: 'Carbon', url: 'https://github.com/brenoepics/vitepress-carbon', img: 'https://www.github.com/brenoepics.png' }
        ]"
      />
    `
  })
}

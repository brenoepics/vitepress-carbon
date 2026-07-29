import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VPBackdrop from '../../../theme/src/theme/components/VPBackdrop.vue'
import VPFlyout from '../../../theme/src/theme/components/VPFlyout.vue'
import VPLocalNav from '../../../theme/src/theme/components/VPLocalNav.vue'
import VPLocalSearchBox from '../../../theme/src/theme/components/VPLocalSearchBox.vue'
import VPLocalNavOutlineDropdown from '../../../theme/src/theme/components/VPLocalNavOutlineDropdown.vue'
import VPMenu from '../../../theme/src/theme/components/VPMenu.vue'
import VPMenuGroup from '../../../theme/src/theme/components/VPMenuGroup.vue'
import VPMenuLink from '../../../theme/src/theme/components/VPMenuLink.vue'
import VPNav from '../../../theme/src/theme/components/VPNav.vue'
import VPNavBar from '../../../theme/src/theme/components/VPNavBar.vue'
import VPNavBarAppearance from '../../../theme/src/theme/components/VPNavBarAppearance.vue'
import VPNavBarHamburger from '../../../theme/src/theme/components/VPNavBarHamburger.vue'
import VPNavBarMenu from '../../../theme/src/theme/components/VPNavBarMenu.vue'
import VPNavBarMenuGroup from '../../../theme/src/theme/components/VPNavBarMenuGroup.vue'
import VPNavBarMenuLink from '../../../theme/src/theme/components/VPNavBarMenuLink.vue'
import VPNavBarSocialLinks from '../../../theme/src/theme/components/VPNavBarSocialLinks.vue'
import VPNavBarTitle from '../../../theme/src/theme/components/VPNavBarTitle.vue'
import VPNavScreen from '../../../theme/src/theme/components/VPNavScreen.vue'
import VPNavScreenMenu from '../../../theme/src/theme/components/VPNavScreenMenu.vue'
import VPSidebar from '../../../theme/src/theme/components/VPSidebar.vue'
import VPSidebarItem from '../../../theme/src/theme/components/VPSidebarItem.vue'
import VPSkipLink from '../../../theme/src/theme/components/VPSkipLink.vue'
import VPSwitchAppearance from '../../../theme/src/theme/components/VPSwitchAppearance.vue'
import { navItems, outlineHeaders, sidebar, themeConfig } from '../fixtures.js'

const meta = {
  title: 'Navigation/Chrome',
  parameters: {
    vitepress: {
      page: {
        title: 'Getting Started',
        relativePath: 'guide/getting-started.md',
        filePath: 'guide/getting-started.md',
        headers: outlineHeaders
      },
      theme: themeConfig
    }
  }
} satisfies Meta

export default meta

export const Nav: StoryObj = {
  name: 'VPNav',
  render: () => ({ components: { VPNav }, template: '<VPNav />' })
}

export const NavBar: StoryObj = {
  name: 'VPNavBar',
  render: () => ({
    components: { VPNavBar },
    template: '<VPNavBar :is-screen-open="false" />'
  })
}

export const NavBarTitle: StoryObj = {
  name: 'VPNavBarTitle',
  render: () => ({
    components: { VPNavBarTitle },
    template: '<VPNavBarTitle />'
  })
}

export const NavBarMenu: StoryObj = {
  name: 'VPNavBarMenu',
  render: () => ({ components: { VPNavBarMenu }, template: '<VPNavBarMenu />' })
}

export const NavBarMenuLink: StoryObj = {
  name: 'VPNavBarMenuLink',
  render: () => ({
    components: { VPNavBarMenuLink },
    setup: () => ({ item: navItems[1] }),
    template: '<VPNavBarMenuLink :item="item" />'
  })
}

export const NavBarMenuGroup: StoryObj = {
  name: 'VPNavBarMenuGroup',
  render: () => ({
    components: { VPNavBarMenuGroup },
    setup: () => ({ item: navItems[0] }),
    template: '<VPNavBarMenuGroup :item="item" />'
  })
}

export const NavBarSocialLinks: StoryObj = {
  name: 'VPNavBarSocialLinks',
  render: () => ({
    components: { VPNavBarSocialLinks },
    template: '<VPNavBarSocialLinks />'
  })
}

export const NavBarAppearance: StoryObj = {
  name: 'VPNavBarAppearance',
  render: () => ({
    components: { VPNavBarAppearance },
    template: '<VPNavBarAppearance />'
  })
}

export const SwitchAppearance: StoryObj = {
  name: 'VPSwitchAppearance',
  render: () => ({
    components: { VPSwitchAppearance },
    template: '<VPSwitchAppearance />'
  })
}

export const NavBarHamburger: StoryObj = {
  name: 'VPNavBarHamburger',
  render: () => ({
    components: { VPNavBarHamburger },
    template: '<VPNavBarHamburger :active="false" />'
  })
}

export const NavScreen: StoryObj = {
  name: 'VPNavScreen',
  render: () => ({
    components: { VPNavScreen },
    template: '<VPNavScreen :open="true" />'
  })
}

export const NavScreenMenu: StoryObj = {
  name: 'VPNavScreenMenu',
  render: () => ({
    components: { VPNavScreenMenu },
    template: '<VPNavScreenMenu />'
  })
}

export const Menu: StoryObj = {
  name: 'VPMenu',
  render: () => ({
    components: { VPMenu },
    setup: () => ({ items: navItems[0].items }),
    template: '<VPMenu :items="items" />'
  }),
  parameters: { frameWidth: '320px' }
}

export const MenuGroup: StoryObj = {
  name: 'VPMenuGroup',
  render: () => ({
    components: { VPMenuGroup },
    setup: () => ({ items: navItems[0].items }),
    template: '<VPMenuGroup text="Guide" :items="items" />'
  }),
  parameters: { frameWidth: '320px' }
}

export const MenuLink: StoryObj = {
  name: 'VPMenuLink',
  render: () => ({
    components: { VPMenuLink },
    setup: () => ({ item: navItems[0].items?.[0] }),
    template: '<VPMenuLink :item="item" />'
  }),
  parameters: { frameWidth: '320px' }
}

export const Flyout: StoryObj = {
  name: 'VPFlyout',
  render: () => ({
    components: { VPFlyout },
    setup: () => ({ items: navItems[0].items }),
    template: '<VPFlyout button="Guide" label="Guide menu" :items="items" />'
  }),
  parameters: { frameWidth: '320px' }
}

export const Sidebar: StoryObj = {
  name: 'VPSidebar',
  render: () => ({
    components: { VPSidebar },
    template: '<VPSidebar :open="true" />'
  }),
  parameters: { frameWidth: '320px' }
}

export const SidebarItem: StoryObj = {
  name: 'VPSidebarItem',
  render: () => ({
    components: { VPSidebarItem },
    setup: () => ({ item: sidebar[0] }),
    template: '<VPSidebarItem :item="item" :depth="0" />'
  }),
  parameters: { frameWidth: '272px' }
}

export const LocalNav: StoryObj = {
  name: 'VPLocalNav',
  render: () => ({
    components: { VPLocalNav },
    template: '<VPLocalNav :open="false" />'
  })
}

export const LocalNavOutlineDropdown: StoryObj = {
  name: 'VPLocalNavOutlineDropdown',
  render: () => ({
    components: { VPLocalNavOutlineDropdown },
    setup: () => ({ headers: outlineHeaders }),
    template:
      '<VPLocalNavOutlineDropdown :headers="headers" :nav-height="64" />'
  })
}

/** Teleports a full-screen modal into `<body>`, so it gets its own story. */
export const LocalSearchBox: StoryObj = {
  name: 'VPLocalSearchBox',
  render: () => ({
    components: { VPLocalSearchBox },
    template: '<VPLocalSearchBox />'
  })
}

export const SkipLink: StoryObj = {
  name: 'VPSkipLink',
  render: () => ({
    components: { VPSkipLink },
    template: `
      <div>
        <p class="sb-carbon-note">Focus the frame and press Tab — the skip link appears.</p>
        <VPSkipLink />
      </div>
    `
  })
}

export const Backdrop: StoryObj = {
  name: 'VPBackdrop',
  render: () => ({
    components: { VPBackdrop },
    template: `
      <div style="position:relative;height:160px">
        <VPBackdrop :show="true" />
      </div>
    `
  })
}

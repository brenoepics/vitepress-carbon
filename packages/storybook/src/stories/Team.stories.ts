import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VPTeamMembers from '../../../theme/src/theme/components/VPTeamMembers.vue'
import VPTeamMembersItem from '../../../theme/src/theme/components/VPTeamMembersItem.vue'
import VPTeamPage from '../../../theme/src/theme/components/VPTeamPage.vue'
import VPTeamPageSection from '../../../theme/src/theme/components/VPTeamPageSection.vue'
import VPTeamPageTitle from '../../../theme/src/theme/components/VPTeamPageTitle.vue'
import {
  LONG_PARAGRAPH,
  teamMembers,
  UNBREAKABLE_TITLE,
  URL_TITLE
} from '../fixtures.js'

const meta = { title: 'Team/Members' } satisfies Meta

export default meta

export const Members: StoryObj = {
  name: 'VPTeamMembers',
  render: () => ({
    components: { VPTeamMembers },
    setup: () => ({ members: teamMembers }),
    template: '<VPTeamMembers size="medium" :members="members" />'
  })
}

export const MembersSmall: StoryObj = {
  name: 'VPTeamMembers — small',
  render: () => ({
    components: { VPTeamMembers },
    setup: () => ({ members: teamMembers }),
    template: '<VPTeamMembers size="small" :members="members" />'
  })
}

export const MemberItem: StoryObj = {
  name: 'VPTeamMembersItem',
  render: () => ({
    components: { VPTeamMembersItem },
    setup: () => ({ member: teamMembers[0] }),
    template: '<VPTeamMembersItem size="medium" :member="member" />'
  }),
  parameters: { frameWidth: '360px' }
}

export const MemberWithOversizedText: StoryObj = {
  name: 'VPTeamMembersItem — oversized text',
  render: () => ({
    components: { VPTeamMembersItem },
    setup: () => ({
      member: {
        ...teamMembers[0],
        name: UNBREAKABLE_TITLE,
        title: URL_TITLE,
        desc: LONG_PARAGRAPH
      }
    }),
    template: '<VPTeamMembersItem size="medium" :member="member" />'
  }),
  parameters: { frameWidth: '360px' }
}

export const Page: StoryObj = {
  name: 'VPTeamPage',
  render: () => ({
    components: {
      VPTeamMembers,
      VPTeamPage,
      VPTeamPageSection,
      VPTeamPageTitle
    },
    setup: () => ({ members: teamMembers }),
    template: `
      <VPTeamPage>
        <VPTeamPageTitle>
          <template #title>Our Team</template>
          <template #lead>The people behind the Carbon theme.</template>
        </VPTeamPageTitle>
        <VPTeamMembers size="medium" :members="members" />
        <VPTeamPageSection>
          <template #title>Contributors</template>
          <template #lead>Everyone who has shipped a change.</template>
          <template #members>
            <VPTeamMembers size="small" :members="members" />
          </template>
        </VPTeamPageSection>
      </VPTeamPage>
    `
  })
}

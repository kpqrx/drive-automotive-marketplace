import type { Meta, StoryObj } from '@storybook/react'

import { OfferDiscussionSection } from './OfferDiscussionSection'

const meta: Meta<typeof OfferDiscussionSection> = {
  title: 'Molecules/OfferDiscussionSection',
  component: OfferDiscussionSection,
  tags: ['autodocs'],
  parameters: {
    background: {
      default: 'light',
    },
  },
}

export default meta
type Story = StoryObj<typeof OfferDiscussionSection>

export const Default: Story = {}

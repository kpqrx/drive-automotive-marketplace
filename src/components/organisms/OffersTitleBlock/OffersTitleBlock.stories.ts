import type { Meta, StoryObj } from '@storybook/react'

import { OffersTitleBlock } from './OffersTitleBlock'

const meta: Meta<typeof OffersTitleBlock> = {
  title: 'Organisms/OffersTitleBlock',
  component: OffersTitleBlock,
  tags: ['autodocs'],
  parameters: {
    background: 'light',
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof OffersTitleBlock>

export const Default: Story = {}

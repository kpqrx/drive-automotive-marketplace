import type { Meta, StoryObj } from '@storybook/react'

import { OffersListing } from './OffersListing'

const meta: Meta<typeof OffersListing> = {
  title: 'Organisms/OffersListing',
  component: OffersListing,
  tags: ['autodocs'],
  parameters: {
    background: 'light',
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof OffersListing>

export const Default: Story = {}

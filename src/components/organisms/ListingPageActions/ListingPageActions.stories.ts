import type { Meta, StoryObj } from '@storybook/react'

import { ListingPageActions } from './ListingPageActions'

const meta: Meta<typeof ListingPageActions> = {
  title: 'Organisms/ListingPageActions',
  component: ListingPageActions,
  tags: ['autodocs'],
  parameters: {
    background: 'light',
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ListingPageActions>

export const Default: Story = {}

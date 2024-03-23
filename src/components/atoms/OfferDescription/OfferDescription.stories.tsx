import type { Meta, StoryObj } from '@storybook/react'

import { OfferDescription } from './OfferDescription'

const meta: Meta<typeof OfferDescription> = {
  title: 'Atoms/OfferDescription',
  component: OfferDescription,
  tags: ['autodocs'],
  args: {
    children: 'OfferDescription',
  },
}

export default meta
type Story = StoryObj<typeof OfferDescription>

export const Default: Story = {}

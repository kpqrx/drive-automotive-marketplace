import type { Meta, StoryObj } from '@storybook/react'

import { OfferTile } from './OfferTile'

const meta: Meta<typeof OfferTile> = {
  title: 'Molecules/OfferTile',
  component: OfferTile,
  tags: ['autodocs'],
  args: {
    href: '#',
    label: 'BMW M6',
    description: 'Shadowline, Akrapovic, komforty, polski salon',
    price: 180_000,
    thumbnailSrc:
      'https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600',
    properties: ['2019', '72 820 km', '4.4 L V8', 'Benzyna', '560 KM'],
    location: 'Poznań, wielkopolskie',
  },
  parameters: {
    background: {
      default: 'light',
    },
  },
}

export default meta
type Story = StoryObj<typeof OfferTile>

export const Default: Story = {}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
}

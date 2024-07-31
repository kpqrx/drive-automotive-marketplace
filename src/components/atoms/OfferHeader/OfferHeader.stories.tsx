import type { Meta, StoryObj } from '@storybook/react'
import { OfferHeader } from './OfferHeader'
import { SiMercedes } from 'react-icons/si'

const meta: Meta<typeof OfferHeader> = {
  title: 'Atoms/OfferHeader',
  component: OfferHeader,
  tags: ['autodocs'],
  args: {
    label: ['Mercedes-Benz', 'CLA 63 AMG'],
    icon: SiMercedes,
    price: 180_000,
  },
}

export default meta
type Story = StoryObj<typeof OfferHeader>

export const Default: Story = {}

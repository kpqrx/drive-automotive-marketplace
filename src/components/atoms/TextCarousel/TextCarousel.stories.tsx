import type { Meta, StoryObj } from '@storybook/react'

import { TextCarousel } from './TextCarousel'

const meta: Meta<typeof TextCarousel> = {
  title: 'Atoms/TextCarousel',
  component: TextCarousel,
  tags: ['autodocs'],
  args: {
    texts: ['one', 'two', 'three'],
  },
}

export default meta
type Story = StoryObj<typeof TextCarousel>

export const Default: Story = {}

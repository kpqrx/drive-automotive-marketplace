import type { Meta, StoryObj } from '@storybook/react'

import { TimedCarousel } from './TimedCarousel'

const meta: Meta<typeof TimedCarousel> = {
  title: 'Atoms/TimedCarousel',
  component: TimedCarousel,
  tags: ['autodocs'],
  args: {
    items: ['one', 'two', 'three'],
  },
}

export default meta
type Story = StoryObj<typeof TimedCarousel>

export const Default: Story = {}

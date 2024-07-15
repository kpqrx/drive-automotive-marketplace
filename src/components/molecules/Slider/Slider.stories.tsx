import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'Molecules/Slider',
  component: Slider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {}

export const DefaultWithLabel: Story = {
  args: {
    label: 'Example label:',
    name: 'example',
  },
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
  },
}

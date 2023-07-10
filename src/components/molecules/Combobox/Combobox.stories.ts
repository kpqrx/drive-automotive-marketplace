import type { Meta, StoryObj } from '@storybook/react'

import { Combobox } from './Combobox'

const meta: Meta<typeof Combobox> = {
  title: 'Molecules/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: {
    label: 'Combobox label',
    items: [
      {
        label: 'Tomato 🍅',
        value: 'tomato',
      },
      {
        label: 'Apple 🍎',
        value: 'apple',
      },
      {
        label: 'Onion 🧅',
        value: 'onion',
      },
      {
        label: 'Cabbage 🥬',
        value: 'cabbage',
      },
      {
        label: 'Pumpkin 🎃',
        value: 'pumpkin',
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Combobox>

export const Default: Story = {}
export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Placeholder...',
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

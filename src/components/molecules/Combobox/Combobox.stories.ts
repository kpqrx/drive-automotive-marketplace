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
      {
        label: 'Cucumber 🥒',
        value: 'cucumber',
      },
      {
        label: 'Carrot 🥕',
        value: 'carrot',
      },
      {
        label: 'Broccoli 🥦',
        value: 'broccoli',
      },
      {
        label: 'Garlic 🧄',
        value: 'garlic',
      },
      {
        label: 'Potato 🥔',
        value: 'potato',
      },
      {
        label: 'Eggplant 🍆',
        value: 'eggplant',
      },
      {
        label: 'Pepper 🫑',
        value: 'pepper',
      },
      {
        label: 'Corn 🌽',
        value: 'corn',
      },
      {
        label: 'Mushroom 🍄',
        value: 'mushroom',
      },
      {
        label: 'Bell pepper 🫒',
        value: 'bell-pepper',
      },
      {
        label: 'Zucchini 🥬',
        value: 'zucchini',
      },
      {
        label: 'Beet 🫒',
        value: 'beet',
      },
      {
        label: 'Radish 🫒',
        value: 'radish',
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

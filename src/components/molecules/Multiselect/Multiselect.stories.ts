import type { Meta, StoryObj } from '@storybook/react'

import { Multiselect } from './Multiselect'

const meta: Meta<typeof Multiselect> = {
  title: 'Molecules/Multiselect',
  component: Multiselect,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#fff',
        },
      ],
    },
  },
  args: {
    label: 'Multiselect label',
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
type Story = StoryObj<typeof Multiselect>

export const Default: Story = {}
export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Placeholder...',
  },
}

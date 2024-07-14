import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Molecules/Select',
  component: Select,
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
    label: 'Select label',
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
type Story = StoryObj<typeof Select>

export const Default: Story = {}
export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Placeholder...',
  },
}

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

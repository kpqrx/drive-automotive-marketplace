import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxGroup } from './CheckboxGroup'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Organisms/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    background: 'light',
    layout: 'fullscreen',
  },
  args: {
    items: [
      { id: 1, label: 'Option 1', value: '1' },
      { id: 2, label: 'Option 2', value: '2' },
      { id: 3, label: 'Option 3', value: '3' },
      { id: 4, label: 'Option 4', value: '4' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof CheckboxGroup>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/react'

import { TextEditor } from './TextEditor'

const meta: Meta<typeof TextEditor> = {
  title: 'Molecules/TextEditor',
  component: TextEditor,
  tags: ['autodocs'],
  args: {
    label: 'TextEditor label',
  },
}

export default meta
type Story = StoryObj<typeof TextEditor>

export const Default: Story = {}
export const WithCharactersLimit: Story = {
  args: {
    maxCharacters: 32,
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

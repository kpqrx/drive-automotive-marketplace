import type { Meta, StoryObj } from '@storybook/react'

import { FileInput } from './FileInput'

const meta: Meta<typeof FileInput> = {
  title: 'Molecules/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  args: {
    label: 'FileInput label',
    placeholderHeading: 'Upload files',
    placeholderDescription: 'Click or drag and drop',
    dragPlaceholderHeading: 'Drop your files',
    multiple: true,
  },
}

export default meta
type Story = StoryObj<typeof FileInput>

export const Default: Story = {}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

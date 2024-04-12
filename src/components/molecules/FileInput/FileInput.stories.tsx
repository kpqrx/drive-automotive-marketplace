import type { Decorator, Meta, StoryObj } from '@storybook/react'

import { FileInput } from './FileInput'
import { FormProvider, useForm } from 'react-hook-form'

const MockFormProvider: Decorator = (Story) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <Story />
    </FormProvider>
  )
}

const meta: Meta<typeof FileInput> = {
  title: 'Molecules/FileInput',
  component: FileInput,
  decorators: [MockFormProvider],
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

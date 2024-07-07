import type { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from './SignUpForm'

const meta: Meta<typeof SignUpForm> = {
  title: 'Organisms/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  parameters: {
    background: 'light',
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof SignUpForm>

export const Default: Story = {}

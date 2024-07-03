import type { Meta, StoryObj } from '@storybook/react'

import { SignInForm } from './SignInForm'

const meta: Meta<typeof SignInForm> = {
  title: 'Organisms/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  parameters: {
    background: 'light',
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof SignInForm>

export const Default: Story = {}

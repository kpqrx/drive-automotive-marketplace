import type { Meta, StoryObj } from '@storybook/react'

import { PaymentForm } from './PaymentForm'

const meta: Meta<typeof PaymentForm> = {
  title: 'Organisms/PaymentForm',
  component: PaymentForm,
  tags: ['autodocs'],
  parameters: {
    background: 'light',
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof PaymentForm>

export const Default: Story = {}

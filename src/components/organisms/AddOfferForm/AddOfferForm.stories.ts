import type { Meta, StoryObj } from '@storybook/react'

import { AddOfferForm } from './AddOfferForm'

const meta: Meta<typeof AddOfferForm> = {
  title: 'Organisms/AddOfferForm',
  component: AddOfferForm,
  tags: ['autodocs'],
  parameters: {
    background: 'light',
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AddOfferForm>

export const Default: Story = {}

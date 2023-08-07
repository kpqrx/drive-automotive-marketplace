import type { Meta, StoryObj } from '@storybook/react'

import { VehicleSearchTabs } from './VehicleSearchTabs'

const meta: Meta<typeof VehicleSearchTabs> = {
  title: 'Organisms/VehicleSearchTabs',
  component: VehicleSearchTabs,
  tags: ['autodocs'],
  parameters: {
    background: 'light',
  },
}

export default meta
type Story = StoryObj<typeof VehicleSearchTabs>

export const Default: Story = {}

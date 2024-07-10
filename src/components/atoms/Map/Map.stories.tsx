import type { Meta, StoryObj } from '@storybook/react'

import Map from './Map'

const meta: Meta<typeof Map> = {
  title: 'Atoms/Map',
  component: Map,
  tags: ['autodocs'],
  args: {
    long: '-89.650148',
    lat: '39.781721',
  },
}

export default meta
type Story = StoryObj<typeof Map>

export const Default: Story = {}

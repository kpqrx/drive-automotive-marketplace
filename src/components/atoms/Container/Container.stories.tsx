import type { Meta, StoryObj } from '@storybook/react'

import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'Atoms/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: 'Container',
  },
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/react'
import { HiPlus } from 'react-icons/hi2'

import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <HiPlus />
        Button
      </>
    ),
  },
}

export const SecondaryWithIcon: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <HiPlus />
        Button
      </>
    ),
  },
}

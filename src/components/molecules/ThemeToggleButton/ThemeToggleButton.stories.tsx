import type { Meta, StoryFn } from '@storybook/react'

import {ThemeToggleButton} from './ThemeToggleButton'

const meta: Meta<typeof ThemeToggleButton> = {
  title: 'Molecules/ThemeToggleButton',
  component: ThemeToggleButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryFn<typeof ThemeToggleButton>

export const Default: Story = (props) => <ThemeToggleButton {...props} />

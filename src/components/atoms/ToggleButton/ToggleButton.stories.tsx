import type { Meta, StoryFn } from '@storybook/react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { ToggleButton } from './ToggleButton'

const meta: Meta<typeof ToggleButton> = {
  title: 'Atoms/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  args: {
    onToggle: () => {
      console.log('Toggled')
    },
    icons: [FiMoon, FiSun],
    labels: ["I'm a moon", "I'm a sun"],
  },
}

export default meta
type Story = StoryFn<typeof ToggleButton>

export const Horizontal: Story = (props) => <ToggleButton {...props} />
export const Vertical: Story = (props) => (
  <ToggleButton
    position="vertical"
    {...props}
  />
)
export const ToggledByDefault: Story = (props) => (
  <ToggleButton
    defaultToggled
    {...props}
  />
)

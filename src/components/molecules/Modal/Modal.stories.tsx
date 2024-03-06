import type { Meta, StoryFn } from '@storybook/react'

import { Modal } from './Modal'
import { useState } from 'react'

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default: StoryFn<typeof Modal> = () => {
  const [state, setState] = useState(false)
  return (
    <main className="min-h-screen">
      <button onClick={() => setState((prevState) => !prevState)}>
        Toggle Modal
      </button>
      <Modal
        isOpen={state}
        setIsOpen={setState}
        label="Header title"
        headerSlot={<span className="ml-auto">Yooo 👏🏻</span>}
      >
        <p>I am a modal content</p>
      </Modal>
    </main>
  )
}

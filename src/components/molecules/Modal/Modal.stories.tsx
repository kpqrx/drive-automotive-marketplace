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
    <main>
      <button onClick={() => setState((prevState) => !prevState)}>
        Toggle Modal
      </button>
      <Modal
        isOpen={state}
        setIsOpen={setState}
        title="Sample Modal Title"
        renderBeforeTitle={<span>Yooo 👏🏻</span>}
        renderAfterTitle={
          <button onClick={() => setState(false)}>Close me duuude</button>
        }
      >
        <p>I am a modal content</p>
        <button onClick={() => setState(false)}>
          Close me if you are brave enough
        </button>
      </Modal>
    </main>
  )
}

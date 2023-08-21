import { LazyMotion, domMax } from 'framer-motion'
import '../src/styles/globals.css'
import type { Preview } from '@storybook/react'
import React from 'react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const decorators = [
  (Story) => (
    <LazyMotion
      features={domMax}
      strict
    >
      <Story />
    </LazyMotion>
  ),
]

export default preview

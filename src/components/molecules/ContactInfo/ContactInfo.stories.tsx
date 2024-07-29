import type { Meta, StoryObj } from '@storybook/react'

import { ContactInfo } from './ContactInfo'

const meta: Meta<typeof ContactInfo> = {
  title: 'Molecules/ContactInfo',
  component: ContactInfo,
  tags: ['autodocs'],
  args: {
    firstName: 'John',
    lastName: 'Doe',
    address: {
      street: '1234 Elm St',
      city: 'Springfield',
      voivodeship: 'IL',
      postalCode: '62701',
      long: '-89.650148',
      lat: '39.781721',
    },
    phoneNumber: '555-555-5555',
  },
}

export default meta
type Story = StoryObj<typeof ContactInfo>

export const Default: Story = {}

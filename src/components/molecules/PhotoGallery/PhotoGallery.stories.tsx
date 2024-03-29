import type { Meta, StoryObj } from '@storybook/react'
import { PhotoGallery } from './PhotoGallery'

const meta: Meta<typeof PhotoGallery> = {
  title: 'Molecules/PhotoGallery',
  component: PhotoGallery,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PhotoGallery>

export const Default: Story = {
  args: {
    items: Array(8).fill({
      width: 1200,
      height: 800,
      alt: 'mercedes',
      src: 'https://images.pexels.com/photos/16511358/pexels-photo-16511358/free-photo-of-a-modern-blue-mercedes-amg-gt-r-parked-in-front-of-the-car-salon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }),
  },
}

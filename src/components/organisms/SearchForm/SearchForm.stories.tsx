import type { Meta, StoryFn } from '@storybook/react'

import { SearchForm } from './SearchForm'
import { Input } from '@/components/molecules/Input/Input'
import { Combobox } from '@/components/molecules/Combobox/Combobox'

const meta: Meta<typeof SearchForm> = {
  title: 'Organisms/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  args: {
    onSubmit: () => alert('Submitting form...'),
    advancedFields: () => (
      <>
        <Input
          label="Example advanced field"
          placeholder="Some value..."
        />
        <Input
          label="Example advanced field"
          placeholder="Some value..."
        />
        <Input
          label="Example advanced field"
          placeholder="Some value..."
        />
      </>
    ),
  },
}

export default meta

export const Default: StoryFn<typeof SearchForm> = (props) => {
  return (
    <SearchForm {...props}>
      <SearchForm.Heading>Sample search form heading</SearchForm.Heading>
      <Input
        label="Example field"
        placeholder="Some value..."
      />
      <Combobox
        label="Example combobox"
        placeholder="Some value..."
        items={[
          { label: 'Item 1', value: '1' },
          { label: 'Item 2', value: '2' },
          { label: 'Item 3', value: '3' },
          { label: 'Item 4', value: '4' },
          { label: 'Item 5', value: '5' },
        ]}
      />
      <SearchForm.Footer />
      <SearchForm.SubmitButton />
    </SearchForm>
  )
}

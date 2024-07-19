import type { Meta, StoryFn } from '@storybook/react'

import { Input } from '@/components/molecules/Input/Input'
import { SearchForm } from './SearchForm'
import { Select } from '@/components'

const meta: Meta<typeof SearchForm> = {
  title: 'Organisms/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  args: {
    onSubmit: () => alert('Submitting form...'),
  },
}

export default meta

export const Default: StoryFn<typeof SearchForm> = (props) => {
  return (
    <SearchForm {...props}>
      <SearchForm.Heading>Sample search form heading</SearchForm.Heading>
      <SearchForm.FieldsWrapper>
        {() => (
          <>
            <Input
              label="Example field"
              placeholder="Some value..."
            />
            <Select
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
          </>
        )}
      </SearchForm.FieldsWrapper>
      <SearchForm.SubmitButton />
    </SearchForm>
  )
}

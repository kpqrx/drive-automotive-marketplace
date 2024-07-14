import type { ComboboxItemType } from '@/components/molecules/Combobox/Combobox.types'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

afterEach(cleanup)

const label = 'Test combobox'
const placeholder = 'Test placeholder...'
const items: ComboboxItemType[] = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
]

describe('Combobox component', async () => {
  it('should be rendered properly', () => {
    const renderedElement = render(
      <Select
        allowMultiple
        label={label}
        placeholder={placeholder}
        items={items}
      />,
      {},
    )
    const comboboxElement = renderedElement.getByTestId('combobox')
    const comboboxLabel = comboboxElement.querySelector('label')
    const comboboxInput = comboboxElement.querySelector('input')

    expect(comboboxLabel!.innerText).toContain(label)
    expect(comboboxInput!.placeholder).toContain(placeholder)
  })
  it('should display items list on trigger', async () => {
    const renderedElement = render(
      <Select
        allowMultiple
        label={label}
        placeholder={placeholder}
        items={items}
      />,
      {},
    )
    const comboboxTrigger = renderedElement.getByTestId('combobox-trigger')

    await comboboxTrigger.click()

    const comboboxOptions = screen.getAllByTestId('combobox-option')
    comboboxOptions.forEach((optionElement, index) =>
      expect(optionElement.innerText).toBe(items[index].label),
    )
  })
  it('should allow to select item', async () => {
    const renderedElement = render(
      <Select
        allowMultiple
        label={label}
        placeholder={placeholder}
        items={items}
      />,
      {},
    )
    const randomItemIndex = Math.floor(Math.random() * (items.length + 1))

    const comboboxTrigger = renderedElement.getByTestId('combobox-trigger')
    const comboboxInput = renderedElement.getByTestId(
      'combobox-input',
    ) as HTMLInputElement

    await comboboxTrigger.click()
    const comboboxOption =
      screen.getAllByTestId('combobox-option')[randomItemIndex]
    await comboboxOption.click()
    expect(comboboxInput.value).toBe(comboboxOption.innerText)
  })

  it('should allow to clear selection', async () => {
    const renderedElement = render(
      <Select
        allowMultiple
        label={label}
        placeholder={placeholder}
        items={items}
      />,
      {},
    )

    const comboboxTrigger = renderedElement.getByTestId('combobox-trigger')
    const comboboxInput = renderedElement.getByTestId(
      'combobox-input',
    ) as HTMLInputElement

    await comboboxTrigger.click()
    const comboboxOption = screen.getAllByTestId('combobox-option')[0]
    await comboboxOption.click()
    await comboboxTrigger.click()
    const comboboxClearButton = renderedElement.getByTestId(
      'combobox-clear-button',
    )

    await comboboxClearButton.click()
    expect(comboboxInput.value).toBeFalsy()
  })
})

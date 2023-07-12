import { describe, expect, it, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { Input } from '@/components/molecules/Input/Input'

afterEach(cleanup)

const label = 'Test Input'
const placeholder = 'Test placeholder...'
const sampleValue = 'Some test value'

describe('Input component', async () => {
  it('should be rendered properly', () => {
    const renderedElement = render(
      <Input
        label={label}
        placeholder={placeholder}
      />,
      {},
    )
    const inputElement = renderedElement.getByTestId(
      'input-control',
    ) as HTMLInputElement
    const labelElement = renderedElement.getByTestId('input-label')

    expect(inputElement!.placeholder).toContain(placeholder)
    expect(labelElement!.innerText).toContain(label)
  })
  it('should be rendered properly if default value is provided', () => {
    const renderedElement = render(
      <Input
        label={label}
        placeholder={placeholder}
        defaultValue={sampleValue}
      />,
      {},
    )
    const inputElement = renderedElement.getByTestId(
      'input-control',
    ) as HTMLInputElement

    expect(inputElement!.value).toContain(sampleValue)
  })
  it('should allow to fill in values', () => {
    const renderedElement = render(
      <Input
        label={label}
        placeholder={placeholder}
      />,
      {},
    )

    const inputElement = renderedElement.getByTestId(
      'input',
    ) as HTMLInputElement

    inputElement.value = sampleValue
    expect(inputElement.value).toBe(sampleValue)
  })
})

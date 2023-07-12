import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { Chip } from '@/components/atoms/Chip/Chip'

afterEach(cleanup)

describe('Chip component', async () => {
  it('should be rendered properly', () => {
    const children = 'Test chip'

    const renderedElement = render(<Chip>{children}</Chip>, {})
    const chipElement = renderedElement.getByTestId('chip')

    expect(chipElement.innerText).toBe(children)
  })
})

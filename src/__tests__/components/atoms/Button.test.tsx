import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { Button } from '@/components/atoms/Button/Button'

afterEach(cleanup)

describe('Button component', async () => {
  it("should be rendered as 'a' element if 'href' prop is provided", () => {
    const renderedElement = render(<Button href="#">Button</Button>, {})
    const buttonElement = renderedElement.getByTestId('button')

    expect(buttonElement.tagName).toMatch(/a/i)
    expect(buttonElement).toHaveProperty('href')
  })

  it("should be rendered as 'large sized primary' variant by default", () => {
    const renderedElement = render(<Button>Button</Button>, {})
    const buttonElement = renderedElement.getByTestId('button')

    expect(buttonElement.className).toMatch(/large/i)
    expect(buttonElement.className).toMatch(/primary/i)
  })

  it("should be rendered as 'small sized' variant", () => {
    const renderedElement = render(<Button size="small">Button</Button>, {})
    const buttonElement = renderedElement.getByTestId('button')

    expect(buttonElement.className).toMatch(/small/i)
  })

  it("should be rendered as 'secondary' variant", () => {
    const renderedElement = render(
      <Button variant="secondary">Button</Button>,
      {},
    )
    const buttonElement = renderedElement.getByTestId('button')

    expect(buttonElement.className).toMatch(/secondary/i)
  })
})

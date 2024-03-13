import { Button } from '@/components/atoms/Button/Button'
import styles from './SearchForm.module.css'
import clsx from 'clsx'
import type { ChildrenWithClassNameProps } from '@/components/organisms/SearchForm/SearchFrom.types'
import { useContext, forwardRef } from 'react'
import { SearchFormContext } from '@/components/organisms/SearchForm/SearchForm'
import type { BaseButtonProps } from '@/components/atoms/Button/Button.types'

export const Container = forwardRef<
  HTMLFormElement,
  ChildrenWithClassNameProps
>((props, ref) => {
  const { children, className = '', ...restProps } = props
  const searchFormContext = useContext(SearchFormContext)
  return (
    <form
      onSubmit={searchFormContext?.handleSubmit}
      className={clsx(styles.container, className)}
      ref={ref}
      {...restProps}
    >
      {children}
    </form>
  )
})

Container.displayName = 'Container'

export const FieldsWrapper = forwardRef<
  HTMLDivElement,
  ChildrenWithClassNameProps
>((props, ref) => {
  const { children, className = '', ...restProps } = props
  return (
    <div
      className={clsx(styles.fieldsWrapper, className)}
      ref={ref}
      {...restProps}
    >
      {children}
    </div>
  )
})

FieldsWrapper.displayName = 'FieldsWrapper'

export function Heading(props: ChildrenWithClassNameProps<string>) {
  const { children, className = '', ...restProps } = props
  return (
    <h1
      className={clsx(styles.heading, className)}
      {...restProps}
    >
      {children}
    </h1>
  )
}

export function SubmitButton(props: BaseButtonProps) {
  const { className = '', ...restProps } = props
  return (
    <Button
      type="submit"
      className={clsx(styles.submitButton, className)}
      {...restProps}
    >
      Wyszukaj
    </Button>
  )
}

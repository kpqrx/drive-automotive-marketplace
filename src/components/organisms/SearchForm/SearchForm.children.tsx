import { Button } from '@/components/atoms/Button/Button'
import styles from './SearchForm.module.css'
import clsx from 'clsx'
import type { ChildrenWithClassNameProps } from '@/components/organisms/SearchForm/SearchFrom.types'
import { useContext, type ComponentPropsWithoutRef } from 'react'
import { SearchFormContext } from '@/components/organisms/SearchForm/SearchForm'

export function Container(props: ChildrenWithClassNameProps) {
  const { children, className = '', ...restProps } = props
  const searchFormContext = useContext(SearchFormContext)
  return (
    <form
      onSubmit={searchFormContext?.handleSubmit}
      className={clsx(styles.form, className)}
      {...restProps}
    >
      {children}
    </form>
  )
}

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

export function SubmitButton(props: ComponentPropsWithoutRef<'button'>) {
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

export function Footer(props: { className?: string }) {
  const { className = '', ...restProps } = props
  const searchFormContext = useContext(SearchFormContext)

  const handleAdvancedModeToggle = () =>
    searchFormContext?.setAdvancedModeActive((prevState) => !prevState)
  return (
    <div
      className={clsx(styles.formFooter, className)}
      {...restProps}
    >
      <h2 className={styles.foundOffersHeading}>
        Znaleziono
        <span className={styles.foundOffersCount}>32 900</span>
        ogłoszeń.
      </h2>
      <Button
        onClick={handleAdvancedModeToggle}
        variant="secondary"
        size="small"
      >
        Wyszukiwanie zaawansowane
      </Button>
    </div>
  )
}

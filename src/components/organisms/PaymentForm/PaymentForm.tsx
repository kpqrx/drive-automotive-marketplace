'use client'
import styles from './PaymentForm.module.css'
import type { PaymentFormProps } from '@/components/organisms/PaymentForm/PaymentForm.types'
import { Button, Container, Logo, Skeleton } from '@/components'
import clsx from 'clsx'
import { makePayment, requestPayment } from '@/lib'
import { useEffect, useMemo, useState } from 'react'
import braintree, { type HostedFields } from 'braintree-web'
import { FcSimCardChip as EMVChipIcon } from 'react-icons/fc'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import {
  SiMastercard as MastercardLogo,
  SiVisa as VisaLogo,
} from 'react-icons/si'

const LoadingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="m1,12C1,5.92,5.92,1,12,1"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const PaymentForm = (props: PaymentFormProps) => {
  const { className, onPaymentSuccess, goToPreviousStep, ...restProps } = props

  const [hostedFields, setHostedFields] = useState<HostedFields | null>(null)
  const [paymentPrice, setPaymentPrice] = useState<[number, string] | null>(
    null,
  )

  const [isFormValid, setIsFormValid] = useState(false)
  const [cardType, setCardType] = useState<'visa' | 'master-card' | null>(null)

  const handlePayment = async () => {
    try {
      if (!hostedFields) {
        return
      }

      const { nonce } = await hostedFields.tokenize()

      await makePayment(nonce)
      await onPaymentSuccess()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const initializePaymentForm = async () => {
      try {
        const { token, amount, currency } = await requestPayment()
        setPaymentPrice([amount, currency])

        const client = await braintree.client.create({
          authorization: token,
        })

        const hostedFieldsInstance = await braintree.hostedFields.create({
          client,
          styles: {
            input: {
              'font-size': '1.125rem',
              'font-family': 'monospace',
              'text-transform': 'uppercase',
              'letter-spacing': '0.05em',
            },
          },
          fields: {
            number: {
              selector: '#card-number',
              placeholder: 'XXXX XXXX XXXX XXXX',
            },
            cvv: {
              selector: '#cvv',
              placeholder: 'XXX',
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: 'MM/YY',
            },
            cardholderName: {
              selector: '#cardholder-name',
              placeholder: 'np. Jan Kowalski',
            },
          },
        })
        setHostedFields(hostedFieldsInstance)

        hostedFieldsInstance.on('validityChange', (event) => {
          const isValid = Object.values(event.fields).every(
            (field) => field.isValid,
          )
          const resolvedCardType =
            event.cards.length && event.fields.number.isValid
              ? event.cards[0].type
              : null

          setIsFormValid(isValid)
          setCardType(resolvedCardType as typeof cardType)
        })
      } catch (error) {
        console.log(error)
      }
    }

    initializePaymentForm()

    return () => setHostedFields(null)
  }, [])

  const formattedPrice = useMemo(() => {
    const [amount, currency] = paymentPrice ?? []

    if (!amount || !currency) {
      return null
    }

    return amount.toLocaleString('pl-PL', {
      style: 'currency',
      currency,
      currencyDisplay: 'code',
      maximumFractionDigits: 2,
    })
  }, [paymentPrice])

  const cardLogo = useMemo(() => {
    if (cardType === 'visa') return <VisaLogo className={styles.cardLogo} />
    if (cardType === 'master-card')
      return <MastercardLogo className={styles.cardLogo} />

    return null
  }, [cardType])

  return (
    <Container className={clsx(styles.container, className)}>
      <div
        className={clsx(styles.container, className)}
        {...restProps}
      >
        <h2 className={styles.heading}>Zapłać za ogłoszenie</h2>

        <p className={styles.description}>
          Twoje ogłoszenie jest już prawie gotowe! <br />
          Podaj dane karty płatniczej aby opłacić Twoje ogłoszenie.
        </p>

        <div className={styles.price}>
          <span>Koszt ogłoszenia</span>
          {formattedPrice ? (
            <span className={styles.priceValue}>{formattedPrice}</span>
          ) : (
            <Skeleton className={styles.priceSkeleton} />
          )}
        </div>

        <div className={styles.fieldsWrapper}>
          {!hostedFields && (
            <div className={styles.loadingPlaceholder}>
              <LoadingIcon />
              <span>Wczytywanie formularza płatności...</span>
            </div>
          )}

          <div className={styles.cardHeading}>
            {cardLogo}
            <EMVChipIcon className={styles.chip} />
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Numer karty</span>
            <div
              id="card-number"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Imię i nazwisko</span>
            <div
              id="cardholder-name"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.label}>CVV</span>
            <div
              id="cvv"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Data ważności</span>
            <div
              id="expiration-date"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            variant="secondary"
            onClick={goToPreviousStep}
          >
            <ChevronLeftIcon className={styles.icon} />
            Poprzedni krok
          </Button>

          <Button
            onClick={handlePayment}
            disabled={!isFormValid}
            className={styles.button}
          >
            Dokonaj płatności i dodaj ogłoszenie
          </Button>
        </div>
      </div>
    </Container>
  )
}

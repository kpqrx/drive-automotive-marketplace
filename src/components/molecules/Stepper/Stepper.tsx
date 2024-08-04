'use client'
import type {
  StepperProps,
  StepperContext,
} from '@/components/molecules/Stepper/Stepper.types'
import clsx from 'clsx'
import { useCallback, useState, createContext, useContext } from 'react'
import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import styles from './Stepper.module.css'
import { clamp } from '@/utils'
import { AnimatePresence, m } from 'framer-motion'
import { Button } from '@/components'

const StepperContext = createContext<StepperContext>({
  steps: [],
  stepsProgress: [],
  setNextStep: () => {},
  setPreviousStep: () => {},
  setStepProgress: () => {},
  onFinal: () => {},
  currentStep: 0,
  currentProgress: 0,
  nextButtonLabel: '',
  previousButtonLabel: '',
  hasGuardedSteps: true,
  finalButtonLabel: '',
})
const useStepperContext = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error(
      'Stepper compound components cannot be rendered outside the Stepper component',
    )
  }
  return context
}

const StepperContainer = (props: StepperProps) => {
  const {
    steps,
    defaultStep = 0,
    className = '',
    hasGuardedSteps = true,
    children,
    onNextStep = () => Promise.resolve(true),
    onPreviousStep = () => Promise.resolve(true),
    nextButtonLabel = 'Next',
    previousButtonLabel = 'Previous',
    finalButtonLabel = 'Finish',
    onFinal = () => {},
    ...restProps
  } = props
  const [currentStep, setCurrentStep] = useState(defaultStep)
  const [stepsProgress, setStepsProgress] = useState<number[]>(
    Array(steps.length).fill(0),
  )

  const setStepProgress = useCallback(
    (value: number, stepIndex?: number) =>
      setStepsProgress((prevState) =>
        prevState.map((progress, index) =>
          index === (stepIndex ?? currentStep) ? value : progress,
        ),
      ),
    [currentStep],
  )
  const setNextStep = useCallback(async () => {
    const canChangeStep = await onNextStep({ currentStep })
    if (
      !canChangeStep ||
      (hasGuardedSteps && stepsProgress.at(currentStep) !== 1)
    )
      return
    setStepProgress(1)
    setCurrentStep((prev) => clamp(0, steps.length - 1, prev + 1))
  }, [
    currentStep,
    hasGuardedSteps,
    onNextStep,
    setStepProgress,
    steps,
    stepsProgress,
  ])

  const setPreviousStep = async () => {
    const canChangeStep = await onPreviousStep({ currentStep })
    if (!canChangeStep) return
    setCurrentStep((prev) => clamp(0, steps.length - 1, prev - 1))
  }

  return (
    <StepperContext.Provider
      value={{
        steps,
        stepsProgress,
        setNextStep,
        setPreviousStep,
        setStepProgress,
        currentStep,
        currentProgress: stepsProgress[currentStep],
        nextButtonLabel,
        previousButtonLabel,
        hasGuardedSteps,
        finalButtonLabel,
        onFinal,
      }}
    >
      <div
        className={clsx(className, styles.container)}
        {...restProps}
      >
        {children}
      </div>
    </StepperContext.Provider>
  )
}

const StepperTimeline = (props: ComponentPropsWithoutRef<'ul'>) => {
  const { className = '', ...restProps } = props
  const { steps, currentStep, stepsProgress } = useStepperContext()

  return (
    <ul
      className={clsx(styles.stepsWrapper, className)}
      {...restProps}
    >
      {steps.map(({ label, description }, index) => (
        <li
          key={index}
          className={clsx(styles.stepItem, {
            [styles.stepItemActive]:
              index === currentStep || stepsProgress.at(index) === 1,
          })}
        >
          <div className={styles.stepNumber}>
            <div className={styles.stepNumberWrapper}>{index + 1}</div>
          </div>
          <div className={styles.stepItemWrapper}>
            <span
              className={styles.stepItemProgressBar}
              style={
                {
                  '--progress': stepsProgress[index],
                } as CSSProperties
              }
            />
            <p className={styles.stepItemLabel}>{label}</p>
            {description && (
              <p className={styles.stepItemDescription}>{description}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

const StepperContent = (props: ComponentPropsWithoutRef<'div'>) => {
  const { className = '', ...restProps } = props
  const stepperContext = useStepperContext()

  return (
    <div
      className={clsx(styles.stepContentWrapper, className)}
      {...restProps}
    >
      {stepperContext.steps.map(
        ({ content }, index) =>
          index === stepperContext.currentStep && content(stepperContext),
      )}
    </div>
  )
}

const StepperFooter = (props: ComponentPropsWithoutRef<'div'>) => {
  const { className = '', ...restProps } = props
  const {
    setNextStep,
    setPreviousStep,
    currentStep,
    currentProgress,
    nextButtonLabel,
    previousButtonLabel,
    hasGuardedSteps,
    finalButtonLabel,
    steps,
    onFinal,
  } = useStepperContext()

  const isLastStep = steps.length - 1 === currentStep

  return (
    <div
      className={clsx(styles.footer, className)}
      {...restProps}
    >
      {currentStep > 0 && (
        <Button
          variant="secondary"
          onClick={setPreviousStep}
        >
          {previousButtonLabel}
        </Button>
      )}
      <Button
        onClick={isLastStep ? onFinal : setNextStep}
        disabled={hasGuardedSteps && currentProgress < 1}
      >
        {finalButtonLabel && isLastStep ? finalButtonLabel : nextButtonLabel}
      </Button>
    </div>
  )
}

export const Stepper = Object.assign(StepperContainer, {
  Timeline: StepperTimeline,
  Content: StepperContent,
  Footer: StepperFooter,
})

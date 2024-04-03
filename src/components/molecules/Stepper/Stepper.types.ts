import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type StepperStep = {
  label: string
  description: string
  content: (args: StepperContext) => ReactNode
}

export type StepperContext = {
  steps: StepperStep[]
  stepsProgress: number[]
  setNextStep: () => void
  setPreviousStep: () => void
  setStepProgress: (progress: number, index?: number) => void
  currentStep: number
  currentProgress: number
}

export interface StepperProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Array of steps to be displayed in the stepper
   * @see StepperStep
   */
  steps: StepperStep[]
  /**
   * Index of the step to be displayed when the component is rendered
   * @default 0
   */
  defaultStep?: number
  /**
   * If true, the user will not be able to navigate to the next step until the current step is completed
   * @default false
   */
  hasGuardedSteps?: boolean
  /**
   * Function to be called when the user navigates to the next step
   */
  onNextStep?: () => Promise<boolean>
  /**
   * Function to be called when the user navigates to the previous step
   */
  onPreviousStep?: () => Promise<boolean>
}

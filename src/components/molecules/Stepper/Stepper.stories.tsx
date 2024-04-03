import type { Decorator, Meta, StoryFn } from '@storybook/react'

import { Stepper } from './Stepper'
import type { PropsWithChildren } from 'react'
import { Input } from '@/components/molecules/Input/Input'

const StoryWrapper: Decorator = (Story) => (
  <div className="mx-auto w-full max-w-screen-lg">
    <Story />
  </div>
)

const StepContent = (
  props: PropsWithChildren & {
    progress: number
    setProgress: (value: number) => void
    setNext: VoidFunction
    setPrev: VoidFunction
  },
) => (
  <div className="flex flex-col space-y-3">
    <div>{props.children}</div>
    <Input
      label="Progress"
      type="number"
      min={0}
      max={1}
      step={0.2}
      defaultValue={0}
      onChange={(e) => {
        props.setProgress(+e.target.value)
      }}
    />
  </div>
)

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [StoryWrapper],
  args: {
    hasGuardedSteps: false,
    steps: [
      {
        label: 'Step 1',
        description: 'Description for step 1',
        content: ({
          setNextStep,
          setPreviousStep,
          setStepProgress,
          currentProgress,
        }) => (
          <StepContent
            progress={currentProgress}
            setProgress={setStepProgress}
            setNext={setNextStep}
            setPrev={setPreviousStep}
          >
            I am step one
          </StepContent>
        ),
      },
      {
        label: 'Step 2',
        description: 'Description for step 2',
        content: ({
          setNextStep,
          setPreviousStep,
          setStepProgress,
          currentProgress,
        }) => (
          <StepContent
            progress={currentProgress}
            setProgress={setStepProgress}
            setNext={setNextStep}
            setPrev={setPreviousStep}
          >
            I am step two
          </StepContent>
        ),
      },
      {
        label: 'Step 3',
        description: 'Description for step 3',
        content: ({
          setNextStep,
          setPreviousStep,
          setStepProgress,
          currentProgress,
        }) => (
          <StepContent
            progress={currentProgress}
            setProgress={setStepProgress}
            setNext={setNextStep}
            setPrev={setPreviousStep}
          >
            I am step three
          </StepContent>
        ),
      },
    ],
  },
}

export default meta
type Story = StoryFn<typeof Stepper>

export const Default: Story = (props) => (
  <Stepper
    {...props}
    onNextStep={() =>
      Promise.resolve(
        prompt(
          'Type "foo bar" to allow for step change in `onNextStep` handler:',
        ) === 'foo bar',
      )
    }
  >
    <Stepper.Timeline />
    <Stepper.Content className="h-screen" />
    <Stepper.Footer />
  </Stepper>
)

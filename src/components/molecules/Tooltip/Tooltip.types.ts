import type {
  TooltipProps as TooltipPrimitiveProps,
  TooltipContentProps as TooltipPrimitiveContentProps,
} from '@radix-ui/react-tooltip'

export interface TooltipProps
  extends TooltipPrimitiveProps,
    Pick<TooltipPrimitiveContentProps, 'className' | 'side'> {
  content: string | number
}

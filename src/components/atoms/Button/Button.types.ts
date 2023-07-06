import type { HTMLAttributes, PropsWithChildren } from "react";

export interface ButtonProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "large" | "small";
}

import { ReactNode, forwardRef } from "react";
import { buttonVariantStyles } from "./functions";

export type StyledVariant = "filled" | "outline" | "outlineSecondary";

interface StyledButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: StyledVariant;
  onClick?: () => void;
  children?: ReactNode;
}

export const StyledButton = forwardRef<HTMLButtonElement, StyledButtonProps>(
  (props: StyledButtonProps, ref) => {
    const {
      className,
      type = "button",
      variant = "filled",
      onClick = () => null,
      children,
      ...rest
    } = props;

    return (
      <button
        className={`${className} ${buttonVariantStyles(variant)}`}
        type={type}
        ref={ref}
        onClick={onClick}
        {...rest}>
        {children}
      </button>
    );
  }
);

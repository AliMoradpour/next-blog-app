import { MouseEventHandler, ReactElement } from "react";

const btnType = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  outline: "btn--outline",
  danger: "btn--danger",
};

interface ButtonProps {
  children?: ReactElement;
  onClick?: MouseEventHandler;
  variant: string;
  className?: string;
}

function Button({ children, onClick, variant = "primary", className, ...rest }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn ${btnType[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;

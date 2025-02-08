import React, { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "./Button";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, className = "", ...rest }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="primary"
      disabled={pending}
      className={`${className} flex items-center justify-center gap-x-4 py-4 w-full`}
      {...rest}>
      {children}
      {pending && <SpinnerMini />}
    </Button>
  );
};

export default SubmitButton;

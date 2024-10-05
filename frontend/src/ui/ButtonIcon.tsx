import { MouseEventHandler, ReactNode } from "react";

const btnType = {
  primary: "bg-primary-100 text-primary-700 hover:bg-primary-900 hover:text-white",
  secondary: "bg-secondary-200  text-secondary-500 hover:bg-secondary-500 hover:text-secondary-0",
  outline: "border border-secondary-200 text-secondary-500 hover:bg-secondary-200",
  red: "bg-red-100  text-red-500 hover:bg-red-500 hover:text-white",
  danger: "border border-red-100 text-red-500",
};

type ButtonVariants = keyof typeof btnType; // "primary" | "secondary" | "outline" | "red" | "danger"

type ButtonIconProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant: ButtonVariants;
};

const ButtonIcon = ({ children, onClick, className, variant, ...rest }: ButtonIconProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${btnType[variant]}
        ${className} flex items-center justify-center gap-x-1 rounded-md p-1
        [&>svg]:w-4  [&>svg]:h-4 [&>svg]:text-inherit
        text-xs lg:text-sm
        transition-all duration-300 ease-out`}
      {...rest}>
      {children}
    </button>
  );
};

export default ButtonIcon;

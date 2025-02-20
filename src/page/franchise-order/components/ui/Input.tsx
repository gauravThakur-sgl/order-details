// import Errors from "./Errors";

import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder?: string;
  id?: string;
  variant?: keyof typeof inputColors;
  size?: keyof typeof inputSize;
  labelData?: string;
  className?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  errorName?: string;
  children?: React.ReactNode;
  value?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  register?: UseFormRegisterReturn;
  step?: number;
  min?: number;
  max?: number;
}
const inputColors = {
  default: "bg-black-300",
  error: "bg-red-100 border-0 ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-red-400",
};
const inputSize = {
  default: "h-10 text-base",
  sm: "h-16 text-sm",
  lg: "h-16 text-lg",
};

function Input({
  type,
  placeholder,
  id,
  variant = "default",
  size = "default",
  labelData,
  className,
  name,
  onChange,
  required,
  onClick,
  errorName,
  children,
  value,
  props,
  onKeyPress,
  register,
  step,
  min,
  max,
}: InputProps) {
  const baseClasses =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-franchise-primary disabled:cursor-not-allowed disabled:opacity-50";
  const variantClasses = inputColors[variant] || inputColors.default;
  const sizeClasses = inputSize[size] || inputSize.default;
  return (
    <div className="w-full">
      <div className="flex flex-col justify-start gap-2 appearance-none">
        <label htmlFor={id} className="text-sm text-franchise-sectionp leading-none text-black/2">
          {" "}
          {/*text-text-primary */}
          {labelData} <span className="text-red-500">{required ? "*" : ""}</span>
        </label>
        <div className="flex justify-center items-center bg-white rounded-md">
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ""}`}
            onChange={onChange}
            onClick={onClick}
            value={value}
            {...props}
            onKeyDown={onKeyPress}
            {...register}
            step={step}
            min={min}
            max={max}
          />
          <div>{children}</div>
        </div>
      </div>
      {errorName && <p className="text-franchise-error text-xs font-medium mt-1">{errorName}</p>}
    </div>
  );
}

export default Input;

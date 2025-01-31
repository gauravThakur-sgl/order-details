import { ChangeEvent, MouseEvent } from "react";

interface CheckBoxProps {
  type: string;
  id: string;
  variant?: "default" | "error";
  size?: "default" | "sm" | "lg";
  labelData: string;
  className?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

function CheckBox(props: CheckBoxProps) {
  const {
    type,
    id,
    variant = "default",
    size = "default",
    labelData,
    className,
    name,
    onChange,
    required,
    onClick,
    checked,
  } = props;
  const inputColors = {
    default: "bg-black-300",
    error: "bg-red-100 border-0 ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-red-400",
  };
  const inputSize = {
    default: " text-base",
    sm: "h-16 text-sm",
    lg: "h-16 text-lg",
  };
  const baseClasses = "inline-flex rounded-md text-md border-0 placeholder:text-sm placeholder:from-neutral-400";
  const variantClasses = inputColors[variant] || inputColors.default;
  const sizeClasses = inputSize[size] || inputSize.default;
  return (
    <div className="flex flex-row-reverse justify-start gap-2">
      <label htmlFor={id}>
        {labelData} <span className="text-red-500">{required}</span>
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ""}`}
        onChange={onChange}
        onClick={onClick}
        checked={checked}
      />
    </div>
  );
}

export default CheckBox;

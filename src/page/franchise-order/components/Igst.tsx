import { ChevronDown } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { orderDetailsSchema } from "@/zod/franchiseOrderSchema"; 
import { Control, Controller, FieldErrors } from "react-hook-form";
type FormData = z.infer<typeof orderDetailsSchema>;

interface IPickupAddressProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const igstOptions = [
  { label: "0%", value: "0" },
  { label: "3%", value: "3" },
  { label: "5%", value: "5" },
  { label: "12%", value: "12" },
  { label: "18%", value: "18" },
  { label: "28%", value: "28" },
];

export const Igst = ({ control, errors }: IPickupAddressProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="-mt-1 w-full md:w-18">
      <Controller
        control={control}
        name="items.0.igst"
        defaultValue={igstOptions[0].value}
        render={({ field }) => (
          <Select
            title="IGST"
            options={igstOptions}
            value={field.value ?? ""}
            onChange={(value) => {
              field.onChange(value);
              handleSelectChange(value);
            }}
            errorName={errors.items?.[0]?.igst?.message}
          />
        )}
      />
    </div>
  );
};

interface ISelectProps {
  title: string;
  id?: string;
  variant?: keyof typeof selectColors;
  size?: keyof typeof selectSize;
  className?: string;
  options: { value: string; label: string }[];
  value: string;
  required?: boolean;
  onChange?: (value: string) => void;
  name?: string;
  errorName?: string;
}

const selectColors = {
  default: "focus:border-none appearance-none",
  error: "border-red-500 focus:border-red-600",
};

const selectSize = {
  default: "h-10 w-full",
  sm: "h-8 text-sm",
  lg: "h-12 text-lg",
};

function Select({
  title,
  variant = "default",
  size = "default",
  className,
  options,
  value,
  onChange,
  name,
  errorName,
}: ISelectProps) {
  return (
    <div className={`relative ${className} w-full`}>
      <label className="block text-sm text-franchise-sectionp">
        {title}
        <span className="text-sm text-price-info"> *</span>
      </label>
      <select
        disabled
        name={name}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border cursor-not-allowed focus:cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${selectColors[variant]} ${selectSize[size]}`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-franchise-primary rounded-md bg-franchise-select-bg"
          >
            {option.label}
          </option>
        ))}
      </select>
      {errorName && <span className="text-franchise-error text-xs font-medium">{errorName}</span>}
      <ChevronDown className="absolute inset-y-0 right-1 top-8 flex items-center pr-2 pointer-events-none" />
    </div>
  );
}

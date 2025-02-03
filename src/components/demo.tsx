import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface ISelectProps {
  title: string;
  variant?: keyof typeof selectColors;
  size?: keyof typeof selectSize;
  className?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const selectColors = {
  default: "border-gray-300 focus:border-none appearance-none focus:bg-gray-200",
  error: "border-red-500 focus:border-red-600",
};

const selectSize = {
  default: "h-10 w-full",
  sm: "h-8 text-sm",
  lg: "h-12 text-lg",
};

type Option = {
  value: string;
  label: string;
};

function Select({ title, variant, size, className, options, value, onChange }: ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const baseClasses = "border rounded-md text-text-primary font-medium text-gray-500 tracking-tight px-2";
  const variantClasses = selectColors[variant || "default"];
  const sizeClasses = selectSize[size || "default"];

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative">
      <div
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? options.find((option) => option.value === value)?.label : title}
        <ChevronDown className="absolute top-3 right-3 h-4 w-4" />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <input
            type="text"
            className="w-full p-2 border-b border-gray-300"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option: Option) => (
              <div
                key={option.value}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  if (onChange) {
                    onChange({ target: { value: option.value } } as React.ChangeEvent<HTMLSelectElement>);
                  }
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;

import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Input from "./ui/Input";

const igstOptions = [
    { label: "0%", value: "0" },
    { label: "3%", value: "3" },
    { label: "5%", value: "5" },
    { label: "12%", value: "12" },
    { label: "18%", value: "18" },
    { label: "28%", value: "28" },
  ];
export const Igst = () => {
  return (
    <div><Select ></div>
  )
}



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
  default: "focus:border-none appearance-none focus:bg-gray-200",
  error: "border-red-500 focus:border-red-600",
};

const selectSize = {
  default: "h-10 w-full",
  sm: "h-8 text-sm",
  lg: "h-12 text-lg",
};
function Select({ title, variant, size, className, options, value, onChange, name, errorName }: ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const baseClasses =
    "flex items-center rounded-md text-text-primary font-medium text-gray-500 bg-gray-100 tracking-tight px-2";
  const variantClasses = selectColors[variant || "default"];
  const sizeClasses = selectSize[size || "default"];

  
  return (
    <div ref={ref}>
      <div className="relative">
        <div
          className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? options.find((option) => option.value === value)?.label : title}
          <ChevronDown className="absolute top-3 right-3 h-4 w-4" />
        </div>
            <div className="overflow-y-auto max-h-60 pt-2">
              {filteredOptions.map((option: { value: string; label: string }) => (
                <div
                  key={option.value}
                  className="p-2 px-4 hover:bg-progress-step hover:text-white text-progress-step bg-blue-50 text-sm cursor-pointer"
                  onClick={() => {
                    if (onChange) {
                      onChange(option.value);
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
      {errorName && <p className="text-price-info text-xs">{errorName}</p>}
    </div>
  );
}

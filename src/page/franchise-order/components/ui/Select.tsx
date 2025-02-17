import { ChevronDown } from "lucide-react";
import Input from "./Input";
import { useEffect, useRef, useState } from "react";

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
    "flex items-center border rounded-md text-text-primary font-medium text-franchise-consignor-text text-sm font-semibold tracking-tight px-2";
  const variantClasses = selectColors[variant || "default"];
  const sizeClasses = selectSize[size || "default"];

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);
  return (
    <div ref={ref}>
      <div className="relative z-20">
        <div
          className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="truncate whitespace-nowrap overflow-hidden pr-4 font-normal">
            {value ? options.find((option) => option.value === value)?.label : title}
          </div>
          <ChevronDown className="absolute top-3 right-3 h-4 w-4" />
        </div>
        {isOpen && (
          <div className="absolute z-10 pt-2 w-full bg-white border border-gray-300 shadow-lg">
            <Input
              type="text"
              className="w-full p-1 border-b border-gray-300 mx-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name={name}
            />
            <div className="overflow-y-auto max-h-60 pt-2">
              {filteredOptions.map((option: { value: string; label: string }) => (
                <div
                  key={option.value}
                  className="p-2 px-4 bg-white hover:text-franchise-primary hover:bg-franchise-select-bg text-sm cursor-pointer"
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
      {errorName && <p className="text-franchise-error text-xs font-medium">{errorName}</p>}
    </div>
  );
}

export default Select;

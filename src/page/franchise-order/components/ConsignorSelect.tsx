import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "./ui/Input";

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
function ConsignorSelect({ title, variant, size, className, options, value, onChange, name, errorName }: ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const baseClasses =
    "flex items-center border rounded-md text-text-primary font-medium text-sm font-semibold tracking-tight px-2 cursor-pointer";
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
      <div className="relative">
        <div
          className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="truncate whitespace-nowrap overflow-hidden pr-4 text-franchise-consignor-text">
            {value ? options.find((option) => option.value === value)?.label : title}
          </div>
          <ChevronDown className="absolute top-3 right-3 h-4 w-4" />
        </div>
        {isOpen && (
          <div className="absolute z-10 pt-2 w-full bg-white border border-gray-300 shadow-lg">
            <div className="relative">
              <Input
                type="text"
                className="w-full p-1 border-b border-gray-300 mx-3 rounded-none text-sm text-franchise-consignor-text pl-8"
                placeholder="Search by Mobile Number Or Customer Name or Email id"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name={name}
              />
              <span className="absolute top-5 left-6">
                <Search className="w-4 h-4 text-franchise-consignor-text" />
              </span>
            </div>
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
            <span className="text-franchise-primary px-4 text-sm font-medium">
              <span className="text-base pb-4">+ </span>Add new Customer
            </span>
          </div>
        )}
      </div>
      {errorName && <p className="text-franchise-error text-xs font-medium">{errorName}</p>}
    </div>
  );
}

export default ConsignorSelect;

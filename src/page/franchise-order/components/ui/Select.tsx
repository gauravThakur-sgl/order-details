import { Check, ChevronDown, Search } from "lucide-react";
import Input from "@/page/franchise-order/components/ui/Input";
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
  placeholder?: string;
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

function Select({ title, variant, size, className, options, value, onChange, name, errorName,placeholder }: ISelectProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case "ArrowDown":
          setHighlightedIndex((prevIndex) => (prevIndex + 1) % filteredOptions.length);
          break;
        case "ArrowUp":
          setHighlightedIndex((prevIndex) => (prevIndex - 1 + filteredOptions.length) % filteredOptions.length);
          break;
        case "Enter":
          if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            onChange?.(filteredOptions[highlightedIndex].value);
            setIsOpen(false);
            setSearch("");
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, highlightedIndex, filteredOptions, onChange]);

  return (
    <div ref={ref}>
      <div className="relative">
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
          <div className="absolute z-10 w-full bg-white border border-gray-300 shadow-lg">
            <div className="relative">
              <Input
                type="text"
                className="w-full border-b border-gray-300 rounded-none m-0 -mt-2 placeholder:text-sm px-8 appearance-none"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name={name}
                autofocus={true}
              />
              <Search className="absolute top-3 left-2 h-4 w-4 text-franchise-consignor-text" />
            </div>
            <div className="overflow-y-auto max-h-60 pt-2">
              {filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={`p-2 px-6 text-sm cursor-pointer ${
                    index === highlightedIndex ? "text-franchise-primary bg-franchise-select-bg" : ""
                  }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                    setSearch(""); // Clear search on selection
                  }}
                >
                  <span className="relative flex items-center">
                    {option.value === value ? (
                      <span className="text-franchise-primary absolute -left-6">
                        <Check className="w-5 h-5 text-black" />
                      </span>
                    ) : null}
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {errorName && <p className="text-franchise-error text-xs font-medium mt-1">{errorName}</p>}
    </div>
  );
}

export default Select;

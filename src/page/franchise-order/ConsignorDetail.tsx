import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Input from "../../components/ui/Input";
import { z } from "zod";
import { consignorDetailSchema } from "../../zod/franchiseOrderSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ConsignorData = z.infer<typeof consignorDetailSchema>;
interface IConsignorDetailProps {
  data: ConsignorData;
  onNext: (formData: ConsignorData) => void;
}
export const ConsignorDetail = ({ data, onNext }: IConsignorDetailProps) => {
  const { handleSubmit } = useForm<ConsignorData>({
    resolver: zodResolver(consignorDetailSchema),
    defaultValues: data,
  });
  const userDetail = [
    {
      firstName: "Murli",
      lastName: "Chandani",
      email: "murli@gmail.com",
      mobileNo: "+91-82399893232",
      billingAddress:
        "S/O Assudomal Chandani, House No 6 New Frinds Colony Behind 56 Bhog, Huzur Bhopa, Madhya Pradesh - 462016",
      documentType: "Aadhar",
      documentDetail: "786567876545",
    },
  ];

  // const userOption = [
  //   {
  //     label: "9876785676 / John Doe / john@gmail.com",
  //     value: "9876785676 / John Doe / john@gmail.com",
  //   },
  // ];

  const onSubmit = (data: ConsignorData) => {
    console.log(data, "data");
    onNext(data);
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="">Search Customer</p>
        <button className="w-full rounded-md border mt-2 text-franchise-consignor-text text-left p-2 font-medium">
          Select Customer
        </button>
        <div className="flex flex-col tablet:flex-row justify-start items-center gap-4">
          {userDetail.map((user) => (
            <div className="flex flex-col tablet:flex-row justify-start gap-2 py-5">
              <div className="flex flex-col text-nowrap">
                <span className="text-franchise-sectionp font-semibold text-sm">
                  {user.firstName} {user.lastName}
                </span>
                <span>{user.email}</span>
                <span>{user.mobileNo}</span>
              </div>
              <div>
                <p>Address</p>
                <p>{user.billingAddress}</p>
              </div>
              <div>
                <p>{user.documentType}</p>
                <p>{user.documentDetail}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="text-franchise-button-text bg-franchise-primary rounded-md p-1 px-4 font-medium text-lg"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </section>
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
    "flex items-center rounded-md text-text-primary font-medium text-gray-400 bg-gray-100 tracking-tight px-2";
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
          <div className="truncate whitespace-nowrap overflow-hidden pr-4">
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

export default Select;

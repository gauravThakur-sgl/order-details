import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Input from "../../components/ui/Input";
import { consignorDetailSchema } from "../../zod/franchiseOrderSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConsignorData } from "../interface";

interface IConsignorDetailProps {
  data: ConsignorData;
  onNext: (formData: ConsignorData) => void;
}
export const ConsignorDetail = ({ data, onNext }: IConsignorDetailProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const handleUserSelect = (user: string) => {
    setSelectedUser(user);
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ConsignorData>({
    resolver: zodResolver(consignorDetailSchema),
    defaultValues: data,
  });

  const userDetail = [
    {
      firstName: "Murli",
      lastName: "Chandani",
      email: "murli@gmail.com",
      mobileNo: "+91-8239989323",
      billingAddress:
        "S/O Assudomal Chandani, House No 6 New Frinds Colony Behind 56 Bhog, Huzur Bhopa, Madhya Pradesh - 462016",
      documentType: "Aadhar",
      documentDetail: "786567876545",
    },
  ];

  const userOption = userDetail.map((user) => ({
    label: `${user.mobileNo.slice(4)} / ${user.firstName} ${user.lastName} / ${user.email}`,
    value: JSON.stringify({
      mobileNo: user.mobileNo.slice(4),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      billingAddress: user.billingAddress,
      documentType: user.documentType,
      documentDetail: user.documentDetail,
    }),
  }));

  const onSubmit = (data: ConsignorData) => {
    console.log(data, "data");
    onNext(data);
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5 className="pb-2 text-sm font-normal leading-none text-franchise-sectionp">Select Customer</h5>
        <div className="relative w-3/5">
          <Controller
            control={control}
            name="pickupAddress"
            render={({ field }) => (
              <Select
                title="Select Customer"
                className="z-100"
                options={userOption}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  handleUserSelect(value);
                }}
                errorName={errors.pickupAddress?.message}
              />
            )}
          />
        </div>

        <div className="flex justify-between">
          {selectedUser && (
            <div className="flex flex-col tablet:flex-row justify-start items-center gap-4">
              {userDetail.map((user) => (
                <div className="flex flex-col tablet:flex-row justify-start gap-4 md:gap-10 py-5 text-xs text-franchise-sectionp pt-6">
                  <div className="flex flex-col text-nowrap">
                    <span className="text-franchise-sectionp font-semibold text-xs">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-sm">{user.email}</span>
                    <span>{user.mobileNo}</span>
                  </div>
                  <div className="w-full">
                    <p className="font-semibold text-xs text-franchise-consignor-text">Address</p>
                    <p className="mt-1">{user.billingAddress}</p>
                  </div>
                  <div className="w-full">
                    <p className="font-medium text-xs text-franchise-consignor-text">Documnet Type</p>
                    <p className="mt-1">{user.documentDetail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={`flex justify-end items-end ${!selectedUser && "w-full"} mt-4`}>
            <button
              type="submit"
              className="text-franchise-button-text bg-franchise-primary rounded-md py-2 px-4 font-medium"
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
              <span className="text-base">+ </span>Add new Customer
            </span>
          </div>
        )}
      </div>
      {errorName && <p className="text-franchise-error text-xs font-medium">{errorName}</p>}
    </div>
  );
}

export default Select;

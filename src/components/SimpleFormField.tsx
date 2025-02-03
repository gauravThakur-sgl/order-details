import { Controller, Control, FieldErrors } from "react-hook-form";
import Input from "../components/ui/Input";
import { FormData } from "../page/BuyerDetail";
interface SimpleFormFieldProps {
  name:
    | "firstName"
    | "lastName"
    | "mobileNumber"
    | "alternateMobileNumber"
    | "email"
    | "shippingAddress2"
    | "shippingcity"
    | "shippingPincode";
  control: Control<FormData>;
  placeholder: string;
  labelData: string;
  type?: string;
  required?: boolean;
  errors?: FieldErrors;
}

export const SimpleFormField = ({
  name,
  control,
  placeholder,
  labelData,
  type = "text",
  required = false,
  errors,
}: SimpleFormFieldProps) => {
  return (
    <div className="flex flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            value={String(field.value)}
            type={type}
            placeholder={placeholder}
            labelData={labelData}
            required={required}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      {errors && errors[name] && <p className="text-red-500 text-xs">{String(errors[name].message)}</p>}
    </div>
  );
};

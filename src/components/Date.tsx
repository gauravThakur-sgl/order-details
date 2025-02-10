import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control, Controller, FieldErrors } from "react-hook-form";
import z from "zod";
import { orderDetailsSchema } from "../zod/ordersSchema";

type FormData = z.infer<typeof orderDetailsSchema>;

interface IPickupAddressProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const today = new Date();
const formattedToday = today.toISOString().split("T")[0];

export const DateComponent = ({ control, errors }: IPickupAddressProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="invoiceDate" className="text-sm text-text-primary font-medium leading-none text-black/2 mb-1">
        Invoice Date <span className="text-red-500 text-sm">*</span>
      </label>
      <Controller
        control={control}
        name="invoiceDate"
        defaultValue={formattedToday}
        render={({ field }) => (
          <DatePicker
            selected={field.value ? new Date(field.value as string) : null}
            onChange={(date) => field.onChange(date ? date.toISOString().split("T")[0] : "")}
            dateFormat="yyyy-MM-dd"
            className="bg-white appearance-none w-full p-2 border rounded placeholder:text-black"
            placeholderText={formattedToday}
          />
        )}
      />
      {errors.invoiceDate && <p className="text-red-500 text-xs mt-1">{errors.invoiceDate.message}</p>}
    </div>
  );
};

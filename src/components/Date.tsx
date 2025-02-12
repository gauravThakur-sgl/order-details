import { Control, Controller, FieldErrors } from "react-hook-form";
import z from "zod";
import { orderDetailsSchema } from "../zod/franchiseOrderSchema";
import { Calendar } from "../components/ui/Calendar";
import { useState, useRef, useEffect } from "react";

type FormData = z.infer<typeof orderDetailsSchema>;

interface IPickupAddressProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const today = new Date();
const formattedToday = today.toISOString().split("T")[0];

export const DateComponent = ({ control, errors }: IPickupAddressProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setIsCalendarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col z-10">
      <label htmlFor="invoiceDate" className="text-sm text-text-primary font-medium leading-none text-black/2 mb-1">
        Invoice Date <span className="text-red-500 text-sm">*</span>
      </label>
      <Controller
        control={control}
        name="invoiceDate"
        defaultValue={formattedToday}
        render={({ field }) => (
          <div className="relative">
            <input
              type="text"
              readOnly
              value={field.value ? new Date(field.value).toLocaleDateString() : ""}
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-full text-left p-2 border rounded"
            />
            {isCalendarOpen && (
              <div ref={calendarRef} className="absolute z-200 bg-white border rounded shadow-lg mt-2">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value as string) : undefined}
                  onSelect={(date) => {
                    field.onChange(date ? date.toISOString().split("T")[0] : "");
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </div>
            )}
          </div>
        )}
      />
      {errors.invoiceDate && <p className="text-red-500 text-xs mt-1">{errors.invoiceDate.message}</p>}
    </div>
  );
};

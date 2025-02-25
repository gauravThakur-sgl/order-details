import { Control, Controller, FieldErrors } from "react-hook-form";
import z from "zod";
import { orderDetailsSchema } from "@/zod/franchiseOrderSchema";
import { Calendar } from "@/components/ui/Calendar";
import { useState, useRef, useEffect } from "react";
import { CalendarIcon } from "lucide-react";

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
    <div className="relative flex flex-col z-20">
      <label htmlFor="invoiceDate" className="text-sm text-text-primary font-medium leading-none text-black/2 mb-1">
        Invoice Date <span className="text-red-500 text-sm">*</span>
      </label>
      <Controller
        control={control}
        name="invoiceDate"
        defaultValue={formattedToday}
        render={({ field }) => (
          <div className="relative cursor-pointer">
            <input
              type="text"
              placeholder="Pick a Date"
              readOnly
              value={
                field.value
                  ? new Date(field.value).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""
              }
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-full text-left p-2 border rounded-md text-sm cursor-pointer hover:border-franchise-primary transition-all pl-3"
              // placeholder="Pick a Date"
            />
            <span className="absolute right-3 top-3" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
              <CalendarIcon className="h-4 w-4 text-gray-400 hover:text-blue-300" />
            </span>
            {isCalendarOpen && (
              <div ref={calendarRef} className="absolute z-200 bg-white border rounded shadow-lg mt-2">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value as string) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                      field.onChange(adjustedDate.toISOString().split("T")[0]);
                    } else {
                      field.onChange("");
                    }
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")}
                  initialFocus
                />
              </div>
            )}
          </div>
        )}
      />
      {errors.invoiceDate && (
        <p className="text-franchise-error text-xs mt-error font-medium">{errors.invoiceDate.message}</p>
      )}
    </div>
  );
};

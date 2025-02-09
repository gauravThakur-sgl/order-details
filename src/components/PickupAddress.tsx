import { Controller, Control, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { orderSchema } from "../zod/ordersSchema";
import Select from "./ui/Select";

type FormData = z.infer<typeof orderSchema>;

interface PickupAddressProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export const PickupAddress = ({ control, errors }: PickupAddressProps) => {
  const pickupAddress = [
    {
      label: "HEAD OFFICE, Mahipalpur, Indira Park, South West Delhi-Delhi-110037-83923289932",
      value: "HEAD OFFICE, Mahipalpur, Indira Park, South West Delhi-Delhi-110037-83923289932",
    },
    // Add more pickup addresses as needed
  ];

  return (
    <div className="flex flex-col space-y-4 w-full">
      <p className="font-semibold text-basis text-sm">
        Search Pickup Address <span className="text-red-500">*</span>
      </p>
      <div className="w-full pb-6">
        <Controller
          control={control}
          name="pickupAddress"
          rules={{ required: "The pickup address is required." }}
          render={({ field }) => (
            <Select
              title="Select Pickup Address"
              options={pickupAddress}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              errorName={errors.pickupAddress?.message}
            />
          )}
        />
      </div>
      <hr />
    </div>
  );
};

import { z } from "zod";
import Input from "./ui/Input";
import { orderDetailsSchema } from "../zod/ordersSchema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
const shipmentData = [
  { name: "actualWeight", required: true, default: "Kg" },
  { name: "length", required: true, default: "cm" },
  { name: "breadth", required: true, default: "cm" },
  { name: "height", required: true, default: "cm" },
];

type FormData = z.infer<typeof orderDetailsSchema>;

interface IShipMentMeasurementProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const ShipMentMeasurement = ({ register, errors }: IShipMentMeasurementProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-2 pt-5 w-full">
      {shipmentData.map((data, index) => (
        <div className="flex flex-col w-full">
          <div className="flex justify-center items-start">
            <div className="w-full">
              <Input
                key={index}
                register={register(data.name as keyof FormData)}
                name={data.name}
                labelData={data.name}
                required={data.required}
                type="text"
                className="appearence-none rounded-r-none z-10"
                errorName={errors[data.name as keyof FormData]?.message}
              />
            </div>
            <span className="bg-gray-100 p-2 mt-5 px-3 border rounded-r-md tracking-tight">
              {data.default}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

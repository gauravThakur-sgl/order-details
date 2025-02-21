import { z } from "zod";
import Input from "./ui/Input";
import { orderDetailsSchema } from "@/zod/franchiseOrderSchema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
const shipmentData = [
  { name: "actualWeight", required: true, default: "Kg", placeholder: "Eg. 1.25" },
  { name: "length", required: true, default: "cm", placeholder: "Eg. 10" },
  { name: "breadth", required: true, default: "cm", placeholder: "Eg. 10" },
  { name: "height", required: true, default: "cm", placeholder: "Eg. 10" },
];

type FormData = z.infer<typeof orderDetailsSchema>;

interface IShipMentMeasurementProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const BoxMeasurement = ({ register, errors }: IShipMentMeasurementProps) => {
  return (
    <div className="space-y-2 pt-4">
      <h2 className="text-sm font-semibold text-franchise-sectionp">Box Measurements</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {shipmentData.map((data, index) => (
          <div className="flex flex-col w-full">
            <div className="flex justify-center items-start">
              <div className="w-full">
                <Input
                  key={index}
                  register={register(data.name as keyof FormData)}
                  name={data.name}
                  labelData={data.name === "actualWeight" ? "Dead Weight" : data.name}
                  required={data.required}
                  type="number"
                  placeholder={data.placeholder}
                  className="appearence-none rounded-r-none"
                  errorName={errors[data.name as keyof FormData]?.message}
                  step={data.name === "actualWeight" ? 0.01 : 1}
                  min={0}
                />
              </div>
              <span className="bg-gray-100 p-2 mt-5 px-3 border rounded-r-md tracking-tight">{data.default}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

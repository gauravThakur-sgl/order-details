import z from "zod";
import { orderDetailsSchema } from "../../zod/franchiseOrderSchema";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input";
import { DateComponent } from "../../components/Date";
import { BoxMeasurement } from "./components/BoxMeasurement";
import { Trash2 } from "lucide-react";
type FormData = z.infer<typeof orderDetailsSchema>;

interface IOrderDetailsProps {
  data: FormData;
  onNext: (formData: FormData) => void;
}

export const ShipmentInformation = ({ data, onNext }: IOrderDetailsProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: data,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (formData: FormData) => {
    console.log(formData, "OrderDetails formData");
    onNext(formData);
  };
  console.log(errors, "errors");
  return (
    <section>
      <form action="" className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            register={register("invoiceNo")}
            labelData="Invoice No."
            required={true}
            type="text"
            errorName={errors.invoiceNo?.message}
          />
          <DateComponent control={control} errors={errors} />
          <Input
            register={register("invoiceCurrency")}
            labelData="Invoice Currency"
            required={true}
            type="text"
            errorName={errors.invoiceCurrency?.message}
          />
          <Input
            register={register("orderid")}
            labelData="Order/Reference ID"
            type="text"
            errorName={errors.orderid?.message}
          />
          <Input
            register={register("iossNumber")}
            labelData="IOSS Number"
            type="text"
            errorName={errors.iossNumber?.message}
          />
        </div>
        <BoxMeasurement register={register} errors={errors} />
        <p className="text-sm font-semibold pt-5">
          Item(s) Details{" "}
          <span className="text-xs font-normal bg-franchise-tag-bg text-franchise-tag-text px-1 rounded-sm">
            Items that can export
          </span>
        </p>
        {fields.map((item, index) => (
          <div key={item.id} className={`flex flex-col md:flex-row gap-2 items-start mt-4 animate-fadeIn`}>
            <Input
              register={register(`items.${index}.productName` as const)}
              labelData="Product Name"
              required={true}
              type="text"
              className="md:max-w-96"
              errorName={errors.items?.[index]?.productName?.message}
            />
            <Input
              register={register(`items.${index}.sku` as const)}
              labelData="SKU"
              required={false}
              type="text"
              className="w-full md:max-w-24"
              errorName={errors.items?.[index]?.sku?.message}
            />
            <Input
              register={register(`items.${index}.hsn` as const)}
              labelData="HSN"
              required={true}
              type="text"
              className="md:max-w-56"
              errorName={errors.items?.[index]?.hsn?.message}
            />
            <Input
              register={register(`items.${index}.qty` as const)}
              labelData="Qty"
              required={true}
              type="text"
              className="md:max-w-32"
              errorName={errors.items?.[index]?.qty?.message}
            />
            <Input
              register={register(`items.${index}.unitPrice` as const)}
              labelData={`Unit Price (${data.invoiceCurrency || "INR"})`}
              required={true}
              type="text"
              className="md:max-w-40"
              errorName={errors.items?.[index]?.unitPrice?.message}
            />

            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="">
                <Trash2 className="h-4 w-4 mt-8 text-red-500 bg-red-50" />
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-franchise-primary font-semibold rounded-md mt-5 underline"
            onClick={() => append({ productName: "", sku: "", hsn: "", qty: "", unitPrice: "", igst: "" })}
          >
            + <span className="font-medium ">Add another Product</span>
          </button>
          <p className=" font-semibold pt-5">Total Price: USD 500</p>
        </div>
        <div className="flex justify-end py-6">
          <button
            type="submit"
            className="text-franchise-button-text bg-franchise-primary rounded-md p-1 px-4 font-medium text-lg"
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

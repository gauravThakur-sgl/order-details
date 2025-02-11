import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../components/ui/Select";
import Input from "../components/ui/Input";
import { ArrowLeft, Trash2 } from "lucide-react";
import { z } from "zod";
import { orderDetailsSchema } from "../zod/ordersSchema";
import { ShipMentCard } from "../components/ShipMentCard";
import { ShipMentMeasurement } from "../components/ShipMentMeasurement";
import { DateComponent } from "../components/Date";
import { Igst } from "../components/Igst";

type FormData = z.infer<typeof orderDetailsSchema>;

interface IOrderDetailsProps {
  data: FormData;
  onNext: (formData: FormData) => void;
  onBack: () => void;
}

export const OrderDetails = ({ data, onNext, onBack }: IOrderDetailsProps) => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-20">
      <h2 className="pt-1 font-semibold text-basis flex justify-start w-full">ShipMent Type</h2>
      <p className="text-xs text-gray-400 font-medium pt-2">
        Please select the shipment Mode. Note: CSB-V Shipments can only be sent through ShipGlobal Direct. If other
        partner services are needed please select CSB IV.
      </p>
      <p className="text-sm text-gray-400 font-medium pt-4">
        If you need more info, please call/whatsapp at{" "}
        <a href="#">
          <span className="text-progress-step text-sm font-semibold"> +91 9811098919.</span>
        </a>
      </p>
      <ShipMentCard />
      <h2 className="pt-16 font-semibold text-basis flex justify-start w-full">ShipMent Details</h2>
      <p className="text-sm text-gray-400 font-medium pt-2">
        If you need more info, please check out{" "}
        <a href="#">
          <span className="text-progress-step text-sm font-semibold">Help Page</span>
        </a>
      </p>
      <ShipMentMeasurement register={register} errors={errors} />

      <h2 className="pt-1 font-semibold text-basis flex justify-start w-full mt-10">Order Details</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5 items-start">
        <Input
          register={register("invoiceNo")}
          labelData="Invoice No."
          required={true}
          type="text"
          errorName={errors.invoiceNo?.message}
        />

        <DateComponent control={control} errors={errors} />
        <div>
          <label htmlFor="invoiceCurrency" className="text-sm text-text-primary font-medium leading-none text-black/2">
            Invoice Currency <span className="text-red-500 text-sm">*</span>
          </label>
          <Controller
            control={control}
            name="invoiceCurrency"
            render={({ field }) => (
              <Select
                title="Invoice Currency"
                options={[
                  { label: "AED", value: "AED" },
                  { label: "AUD", value: "AUD" },
                  { label: "CAD", value: "CAD" },
                  { label: "EUR", value: "EUR" },
                  { label: "GBP", value: "GBP" },
                  { label: "INR", value: "INR" },
                  { label: "SAR", value: "SAR" },
                  { label: "USD", value: "USD" },
                ]}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorName={errors.invoiceCurrency?.message}
              />
            )}
          />
        </div>
        <Input
          register={register("orderid")}
          labelData="Order ID/Ref ID"
          required={true}
          type="text"
          errorName={errors.orderid?.message}
        />
      </div>
      <h2 className="pt-1 font-semibold text-basis flex justify-start w-full mt-10">Items Details</h2>
      {fields.map((item, index) => (
        <div key={item.id} className={`flex flex-col md:flex-row gap-2 items-start mt-4 animate-fadeIn`}>
          <div className="w-full">
            <Input
              register={register(`items.${index}.productName` as const)}
              labelData="Product Name"
              required={true}
              type="text"
              className="md:max-w-96"
              errorName={errors.items?.[index]?.productName?.message}
            />
          </div>
          <div className="w-full">
            <Input
              register={register(`items.${index}.sku` as const)}
              labelData="SKU"
              required={false}
              type="text"
              className="w-full md:max-w-24"
              errorName={errors.items?.[index]?.sku?.message}
            />
          </div>
          <div className="w-full">
            <Input
              register={register(`items.${index}.hsn` as const)}
              labelData="HSN"
              required={true}
              type="text"
              className="md:max-w-56"
              errorName={errors.items?.[index]?.hsn?.message}
            />
          </div>
          <div className="w-full">
            <Input
              register={register(`items.${index}.qty` as const)}
              labelData="Qty"
              required={true}
              type="text"
              className="md:max-w-32"
              errorName={errors.items?.[index]?.qty?.message}
            />
          </div>
          <div className="w-full">
            <Input
              register={register(`items.${index}.unitPrice` as const)}
              labelData={`Unit Price (${data.invoiceCurrency || "INR"})`}
              required={true}
              type="text"
              className="md:max-w-40"
              errorName={errors.items?.[index]?.unitPrice?.message}
            />
          </div>
          <div className="w-full">
            <Igst control={control} errors={errors} />
          </div>
          {fields.length > 1 && (
            <button type="button" onClick={() => remove(index)} className="">
              <Trash2 className="h-4 w-4 mt-8 text-red-500 bg-red-50" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="text-progress-step bg-card-background rounded-md p-2 px-4 mt-5"
        onClick={() => append({ productName: "", sku: "", hsn: "", qty: "", unitPrice: "", igst: "" })}
      >
        + <span className="font-medium ">Add Item</span>
      </button>

      <div className="flex justify-between items-center mt-10">
        <button
          type="button"
          className="flex justify-center items-center gap-1 text-progress-step bg-card-background font-medium rounded-md p-2 px-4"
          onClick={onBack}
        >
          <span>
            <ArrowLeft className="w-4 h-4" />
          </span>
          Back
        </button>
        <button type="submit" className="text-white bg-progress-step rounded-md p-2 px-4">
          Continue
        </button>
      </div>
    </form>
  );
};

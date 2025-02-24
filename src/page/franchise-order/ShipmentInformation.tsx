import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./components/ui/Input";
import { BoxMeasurement } from "./components/BoxMeasurement";
import { Trash2 } from "lucide-react";
import { Igst } from "./components/Igst";
import { useState } from "react";
import Select from "./components/ui/Select";
import { ShipmentInformationData } from "./interface";
import { currencyOptions } from "./config/currencyOptions";
import { DateComponent } from "@/components/Date";
import { orderDetailsSchema } from "@/zod/franchiseOrderSchema";
import { getRate, validateData } from "./utils/shipmentUtils";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
interface IOrderDetailsProps {
  data: ShipmentInformationData;
  onNext: (formData: ShipmentInformationData) => void;
}

export const ShipmentInformation = ({ data, onNext }: IOrderDetailsProps) => {
  const [resError, setResError] = useState<string | null>(null);
  const shippingPincode = useSelector((state: RootState) => state.order.consigneeDetail.shippingPincode);
  const country = useSelector((state: RootState) => state.order.consigneeDetail.country);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShipmentInformationData>({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: { ...data, invoiceCurrency: "INR" },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const currency = watch("invoiceCurrency");

  const total = fields.reduce((acc, _, index) => {
    const qty = watch(`items.${index}.qty`);
    const unitPrice = watch(`items.${index}.unitPrice`);
    return acc + Number(qty) * Number(unitPrice);
  }, 0);

  const onSubmit = async (ShipmentInformationData: ShipmentInformationData) => {
    const isValid = await validateData(ShipmentInformationData, setResError);
    if (!isValid) return;
    await getRate(shippingPincode, country, watch("actualWeight"), watch("length"), watch("breadth"), watch("height"));
    onNext(ShipmentInformationData);
  };
  console.log(resError, "resError");
  console.log(errors, "errors");

  return (
    <section>
      <form action="" className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            register={register("invoiceNo")}
            labelData="Invoice No."
            placeholder="Enter Invoice Number..."
            required={true}
            type="text"
            errorName={errors.invoiceNo?.message}
          />
          <DateComponent control={control} errors={errors} />

          <div className="relative">
            <label
              htmlFor="invoiceCurrency"
              className="text-sm text-text-primary font-medium leading-none text-black/2"
            >
              Invoice Currency <span className="text-red-500 text-sm">*</span>
            </label>
            <Controller
              control={control}
              name="invoiceCurrency"
              render={({ field }) => (
                <Select
                  title="Invoice Currency"
                  options={currencyOptions}
                  value={field.value}
                  className="z-40"
                  onChange={(value) => field.onChange(value)}
                  errorName={errors.invoiceCurrency?.message}
                />
              )}
            />
          </div>
          <Input
            register={register("orderid")}
            labelData="Order/Reference ID"
            placeholder="Enter Order/Reference ID..."
            type="text"
            errorName={errors.orderid?.message}
          />
          <Input
            register={register("iossNumber")}
            labelData="IOSS Number"
            placeholder="Enter IOSS Number..."
            type="text"
            errorName={errors.iossNumber?.message}
          />
        </div>
        <BoxMeasurement register={register} errors={errors} />
        <p className="text-sm font-semibold pt-5 text-franchise-sectionp">
          Item(s) Details{" "}
          <span className="text-xs font-normal bg-franchise-tag-bg text-franchise-tag-text px-1 rounded-sm">
            Items that can export
          </span>
        </p>
        {fields.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row gap-4 md:gap-2 justify-between items-start mt-4 animate-fadeIn w-full pb-1`}
          >
            <Input
              register={register(`items.${index}.productName` as const)}
              labelData="Product Name"
              placeholder="Enter Product Name..."
              required={true}
              type="text"
              className="md:min-w-28"
              errorName={errors.items?.[index]?.productName?.message}
            />
            <Input
              register={register(`items.${index}.sku` as const)}
              labelData="SKU"
              placeholder="Enter SKU..."
              required={false}
              type="text"
              errorName={errors.items?.[index]?.sku?.message}
            />
            <Input
              register={register(`items.${index}.hsn` as const)}
              labelData="HSN"
              placeholder="Enter HSN..."
              required={true}
              type="text"
              errorName={errors.items?.[index]?.hsn?.message}
            />
            <Input
              register={register(`items.${index}.qty` as const)}
              labelData="Qty"
              placeholder="Enter Qty..."
              required={true}
              type="number"
              min={1}
              errorName={errors.items?.[index]?.qty?.message}
            />
            <Input
              register={register(`items.${index}.unitPrice` as const)}
              labelData={`Unit Price (${currency})`}
              placeholder={`Enter Unit Price (${currency})...`}
              required={true}
              type="number"
              className="md:min-w-32"
              min={1}
              errorName={errors.items?.[index]?.unitPrice?.message}
            />
            <div className={`${fields.length === 1 ? "mr-4" : "mr-0"} w-full md:w-18`}>
              <Igst control={control} errors={errors} />
            </div>

            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="">
                <Trash2 className="h-4 w-4 mt-8 text-red-500 bg-red-50" />
              </button>
            )}
          </div>
        ))}
        {resError && <p className="text-franchise-error text-xs font-medium">{resError}</p>}
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-franchise-primary font-semibold rounded-md mt-5 underline"
            onClick={() => append({ productName: "", sku: "", hsn: "", qty: "", unitPrice: "", igst: "" })}
          >
            + <span className="font-medium ">Add another Product</span>
          </button>
          <p className=" font-semibold pt-5">Total Price: {`${currency} ${total}`}</p>
        </div>

        <div className="flex justify-end py-6">
          <button
            type="submit"
            className="text-franchise-button-text bg-franchise-primary rounded-md p-2 px-4 text-sm font-medium"
          >
            Select Shipping
          </button>
        </div>
      </form>
    </section>
  );
};

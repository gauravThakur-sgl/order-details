import z from "zod";
import { orderDetailsSchema } from "../../zod/franchiseOrderSchema";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./components/ui/Input";
import { DateComponent } from "../../components/Date";
import { BoxMeasurement } from "./components/BoxMeasurement";
import { Trash2 } from "lucide-react";
import { Igst } from "./components/Igst";
import { useEffect, useState } from "react";
import apiClient from "./api/apiClient";
import Select from "./components/ui/Select";
type FormData = z.infer<typeof orderDetailsSchema> & { shippingPincode: string; country: string };

interface IOrderDetailsProps {
  data: FormData;
  onNext: (formData: FormData) => void;
}

export const ShipmentInformation = ({ data, onNext }: IOrderDetailsProps) => {
  const [resError, setResError] = useState<string | null>(null);
  console.log(data, "data");
  const country = localStorage.getItem("country");
  const shippingPincode = localStorage.getItem("pincode");
  const [rate, setRate] = useState([]);

  console.log(country, "country");
  console.log(shippingPincode, "shippingPincode");

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: data,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const currency = watch("invoiceCurrency");
  const quantities = fields.map((_, index) => watch(`items.${index}.qty`));
  const unitPrices = fields.map((_, index) => watch(`items.${index}.unitPrice`));
  // const total = Number(quantities) * Number(unitPrices);

  const total = fields.reduce((acc, _, index) => {
    const qty = watch(`items.${index}.qty`);
    const unitPrice = watch(`items.${index}.unitPrice`);
    return acc + Number(qty) * Number(unitPrice);
  }, 0);

  const onSubmit = (formData: FormData) => {
    console.log(formData, "OrderDetails formData");
    localStorage.setItem("shipperRates", JSON.stringify(rate));
    onNext(formData);
  };
  // console.log(data, "data");
  console.log(resError, "resError");
  useEffect(() => {
    const validateData = async (data: FormData) => {
      try {
        const payload = {
          csbv: "0",
          currency_code: data.invoiceCurrency,
          package_weight: data.actualWeight,
          package_height: data.height,
          package_length: data.length,
          package_breadth: data.breadth,
          vendor_order_item: data.items.map((item) => ({
            vendor_order_item_name: item.productName,
            vendor_order_item_sku: item.sku,
            vendor_order_item_quantity: item.qty,
            vendor_order_item_unit_price: item.unitPrice,
            vendor_order_item_hsn: item.hsn,
            vendor_order_item_tax_rate: item.igst,
          })),
        };
        const response = await apiClient.post("/orders/validate-order-invoice", payload);
        console.log(response.data, "response");
      } catch (error) {
        console.error("Error validating order invoice:", error);
        setResError(String(error.response.data.message));
      }
    };
    validateData(data);
  }, [data]);

  useEffect(() => {
    const getRate = async (data: FormData) => {
      try {
        const payload = {
          customer_shipping_postcode: shippingPincode,
          customer_shipping_country_code: country,
          package_weight: data.actualWeight,
          package_length: data.length,
          package_breadth: data.breadth,
          package_height: data.height,
        };
        const response = await apiClient.post("/orders/get-shipper-rates", payload);
        console.log(response.data, "response");
        setRate(response.data);
        localStorage.setItem("shipperRates", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error validating order invoice:", error);
      }
    };
    getRate(data);
  }, [data, country, shippingPincode]);
  console.log(rate, "rate");
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
          <div key={item.id} className={`flex flex-col md:flex-row gap-2 items-end mt-4 animate-fadeIn w-full`}>
            <Input
              register={register(`items.${index}.productName` as const)}
              labelData="Product Name"
              required={true}
              type="text"
              errorName={errors.items?.[index]?.productName?.message}
            />
            <Input
              register={register(`items.${index}.sku` as const)}
              labelData="SKU"
              required={false}
              type="text"
              errorName={errors.items?.[index]?.sku?.message}
            />
            <Input
              register={register(`items.${index}.hsn` as const)}
              labelData="HSN"
              required={true}
              type="text"
              errorName={errors.items?.[index]?.hsn?.message}
            />
            <Input
              register={register(`items.${index}.qty` as const)}
              labelData="Qty"
              required={true}
              type="text"
              errorName={errors.items?.[index]?.qty?.message}
            />
            <Input
              register={register(`items.${index}.unitPrice` as const)}
              labelData={`Unit Price (${currency})`}
              required={true}
              type="text"
              errorName={errors.items?.[index]?.unitPrice?.message}
            />
            <div className={`${fields.length < 1 ? "mr-4": "mr-0"}`}>
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
          <p className=" font-semibold pt-5">Total Price: {total}</p>
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

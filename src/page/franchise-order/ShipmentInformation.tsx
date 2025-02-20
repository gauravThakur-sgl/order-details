import { Controller, useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./components/ui/Input";
import { BoxMeasurement } from "./components/BoxMeasurement";
import { Trash2 } from "lucide-react";
import { Igst } from "./components/Igst";
import { useEffect, useState } from "react";
import apiClient from "./api/apiClient";
import Select from "./components/ui/Select";
import { ShipmentInformationData } from "./interface";
import { currencyOptions } from "./config/currencyOptions";
import { DateComponent } from "@/components/Date";
import { orderDetailsSchema } from "@/zod/franchiseOrderSchema";
interface IOrderDetailsProps {
  data: ShipmentInformationData;
  onNext: (formData: ShipmentInformationData) => void;
}

export const ShipmentInformation = ({ data, onNext }: IOrderDetailsProps) => {
  const [resError, setResError] = useState<string | null>(null);
  const [shippingPincode, setShippingPincode] = useState("");
  const [country, setCountry] = useState("");

  const getPincode = () => {
    const pincode = localStorage.getItem("pincode");
    return pincode;
  };
  useEffect(() => {
    const updatedPinCode = () => {
      const pincode = getPincode();
      setShippingPincode(pincode || "");
    };
    updatedPinCode();
    window.addEventListener("storage", updatedPinCode);
    return () => {
      window.removeEventListener("storage", updatedPinCode);
    };
  }, []);

  const getCountry = () => {
    const country = localStorage.getItem("country");
    return country;
  };
  useEffect(() => {
    const updatedCountry = () => {
      const country = getCountry();
      setCountry(country || "");
    };
    updatedCountry();
    window.addEventListener("storage", updatedCountry);
    return () => {
      window.removeEventListener("storage", updatedCountry);
    };
  }, []);

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

  const getRate = async () => {
    const currentActualWeight = watch("actualWeight");
    const currentLength = watch("length");
    const currentBreadth = watch("breadth");
    const currentHeight = watch("height");
    const ratePayload = {
      customer_shipping_postcode: shippingPincode,
      customer_shipping_country_code: country,
      package_weight: currentActualWeight,
      package_length: currentLength,
      package_breadth: currentBreadth,
      package_height: currentHeight,
    };
    try {
      const response = await apiClient.post("/orders/get-shipper-rates", ratePayload);
      console.log(response.data, "Shipper Rates Response");
      localStorage.setItem("shipperRates", JSON.stringify(response.data.data));
      window.dispatchEvent(new Event("storage"));
      console.log(response.data, "rate from response");
    } catch (error) {
      console.error("Error in getting Shipper Rate:", error);
    }
  };

  const validateData = async (data: ShipmentInformationData) => {
    const validatePayload = {
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
    try {
      const response = await apiClient.post("/orders/validate-order-invoice", validatePayload);
      setResError(null);
      console.log(response.data, "Validation successful.");
      return true;
    } catch (error) {
      setResError(String(error.response?.data?.message || "Validation error."));
      console.error("Error validating order invoice:", error);
      return false;
    }
  };

  const onSubmit = async (ShipmentInformationData: ShipmentInformationData) => {
    const isValid = await validateData(ShipmentInformationData);
    if (!isValid) return;
    await getRate();
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
          <div
            key={item.id}
            className={`flex flex-col md:flex-row gap-2 justify-between items-start mt-4 animate-fadeIn w-full pb-1`}
          >
            <Input
              register={register(`items.${index}.productName` as const)}
              labelData="Product Name"
              required={true}
              type="text"
              className="md:min-w-28"
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
              className="md:min-w-32"
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
            className="text-franchise-button-text bg-franchise-primary rounded-md p-1 px-4 font-medium text-lg"
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

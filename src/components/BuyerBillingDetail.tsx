import { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { countryData } from "../config/countryState";
import { Controller, Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { orderSchema } from "../zod/ordersSchema";

type BillingData = z.infer<typeof orderSchema>;

interface BuyerBillingDetailProps {
  control: Control<BillingData>;
  register: UseFormRegister<BillingData>;
  errors: FieldErrors<BillingData>;
}

export const BuyerBillingDetail = ({ control, register, errors }: BuyerBillingDetailProps) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const countryList = countryData.map((country) => ({
    label: country.name,
    value: country.name,
  }));

  const getStateList = (countryName: string) => {
    const country = countryData.find((country) => country.name === countryName);
    if (!country) return [];
    return country.states.map((state) => ({
      label: state.name,
      value: state.name,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
      <span className="pt-10 font-semibold text-basis flex justify-start w-full">
        <h3>Buyer Billing Details</h3>
      </span>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2 w-full">
        <div className="w-full">
          <Input
            register={register("billingfirstName")}
            required={true}
            type="text"
            id="billingfirstName"
            labelData="First name"
            errorName={errors.billingfirstName?.message}
          />
        </div>
        <div className="w-full">
          <Input
            register={register("billinglastName")}
            type="text"
            id="billinglastName"
            labelData="Last name"
            required={true}
            errorName={errors.billinglastName?.message}
          />
        </div>
        <div className="w-full">
          <Input
            register={register("billingmobileNumber")}
            type="text"
            required={true}
            labelData="Mobile No"
            errorName={errors.billingmobileNumber?.message}
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="billingCountry" className="text-sm font-medium">
          Country <span className="text-red-500">*</span>
        </label>
        <Controller
          control={control}
          name="billingCountry"
          render={({ field }) => (
            <Select
              title="Select Country"
              options={countryList}
              value={field.value}
              onChange={(value) => {
                setSelectedCountry(value);
                field.onChange(value);
              }}
              errorName={errors.billingCountry?.message}
            />
          )}
        />
        {errors.billingCountry && <p className="text-red-500 text-sm">{errors.billingCountry.message}</p>}
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-4">
        <div className="w-full">
          <Input
            register={register("billingAddress1")}
            type="text"
            required={true}
            labelData="Address 1"
            errorName={errors.billingAddress1?.message}
          />
        </div>
        <div className="w-full">
          <Input
            register={register("billingLandMark")}
            type="text"
            labelData="Landmark"
            errorName={errors.billingLandMark?.message}
          />
        </div>
      </div>
      <div className="w-full">
        <Input
          register={register("billingAddress2")}
          type="text"
          required={true}
          className="w-full"
          labelData="Address 2"
          errorName={errors.billingAddress2?.message}
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-4">
        <div className="w-full">
          <Input
            register={register("billingPincode")}
            type="text"
            required={true}
            labelData="Pincode"
            errorName={errors.billingPincode?.message}
          />
        </div>
        <div className="w-full">
          <Input
            register={register("billingcity")}
            type="text"
            required={true}
            labelData="City"
            errorName={errors.billingcity?.message}
          />
        </div>
        <div className="w-full">
          <label htmlFor="billingState" className="text-sm font-medium">
            State <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="billingState"
            render={({ field }) => (
              <Select
                title="Select State"
                options={getStateList(selectedCountry)}
                value={field.value}
                onChange={(value) => {
                  setSelectedState(value);
                  field.onChange(value);
                }}
                required={true}
                errorName={errors.billingState?.message}
              />
            )}
          />
          {errors.billingState && <p className="text-red-500 text-sm">{errors.billingState.message}</p>}
        </div>
      </div>
    </div>
  );
};

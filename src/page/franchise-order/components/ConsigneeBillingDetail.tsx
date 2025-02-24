import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { orderSchema } from "@/zod/franchiseOrderSchema";
import Input from "../components/ui/Input";
import Select from "./ui/Select";
import { useCountries, useStates } from "../hooks/countryState";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setFormData } from "@/app/features/order/orderSlice";

type BillingData = z.infer<typeof orderSchema>;
interface ConsigneeBillingDetailProps {
  register: UseFormRegister<BillingData>;
  errors: FieldErrors<BillingData>;
  control: Control<BillingData>;
  setValue: UseFormSetValue<BillingData>;
}
export const ConsigneeBillingDetail = ({ register, errors, control, setValue }: ConsigneeBillingDetailProps) => {
  const dispatch = useDispatch();
  const { countries } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const { states } = useStates(selectedCountry);

  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  }));
  const stateOptions = states.map((state) => ({
    value: state.code,
    label: state.name,
  }));
  const savedCountry = useSelector((state: RootState) => state.order.consigneeDetail.billingCountry);
  const savedState = useSelector((state: RootState) => state.order.consigneeDetail.billingState);

  useEffect(() => {
    if (savedCountry) {
      setSelectedCountry(savedCountry);
      setValue("billingCountry", savedCountry);
    }

    if (savedState) {
      setValue("billingState", savedState);
    }
  }, [savedCountry, savedState, setValue]);

  return (
    <section className="mt-5">
      <h2 className="text-sm font-semibold">Buyer Shipping Details</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-3 justify-start items-center gap-4 mt-2 `}>
        <Input
          register={register("billingfirstName")}
          type="text"
          required={true}
          labelData="First Name"
          placeholder="Enter First name . . ."
          errorName={errors.billingfirstName?.message}
        />
        <Input
          register={register("billinglastName")}
          type="text"
          required={true}
          labelData="Last Name"
          placeholder="Enter Last name . . ."
          errorName={errors.billinglastName?.message}
        />
        <Input
          register={register("billingmobileNumber")}
          type="text"
          required={true}
          labelData="Mobile Number"
          placeholder="Enter Mobile number . . ."
          errorName={errors.billingmobileNumber?.message}
        />
        <Input
          register={register("billingAddress1")}
          type="text"
          required={true}
          labelData="Address 1"
          placeholder="Address 1 . . ."
          errorName={errors.billingAddress1?.message}
        />
        <Input
          register={register("billingLandMark")}
          type="text"
          labelData="Landmark"
          placeholder="Landmark . . ."
          errorName={errors.billingLandMark?.message}
        />
        <Input
          register={register("billingAddress2")}
          type="text"
          required={true}
          className="w-full"
          labelData="Address 2"
          placeholder="Address 2 . . ."
          errorName={errors.billingAddress2?.message}
        />
        <div>
          <label htmlFor="billingCountry" className="text-franchise-sectionp text-sm">
            Country <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="billingCountry"
            render={({ field }) => (
              <Select
                title="Country"
                options={countryOptions}
                value={field.value}
                onChange={(value) => {
                  setSelectedCountry(value);
                  field.onChange(value);
                  const selectedCountryOption = countryOptions.find((option) => option.value === value);
                  dispatch(setFormData({ billingCountry: selectedCountryOption?.label || "" }));
                }}
                errorName={errors.country?.message}
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="billingState" className="text-franchise-sectionp text-sm">
            State <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="billingState"
            render={({ field }) => (
              <Select
                title="Select State"
                options={stateOptions}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                errorName={errors.country?.message}
              />
            )}
          />
        </div>
        <Input
          register={register("billingcity")}
          type="text"
          required={true}
          labelData="City"
          placeholder="City . . ."
          errorName={errors.billingcity?.message}
        />
        <Input
          register={register("billingPincode")}
          type="text"
          required={true}
          labelData="Pincode"
          placeholder="Pincode . . ."
          errorName={errors.billingPincode?.message}
        />
      </div>
    </section>
  );
};

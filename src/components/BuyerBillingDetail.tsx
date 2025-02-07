import { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { countryData } from "../config/countryState";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { orderSchema } from "../zod/ordersSchema";

type BillingData = z.infer<typeof orderSchema>;

export const BuyerBillingDetail = () => {
  const {
    register,
    formState: { errors },
  } = useForm<BillingData>();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const countryList = countryData.map((country) => ({
    label: country.name,
    value: country.name,
  }));
  const getStateList = (countryName: string) => {
    const country = countryData.find((country) => country.name === countryName);
    if (!country) return [];

    return country.states.map((state) => {
      return {
        label: state.name,
        value: state.name,
      };
    });
  };
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    setSelectedState(""); // Reset selected state when country changes
  };

  const stateList = getStateList(selectedCountry);
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
      <span className="pt-10 font-semibold text-basis flex justify-start w-full">
        <h3>Buyer Billing Details</h3>
      </span>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2 w-full">
        <div className="w-full">
          <Input
            {...register("billingfirstName")}
            type="text"
            placeholder=""
            id="billingfirstName"
            labelData="First name"
          />
          {errors.billingfirstName && <p className="text-red-500 text-sm">{String(errors.billingfirstName.message)}</p>}
        </div>
        <div className="w-full">
          <Input
            {...register("billinglastName")}
            type="text"
            placeholder=""
            id="billinglastName"
            labelData="Last name"
          />
          {errors.billinglastName && <p className="text-red-500 text-sm">{String(errors.billinglastName.message)}</p>}
        </div>{" "}
        <div className="w-full">
          <Input
            {...register("billingmobileNumber")}
            type="text"
            placeholder=""
            required={true}
            className=""
            labelData="Mobile No"
          />
          {errors.billingmobileNumber && (
            <p className="text-red-500 text-sm">{String(errors.billingmobileNumber.message)}</p>
          )}
        </div>
      </div>
      <div className="w-full">
        <Select
          {...register("billingCountry")}
          title="Select Country"
          id=""
          options={countryList}
          value={selectedCountry}
          onChange={handleCountryChange}
        />
        {errors.billingCountry && <p className="text-red-500 text-sm">{String(errors.billingCountry.message)}</p>}
      </div>
      <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
        <div className="w-full">
          <Input
            {...register("billingAddress1")}
            type="text"
            placeholder=""
            required={true}
            className=""
            labelData="Address 1"
            name="address1"
          />
          {errors.billingAddress1 && <p className="text-red-500 text-sm">{String(errors.billingAddress1.message)}</p>}
        </div>
        <div className="w-full">
          <Input
            type="text"
            placeholder=""
            // required="*"
            className=""
            labelData="Landmark"
            name="landMark"
          />
        </div>
      </div>
      <div className="w-full">
        <Input
          {...register("billingAddress2")}
          type="text"
          placeholder=""
          required={true}
          className="w-full"
          labelData="Address 2"
          name="address2"
        />
        {errors.billingAddress2 && <p className="text-red-500 text-sm">{String(errors.billingAddress2.message)}</p>}
      </div>

      <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
        <div className="w-full">
          <Input
            {...register("billingPincode")}
            type="text"
            placeholder=""
            required={true}
            className=""
            labelData="pincode"
            name="pincode"
          />
          {errors.billingPincode && <p className="text-red-500 text-sm">{String(errors.billingPincode.message)}</p>}
        </div>
        <div className="w-full">
          <Input
            {...register("billingcity")}
            type="text"
            placeholder=""
            required={true}
            className=""
            labelData="City"
            name="city"
          />
          {errors.billingcity && <p className="text-red-500 text-sm">{String(errors.billingcity.message)}</p>}
        </div>{" "}
        <div className="w-full mt-5">
          <Select
            {...register("billingState")}
            title="State"
            id=""
            options={stateList}
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          />
          {errors.billingState && <p className="text-red-500 text-sm">{String(errors.billingState.message)}</p>}
        </div>
      </div>
    </div>
  );
};

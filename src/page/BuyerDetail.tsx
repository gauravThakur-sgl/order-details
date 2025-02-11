import { useState, useEffect } from "react";
import { PickupAddress } from "../components/PickupAddress";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "../zod/ordersSchema";
import { z } from "zod";
import { countryData } from "../config/countryState";
import { BuyerBillingDetail } from "../components/BuyerBillingDetail";
import { Check } from "lucide-react";

type FormData = z.infer<typeof orderSchema>;

interface IBuyerDetailProps {
  data: FormData;
  onNext: (formData: FormData) => void;
}

export const BuyerDetail = ({ onNext, data }: IBuyerDetailProps) => {
  const [isChecked, setIsChecked] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: FormData) => {
    if (isChecked) {
      formData.billingfirstName = formData.firstName;
      formData.billinglastName = formData.lastName;
      formData.billingmobileNumber = formData.mobileNumber;
      formData.billingCountry = formData.country;
      formData.billingAddress1 = formData.address1;
      formData.billingAddress2 = formData.address2;
      formData.billingLandMark = formData.landMark;
      formData.billingcity = formData.shippingcity;
      formData.billingPincode = formData.shippingPincode;
      formData.billingState = formData.shippingState;
    }
    console.log(formData, "formData After filling the form");
    onNext(formData);
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const shippingFields = watch([
    "firstName",
    "lastName",
    "mobileNumber",
    "country",
    "address1",
    "address2",
    "landMark",
    "shippingcity",
    "shippingPincode",
    "shippingState",
  ]);
  useEffect(() => {
    if (isChecked) {
      setValue("billingfirstName", shippingFields[0]);
      setValue("billinglastName", shippingFields[1]);
      setValue("billingmobileNumber", shippingFields[2]);
      setValue("billingCountry", shippingFields[3]);
      setValue("billingAddress1", shippingFields[4]);
      setValue("billingAddress2", shippingFields[5]);
      setValue("billingLandMark", shippingFields[6]);
      setValue("billingcity", shippingFields[7]);
      setValue("billingPincode", shippingFields[8]);
      setValue("billingState", shippingFields[9]);
    }
  }, [isChecked, shippingFields, setValue]);

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

  console.log(errors, "errors");
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="font-poppins flex flex-col items-center gap-8">
        <PickupAddress control={control} errors={errors} />
        <span className="pt-5 font-semibold text-basis flex justify-start w-full">
          <h3>Buyer Shipping Details</h3>
        </span>
        <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-2 w-full">
          <div className="w-full">
            <Input
              register={register("firstName")}
              type="text"
              id="firstName"
              labelData="First name"
              required={true}
              errorName={errors.firstName?.message}
            />
          </div>
          <div className="w-full">
            <Input
              register={register("lastName")}
              type="text"
              required={true}
              labelData="Last Name"
              errorName={errors.lastName?.message}
            />
          </div>
          <div className="w-full">
            <Input
              register={register("mobileNumber")}
              type="text"
              required={true}
              labelData="Mobile No"
              errorName={errors.mobileNumber?.message}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-2 w-full ">
          <div className="w-full lg:w-auto">
            <Input
              register={register("alternateMobileNumber")}
              type="text"
              labelData="Alternate Mobile No."
              errorName={errors.alternateMobileNumber?.message}
            />
          </div>
          <div className="w-full">
            <Input
              register={register("email")}
              type="email"
              labelData="Email Id."
              required={true}
              errorName={errors.email?.message}
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="country" className="text-sm font-medium">
            Country <span className="text-red-500 text-sm">*</span>
          </label>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select
                title="Select Country"
                options={countryList}
                value={field.value}
                onChange={(value) => {
                  setSelectedCountry(value);
                  field.onChange(value);
                }}
                errorName={errors.country?.message}
              />
            )}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
          <div className="w-full">
            <Input
              register={register("address1")}
              type="text"
              required={true}
              labelData="Address 1"
              errorName={errors.address1?.message}
            />
          </div>
          <div className="w-full">
            <Input
              register={register("landMark")}
              type="text"
              labelData="Landmark"
              errorName={errors.landMark?.message}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            register={register("address2")}
            type="text"
            required={true}
            labelData="Address 2"
            errorName={errors.address2?.message}
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between items-start gap-2">
          <div className="w-full">
            <Input
              register={register("shippingPincode")}
              type="text"
              required={true}
              labelData="Pincode"
              errorName={errors.shippingPincode?.message}
            />
          </div>
          <div className="w-full">
            <Input
              register={register("shippingcity")}
              type="text"
              required={true}
              labelData="City"
              errorName={errors.shippingcity?.message}
            />
          </div>
          <div className="w-full">
            <label htmlFor="state" className="text-sm font-medium">
              State <span className="text-red-500 text-sm">*</span>
            </label>
            <Controller
              control={control}
              name="shippingState"
              render={({ field }) => (
                <Select
                  title="Select State"
                  options={getStateList(selectedCountry)}
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e);
                    field.onChange(e);
                  }}
                  required={true}
                  errorName={errors.shippingState?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-start items-center text-sm gap-2 mt-6 w-full">
          <span onClick={handleCheckBox} className="relative flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="peer h-5 w-5 rounded-sm border border-gray-800 text-white appearance-none checked:bg-progress-step checked:border-transparent checked:focus:ring-0"
              checked={isChecked}
              {...register("isChecked")}
            />
            <span className="absolute text-transparent peer-checked:text-white"><Check className="h-5 w-5 "/></span>
            <p>Shipping & Billing Address are same.</p>
          </span>
        </div>
        {!isChecked && <BuyerBillingDetail control={control} register={register} errors={errors} />}
      </div>
      <div className="flex justify-end mt-4">
        <button type="submit" className="text-white bg-progress-step rounded-md p-2 px-4 font-medium text-base">
          Continue
        </button>
      </div>
    </form>
  );
};

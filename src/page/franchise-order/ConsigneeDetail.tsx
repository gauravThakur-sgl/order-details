import { Check } from "lucide-react";
import Input from "@/page/franchise-order/components/ui/Input";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConsigneeBillingDetail } from "@/page/franchise-order/components/ConsigneeBillingDetail";
import { useCountries, useStates } from "@/page/franchise-order/hooks/countryState";
import Select from "@/page/franchise-order/components/ui/Select";
import { FormData } from "@/page/franchise-order/interface";
import { orderSchema } from "@/zod/franchiseOrderSchema";

interface IBuyerDetailProps {
  data: FormData;
  onNext: (formData: FormData) => void;
}

export const ConsigneeDetail = ({ data, onNext }: IBuyerDetailProps) => {
  const [isChecked, setIsChecked] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

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

  const { countries } = useCountries();
  const { states } = useStates(selectedCountry);

  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.code,
    label: state.name,
  }));

  useEffect(() => {
    const savedCountry = localStorage.getItem("country");
    const savedState = localStorage.getItem("shippingState");

    if (savedCountry) {
      setSelectedCountry(savedCountry);
      setValue("country", savedCountry);
    }

    if (savedState) {
      setValue("shippingState", savedState);
    }
  }, [setValue]);

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
    localStorage.setItem("isChecked", JSON.stringify(!isChecked));
  };

  const onSubmit = (formData: FormData) => {
    localStorage.setItem("country", formData.country);
    localStorage.setItem("pincode", formData.shippingPincode);
    window.dispatchEvent(new Event("storage"));
    localStorage.setItem("billingCountry", formData.billingCountry);
    window.dispatchEvent(new Event("storage"));
    localStorage.setItem("billingState", formData.billingState);
    window.dispatchEvent(new Event("storage"));
    onNext(formData);
  };

  const shippingFields = watch([
    "firstName",
    "lastName",
    "mobileNumber",
    "email",
    "address1",
    "address2",
    "landMark",
    "country",
    "shippingState",
    "shippingcity",
    "shippingPincode",
  ]);

  useEffect(() => {
    if (isChecked) {
      setValue("billingfirstName", shippingFields[0] || "");
      setValue("billinglastName", shippingFields[1] || "");
      setValue("billingmobileNumber", shippingFields[2] || "");
      setValue("billingCountry", shippingFields[7] || "");
      setValue("billingAddress1", shippingFields[4] || "");
      setValue("billingAddress2", shippingFields[5] || "");
      setValue("billingLandMark", shippingFields[6] || "");
      setValue("billingcity", shippingFields[9] || "");
      setValue("billingPincode", shippingFields[10] || "");
      setValue("billingState", shippingFields[8] || "");
    }
  }, [isChecked, shippingFields, setValue]);
  return (
    <div className="w-full">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-sm font-semibold text-franchise-sectionp">Personal Details</h2>
        <div className={`grid grid-cols-1 sm:grid-cols-3 justify-start items-start gap-6 mt-2 `}>
          <Input
            register={register("firstName")}
            type="text"
            labelData="First Name"
            required={true}
            placeholder="Enter First name . . ."
            errorName={errors.firstName?.message}
          />
          <Input
            register={register("lastName")}
            type="text"
            labelData="Last Name"
            required={true}
            placeholder="Enter Last name . . ."
            errorName={errors.lastName?.message}
          />
          <Input
            register={register("mobileNumber")}
            type="text"
            labelData="Mobile Number"
            required={true}
            placeholder="Enter Mobile Number . . ."
            errorName={errors.mobileNumber?.message}
          />
          <Input
            register={register("email")}
            type="email"
            labelData="Email Address"
            required={true}
            placeholder="Enter Email . . ."
            errorName={errors.email?.message}
          />
        </div>
        <h2 className="text-sm font-semibold mt-5 text-franchise-sectionp"> Shipping Address</h2>
        <div className={`grid grid-cols-1 sm:grid-cols-3 justify-start items-start gap-4 mt-2`}>
          <Input
            register={register("address1")}
            type="text"
            labelData="Address1"
            required={true}
            placeholder="Enter Address1 . . ."
            errorName={errors.address1?.message}
          />
          <Input
            register={register("address2")}
            type="text"
            labelData="Address2"
            required={true}
            placeholder="Enter Address2 . . ."
            errorName={errors.address2?.message}
          />
          <Input
            register={register("landMark")}
            type="text"
            labelData="LandMark"
            placeholder="Enter LandMark . . ."
            errorName={errors.landMark?.message}
          />
          <div>
            <label htmlFor="billingCountry" className="text-franchise-sectionp text-sm">
              Country <span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select
                  title="Country"
                  placeholder="Search country..."
                  options={countryOptions}
                  value={field.value}
                  onChange={(value) => {
                    setSelectedCountry(value);
                    field.onChange(value);
                    // Save selected country to localStorage
                    const selectedCountryOption = countryOptions.find((option) => option.value === value);
                    localStorage.setItem("country", value);
                    localStorage.setItem("countryName", selectedCountryOption?.label || "");
                    window.dispatchEvent(new Event("storage"));
                  }}
                  errorName={errors.country?.message}
                />
              )}
            />
          </div>
          <div>
            <label htmlFor="billingCountry" className="text-franchise-sectionp text-sm">
              State <span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="shippingState"
              render={({ field }) => (
                <Select
                  title="Select State"
                  placeholder="Search state..."
                  options={stateOptions}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    // Save selected state to localStorage
                    localStorage.setItem("shippingState", value);
                    window.dispatchEvent(new Event("storage"));
                  }}
                  errorName={errors.country?.message}
                />
              )}
            />
          </div>
          <Input
            register={register("shippingcity")}
            type="text"
            required={true}
            labelData="City"
            placeholder="Enter City . . ."
            errorName={errors.shippingcity?.message}
          />
          <Input
            register={register("shippingPincode")}
            type="text"
            required={true}
            labelData="Pincode"
            placeholder="Enter Pincode . . ."
            errorName={errors.shippingPincode?.message}
          />
        </div>
        <div className="flex justify-start items-center text-sm gap-2 mt-6 w-full">
          <span onClick={handleCheckBox} className="relative flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="peer h-4 w-4 rounded-sm border border-gray-800 text-white appearance-none checked:bg-franchise-primary checked:border-transparent checked:focus:ring-0"
              checked={isChecked}
              {...register("isChecked")}
            />
            <span className="absolute text-transparent peer-checked:text-white">
              <Check className="h-4 w-4 " />
            </span>
            <p>Shipping & Billing Address are same.</p>
          </span>
        </div>
        {!isChecked && (
          <ConsigneeBillingDetail register={register} errors={errors} control={control} setValue={setValue} />
        )}{" "}
        {/* renders consignee as according to the checkbox*/}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="text-franchise-button-text bg-franchise-primary text-sm rounded-md py-2 px-4 font-medium"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

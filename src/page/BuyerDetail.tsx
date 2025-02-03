import { useEffect, useState } from "react";
import { PickupAddress } from "../components/PickupAddress";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { BuyerBillingDetail } from "../components/BuyerBillingDetail";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "../zod/ordersSchema";
import { z } from "zod";
import { countryData } from "../config/countryState";

type FormData = z.infer<typeof orderSchema>;
interface BuyerDetailProps {
  data: FormData;
  onNext: (data: FormData) => void;
}
export const BuyerDetail = ({ data, onNext }: BuyerDetailProps) => {
  const [isChecked, setIsChecked] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [formData, setFormData] = useState<FormData>({} as FormData);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: data,
  });

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key as keyof FormData, data[key as keyof FormData]);
      });
    }
  }, [data, setValue]);

  const onSubmit = (formData: FormData) => {
    console.log(data, "data");
    onNext(formData);
  };

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
  };
  console.log(formData, "formData");
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="font-poppins flex flex-col items-center gap-8">
        <PickupAddress />
        <span className="pt-5 font-semibold text-basis flex justify-start w-full">
          <h3>Buyer Shipping Details</h3>
        </span>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-2 w-full">
          <div className="flex flex-col">
            <Input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              id="firstName"
              labelData="First name"
              onChange={handleOnChange}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{String(errors.firstName.message)}</p>}{" "}
          </div>
          <div className="flex flex-col">
            <Input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              required={true}
              className=""
              labelData="Last Name"
              onChange={handleOnChange}
            />

            {errors.lastName && <p className="text-red-500 text-sm">{String(errors.lastName.message)}</p>}
          </div>
          <div className="flex flex-col">
            <Input
              {...register("mobileNumber")}
              type="text"
              placeholder="Mobile No"
              required={true}
              className=""
              labelData="Mobile No"
              onChange={handleOnChange}
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm">{String(errors.mobileNumber.message)}</p>}{" "}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-2 w-full ">
          <div className="w-full lg:w-auto">
            <Input
              {...register("alternateMobileNumber")}
              type="text"
              placeholder=""
              className="w-full"
              labelData="Alternate Mobile No."
              name="alternateMobileNumber"
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full">
            <Input
              {...register("email")}
              type="email"
              placeholder=""
              className="w-full"
              labelData="Email Id."
              name="email"
              required={true}
              onChange={handleOnChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}{" "}
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="country" className="text-sm font-medium">
            Country <span className="text-red-500 text-sm">*</span>
          </label>
          <Select
            {...register("country")}
            title="Select Country"
            id=""
            options={countryList}
            value={selectedCountry}
            onChange={handleCountryChange}
          />
          {errors.country && <p className="text-red-500 text-sm">{String(errors.country.message)}</p>}{" "}
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
          <div className="w-full">
            <Input
              {...register("address1")}
              type="text"
              placeholder=""
              required={true}
              className=""
              labelData="Address 1"
              name="address1"
              onChange={handleOnChange}
            />
            {errors.address1 && <p className="text-red-500 text-sm">{String(errors.address1.message)}</p>}{" "}
          </div>
          <div className="w-full">
            <Input
              type="text"
              placeholder=""
              // required="*"
              className=""
              labelData="Landmark"
              name="landMark"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            {...register("address2")}
            type="text"
            placeholder=""
            required={true}
            className="w-full"
            labelData="Address 2"
            name="address2"
            onChange={handleOnChange}
          />
          {errors.address2 && <p className="text-red-500 text-sm">{String(errors.address2.message)}</p>}{" "}
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between gap-2">
          <div className="w-full">
            <Input
              {...register("shippingPincode")}
              type="text"
              placeholder=""
              required={true}
              className=""
              labelData="pincode"
              name="pincode"
              onChange={handleOnChange}
            />
            {errors.shippingPincode && <p className="text-red-500 text-sm">{String(errors.shippingPincode.message)}</p>}{" "}
          </div>
          <div className="w-full">
            <Input
              {...register("shippingcity")}
              type="text"
              placeholder=""
              required={true}
              className=""
              labelData="City"
              name="city"
              onChange={handleOnChange}
            />
            {errors.shippingcity && <p className="text-red-500 text-sm">{String(errors.shippingcity.message)}</p>}{" "}
          </div>
          <div className="w-full">
            <label htmlFor="country" className="text-sm font-medium">
              Country <span className="text-red-500 text-sm">*</span>
            </label>
            <Select
              {...register("shippingState")}
              title="Select State"
              id=""
              options={getStateList(selectedCountry)}
              value={selectedState}
              className=""
              onChange={(e) => setSelectedState(e.target.value)}
              required={true}
            />
            {errors.shippingState && <p className="text-red-500 text-sm">{String(errors.shippingState.message)}</p>}{" "}
          </div>
        </div>
        <div className="flex justify-start items-center text-sm gap-2 mt-6 w-full">
          <span onClick={handleCheckbox} className="flex gap-2">
            <input type="checkbox" checked={isChecked} />
            <p>Shipping & Billing Address are same.</p>
          </span>
        </div>
        {!isChecked && <BuyerBillingDetail />}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

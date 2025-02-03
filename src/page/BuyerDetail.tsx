import { useState } from "react";
import { PickupAddress } from "../components/PickupAddress";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { BuyerBillingDetail } from "../components/BuyerBillingDetail";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "../zod/ordersSchema";
import { z } from "zod";

type FormData = z.infer<typeof orderSchema>;
export const BuyerDetail = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [formData, setFormData] = useState<FormData>({} as FormData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data, "data");
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
  const countryList = [
    {
      label: "Usa",
      value: "Usa",
    },
  ];
  const stateList = [
    {
      label: "new-york",
      value: "new-york", // import CheckBox from "../components/ui/Checkbox";
    },
    {
      label: "Ohio",
      value: "Ohio",
    },
  ];
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
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  labelData="First name"
                  onChange={handleOnChange}
                />
              )}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{String(errors.firstName.message)}</p>}{" "}
          </div>
          <div className="flex flex-col">
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Last Name"
                  required={true}
                  className=""
                  labelData="Last Name"
                />
              )}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{String(errors.lastName.message)}</p>}
          </div>
          <div className="flex flex-col">
            <Controller
              name="mobileNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Mobile No"
                  required={true}
                  className=""
                  labelData="Mobile No"
                  onChange={handleOnChange}
                />
              )}
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm">{String(errors.mobileNumber.message)}</p>}{" "}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-2 w-full ">
          <div className="w-full lg:w-auto">
            <Input type="text" placeholder="" className="w-full" labelData="Alternate Mobile No." name="mobileNumber" />
          </div>
          <div className="w-full">
            <Input type="email" placeholder="" className="w-full" labelData="Email Id." name="email" required={true} />
          </div>
        </div>
        <div className="w-full">
          <Select
            title="Select Country"
            id=""
            options={countryList}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
          <div className="w-full">
            <Input type="text" placeholder="" required={true} className="" labelData="Address 1" name="address1" />
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
          <Input type="text" placeholder="" required={true} className="w-full" labelData="Address 2" name="address2" />
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between gap-2">
          <div className="w-full">
            <Input type="text" placeholder="" required={true} className="" labelData="pincode" name="pincode" />
          </div>
          <div className="w-full">
            <Input type="text" placeholder="" required={true} className="" labelData="City" name="city" />
          </div>
          <div className="w-full">
            <Select
              title="Select State"
              id=""
              options={stateList}
              value={selectedState}
              className="mt-5"
              onChange={(e) => setSelectedState(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-start items-center text-sm gap-2 mt-6 w-full">
          <span onClick={handleCheckbox} className="flex gap-2">
            <input type="checkbox" checked={isChecked} />
            <p>Shipping & Billing Address are same.</p>
          </span>
        </div>
        {!isChecked && <BuyerBillingDetail />}
        {/* <div className="flex justify-end items-center gap-4 mt-4">
          <button
            type="submit"
            className="text-white bg-progress-step rounded-md p-2 px-4 font-semibold text-base"
            onClick={handleSubmit(onSubmit)}
          >
            Continue
          </button>
        </div> */}
      </div>
    </form>
  );
};

import { Check } from "lucide-react";
import Input from "../../../components/ui/Input";
import { Accordion } from "./Accordion";
import { useState } from "react";
import z from "zod";
import { orderSchema } from "../../../zod/ordersSchema";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsigneeBillingDetail } from "./ConsigneeBillingDetail";
type FormData = z.infer<typeof orderSchema>;
interface IBuyerDetailProps {
  data: FormData;
  onNext: (formData: FormData) => void;
}

export const ConsigneeDetail = ({ data, onNext }: IBuyerDetailProps) => {
  const [isChecked, setIsChecked] = useState(true);
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

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };
  const onSubmit = () => {};
  return (
    <div className="w-full">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          items={[
            {
              title: "Consignee Details",
            },
          ]}
        >
          <h2 className="text-sm font-semibold"> Personal Details</h2>
          <div className={`grid grid-cols-1 sm:grid-cols-3 justify-start items-center gap-4 mt-2 `}>
            <Input
              register={register("firstName")}
              type="text"
              labelData="First Name"
              required={true}
              placeholder="Enter First name . . ."
              errorName={errors.shippingcity?.message}
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
              labelData="Email Id"
              required={true}
              placeholder="Enter Email . . ."
              errorName={errors.email?.message}
            />
          </div>
          <h2 className="text-sm font-semibold mt-5"> Shipping Address</h2>
          <div className={`grid grid-cols-1 sm:grid-cols-3 justify-start items-center gap-4 mt-2`}>
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
            <Input type="text" labelData="Country" required={true} placeholder="Country . . ." />
            <Input type="text" labelData="state" required={true} placeholder="state . . ." />
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
          {isChecked && <ConsigneeBillingDetail register={register} errors={errors} />}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="text-franchise-button-text bg-franchise-primary rounded-md p-2 px-6 font-medium text-lg"
            >
              Continue
            </button>
          </div>
        </Accordion>
      </form>
    </div>
  );
};

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { orderSchema } from "../../../zod/ordersSchema";
import Input from "../../../components/ui/Input";

type BillingData = z.infer<typeof orderSchema>;
interface ConsigneeBillingDetailProps {
  register: UseFormRegister<BillingData>;
  errors: FieldErrors<BillingData>;
}
export const ConsigneeBillingDetail = ({ register, errors }: ConsigneeBillingDetailProps) => {
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
        <Input type="text" labelData="Country" required={true} placeholder="Country . . ." />
        <Input type="text" labelData="state" required={true} placeholder="state . . ." />
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

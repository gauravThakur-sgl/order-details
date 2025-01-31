import { useState } from "react";
import { PickupAddress } from "../components/PickupAddress";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { BuyerBillingDetail } from "../components/BuyerBillingDetail";
// import CheckBox from "../components/ui/Checkbox";

export const BuyerDetail = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
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
      value: "new-york",
    },
    {
      label: "Ohio",
      value: "Ohio",
    },
  ];
  return (
    <div className="font-poppins flex flex-col justify-center items-center bg-white rounded-md p-8 gap-8 m-4">
      <PickupAddress />
      <span className=" font-semibold text-basis flex justify-start">
        <h3>Buyer Shipping Details</h3>
      </span>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2 w-full">
        <Input type="text" placeholder="First Name" id="firstName" labelData="First name" />
        <Input type="text" placeholder="" required={true} className="" labelData="Last Name" name="lastName" />
        <Input type="text" placeholder="" required={true} className="" labelData="Mobile No" name="mobileNumber" />
      </div>
      <div className="flex flex-col lg:justify-between items-center gap-2 w-full ">
        <div className="w-full">
          <Input type="text" placeholder="" className="w-full" labelData="Alternate Mobile No." name="mobileNumber" />
        </div>
        <div className="w-full">
          <Input
            type="email"
            placeholder=""
            className="w-full"
            labelData="Enter your Email."
            name="email"
            required={true}
          />
        </div>
      </div>
      <div className="w-full">
        <Select title="Select Country" id="" options={countryList} value="" />
      </div>
      <div className="flex flex-col lg:flex-row justify-between w-full gap-2">
        <Input type="text" placeholder="" required={true} className="" labelData="Address 1" name="address1" />
        <Input
          type="text"
          placeholder=""
          // required="*"
          className=""
          labelData="Landmark"
          name="landMark"
        />
      </div>
      <div className="w-full">
        <Input type="text" placeholder="" required={true} className="w-full" labelData="Address 2" name="address2" />
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between gap-2">
        <Input type="text" placeholder="" required={true} className="" labelData="pincode" name="pincode" />
        <Input type="text" placeholder="" required={true} className="" labelData="City" name="city" />
        <Input type="text" placeholder="" className="" labelData="State" name="state" required={true} />
        <Select title="State" id="" options={stateList} value="" />
      </div>
      <div className="flex justify-start items-center text-sm gap-2 mt-6 w-full">
        <span onClick={handleCheckbox} className="flex gap-2">
          <input type="checkbox" checked={isChecked} />
          <p>Shipping & Billing Address are same.</p>
        </span>
      </div>
      {!isChecked && <BuyerBillingDetail />}
    </div>
  );
};

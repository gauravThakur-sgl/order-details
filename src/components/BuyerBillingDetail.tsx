import Input from "./ui/Input";
import Select from "./ui/Select";

export const BuyerBillingDetail = () => {
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
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2 w-full">
        <Input type="text" placeholder="First Name" id="firstName" labelData="First name" />
        <Input type="text" placeholder="" required={true} className="" labelData="Last Name" name="lastName" />
        <Input type="text" placeholder="" required={true} className="" labelData="Mobile No" name="mobileNumber" />
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
        <Select title="State" id="" options={stateList} value="" />
      </div>
    </div>
  );
};

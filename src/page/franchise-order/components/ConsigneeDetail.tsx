import Input from "../../../components/ui/Input";
import { Accordion } from "./Accordion";

export const ConsigneeDetail = () => {
  return (
    <div className="w-full">
      <Accordion
        items={[
          {
            title: "Consignee Details",
          },
        ]}
      >
        <h2 className="text-sm font-semibold"> Personal Details</h2>
        <div className={`grid grid-cols-3 justify-start items-center gap-4 mt-2 `}>
          <Input type="text" labelData="First Name" required={true} placeholder="Enter First name . . ." />
          <Input type="text" labelData="Last Name" required={true} placeholder="Enter Last name . . ." />
          <Input type="text" labelData="Mobile Number" required={true} placeholder="Enter Mobile Number . . ." />
          <Input type="email" labelData="Email Id" required={true} placeholder="Enter Email . . ." />
        </div>
        <h2 className="text-sm font-semibold mt-5"> Shipping Address</h2>
        <div className={`grid grid-cols-3 justify-start items-center gap-4 mt-2`}>
          <Input type="text" labelData="Address1" required={true} placeholder="Enter Address1 . . ." />
          <Input type="text" labelData="Address2" required={true} placeholder="Enter Address2 . . ." />
          <Input type="text" labelData="LandMark" placeholder="Enter LandMark . . ." />
          <Input type="text" labelData="Country" required={true} placeholder="Country . . ." />
          <Input type="text" labelData="state" required={true} placeholder="state . . ." />
          <Input type="text" labelData="city" required={true} placeholder="Enter city . . ." />
          <Input type="text" labelData="pincode" required={true} placeholder="Enter Pincode . . ." />
        </div>
      </Accordion>
    </div>
  );
};

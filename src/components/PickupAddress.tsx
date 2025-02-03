import { useState } from "react";
import Select from "./ui/Select";

export const PickupAddress = () => {
  const [address, setAddress] = useState("");
  const pickupAddress = [
    {
      label: "HEAD OFFICE, Mahipalpur, Indira Park, South West Delhi-Delhi-110037-83923289932",
      value: "HEAD OFFICE, Mahipalpur, Indira Park, South West Delhi-Delhi-110037-83923289932",
    },
  ];
  return (
    <div className="flex flex-col space-y-4 w-full">
      <p className="font-semibold text-basis text-sm">
        Search Pickup Address <span className="text-red-500">*</span>
      </p>
      <div className="w-full pb-6">
        <Select
          title="Select Pickup Address"
          id=""
          options={pickupAddress}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="border w-full"></div>
    </div>
  );
};

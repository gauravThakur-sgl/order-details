import Select from "./ui/Select";

export const PickupAddress = () => {
  const pickupAddress = [
    {
      label: "Select Pickup Address",
      value: "HEAD OFFICE, Mahipalpur, Indira Park, South West Delhi-Delhi-110037-83923289932",
    },
  ];
  return (
    <div className="flex flex-col space-y-4 w-full">
      <p className="font-semibold text-basis">
        Search Pickup Address <span className="text-red-500">*</span>
      </p>
      <div className="w-full pb-6">
        <Select title="Select Pickup Address" id="" options={pickupAddress} value=""/>
      </div>
      <div className="border w-full"></div>
    </div>
  );
};

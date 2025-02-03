import Input from "./ui/Input";
const shipmentData = [
  { name: "Actual Weight", required: true, default: "Kg" },
  { name: "Length", required: true, default: "cm" },
  { name: "Breadth", required: true, default: "cm" },
  { name: "Height", required: true, default: "cm" },
];

export const ShipMentMeasurement = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 pt-5 w-full">
      {shipmentData.map((data, index) => (
        <div className="flex justify-center items-end">
          <div className="w-full">
            <Input
              key={index}
              name={data.name}
              labelData={data.name}
              required={data.required}
              type="text"
              className="appearence-none rounded-r-none z-10"
            />
          </div>
          <span className="bg-gray-100 p-2 px-3 top-0 right-0 border rounded-r-md tracking-tight">
            {data.default}
          </span>
        </div>
      ))}
    </div>
  );
};

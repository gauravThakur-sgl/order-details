import { UserCheck, FilePenLine } from "lucide-react";
import { useState } from "react";

export const ShipMentCard = () => {
  const [selectedShipment, setSelectedShipment] = useState("CSB IV");

  const handleSelectedShipment = (shipment: string) => {
    setSelectedShipment(shipment);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 pt-10">
        <div
          className={`flex items-center w-full gap-8 p-4 pb-10 border border-dashed cursor-pointer ${
            selectedShipment === "CSB IV"
              ? "border-progress-step bg-card-background transition-all duration-200"
              : "border-gray-300 bg-white transition-all duration-200 hover:border-progress-step hover:bg-card-background"
          } rounded-lg`}
          onClick={() => handleSelectedShipment("CSB IV")}
        >
          <span>
            <UserCheck
              className={`${selectedShipment === "CSB IV" ? "text-progress-step" : "text-gray-300 bg-white"} h-6 w-6`}
            />
          </span>
          <span>
            <h3 className="pt-1 font-semibold text-basis flex justify-start w-full">CSB IV</h3>
            <p className="text-sm text-gray-400 font-medium pt-2 pl-5">
              Non Commercial Mode <br /> Minimum Documentation <br /> All Service Providers
            </p>
          </span>
        </div>
        <div
          className={`flex items-center w-full gap-8 p-4 pb-10 border border-dashed cursor-pointer ${
            selectedShipment === "CSB V"
              ? "border-progress-step bg-card-background transition-all duration-200"
              : "border-gray-300 bg-white transition-all duration-200 hover:border-progress-step hover:bg-card-background"
          } rounded-lg`}
          onClick={() => handleSelectedShipment("CSB V")}
        >
          <span>
            <FilePenLine
              className={`${selectedShipment === "CSB V" ? "text-progress-step" : "text-gray-300 bg-white"} h-6 w-6`}
            />{" "}
          </span>
          <span>
            <h3 className="pt-1 font-semibold text-basis flex justify-start w-full">CSB V</h3>
            <p className="text-sm text-gray-400 font-medium pt-2 pl-5">
              Commercial Mode <br /> Valid Export Document Required <br /> Only ShipGlobal Direct
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

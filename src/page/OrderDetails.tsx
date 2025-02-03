import { ShipMentCard } from "../components/ShipMentCard";

export const OrderDetails = () => {
  return (
    <div>
      <h2 className="pt-1 font-semibold text-basis flex justify-start w-full">ShipMent Type</h2>
      <p className="text-xs text-gray-400 font-medium pt-2">
        Please select the shipment Mode. Note: CSB-V Shipments can only be sent through ShipGlobal Direct. If other
        partner services are needed please select CSB IV.
      </p>
      <p className="text-sm text-gray-400 font-medium pt-4">
        If you need more info, please call/whatsapp at{" "}
        <a href="#">
          <span className="text-progress-step text-sm font-semibold"> +91 9811098919.</span>
        </a>
      </p>
      <ShipMentCard />
      <h2 className="pt-16 font-semibold text-basis flex justify-start w-full">ShipMent Details</h2>
      <p className="text-sm text-gray-400 font-medium pt-2">
        If you need more info, please check out{" "}
        <a href="#">
          <span className="text-progress-step text-sm font-semibold">Help Page</span>
        </a>
      </p>
    </div>
  );
};

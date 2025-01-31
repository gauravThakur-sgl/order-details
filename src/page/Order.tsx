import { ProgressPage } from "../components/ProgressPage";
import { BuyerDetail } from "./BuyerDetail";

export const Order = () => {
  return (
    <div className="font-poppins flex flex-col lg:flex-row justify-around items-center pt-20 bg-gray-100 lg:px-20 min-h-dvh">
      <div className="w-full lg:w-1/3"><ProgressPage /></div>
      <div className="w-full m-4">
        <BuyerDetail />
      </div>
    </div>
  );
};

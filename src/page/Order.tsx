import { Header } from "../components/Header";
import { ProgressPage } from "../components/ProgressPage";
import { SideBar } from "../components/SideBar";
import { BuyerDetail } from "./BuyerDetail";

export const Order = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="font-poppins flex flex-col lg:flex-row justify-around items-center pt-20 bg-gray-100 lg:px-56 min-h-dvh h-full">
        <div className="w-full lg:w-1/3">
          <ProgressPage />
        </div>
        <div className="w-full m-4 h-full">
          <BuyerDetail />
        </div>
      </div>
    </div>
  );
};

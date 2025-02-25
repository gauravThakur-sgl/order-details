import { CheckCircle2, Loader } from "lucide-react";
import { useState } from "react";
import { ContactCard } from "@/page/franchise-order/components/ContactCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setFormData } from "@/app/features/order/orderSlice";

export const ShippingPartner = () => {
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const dispatch = useDispatch();
  const shipperRates: {
    package_weight: number;
    volume_weight: number;
    bill_weight: number;
    rate: { display_name: string; transit_time: string; rate: number; helper_text: string }[];
  } = useSelector((state: RootState) => state.order.shipperRate) || {
    package_weight: 0,
    volume_weight: 0,
    bill_weight: 0,
    rate: [],
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectedPrice = (index: number) => {
    setIsSelected(index);
    setIsLoading(true);
    setTimeout(() => {
      dispatch(setFormData({ selectedRate: shipperRates?.rate[index] }));
      setIsLoading(false);
    }, 1000);
  };

  const handlePlaceOrder = () => {
    sessionStorage.clear();
    window.location.reload();
    alert("Order Placed Successfully");
  };

  const extractText = (text: string) => {
    return text.replace(/<[^>]+>/g, "").trim();
  };
  return (
    <div>
      <div>
        <ContactCard />
        {shipperRates ? (
          <>
            <div className="flex justify-center items-center gap-4 text-franchise-sectionp mt-5 px-12">
              <div className="flex flex-col justify-center items-center border rounded-md bg-gray-50 text-slate-700 py-2 px-5">
                <p>{`${shipperRates.package_weight/1000} KG`}</p>
                <p className="text-sm text-slate-400">Dead Weight</p>
              </div>
              <div className="flex flex-col justify-center items-center border rounded-md bg-gray-50 text-slate-700 py-2 px-5">
                <p>{`${shipperRates.volume_weight/1000} KG`}</p>
                <p className="text-sm text-slate-400">Volumetric Weight</p>
              </div>
              <div className="flex flex-col justify-center items-center border border-orange-600 rounded-md bg-franchise-weight-bg text-franchise-weight-text py-2 px-5">
                <p>{`${shipperRates.bill_weight/1000} KG`}</p>
                <p className="text-sm">Billed Weight</p>
              </div>
            </div>

            <div className="text-sm font-semibold">
              <p>Showing 1 Results</p>
            </div>
            <div className="flex flex-col justify-center mt-5 overflow-x-auto sm:min-w-96 w-full p-1 ">
              <table className="border-separate border-spacing-0 rounded-lg">
                <thead className="">
                  <tr className="bg-gray-100 text-gray-600 text-sm border rounded-lg">
                    <th className="font-xs font-normal p-2 m-8 text-left pl-4 border border-r-0 rounded-l-lg">
                      Courier Partner
                    </th>
                    <th className="font-xs font-normal text-left border-y">Delivery Time</th>
                    <th className="font-xs font-normal text-left border-y">Shipment Rate</th>
                    <th className="font-xs font-normal p-2 pl-0 border border-l-0 rounded-r-lg">Select</th>
                  </tr>
                </thead>
                <div className="p-1"></div>
                <tbody>
                  {shipperRates?.rate?.map((rate, index) => (
                    <>
                      <span className="w-full my-1"></span>
                      <tr className="bg-blue-50 text-xs rounded-tl-lg rounded-tr-lg">
                        <td colSpan={4} className="text-danger px-4 rounded-tl-lg rounded-tr-lg border border-b-0">
                          {extractText(rate.helper_text)}
                        </td>
                      </tr>
                      <tr key={index} className="rounded-bl-lg rounded-br-lg">
                        <td className="p-2 pl-4 rounded-bl-lg border border-r-0 text-sm font-semibold text-franchise-sectionp text-left">
                          {rate.display_name}
                        </td>
                        <td className="text-sm text-franchise-sectionp border-y text-left">{rate.transit_time}</td>
                        <td className="pl-8 text-sm text-franchise-sectionp border-y text-left">{`Rs. ${rate.rate}`}</td>
                        <td className="pl-8 rounded-br-lg border border-l-0">
                          <span onClick={() => handleSelectedPrice(index)} className="cursor-pointer">
                            {isLoading && isSelected === index ? (
                              <Loader className="h-5 w-5 m-4 animate-spin" />
                            ) : (
                              <CheckCircle2
                                className={`h-5 w-5 m-4 text-white rounded-full border border-white ${
                                  isSelected === index ? "bg-green-500" : "bg-gray-400"
                                }  `}
                              />
                            )}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-1"></td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-100 rounded-lg border mt-5">
              <span className="rounded-lg ring-1 ring-slate-200">
                <p className="text-sm text-center px-4 py-3">No Shipping Partner Available</p>
              </span>
            </div>
          </>
        )}
        <div className="flex justify-end py-6">
          <button
            type="submit"
            className={`text-franchise-button-text ${
              isSelected === null && !isLoading ? "bg-franchise-primary bg-opacity-75" : "bg-franchise-primary"
            } rounded-md p-2 px-4 font-medium text-base tracking-tight`}
            disabled={isSelected === null}
            onClick={handlePlaceOrder}
          >
            Pay and Order
          </button>
        </div>
      </div>
    </div>
  );
};

import { Check, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { ShippingRate } from "./interface";
import { ContactCard } from "./components/ContactCard";

export const ShippingPartner = () => {
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [shipperRates, setShipperRates] = useState<ShippingRate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weightData, setWeightData] = useState({
    deadWeight: 0,
    volumetricWeight: 0,
    billedWeight: 0,
  });
  const getShipperRates = () => {
    const storedRates = localStorage.getItem("shipperRates");
    console.log(storedRates, "storedRates");
    return storedRates;
  };

  useEffect(() => {
    const updatedShipperRates = () => {
      const rates = getShipperRates();
      const parsedRates = rates ? JSON.parse(rates) : null;
      console.log(parsedRates, "parsedRates");
      setShipperRates(parsedRates ? parsedRates.rate : []);
      if (parsedRates) {
        setWeightData({
          deadWeight: parsedRates.package_weight / 1000,
          volumetricWeight: parsedRates.volume_weight / 1000,
          billedWeight: parsedRates.bill_weight / 1000,
        });
      }
    };
    updatedShipperRates();
    window.addEventListener("storage", updatedShipperRates);
    return () => {
      window.removeEventListener("storage", updatedShipperRates);
    };
  }, []);

  const handleSelectedPrice = (index: number) => {
    setIsSelected(index);
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("selectedRate", JSON.stringify(shipperRates[index]));
      window.dispatchEvent(new Event("storage"));
      setIsLoading(false);
    }, 1000);
  };

  const handlePlaceOrder = () => {
    localStorage.clear();
    window.location.reload();
    alert("Order Placed Successfully");
  };

  return (
    <div>
      <div>
        <ContactCard />
        {shipperRates.length > 0 ? (
          <>
            <div className="flex justify-center items-center gap-4 text-franchise-sectionp mt-5 px-12">
              <div className="flex flex-col justify-center items-center border rounded-md bg-gray-50 text-slate-700 py-2 px-5">
                <p>{`${weightData.deadWeight} KG`}</p>
                <p className="text-sm text-slate-400">Dead Weight</p>
              </div>
              <div className="flex flex-col justify-center items-center border rounded-md bg-gray-50 text-slate-700 py-2 px-5">
                <p>{`${weightData.volumetricWeight} KG`}</p>
                <p className="text-sm text-slate-400">Volumetric Weight</p>
              </div>
              <div className="flex flex-col justify-center items-center border border-orange-600 rounded-md bg-franchise-weight-bg text-franchise-weight-text py-2 px-5">
                <p>{`${weightData.billedWeight} KG`}</p>
                <p className="text-sm">Billed Weight</p>
              </div>
            </div>

            <div className="text-sm font-semibold">
              <p>Showing 1 Results</p>
            </div>
            <div className="flex flex-col justify-center mt-5">
              <table>
                <thead>
                  <tr className="bg-gray-100 text-gray-700 rounded-lg ring-border ring-1 ring-slate-200">
                    <th className="font-xs font-normal p-2 m-8 text-left pl-4 rounded-l-lg">Courier Partner</th>
                    <th className="font-xs font-normal text-left">Delivery Time</th>
                    <th className="font-xs font-normal text-left">Shipment Rate</th>
                    <th className="font-xs font-normal p-2 rounded-r-lg">Select</th>
                  </tr>
                </thead>
                <div className="p-1"></div>
                <tbody>
                  {shipperRates.map((rate, index) => (
                    <>
                      <span className="w-full my-1"></span>
                      <tr className="bg-blue-50 text-xs rounded-tl-lg rounded-tr-lg ring-1 ring-slate-200">
                        <td
                          colSpan={4}
                          dangerouslySetInnerHTML={{ __html: rate.helper_text }}
                          className="text-text-danger px-4 rounded-tl-lg"
                        />
                      </tr>
                      <tr key={index} className="rounded-bl-lg rounded-br-lg ring-1 ring-slate-200">
                        <td className="rounded-l-lg p-2 pl-4 rounded-bl-lg">{rate.display_name}</td>
                        <td>{rate.transit_time}</td>
                        <td className="pl-8">{rate.rate}</td>
                        <td className="pl-8">
                          <span onClick={() => handleSelectedPrice(index)} className="cursor-pointer">
                            {isLoading && isSelected === index ? (
                              <Loader className="h-5 w-5 m-4 animate-spin" />
                            ) : (
                              <Check
                                className={`h-5 w-5 m-4 p-1 text-white rounded-full border border-white ${
                                  isSelected === index ? "bg-green-500 ring-green-500" : "bg-gray-400 ring-gray-400"
                                }  `}
                              />
                            )}
                          </span>
                        </td>
                      </tr>
                      <span className="w-full m-2"></span>
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

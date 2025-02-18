import { Check } from "lucide-react";
import { useEffect, useState } from "react";
interface IShippingPartnerProps {
  data: {
    consigneeDetail: {
      shippingPincode: string;
      country: string;
      shippingPincodee: string;
    };
    shipmentInformation: {
      actualWeight: number;
      length: number;
      height: number;
      breadth: number;
    };
  };
  onNext: (formData: FormData) => void;
}
interface ShippingRate {
  provider_code: string;
  display_name: string;
  helper_text: string;
  image: string;
  transit_time: string;
  rate: number;
  bill_weight_kg: number;
}
export const ShippingPartner = ({ onNext }: IShippingPartnerProps) => {
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [shipperRates, setShipperRates] = useState<ShippingRate[]>([]);
  const [weightData, setWeightData] = useState({
    deadWeight: 0,
    volumetricWeight: 0,
    billedWeight: 0,
  });
  const handleSelectedPrice = (index: number) => {
    setTimeout(() => {
      setIsSelected(index);
      localStorage.setItem("selectedRate", JSON.stringify(shipperRates[index]));
      window.dispatchEvent(new Event("storage"));
    }, 100);
  };
  const getShipperRates = () => {
    const storedRates = localStorage.getItem("shipperRates");
    return storedRates;
  };

  useEffect(() => {
    const updatedShipperRates = () => {
      const rates = getShipperRates();
      const parsedRates = rates ? JSON.parse(rates) : null;
      setShipperRates(parsedRates ? parsedRates.data.rate : []);
      if (parsedRates) {
        setWeightData({
          deadWeight: parsedRates.data.bill_weight / 1000,
          volumetricWeight: parsedRates.data.volume_weight / 1000,
          billedWeight: parsedRates.data.bill_weight / 1000,
        });
      }
    };
    updatedShipperRates();
    window.addEventListener("storage", updatedShipperRates);
    return () => {
      window.removeEventListener("storage", updatedShipperRates);
    };
  }, []);

  console.log(shipperRates, "shipperRates");
  console.log(weightData, "weightData");
  return (
    <div>
      <div>
        <p className="text-franchise-sectionp text-sm">
          All shipments via ShipGlobal services are <span className="font-bold">Delivered Duty Paid (DDP)</span>, hence{" "}
          <span className="font-bold">no extra duty</span> will be billed on the consignee or the shipper. Rates are
          inclusive of covid & fuel surcharge, exclusive of GST and ex-Delhi Hub.
        </p>
        <p className="pt-5">
          In case any doubt, please call/whatsapp at{" "}
          <a href="" className="text-franchise-primary font-semibold">
            011-422 77777
          </a>
        </p>
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
          <table className="">
            <thead className="border rounded-xl">
              <tr className="bg-gray-100 text-gray-700 border-collapse">
                <th className="font-xs font-normal p-2 m-8 rounded-l-lg text-left pl-4">Courier Partner</th>
                <th className="font-xs font-normal text-left">Delivery Time</th>
                <th className="font-xs font-normal text-left">Shipment Rate</th>
                <th className="font-xs font-normal p-2 rounded-r-lg">Select</th>
              </tr>
            </thead>
            <div className="p-1"></div>
            <tbody className="mt-2 border-spacing-2">
              {shipperRates.map((rate, index) => (
                <>
                  <span className="w-full my-1"></span>
                  <tr className="bg-blue-50 border rounded-md">
                    <td className="">
                      <span className="w-full text-xs text-franchise-error pl-4">
                        Duties will be charged if applicable
                      </span>
                    </td>
                    <td className="text-blue-50"></td>
                    <td className="text-blue-50"></td>
                    <td className="text-blue-50"></td>
                  </tr>
                  <tr key={index} className="border-b">
                    <td className="rounded-l-lg p-2 pl-4 border-l rounded-bl-lg">{rate.display_name}</td>
                    <td>{rate.transit_time}</td>
                    <td className="pl-8">{rate.rate}</td>
                    <td className="rounded-l-full pl-8 border-r">
                      <span onClick={() => handleSelectedPrice(index)} className="cursor-pointer">
                        <Check
                          className={`h-5 w-5 m-4 p-1 text-white rounded-full border-2 border-white ring-2 ${
                            isSelected === index ? "bg-green-500 ring-green-500" : "bg-gray-400 ring-gray-400"
                          }  `}
                        />
                      </span>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end py-6">
          <button
            type="submit"
            className={`text-franchise-button-text bg-franchise-primary rounded-md p-2 px-4 font-medium text-base tracking-tight`}
            disabled={isSelected === null}
          >
            Pay and Order
          </button>
        </div>
      </div>
    </div>
  );
};

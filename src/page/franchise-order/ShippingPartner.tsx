import { CheckCircle } from "lucide-react";
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
  const [shipperRates, setShipperRates] = useState<ShippingRate[]>([]);
  const [weightData, setWeightData] = useState({
    deadWeight: 0,
    volumetricWeight: 0,
    billedWeight: 0,
  });
  useEffect(() => {
    const storedRates = localStorage.getItem("shipperRates");
    if (storedRates) {
      const parsedRates = JSON.parse(storedRates);
      setShipperRates(parsedRates.data.rate);
      setWeightData({
        deadWeight: parsedRates.data.bill_weight / 1000,
        volumetricWeight: parsedRates.data.volume_weight / 1000,
        billedWeight: parsedRates.data.bill_weight / 1000,
      });
      console.log("parsedRates", parsedRates);
    }
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
          <div className="flex flex-col justify-center items-center border rounded-md bg-gray-50 py-2 px-5">
            <p>{weightData.deadWeight}</p>
            <p className="text-sm">Dead Weight</p>
          </div>
          <div className="flex flex-col justify-center items-center border rounded-md bg-gray-50 py-2 px-5">
            <p>{weightData.volumetricWeight}</p>
            <p className="text-sm">Volumetric Weight</p>
          </div>
          <div className="flex flex-col justify-center items-center border border-orange-600 rounded-md bg-franchise-weight-bg text-franchise-weight-text py-2 px-5">
            <p>{weightData.billedWeight}</p>
            <p className="text-sm">Billed Weight</p>
          </div>
        </div>

        <div className="text-sm font-semibold">
          <p>Showing 1 Results</p>
        </div>
        <div className="flex flex-col justify-center mt-5">
          <table className="">
            <thead className="border rounded-xl">
              <tr className="bg-gray-100 text-gray-700 border-seperate">
                <th className="font-xs font-normal p-2 rounded-l-lg text-left pl-4">Courier Partner</th>
                <th className="font-xs font-normal text-left">Delivery Time</th>
                <th className="font-xs font-normal text-left">Shipment Rate</th>
                <th className="font-xs font-normal p-2 rounded-r-lg">Select</th>
              </tr>
            </thead>
            <div className="p-1"></div>
            <tbody className="mt-2 border-spacing-2">
              {shipperRates.map((rate, index) => (
                <tr key={index} className="">
                  <td className="rounded-l-lg bg-blue-50 p-2 pl-4">{rate.display_name}</td>
                  <td>{rate.transit_time}</td>
                  <td className="pl-8">{rate.rate}</td>
                  <td className="rounded-l-lg pl-8">
                    <CheckCircle />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end py-6">
          <button
            type="submit"
            className="text-franchise-button-text bg-franchise-primary rounded-md p-1 px-4 font-medium text-lg"
          >
            Pay and Order
          </button>
        </div>
      </div>
    </div>
  );
};

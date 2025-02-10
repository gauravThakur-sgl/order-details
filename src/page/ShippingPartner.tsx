import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface ShippingPartnerProps {
  data: ShippingPartnerData;
  onNext: (data: ShippingPartnerData) => void;
  onBack: () => void;
}

type ShippingPartnerData = {
  shippingPartner: string;
  est: string;
  price: string;
};

export const ShippingPartner = ({ data, onNext, onBack }: ShippingPartnerProps) => {
  const [selectedPartner, setSelectedPartner] = useState<string>(data.shippingPartner || "");

  const priceData = [
    {
      name: "ShipGlobal WorldWide",
      info: "Documents are not allowed",
      est: "Estimated Transit: 13 - 18 Days",
      price: "3566",
    },
    {
      name: "Fedex",
      info: "Duties will be charged, if applicable.",
      est: "Estimated Transit: 4 - 7 Days",
      price: "4147",
    },
    {
      name: "UPS",
      info: "Duties will be charged, if applicable.",
      est: "Estimated Transit: 4 - 7 Days",
      price: "7293",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass the selected partner back to the parent component
    const selectedPartnerData = priceData.find((partner) => partner.name === selectedPartner);
    if (selectedPartnerData) {
      onNext({
        shippingPartner: selectedPartner,
        est: selectedPartnerData.est,
        price: selectedPartnerData.price,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pb-10">
        <h2 className="pt-1 font-semibold text-base flex justify-start w-full">Select Shipping Partner</h2>
        <p className="text-xs text-gray-400 font-medium pt-2">
          All shipments via ShipGlobal Direct service are Delivered Duty Paid (DDP), hence no extra duty will be billed
          on the consignee or the shipper. Rates are inclusive of covid & fuel surcharge, exclusive of GST and ex-Delhi
          Hub.
        </p>
        <p className="text-sm text-gray-400 font-medium pt-4">
          If you need more info, please call/whatsapp at{" "}
          <a href="#">
            <span className="text-progress-step text-sm font-semibold"> 011-422 77 777.</span>
          </a>
        </p>
      </div>
      <div>
        <WeightInfo />
        <div className="flex flex-col gap-4 w-full pb-16">
          {priceData.map((data, index) => (
            <label
              key={index}
              className={`border border-dashed flex rounded-lg p-4 w-full cursor-pointer ${
                selectedPartner === data.name ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                value={data.name}
                checked={selectedPartner === data.name}
                onChange={() => setSelectedPartner(data.name)}
                className="mr-3 w-6 h-6"
              />
              <div className="flex flex-col sm:justify-between w-full">
                <div className="flex flex-col items-start">
                  <h3 className="font-semibold text-base flex justify-start w-full">
                    {data.name}{" "}
                    {data.name === "ShipGlobal WorldWide" && (
                      <span className="text-green-500 bg-green-100 text-sm ml-5 px-2 rounded-sm">Cheapest</span>
                    )}
                  </h3>
                  <p className="text-sm text-price-info font-medium pt-2 text-left">{data.info}</p>
                  <p className="text-sm text-gray-500 font-medium pt-2">{data.est}</p>
                </div>
                <div className="flex items-center">
                  <div className="font-semibold text-xl md:text-2xl text-basis flex items-baseline">
                    <span className="text-sm">Rs.</span>
                    {data.price}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <button
          type="button"
          className="flex justify-center items-center gap-1 text-progress-step bg-card-background font-medium rounded-md p-2 px-4"
          onClick={onBack}
        >
          <span>
            <ArrowLeft className="w-4 h-4" />
          </span>
          Back
        </button>
        <button type="submit" className="text-white bg-progress-step rounded-md p-2 px-4">
          Continue
        </button>
      </div>
    </form>
  );
};

const WeightInfo = () => {
  const infoData = [
    { weight: "1.00 KG", info: "Dead Weight" },
    { weight: "0.00 KG", info: "Volumetric Weight" },
    { weight: "1.00 KG", info: "Billed Weight" },
  ];
  return (
    <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center p-4 gap-4">
      {infoData.map((data, index) => (
        <div
          key={index}
          className={`${
            data.info === "Billed Weight" ? "border-black" : "border-gray-200"
          } border border-dashed p-2 px-4 rounded-md`}
        >
          <h4 className="pt-1 font-semibold text-base flex justify-start w-full">{data.weight}</h4>
          <p className="text-sm text-gray-400 font-medium pt-2">{data.info}</p>
        </div>
      ))}
    </div>
  );
};

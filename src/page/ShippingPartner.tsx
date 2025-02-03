import CheckBox from "../components/ui/Checkbox";

export const ShippingPartner = () => {
  return (
    <div>
      <div className="pb-10">
        <h2 className="pt-1 font-semibold text-basis flex justify-start w-full">Select Shipping Partner</h2>
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
        <PriceCard />
      </div>
    </div>
  );
};

const PriceCard = () => {
  const priceData = [
    {
      name: "Fedex",
      info: "Duties will be charged, if applicable.",
      est: "Estimated Transit: 4 - 7 Days",
      price: "3282",
    },
    {
      name: "ShipGlobal WorldWide",
      info: "Documents are not allowed",
      est: "Estimated Transit: 13 - 18 Days",
      price: "3566",
    },
    {
      name: "UPS",
      info: "Duties will be charged, is applicable.",
      est: "Estimated Transit: 4 - 7 Days",
      price: "7232",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-4 w-full pb-16">
        {priceData.map((data, index) => (
          <div key={index} className="border border-dashed flex rounded-lg p-4 w-full">
            <CheckBox type="radio" id={`checkbox-${index}`} labelData="" name="shipping-partner" className="border" />
            <div className="flex justify-between w-full">
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-basis flex justify-start w-full">{data.name}</h3>
                <p className="text-sm text-price-info font-medium pt-2 text-left">{data.info}</p>
                <p className="text-sm text-gray-500 font-medium pt-2">{data.est}</p>
              </div>
              <div className="flex items-center">
                <div className="font-semibold text-2xl text-basis flex items-baseline">
                  <span className="text-sm">Rs.</span>
                  {data.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const WeightInfo = () => {
  const infoData = [
    { weight: "1.00 KG", info: "Dead Weight" },
    { weight: "0.00 KG", info: "Volumetric Weight" },
    { weight: "1.00 KG", info: "Billed Weight" },
  ];
  return (
    <>
      <div className="flex justify-center items-center p-4 gap-4">
        {infoData.map((data, index) => (
          <div
            key={index}
            className={`${
              data.info === "Billed Weight" ? "border-black" : "border-gray-200"
            } border border-dashed p-2 px-4 rounded-md`}
          >
            <h4 className="pt-1 font-semibold text-basis flex justify-start w-full">{data.weight}</h4>
            <p className="text-sm text-gray-400 font-medium pt-2">{data.info}</p>
          </div>
        ))}
      </div>
    </>
  );
};

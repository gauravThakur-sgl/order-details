const tips = [
  "Dead/Dry weight or volumetric weight whichever is higher will be taken while calculating the freight rates.",
  "Fixed COD charge or COD % of the order value whichever is higher will be taken while calculating the COD fee.",
  "Above prices are exclusive of GST.",
  "The above pricing is subject to change based on fuel surcharges and courier company base rates.",
];

const volumetricWeightInfo = [
  "Volumetric Weight (or DIM weight) is calculated based on the dimensions of the package.",
  "The formula for calculating volumetric weight involves multiplying the length, width, and height of the package and then dividing by 5000.",
];

export const OrderInformation = () => {
  return (
    <div className="flex flex-col justify-center rounded-md items-center py-4 px-6 bg-white gap-2">
      <p className="text-franchise-textp text-base font-semibold mt-2">Quick tips</p>
      <img src="/box.svg" className="h-40 w-40" />
      <div className="space-y-4">
        <p className="text-franchise-textp text-sm font-semibold mt-4 text-left">Dead Weight</p>
        {tips.map((tip, index) => (
          <p key={index} className="text-franchise-textp text-xs">
            {tip}
          </p>
        ))}
      </div>
      <div className="space-y-4">
        <p className="text-franchise-textp text-sm font-semibold mt-4">Volumetric Weight:(L x W x H / 5000)</p>
        {volumetricWeightInfo.map((info, index) => (
          <p key={index} className="text-franchise-textp text-xs">
            {info}
          </p>
        ))}
      </div>
    </div>
  );
};

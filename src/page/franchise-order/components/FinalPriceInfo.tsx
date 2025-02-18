import { useEffect, useState } from "react";

export const FinalPriceInfo = () => {
  const [finalPrice, setFinalPrice] = useState(0);
  const getFinalPrice = () => {
    const finalPriceInfo = localStorage.getItem("selectedRate");
    const price = finalPriceInfo ? JSON.parse(finalPriceInfo) : {};
    const logisticFee = price.LOGISTIC_FEE;
    return logisticFee;
  };
  useEffect(() => {
    const logisticFee = getFinalPrice();
    setFinalPrice(logisticFee);
  }, [finalPrice]);
  
  console.log(finalPrice, "finalPrice");

  const gst = ((Number(finalPrice) / 100) * 18).toFixed(2);
  const totalPrice = finalPrice + Number(gst);

  return (
    <div className="border rounded-md bg-franchise-weight-bg mt-2 pb-3">
      <div className="p-4">
        <h5 className="text-franchise-weight-text pt-2 font-semibold pb-2">Summary</h5>
        <span className="w-full bg-franchise-weight-text"></span>
        <div className="space-y-4 mt-4">
          <div className="flex justify-between">
            <p>Logistic Fee</p>
            <p>{`RS.${finalPrice}.00`}</p>
          </div>
          <div className="flex justify-between">
            <p>GST</p>
            {`Rs.${gst}`}
          </div>
        </div>
      </div>
      <span className="flex justify-between bg-franchise-totalPrice px-4 py-2 font-semibold">
        <p className="">Total</p>
        <p>{`${totalPrice}`}</p>
      </span>
    </div>
  );
};

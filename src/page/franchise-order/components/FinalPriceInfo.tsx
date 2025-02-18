import { useEffect, useState } from "react";

export const FinalPriceInfo = () => {
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const finalPriceInfo = JSON.parse(localStorage.getItem("selectedRate") || "{}");
    if (finalPriceInfo && finalPriceInfo.LOGISTIC_FEE) {
      setFinalPrice(finalPriceInfo.LOGISTIC_FEE);
    }
  }, []);
  console.log(finalPrice, "finalPrice");

  const gst = ((Number(finalPrice) / 100) * 18).toFixed(2);
  const totalPrice = (finalPrice + Number(gst)).toFixed(2);

  return (
    <div className="border rounded-md bg-franchise-weight-bg mt-2 pb-3">
      <div className="p-4">
        <h5 className="text-franchise-weight-text pt-2 font-semibold pb-2 border-b border-franchise-weight-text border-opacity-30">
          Summary
        </h5>
        <div className="space-y-4 mt-4">
          <div className="flex justify-between text-sm">
            <p>Logistic Fee</p>
            <p>{`RS.${finalPrice}.00`}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>GST</p>
            <p>{`Rs.${gst}`}</p>
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

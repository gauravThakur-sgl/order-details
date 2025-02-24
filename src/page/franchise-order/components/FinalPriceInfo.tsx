import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export const FinalPriceInfo = () => {
  const finalPrice = useSelector(
    (state: RootState) => (state.order.selectedRate as { LOGISTIC_FEE: number }).LOGISTIC_FEE,
  );

  const gst = ((Number(finalPrice) / 100) * 18).toFixed(2);
  const totalPrice = (finalPrice + Number(gst)).toFixed(2);

  return (
    <>
      {finalPrice ? (
        <div className="border rounded-md bg-franchise-weight-bg mt-2 pb-3">
          <h5 className="p-4 mt-2 text-franchise-weight-text pt-2 font-semibold pb-2 border-b border-franchise-weight-text border-opacity-30">
            Summary
          </h5>
          <div className="p-4">
            <div className="space-y-4 mt-4">
              <div className="flex justify-between text-sm">
                <p>Logistic Fee</p>
                <p>{`RS. ${finalPrice}.00`}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>GST</p>
                <p>{`Rs. ${gst}`}</p>
              </div>
            </div>
          </div>
          <span className="flex justify-between bg-franchise-totalPrice px-4 py-2 font-semibold">
            <p className="">Total</p>
            <p>{`RS ${totalPrice}`}</p>
          </span>
        </div>
      ) : null}
    </>
  );
};

import { z } from "zod";
import { orderDetailsSchema, orderSchema } from "../zod/ordersSchema";
import { ArrowLeft } from "lucide-react";

type FormData = z.infer<typeof orderSchema>;
type OrderDetailsFormData = z.infer<typeof orderDetailsSchema>;
type ShippingPartnerData = { shippingPartner: string; est: string; price: string };
interface PlaceOrderProps {
  data: {
    buyerDetail: FormData;
    orderDetails: OrderDetailsFormData;
    shippingPartner: ShippingPartnerData;
  };
  onBack: () => void;
}

export const PlaceOrder = ({ data, onBack }: PlaceOrderProps) => {
  const { buyerDetail, orderDetails, shippingPartner } = data;
  const gstPrice = (parseFloat(parseFloat(shippingPartner.price).toPrecision(2)) / 100) * 18;


  return (
    <div>
      <h2 className="pt-1 font-semibold text-basis flex justify-start w-full pb-10">Order Details</h2>
      <div className="flex justify-between items-start gap-2 mb-12">
        <div>
          <h4 className="text-gray-600 fs-5 font-medium">Pickup Address:</h4>
          <p>{buyerDetail.pickupAddress}</p>
        </div>
        <div className="w-full">
          <h4 className="text-gray-600 fs-5 font-medium">Delivery Address:</h4>
          <p className="text-gray-800 fs-6 font-medium">
            {buyerDetail.firstName} {buyerDetail.lastName}
          </p>
          <div className="text-gray-400 font-semibold fw-bold text-xs">
            <p>{buyerDetail.address1}</p>
            <p>{buyerDetail.shippingcity}</p>
            <p>
              {buyerDetail.shippingState} - {buyerDetail.shippingPincode}
            </p>
            <p>{buyerDetail.country}</p>

            <p>{buyerDetail.mobileNumber}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start mb-12">
        <div>
          <h3 className="text-gray-600 fs-5 font-medium">Shipping Partner</h3>
          <p className="text-gray-800 fs-6 font-medium">{shippingPartner.shippingPartner}</p>
          <p className="text-sm font-medium text-gray-600">{shippingPartner.est.slice(9)}</p>
        </div>
        <div>
          <h3 className="text-gray-600 fs-5 font-medium">Shipment Mode</h3>
          <p className="text-gray-800 fs-6 font-medium">CSV-IV</p>
        </div>
        <div>
          <h3 className="text-gray-600 fs-5 font-medium">Billed Weight:</h3>
          <p className="text-gray-800 fs-6 font-medium">{orderDetails.actualWeight}</p>
        </div>
      </div>

      <div className="flex justify-end w-full pb-12">
        <div className="text-gray-400 font-semibold text-sm">
          <div className="flex justify-between gap-8">
            <span>logistic Fee:</span> <span className="text-gray-800 fs-6 font-medium">{shippingPartner.price}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span>GST:</span> <span className="text-gray-800 fs-6 font-medium">{gstPrice}</span>
          </div>
          <div className="flex justify-between gap-8">
            Total <span className="text-gray-800 fs-6 font-medium">{parseFloat(shippingPartner.price) + gstPrice}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <button
          type="button"
          className="flex justify-center items-center gap-1 text-progress-step bg-card-background font-medium rounded-md p-2 px-4 mt-5"
          onClick={onBack}
        >
          <span>
            <ArrowLeft className="w-4 h-4" />
          </span>
          Back
        </button>
        <button
          type="button"
          className="text-white bg-order-button rounded-md p-3 px-4"
          // onClick={/* function to submit final order */}
        >
          Pay & Add Order
        </button>
      </div>
    </div>
  );
};

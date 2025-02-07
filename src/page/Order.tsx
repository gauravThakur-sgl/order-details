import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { BuyerDetail } from "./BuyerDetail";
import { Stepper } from "../components/Stepper";
import { OrderDetails } from "./OrderDetails";
import { ShippingPartner } from "./ShippingPartner";
import { PlaceOrder } from "./PlaceOrder";
import { orderSchema } from "../zod/ordersSchema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setBuyerDetail, nextStep, prevStep } from "../app/features/order/orderSlice";
import { z } from "zod";

type FormData = z.infer<typeof orderSchema>;
export const Order = () => {
  const dispatch = useDispatch();
  const stepTitles = ["Buyer Details", "Order Details", "Shipping Partner", "Place Order"];
  const formData = useSelector((state: RootState) => state.order);
  const currentStep = useSelector((state: RootState) => state.order.currentStep);

  console.log("data1", formData);

  const handleNext = (formData: FormData) => {
    switch (currentStep) {
      case 0: {
        const validatedData = orderSchema.parse(formData);
        dispatch(setBuyerDetail(validatedData));
        break;
      }
    }
    dispatch(nextStep());
  };
  
  const stepComponents = [<BuyerDetail onNext={handleNext} />, <OrderDetails />, <ShippingPartner />, <PlaceOrder />];
  console.log(formData, "formData");
  return (
    <div>
      <Header />
      <SideBar />
      <div className="font-poppins pt-40 bg-gray-100 min-h-dvh">
        <Container>
          <div className="w-full m-4 flex flex-col lg:flex-row">
            <Stepper steps={stepTitles}>{stepComponents}</Stepper>
          </div>
          {/* <div>
            <button onClick={() => dispatch(nextStep())}>Next</button>
          </div> */}
          <button onClick={() => dispatch(prevStep())}>Prev</button>
        </Container>
      </div>
    </div>
  );
};

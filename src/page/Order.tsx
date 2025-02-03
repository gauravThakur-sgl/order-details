import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { BuyerDetail } from "./BuyerDetail";
import { Stepper } from "../components/Stepper";
import { OrderDetails } from "./OrderDetails";
import { ShippingPartner } from "./ShippingPartner";
import { PlaceOrder } from "./PlaceOrder";
import { useState } from "react";
import {orderSchema} from "../zod/ordersSchema";


export const Order = () => {
  const stepTitles = ["Buyer Details", "Order Details", "Shipping Partner", "Place Order"];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    buyerDetail: {
      pickupAddress: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      alternateMobileNumber: "",
      email: "",
      country: "",
      address1: "",
      address2: "",
      shippingcity: "",
      shippingPincode: "",
      shippingState: "",
    },
    orderDetails: {
    },
    shippingPartner: {},
    placeOrder: {},
  });
  const handleNext = (data: typeof orderSchema) => {
    setFormData((prev) => ({
      ...prev,
      [stepTitles[currentStep].toLowerCase().replace(" ", "")]: data,
    }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const stepComponents = [
    <BuyerDetail data={formData.buyerDetail} onNext={() => handleNext} />,
    <OrderDetails data={formData.orderDetails} onNext={handleNext} onBack={handleBack} />,
    <ShippingPartner data={formData.shippingPartner} onNext={handleNext} onBack={handleBack} />,
    <PlaceOrder data={formData} onBack={handleBack} />,
  ];
  return (
    <div>
      <Header />
      <SideBar />
      <div className="font-poppins pt-40 bg-gray-100 min-h-dvh">
        <Container>
          <div className="w-full m-4 flex flex-col lg:flex-row">
            <Stepper steps={stepTitles}>{stepComponents}</Stepper>
          </div>
        </Container>
      </div>
    </div>
  );
};

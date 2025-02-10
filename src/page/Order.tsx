import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { BuyerDetail } from "./BuyerDetail";
import { Stepper } from "../components/Stepper";
import { OrderDetails } from "./OrderDetails";
import { ShippingPartner } from "./ShippingPartner";
import { PlaceOrder } from "./PlaceOrder";
import { useEffect, useState } from "react";
import { orderSchema } from "../zod/ordersSchema";
import { orderDetailsSchema } from "../zod/ordersSchema";
import { z } from "zod";

type FormData = z.infer<typeof orderSchema> & {
  buyerDetail: {
    pickupAddress: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    alternateMobileNumber: string;
    email: string;
    country: string;
    landMark: string;
    address1: string;
    address2: string;
    shippingcity: string;
    shippingPincode: string;
    shippingState: string;
    billingfirstName: string;
    billinglastName: string;
    billingmobileNumber: string;
    billingCountry: string;
    billingLandMark: string;
    billingAddress1: string;
    billingAddress2: string;
    billingcity: string;
    billingPincode: string;
    billingState: string;
  };
  orderDetails: {
    actualWeight: string;
    length: string;
    breadth: string;
    height: string;
    invoiceNo: string;
    invoiceCurrency: string;
    orderId: string;
    invoiceDate: string;
    orderid: string;
    items: {
      productName: string;
      sku: string;
      hsn: string;
      qty: string;
      unitPrice: string;
      igst: string;
    }[];
  };
  shippingPartner: {
    shippingPartner: string;
    est: string;
    price: string;
  };
  placeOrder: object;
};
type OrderDetailsFormData = z.infer<typeof orderDetailsSchema>;
type ShippingPartnerFormData = { shippingPartner: string; est: string; price: string };
export const Order = () => {
  const stepKeys = ["buyerDetail", "orderDetails", "shippingPartner", "placeOrder"];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          buyerDetail: {
            pickupAddress: "",
            firstName: "",
            lastName: "",
            mobileNumber: "",
            alternateMobileNumber: "",
            email: "",
            country: "",
            landMark: "",
            address1: "",
            address2: "",
            shippingcity: "",
            shippingPincode: "",
            shippingState: "",
            billingfirstName: "",
            billinglastName: "",
            billingmobileNumber: "",
            billingCountry: "",
            billingLandMark: "",
            billingAddress1: "",
            billingAddress2: "",
            billingcity: "",
            billingPincode: "",
            billingState: "",
          },
          orderDetails: {
            actualWeight: "",
            length: "",
            breadth: "",
            height: "",
            invoiceNo: "",
            invoiceCurrency: "",
            orderId: "",
            invoiceDate: "",
            orderid: "",
            items: [
              {
                productName: "",
                sku: "",
                hsn: "",
                qty: "",
                unitPrice: "",
                igst: "",
              },
            ],
          },
          shippingPartner: { shippingPartner: "", est: "", price: "" },
          placeOrder: {},
        };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  const handleNext = (data: FormData | OrderDetailsFormData | ShippingPartnerFormData | object) => {
    const key = stepKeys[currentStep];
    setFormData((prev) => ({
      ...prev,
      [key]: data,
    }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  console.log(formData, "BuyerDetailformData");
  const stepComponents = [
    <BuyerDetail data={formData.buyerDetail} onNext={handleNext} />,
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
          <div className="m-4 flex flex-col lg:flex-row">
            <Stepper steps={stepKeys} currentStep={currentStep}>
              {stepComponents}
            </Stepper>
          </div>
        </Container>
      </div>
    </div>
  );
};

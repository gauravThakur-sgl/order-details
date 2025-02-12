import { useRef, useState } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { ConsigneeDetail } from "./components/ConsigneeDetail";
import { Container } from "./components/Container";
import { OrderInformation } from "./components/OrderInformation";
import { ConsignorDetail } from "./ConsignorDetail";
import { ShipmentInformation } from "./ShipmentInformation";
import { ShippingPartner } from "./ShippingPartner";
import { Accordion } from "./components/Accordion";
import { z } from "zod";
import { consignorDetailSchema, orderDetailsSchema, orderSchema } from "../../zod/franchiseOrderSchema";

type ConsignorData = z.infer<typeof consignorDetailSchema>;
type FormData = z.infer<typeof orderSchema>;
type OrderDetailsFormData = z.infer<typeof orderDetailsSchema>;
type ShippingPartnerFormData = { shippingPartner: string; est: string; price: string };

export const AddOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    ConsignorDetail: {
      pickupAddress: "",
    },
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
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const habdleStepChange = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const stepComponents = [
    <ConsignorDetail data = {formData.ConsignorDetail} onNext={handleNext} />,
    <ConsigneeDetail data = {formData.buyerDetail} onNext={handleNext} onBack={handleBack} />,
    <ShipmentInformation data={formData.orderDetails} onNext={handleNext} onBack={handleBack} />,
    <ShippingPartner data = {formData.shippingPartner} onBack={handleBack} />,
  ];

  const stepTiles = ["Consignor Detail", "Consignee Detail", "Shipment Information", "Select Shipping Partner"];
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="bg-gray-50">
      <Header />
      <SideBar />
      <Container>
        <h3 className="text-2xl leading-none tracking-tight mb-1 font-medium">Create CSB-IV order</h3>
        <div className="flex justify-center gap-4 mt-10 ">
          <div className="flex flex-grow flex-col items-start gap-1" ref={containerRef}>
            {stepComponents.map((item, index) => (
              <Accordion
                key={index}
                title={stepTiles[index]}
                stepNumber={index + 1}
                onToggle={() => toggleAccordion(index)}
                isOpen={openIndex === index}
                activeState={currentStep}
              >
                {item}
              </Accordion>
            ))}
          </div>
          <div className="hidden md:block w-[425px]">
            <OrderInformation />
          </div>
        </div>
      </Container>
    </section>
  );
};

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
import { DataAccordion } from "./components/DataAccordion";

type ConsignorData = z.infer<typeof consignorDetailSchema>;
type FormData = z.infer<typeof orderSchema>;
type OrderDetailsFormData = z.infer<typeof orderDetailsSchema>;
type ShippingPartnerFormData = { shippingPartner: string; est: string; price: string };

export const AddOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    consignorDetail: {
      pickupAddress: "",
      selectedUserDetail: "",
    },
    consigneeDetail: {
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
    shipmentInformation: {
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
    selectShippingPartner: { shippingPartner: "", est: "", price: "" },
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const handleNext = (data: ConsignorData | FormData | OrderDetailsFormData | ShippingPartnerFormData) => {
    const key = stepTiles[currentStep];
    setFormData((prev) => ({
      ...prev,
      [key]: data,
    }));
    setCurrentStep((prev) => prev + 1);
    setOpenIndex((prev) => (prev !== null ? prev + 1 : null));
    const nextAccordion = accordionRef.current?.querySelectorAll<HTMLDivElement>(".accordion")[currentStep + 1];
    if (nextAccordion) {
      nextAccordion.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const habdleStepChange = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  console.log(formData, "formData");
  const stepComponents = [
    <ConsignorDetail data={formData.consignorDetail} onNext={handleNext} />,
    <ConsigneeDetail data={formData.consigneeDetail} onNext={handleNext} />,
    <ShipmentInformation data={formData.shipmentInformation} onNext={handleNext} onBack={handleBack} />,
    <ShippingPartner data={formData.selectShippingPartner} onBack={handleBack} />,
  ];

  const stepTiles = ["consignorDetail", "consigneeDetail", "shipmentInformation", "selectShippingPartner"];
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
          <div
            className="flex flex-grow flex-col items-start gap-1 overflow-auto max-h[80vh] lg:w-2/3"
            ref={containerRef}
          >
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
          <div className="hidden md:block lg:w-1/3">
            {currentStep > 0 ? (
              <>
                {Object.keys(formData)
                  .slice(0, currentStep)
                  .map((key, index) => (
                    <DataAccordion key={index} title={stepTiles[index]} data={formData[key as keyof typeof formData]} />
                  ))}
              </>
            ) : (
              <OrderInformation />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

import { useState } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { ConsigneeDetail } from "./components/ConsigneeDetail";
import { Container } from "./components/Container";
import { OrderInformation } from "./components/OrderInformation";
import { ConsignorDetail } from "./ConsignorDetail";
import { ShipmentInformation } from "./ShipmentInformation";
import { ShippingPartner } from "./ShippingPartner";
import { Stepper } from "../../components/Stepper";

export const AddOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    consignorDetail: {},
    consigneeDetail: {},
    shipmentInformation: {},
    shippingPartner: {},
  });
  const handleNext = () => {
    // const key = stepKeys[currentStep];
    // setFormData((prev) => ({
    //   ...prev,
    //   [key]: data,
    // }));
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
    <ConsignorDetail onNext={handleNext} />,
    <ConsigneeDetail onNext={handleNext} onBack={handleBack} />,
    <ShipmentInformation onNext={handleNext} onBack={handleBack} />,
    <ShippingPartner onBack={handleBack} />,
  ];
  return (
    <section className="bg-gray-50">
      <Header />
      <SideBar />
      <Container>
        <h3 className="text-2xl leading-none tracking-tight mb-1 font-medium">Create CSB-IV order</h3>
        <div className="flex justify-center gap-4 mt-10">
          <div className="flex flex-col items-start w-[2200px] gap-1">
            {stepComponents.map((item, index) => (
              <div className="w-full">{item}</div>
            ))}
          </div>
          <div className="hidden md:block">
            <OrderInformation />
          </div>
        </div>
      </Container>
    </section>
  );
};

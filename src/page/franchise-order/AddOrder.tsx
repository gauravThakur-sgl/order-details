import { useRef } from "react";
import { ConsigneeDetail } from "@/page/franchise-order/ConsigneeDetail";
import { Container } from "@/page/franchise-order/components/Container";
import { OrderInformation } from "@/page/franchise-order/components/OrderInformation";
import { ConsignorDetail } from "@/page/franchise-order/ConsignorDetail";
import { ShipmentInformation } from "@/page/franchise-order/ShipmentInformation";
import { ShippingPartner } from "@/page/franchise-order/ShippingPartner";
import { Accordion } from "@/page/franchise-order/components/Accordion";
import { DataAccordion } from "@/page/franchise-order/components/DataAccordion";
import { ChevronRight } from "lucide-react";
import { FinalPriceInfo } from "@/page/franchise-order/components/FinalPriceInfo";
import { HandleNextData } from "@/page/franchise-order/interface";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { stepTiles } from "@/page/franchise-order/config/stepsInfo";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { nextStep, prevStep, setFormData } from "@/app/features/order/orderSlice";

export const AddOrder = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.order);
  const currentStep = formData.currentStep;
  const openIndex = formData.openIndex;

  const containerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const handleNext = (data: HandleNextData) => {
    const key = stepTiles[currentStep - 1];
    dispatch(setFormData({ [key]: data }));
    if (currentStep < 4) {
      dispatch(nextStep());
    }
    // setOpenIndex((prev) => (prev !== null ? prev + 1 : null));
    if (openIndex !== null) {
      dispatch(setFormData({ openIndex: openIndex + 1 }));
    }
    const nextAccordion = accordionRef.current?.querySelectorAll<HTMLDivElement>(".accordion")[currentStep];
    if (nextAccordion) {
      nextAccordion.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      prevStep();
    }
  };

  const toggleAccordion = (index: number) => {
    if (index > currentStep) {
      console.log("errorState");
      return;
    }
    // setOpenIndex(openIndex === index ? null : index);
    if (openIndex !== index) {
      dispatch(setFormData({ openIndex: index }));
    }
    dispatch(setFormData({ currentStep: index }));
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="bg-gray-50 font-poppins">
      <Header />
      <SideBar />
      <Container>
        <h3 className="text-2xl leading-none tracking-tight mb-1 font-medium">Create CSB-IV Order</h3>
        <p className="flex items-center">
          <span className="flex text-gray-500 text-sm items-center gap-1">
            Orders
            <ChevronRight className="w-4 h-4" />
          </span>{" "}
          <span className="text-sm text-franchise-sectionp pl-2">Create CSB-IV Order</span>
        </p>
        <div className="flex justify-center gap-4 mt-5">
          <div className="flex flex-grow flex-col items-start gap-1 lg:w-2/3 scrollable-container">
            <Accordion
              title="Consignor Detail"
              stepNumber={1}
              onToggle={() => toggleAccordion(1)}
              isOpen={openIndex === 1}
              activeState={currentStep}
            >
              <ConsignorDetail data={formData.consignorDetail} onNext={handleNext} />
            </Accordion>
            <Accordion
              title="Consignee Detail"
              stepNumber={2}
              onToggle={() => toggleAccordion(2)}
              isOpen={openIndex === 2}
              activeState={currentStep}
            >
              <ConsigneeDetail data={formData.consigneeDetail} onNext={handleNext} />
            </Accordion>
            <Accordion
              title="Shipment Information"
              stepNumber={3}
              onToggle={() => toggleAccordion(3)}
              isOpen={openIndex === 3}
              activeState={currentStep}
            >
              <ShipmentInformation data={formData.shipmentInformation} onNext={handleNext} />
            </Accordion>
            <Accordion
              title="Select Shipping Partner"
              stepNumber={4}
              onToggle={() => toggleAccordion(4)}
              isOpen={openIndex === 4}
              activeState={currentStep}
            >
              <ShippingPartner data={formData.selectShippingPartner} onBack={handleBack} />
            </Accordion>
          </div>

          <div className="hidden md:block lg:w-1/3">
            {currentStep > 1 ? (
              <>
                {currentStep === 2 && <DataAccordion title="Consignor Detail" data={formData.consignorDetail} />}
                {currentStep === 3 && (
                  <>
                    <DataAccordion title="Consignor Detail" data={formData.consignorDetail} />
                    <DataAccordion title="Consignee Detail" data={formData.consigneeDetail} />
                  </>
                )}
                {currentStep === 4 && (
                  <>
                    <DataAccordion title="Consignor Detail" data={formData.consignorDetail} initialIsOpen={false} />
                    <DataAccordion title="Consignee Detail" data={formData.consigneeDetail} initialIsOpen={false} />
                    <DataAccordion title="Item Details" data={formData.shipmentInformation} />
                    <FinalPriceInfo />
                  </>
                )}
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

import { useState, ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Step } from "./Step";

interface StepperProps {
  steps: string[];
  children: ReactNode[];
}

export const Stepper = ({ steps, children }: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="flex h-full">
          {" "}
          <Step current={currentStep} stepData={steps} />
        </div>
        <div className="bg-white rounded-md p-8 w-full">
          {children[currentStep]}
          <div className={`flex ${currentStep > 0 ? "justify-between" : "justify-end"} items-center gap-4 mt-4`}>
            <button
              onClick={handlePrev}
              className={`${
                currentStep === 0 ? "hidden" : "block"
              } text-white bg-progress-step rounded-md p-2 px-4 font-medium text-base flex justify-center items-center gap-2`}
            >
              Back{" "}
              <span>
                <ArrowLeft />
              </span>
            </button>
            <button
              onClick={handleNext}
              className="text-white bg-progress-step rounded-md p-2 px-4 font-medium text-base"
            >
              {currentStep === steps.length - 1 ? "Place Order" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

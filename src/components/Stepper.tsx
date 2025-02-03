import { useState, ReactNode } from "react";
import { ArrowLeft, Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  children: ReactNode[];
}

interface StepProps {
  current: number;
  stepData: string[];
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
        <div className="w-full lg:w-1/3">
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

const Step = ({ current, stepData }: StepProps) => {
  return (
    <div className="flex flex-col items-center m-4 bg-white p-8 text-nowrap gap-8 rounded-md justify-center">
      {stepData.map((title, index) => (
        <div key={index} className="relative w-full mr-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center justify-center font-semibold text-sm text-white h-8 w-8 rounded-md ${
                index <= current ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              {index < current ? <Check className="" /> : index + 1}
            </div>
            <div className={`font-semibold ${index <= current ? "text-gray-500" : "text-gray-500"}`}>{title}</div>
          </div>
          {index < stepData.length - 1 && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-8 w-px h-8 bg-gray-300 border-dashed"></div>
          )}{" "}
        </div>
      ))}
    </div>
  );
};

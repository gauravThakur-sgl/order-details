import { ReactNode } from "react";
import { Step } from "./Step";

interface StepperProps {
  steps: string[];
  children: ReactNode[];
  currentStep: number;
}

export const Stepper = ({ steps, children, currentStep }: StepperProps) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="flex h-full">
          {" "}
          <Step current={currentStep} stepData={steps} />
        </div>
        <div className="bg-white rounded-md p-8 w-full">{children[currentStep]}</div>
      </div>
    </>
  );
};

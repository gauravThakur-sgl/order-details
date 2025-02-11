import { ReactNode } from "react";
import { Step } from "./Step";

interface IStepperProps {
  steps: string[];
  children: ReactNode[];
  currentStep: number;
  onStepChange?: (step: number) => void;
}

export const Stepper = ({ steps, children, currentStep, onStepChange }: IStepperProps) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
        <div className="flex h-full w-full lg:w-1/3">
          {" "}
          <Step current={currentStep} stepData={steps} onStepChange = {onStepChange} />
        </div>
        <div className="bg-white rounded-md p-8 w-full">{children[currentStep]}</div>
      </div>
    </>
  );
};

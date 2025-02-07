import { ReactNode } from "react";
import { Step } from "./Step";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface StepperProps {
  steps: string[];
  children: ReactNode[];
}

export const Stepper = ({ steps, children }: StepperProps) => {
  const currentStep = useSelector((state: RootState) => state.order.currentStep);
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

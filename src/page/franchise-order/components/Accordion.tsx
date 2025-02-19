import clsx from "clsx";
import { Check } from "lucide-react";
import React from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  stepNumber: number;
  onToggle?: () => void;
  isOpen: boolean;
  activeState?: number;
}

export const Accordion = ({ title, children, stepNumber, onToggle, isOpen, activeState = 0 }: AccordionItemProps) => {
  return (
    <div className="border-b border-gray-300 w-full">
      <div
        className={`flex justify-between items-center p-3 rounded-sm border ${isOpen ? "bg-gray-50" : "bg-white"} ${
          stepNumber <= activeState ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <h2 className="text-black text-sm font-medium flex justify-center">
          <span
            className={clsx("py-1 mx-3 rounded-sm font-semibold text-xs", {
              "px-2 bg-black text-white": stepNumber >= activeState,
            })}
          >
            {stepNumber < activeState ? (
              <span className="text-white text-sm">
                <Check className="bg-green-500 rounded-sm w-5 h-5 text-white" />
              </span>
            ) : (
              <span className="h-5 w-5">{stepNumber}</span>
            )}
          </span>
          <span className="pt-1">{title}</span>
        </h2>
        {stepNumber < activeState && (
          <div className="text-franchise-primary font-medium" onClick={onToggle}>
            <u>Change</u>
          </div>
        )}
      </div>
      <div
        className={`transition-max-height duration-300 ease-in-out ${isOpen ? "max-h-[2000px]" : "max-h-0"} ${
          activeState === stepNumber ? "" : "overflow-hidden"
        }`}
      >
        <div className="py-4 px-7 text-gray-700 bg-white border">{children}</div>
      </div>
    </div>
  );
};

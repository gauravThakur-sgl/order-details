import clsx from "clsx";
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
        <h2 className="text-black text-sm font-medium">
          <span
            className={clsx("py-1 mx-3 rounded-sm font-semibold text-xs", {
              "px-2 bg-green-500 text-white": stepNumber < activeState,
              "px-2 bg-black text-white": stepNumber >= activeState,
            })}
          >
            {stepNumber < activeState ? <span className="text-white text-sm px">✓</span> : stepNumber}
          </span>
          {title}
        </h2>
        {stepNumber < activeState && (
          <div className="text-franchise-primary font-medium" onClick={onToggle}>
            <u>Change</u>
          </div>
        )}
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px]" : "max-h-0"
        }`}
      >
        <div className="py-4 px-7 text-gray-700 bg-white border">{children}</div>
      </div>
    </div>
  );
};

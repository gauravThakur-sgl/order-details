import React, { useState, useRef, useEffect } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  stepNumber: number;
  onToggle?: () => void;
  isOpen: boolean;
  activeState?: number;
}

export const Accordion = ({ title, children, stepNumber, onToggle, isOpen, activeState = 0 }: AccordionItemProps) => {
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-300 w-full">
      <div
        className={`flex justify-between items-center p-3 rounded-sm cursor-pointer border ${
          isOpen ? "bg-gray-50" : "bg-white"
        }`}
        onClick={onToggle}
      >
        <h2 className="text-black font-medium">
          <span
            className={` rounded p-1 mr-2 text-white text-sm bg-black px-2 ${
              stepNumber < activeState ? "bg-green-500" : "bg-black"
            }
            `}
          >
            {stepNumber < activeState ? <span className="text-white text-sm px">✓</span> : stepNumber}
          </span>{" "}
          {title}
        </h2>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <div className="p-4 text-gray-700 bg-white">{children}</div>
      </div>
    </div>
  );
};

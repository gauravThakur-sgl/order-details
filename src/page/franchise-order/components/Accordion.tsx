import { useState } from "react";

interface AccordionItem {
  title: string;
}

interface AccordionProps {
  className?: string;
  items: AccordionItem[];
  activeIndex?: number;
  children: React.ReactNode;
}

export const Accordion = ({ className, items, activeIndex = 0, children }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState(activeIndex);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className={`w-full border rounded-lg transition ease-in-out delay-150 ${className || ""}`}>
      {items.map((item, index) => (
        <div key={index} className="border-b">
          <button
            className={`flex justify-between items-center border w-full py-3 px-6 text-left font-semibold ${
              openIndex === index ? "bg-gray-50" : "bg-white"
            }`}
            onClick={() => handleToggle(index)}
            aria-expanded={openIndex === index}
          >
            <span className="text-sm  text-black">
              <span className="rounded p-1 px-2 bg-franchise-sectionp text-franchise-button-text mr-4">1</span>
              {item.title}
            </span>
            <span className="text-sm">
              {openIndex === index ? (
                <span className="text-franchise-primary font-medium">
                  <u>Change</u>
                </span>
              ) : (
                ""
              )}
            </span>
          </button>
          <div
            className={`px-6 bg-white overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              openIndex === index ? "max-h-[2000px]" : "max-h-0"
            }`}
            style={{ maxHeight: openIndex === index ? "2000px" : "0" }}
          >
            <div className="py-3">{children}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

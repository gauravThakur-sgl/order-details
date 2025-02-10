import { Check } from "lucide-react";

interface StepProps {
  current: number;
  stepData: string[];
}

export const Step = ({ current, stepData }: StepProps) => {
  return (
    <div className="flex flex-col items-center bg-white p-8 text-nowrap gap-8 rounded-md justify-center w-full">
      {stepData.map((title, index) => (
        <div key={index} className="relative w-full mr-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center justify-center font-semibold text-sm text-white h-8 w-8 rounded-md ${
                index <= current ? "bg-progress-step" : "bg-gray-300"
              }`}
            >
              {index < current ? <Check className="w-4 h-4 font-semibold" /> : index + 1}
            </div>
            <div className={`font-semibold ${index <= current ? "text-gray-500" : "text-gray-500"}`}>{title}</div>
          </div>
          {index < stepData.length - 1 && (
            <div className="absolute left-4 transform -translate-x-1/2 top-8 h-8 bg-gray-300 border border-dashed"></div>
          )}{" "}
        </div>
      ))}
    </div>
  );
};

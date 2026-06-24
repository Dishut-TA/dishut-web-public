import React from "react";

interface StepperProps {
  currentStep: number;
}

const StepperIndicator: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: "Identitas" },
    { num: 2, label: "Investasi" },
    { num: 3, label: "Pembayaran" },
  ];

  return (
    <div className="flex items-center justify-between mb-8 relative">
      <div className="absolute top-3 left-0 w-full h-px bg-[#7BA884] -z-10" />
      {steps.map((step, index) => {
        const isActive = currentStep >= step.num;
        return (
          <div key={index} className="flex flex-col items-center gap-2 bg-[#D5ECD8] px-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border 
                ${isActive ? "bg-primary text-white border-primary" : "bg-transparent text-[#4F6352] border-[#7BA884]"}`}
            >
              {step.num}
            </div>
            <span className="text-[10px] text-[#4F6352] font-medium">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StepperIndicator;
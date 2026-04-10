import React from "react";

interface DonationStepIndicatorProps {
  currentStep: number;
  steps: readonly string[];
}

const DonationStepIndicator: React.FC<DonationStepIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="mb-10">
      <div className="relative flex items-start justify-between gap-2">
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-[#B6D9AE]" />

        {steps.map((item, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div
              key={item}
              className="relative z-10 flex flex-1 flex-col items-center bg-customWhite px-1 text-center"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : isCompleted
                    ? "bg-[#98C98A] text-white"
                    : "bg-[#B6D9AE] text-white"
                }`}
              >
                {stepNumber}
              </div>

              <span
                className={`mt-3 text-xs sm:text-sm ${
                  isActive ? "font-medium text-primary" : "text-[#8DB884]"
                }`}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonationStepIndicator;
const StepperBar = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Informasi Investasi', 'Milestone', 'Dokumen'];
  return (
    <div className="flex items-center justify-between mb-8 px-4">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={label} className="flex flex-col items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all 
              ${isActive ? 'bg-primary text-white' : isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              {isCompleted ? '✓' : stepNum}
            </div>
            <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-gray-400'}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};
export default StepperBar;
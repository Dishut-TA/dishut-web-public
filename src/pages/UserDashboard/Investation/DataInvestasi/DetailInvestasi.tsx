import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import StepperBar from './components/stepper/StepperBar';
import Step1Info from './components/stepper/Step1Info';
import Step2Milestone from './components/stepper/Step2Milestone';
import Step3Dokumen from './components/stepper/Step3Dokumen';

const DetailInvestasi: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-1 text-primary font-bold text-sm mb-6 hover:underline"
        >
          <FiChevronLeft /> Kembali
        </button>

        <h1 className="text-2xl font-bold text-primary text-center mb-6">
          Pembangunan Ekowisata Pinus
        </h1>

        <StepperBar currentStep={step} />

        {step === 1 && <Step1Info onNext={() => setStep(2)} />}
        {step === 2 && <Step2Milestone onNext={() => setStep(3)} />}
        {step === 3 && <Step3Dokumen onFinish={() => navigate(-1)} />}

      </div>
    </div>
  );
};

export default DetailInvestasi;
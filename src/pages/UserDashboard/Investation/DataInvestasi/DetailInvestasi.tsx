import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import StepperBar from './components/stepper/StepperBar';
import Step1Info from './components/stepper/Step1Info';
import Step2Milestone from './components/stepper/Step2Milestone';
import Step3Dokumen from './components/stepper/Step3Dokumen';
import { getProgramByIdAPI } from '@/services/invest.service';
import { ToastError } from '@/utils/toast';

const DetailInvestasi: React.FC = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [program, setProgram] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProgramByIdAPI(id)
        .then(res => setProgram(res))
        .catch(err => {
          console.error(err);
          ToastError("Gagal memuat detail investasi");
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  if (!program) {
    return <div className="min-h-screen flex justify-center items-center">Data tidak ditemukan</div>;
  }

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
          {program.nama_program}
        </h1>

        <StepperBar currentStep={step} />

        {step === 1 && <Step1Info onNext={() => setStep(2)} program={program} />}
        {step === 2 && <Step2Milestone onNext={() => setStep(3)} program={program} />}
        {step === 3 && <Step3Dokumen onFinish={() => navigate(-1)} program={program} />}

      </div>
    </div>
  );
};

export default DetailInvestasi;
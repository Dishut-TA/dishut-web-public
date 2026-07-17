import React, { useState } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";
import AgreementWarningModal from "./AgreementWarningModal"; 
import StepperIndicator from "./stepper/StepperIndicator";
import Step1Identity from "./stepper/Step1Identity";
import Step2Investment from "./stepper/Step2Investment";
import Step3Payment from "./stepper/Step3Payment";
import Step4Success from "./stepper/Step4Success";
import { ToastSuccess } from '@/utils/toast'; // Pastikan import toast ada jika ingin dipakai di tombol luar

const cardTransition: Transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

export const InvestmentActionCard: React.FC<{ image: string }> = ({ image }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Fungsi untuk menangani unduhan dokumen
  const handleDownloadAgreement = () => {
    // Tambahkan logika unduh file PDF di sini nantinya
    // contoh: window.open('/template-perjanjian.pdf', '_blank');
    
    // Jika tombol dari luar (bukan modal) ditekan, tampilkan toast juga
    if (!isModalOpen) {
        ToastSuccess("Template Surat Perjanjian berhasil diunduh!");
    }
  };

  return (
    <>
      <motion.div layout transition={cardTransition} className="relative w-full max-w-125 mx-auto" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div key="front" exit={{ rotateY: 90, opacity: 0 }} className="w-full">
              <img src={image} alt="Cover" className="w-full h-72 object-cover rounded-2xl mb-6 shadow-sm" />
              
              {/* Tambahkan onClick ke tombol Unduh Perjanjian di depan card */}
              <button 
                onClick={handleDownloadAgreement} 
                className="w-full py-3.5 border-2 border-primary text-primary rounded-full font-semibold flex items-center justify-center gap-2 mb-4 hover:bg-primary/5 transition-colors"
              >
                <HiOutlineDocumentDownload className="text-xl" /> Unduh Perjanjian
              </button>
              
              <button onClick={() => setIsModalOpen(true)} className="w-full py-3.5 bg-primary text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#144818] transition-colors">
                Investasi Sekarang <FiChevronRight className="text-xl" />
              </button>
            </motion.div>
          ) : (
            <motion.div key="back" initial={{ rotateY: -90 }} animate={{ rotateY: 0 }} className="w-full bg-[#D5ECD8] rounded-3xl p-6 md:p-8 border border-[#7BA884]/30 shadow-md">
              {step <= 3 && <StepperIndicator currentStep={step} />}
              <div className="mt-2">
                {step === 1 && <Step1Identity onNext={() => setStep(2)} />}
                {step === 2 && <Step2Investment onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                {step === 3 && <Step3Payment onNext={() => setStep(4)} onBack={() => setStep(2)} />}
                {step === 4 && <Step4Success />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tambahkan prop onTriggerDownload di sini */}
      <AgreementWarningModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onProceed={() => { setIsModalOpen(false); setIsFlipped(true); }} 
        onTriggerDownload={handleDownloadAgreement} 
      />
    </>
  );
};
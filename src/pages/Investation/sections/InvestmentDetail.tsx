import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { HiOutlineUserGroup, HiOutlineCalendar, HiOutlineChartPie } from "react-icons/hi2";
import { TbTargetArrow } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import StepperIndicator from "../components/stepper/StepperIndicator";
import Step1Identity from "../components/stepper/Step1Identity";
import Step2Investment from "../components/stepper/Step2Investment";
import Step3Payment from "../components/stepper/Step3Payment";
import Step4Success from "../components/stepper/Step4Success";
import AgreementWarningModal from "../components/AgreementWarningModal"; 

const cardTransition: Transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

const InvestmentDetail: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [step, setStep] = useState(1);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInvestClick = () => {
    if (!hasDownloaded) {
      setIsModalOpen(true);
    } else {
      setIsFlipped(true);
    }
  };

  const handleCancel = () => {
    setIsFlipped(false);
    setTimeout(() => setStep(1), 500); 
  };

  return (
    <div className="min-h-screen bg-[#F5F7F5] py-10 px-5 md:px-8 lg:px-12 font-sans overflow-x-hidden">
      <div className="max-w-300 mx-auto">
        <button 
          onClick={isFlipped ? handleCancel : undefined}
          className="flex items-center gap-1 text-[#2E7D32] font-semibold text-sm hover:underline mb-8 transition-all"
        >
          <FiChevronLeft className="text-lg" /> {isFlipped ? "Batal Investasi" : "Kembali"}
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="flex flex-col">
            {isFlipped && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full aspect-4/3] d:aspect-3/2] ounded-2xl overflow-hidden shadow-sm mb-6"
              >
                <img 
                  src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=80" 
                  alt="Ekowisata Rimba Pinus" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>
            )}

            <h1 className="text-3xl md:text-[32px] font-bold text-primary mb-4">
              Ekowisata Rimba Pinus
            </h1>
            
            <p className="text-[#4F6352] text-sm md:text-[15px] leading-relaxed mb-8">
              Lorem ipsum dolor sit amet consectetur. Sed arcu elementum eu feugiat 
              mattis posuere. Tempus quis consequat in amet. Commodo dignissim sed 
              tellus mi. Rhoncus lectus habitant leo urna et tortor nunc velit accumsan. 
              Adipiscing sed turpis sit aliquet dictum iaculis posuere a.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 mb-8 text-[#828282] text-sm font-medium">
              <div className="flex items-center gap-2">
                <TbTargetArrow className="text-lg" /> 
                <span>Minimal Invest Rp 100.000</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineUserGroup className="text-lg" /> 
                <span>8 Orang Sudah Berinvestasi</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineChartPie className="text-lg" /> 
                <span>Presentase Keuntungan 60:40</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCalendar className="text-lg" /> 
                <span>Dikelola Selama 48 Bulan</span>
              </div>
            </div>

            <div className="bg-[#D5ECD8] rounded-xl p-5 mb-8">
              <div className="flex items-center gap-2 text-primary font-bold text-[15px] mb-1.5">
                <FaLock className="text-sm" />
                <span>BAGI HASIL: 60% KTH | 40% INVESTOR</span>
              </div>
              <p className="text-xs text-[#4F6352] leading-relaxed">
                Rasio dikunci sesuai standar kelayakan Dinas Kehutanan Jawa Barat 
                untuk menjamin kesejahteraan petani dan keberlanjutan ekosistem.
              </p>
            </div>

            {!isFlipped && (
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setHasDownloaded(true)}
                  className={`w-full py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors
                    ${hasDownloaded 
                      ? "bg-gray-100 text-primary border-2 border-primary" 
                      : "bg-tertiary text-white hover:bg-[#483e14]"}`}
                >
                  <HiOutlineDocumentDownload className="text-xl" /> 
                  {hasDownloaded ? "Template Sudah Diunduh" : "Unduh Template Perjanjian Investor"}
                </button>
                
                <button 
                  onClick={handleInvestClick}
                  className="w-full py-3.5 bg-primary text-white rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#76BC7D] transition-colors shadow-sm"
                >
                  Investasi Sekarang <FiChevronRight className="text-lg" />
                </button>
              </div>
            )}
          </div>

          <motion.div style={{ perspective: 1200 }} className="w-full sticky top-10">
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                <motion.div 
                  key="front" 
                  exit={{ rotateY: -90, opacity: 0 }} 
                  transition={cardTransition}
                  className="flex flex-col gap-4 w-full origin-center"
                >
                  <div className="w-full aspect-4/3 md:aspect-3/2 rounded-2xl overflow-hidden shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=80" 
                      alt="Ekowisata Rimba Pinus" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#D9D9D9] rounded-lg aspect-16/10 w-full cursor-pointer hover:opacity-80 transition-opacity"></div>
                    <div className="bg-[#D9D9D9] rounded-lg aspect-16/10 w-full cursor-pointer hover:opacity-80 transition-opacity"></div>
                    <div className="bg-[#D9D9D9] rounded-lg aspect-16/10 w-full cursor-pointer hover:opacity-80 transition-opacity"></div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="back" 
                  initial={{ rotateY: 90, opacity: 0 }} 
                  animate={{ rotateY: 0, opacity: 1 }} 
                  transition={cardTransition}
                  className="w-full bg-[#D5ECD8] rounded-3xl p-6 md:p-8 origin-center"
                >
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

        </div>
      </div>

      <AgreementWarningModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onProceed={() => {
          setIsModalOpen(false);
          setIsFlipped(true); 
        }} 
      />

    </div>
  );
};

export default InvestmentDetail;
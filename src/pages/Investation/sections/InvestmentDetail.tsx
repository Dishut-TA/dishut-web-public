import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { useAuth } from "@/context/AuthContext"; 
import { FiChevronLeft, FiChevronRight, FiShare2 } from "react-icons/fi";
import { HiOutlineUserGroup, HiOutlineCalendar, HiOutlineChartPie } from "react-icons/hi2";
import { TbTargetArrow } from "react-icons/tb";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { ToastSuccess, ToastError } from "@/utils/toast"; 
import StepperIndicator from "../components/stepper/StepperIndicator";
import Step1Identity from "../components/stepper/Step1Identity";
import Step2Investment from "../components/stepper/Step2Investment";
import Step3Payment from "../components/stepper/Step3Payment";
import Step4Success from "../components/stepper/Step4Success";
import TabDetail from "../components/TabDetail";
import TabPanduan from "../components/TabPanduan";
import TabDokumen from "../components/TabDokumen";
import AgreementWarningModal from "../components/AgreementWarningModal";

const cardTransition: Transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

const InvestmentDetail: React.FC = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [step, setStep] = useState(1);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'detail' | 'panduan' | 'dokumen'>('detail');

  const handleInvestClick = () => {
    if (!user) {
      ToastError("Anda harus login terlebih dahulu untuk melakukan investasi.");
      navigate('/login', { state: { from: location } });
      return; 
    }

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

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    ToastSuccess("Link tautan berhasil disalin ke clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#F5F7F5] pt-28 pb-12 px-5 md:px-8 lg:px-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={isFlipped ? handleCancel : undefined}
          className="flex items-center gap-1 text-[#2E7D32] font-semibold text-sm hover:underline mb-6 md:mb-8 transition-all cursor-pointer"
        >
          <FiChevronLeft className="text-lg" /> {isFlipped ? "Batal Investasi" : "Kembali"}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col w-full order-2 lg:order-1">
            <div className="w-full aspect-16/10 sm:aspect-video rounded-3xl overflow-hidden shadow-md mb-4 bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=80" 
                alt="Ekowisata Rimba Pinus" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
              <div className="bg-[#D9D9D9] rounded-xl aspect-16/10 w-full cursor-pointer hover:opacity-80 transition-opacity"></div>
              <div className="bg-[#D9D9D9] rounded-xl aspect-16/10 w-full cursor-pointer hover:opacity-80 transition-opacity"></div>
              <div className="bg-[#D9D9D9] rounded-xl aspect-16/10 w-full cursor-pointer hover:opacity-80 transition-opacity"></div>
            </div>

            <div className="flex items-center justify-between pb-2 mb-6 text-sm font-semibold text-[#828282] gap-4">
              <div className="flex gap-4 md:gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide flex-1 pb-1">
                <button 
                  onClick={() => setActiveTab('detail')} 
                  className={`transition-all cursor-pointer ${activeTab === 'detail' ? 'text-primary border-b-2 border-primary font-bold' : 'hover:text-primary'}`}
                >
                  Detail Investasi
                </button>
                <button 
                  onClick={() => setActiveTab('panduan')} 
                  className={`transition-all cursor-pointer ${activeTab === 'panduan' ? 'text-primary border-b-2 border-primary font-bold' : 'hover:text-primary'}`}
                >
                  Panduan & Informasi
                </button>
                <button 
                  onClick={() => setActiveTab('dokumen')} 
                  className={`transition-all cursor-pointer ${activeTab === 'dokumen' ? 'text-primary border-b-2 border-primary font-bold' : 'hover:text-primary'}`}
                >
                  Dokumen
                </button>
              </div>

              <button 
                onClick={handleShareClick}
                className="flex items-center shrink-0 gap-1.5 text-primary hover:text-secondary font-bold cursor-pointer"
              >
                <span className="hidden sm:block">Bagikan</span> <FiShare2 size={18} />
              </button>
            </div>

            <div className="min-h-37.5 pb-10 lg:pb-0">
              {activeTab === 'detail' && <TabDetail />}
              {activeTab === 'panduan' && <TabPanduan />}
              {activeTab === 'dokumen' && <TabDokumen onDownloadTemplate={() => setHasDownloaded(true)} />}
            </div>
          </div>

          <div className="lg:col-span-5 w-full lg:sticky order-1 lg:order-2">
            <div style={{ perspective: 1200 }} className="w-full">
              <AnimatePresence mode="wait">
                
                {!isFlipped ? (
                  <motion.div 
                    key="front-info" 
                    exit={{ rotateY: -90, opacity: 0 }} 
                    transition={cardTransition}
                    className="flex flex-col w-full origin-center"
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-primary mb-3 md:mb-4 tracking-tight leading-tight">
                      Ekowisata Rimba Pinus
                    </h1>
                    
                    <p className="text-[#4F6352] text-sm md:text-[15px] leading-relaxed mb-6 md:mb-8">
                      Lorem ipsum dolor sit amet consectetur. Sed arcu elementum eu feugiat 
                      mattis posuere. Tempus quis consequat in amet. Commodo dignissim sed 
                      tellus mi. Rhoncus lectus habitant leo urna et tortor nunc velit accumsan.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 mb-6 md:mb-8 text-[#555555] text-xs sm:text-sm font-semibold">
                      <div className="flex items-center gap-3"><TbTargetArrow className="text-xl shrink-0 text-primary" /> <span>Minimal Invest Rp 100.000</span></div>
                      <div className="flex items-center gap-3"><HiOutlineUserGroup className="text-xl shrink-0 text-primary" /> <span>8 Orang Sudah Berinvestasi</span></div>
                      <div className="flex items-center gap-3"><HiOutlineChartPie className="text-xl shrink-0 text-primary" /> <span>Presentase Keuntungan 60:40</span></div>
                      <div className="flex items-center gap-3"><HiOutlineCalendar className="text-xl shrink-0 text-primary" /> <span>Dikelola Selama 48 Bulan</span></div>
                    </div>

                    <div className="mb-6 md:mb-8">
                      <div className="flex justify-between items-center mb-2 font-bold text-sm text-gray-700">
                        <span>Target Terkumpul</span>
                        <span className="text-primary text-base">90%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-primary rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-gray-400">
                        <div>
                          <p className="uppercase tracking-wider text-[10px] sm:text-[11px] mb-0.5">Terkumpul</p>
                          <p className="text-primary text-sm sm:text-base font-bold">Rp 450.000.000</p>
                        </div>
                        <div className="text-right">
                          <p className="uppercase tracking-wider text-[10px] sm:text-[11px] mb-0.5">Dari Target</p>
                          <p className="text-gray-600 text-sm sm:text-base font-bold">Rp 500.000.000</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleInvestClick}
                      className="w-full py-3.5 sm:py-4 bg-primary text-white rounded-full text-sm sm:text-base font-semibold flex items-center justify-center gap-2 hover:bg-[#144a18] transition-all shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      Investasi Sekarang <FiChevronRight className="text-xl" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="back-stepper" 
                    initial={{ rotateY: 90, opacity: 0 }} 
                    animate={{ rotateY: 0, opacity: 1 }} 
                    transition={cardTransition}
                    className="w-full bg-[#D5ECD8] rounded-3xl p-5 sm:p-6 md:p-8 origin-center shadow-md overflow-hidden"
                  >
                    {step <= 3 && <StepperIndicator currentStep={step} />}
                    <div className="mt-2 md:mt-4">
                      {step === 1 && <Step1Identity onNext={() => setStep(2)} />}
                      {step === 2 && <Step2Investment onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                      {step === 3 && <Step3Payment onNext={() => setStep(4)} onBack={() => setStep(2)} />}
                      {step === 4 && <Step4Success />}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      <AgreementWarningModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTriggerDownload={() => setHasDownloaded(true)}
        onProceed={() => {
          setIsModalOpen(false);
          setIsFlipped(true); 
        }} 
      />
    </div>
  );
};

export default InvestmentDetail;
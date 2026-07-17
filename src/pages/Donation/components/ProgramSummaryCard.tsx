import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/Button";
import { MdLocationOn } from "react-icons/md";
import { PiLeafFill } from "react-icons/pi";
import DonationStepper, { type DonationFormData } from "./stepper/DonationStepper";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastError, ToastSuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";

interface ProgramSummaryCardProps {
  title: string;
  location: string;
  image: string;
  collected: number;
  target: number;
  status: "Aktif" | "Non-Aktif";
}

const formatNumber = (num: number) =>
  new Intl.NumberFormat("id-ID").format(num);

const cardTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

const ProgramSummaryCard: React.FC<ProgramSummaryCardProps> = ({
  location,
  image,
  collected,
  target,
  status,
}) => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const locations = useLocation();  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DonationFormData>({
    name: "",
    amount: "0",
    selectedBibits: [], 
    paymentMethod: "",
    virtualAccount: "",
    proofFile: null, 
  });

  const progress = useMemo(
    () => Math.min((collected / target) * 100, 100),
    [collected, target]
  );

  const handleChange = (field: keyof DonationFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenDonation = () => {
    if(!user) {
      ToastError('Anda harus login terlebih dahulu untuk melakukan donasi.');
      navigate('/login', { state: {from: locations} })
    }
    setCurrentStep(1);
    setIsFlipped(true);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      const generatedVa = generateVirtualAccount();
      setFormData((prev) => ({
        ...prev,
        virtualAccount: generatedVa,
      }));
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // const handleCheckStatus = () => {
  //   console.log("Submit Donasi:", {
  //     name: formData.name,
  //     amount: formData.amount,
  //     bibit: formData.selectedBibits,
  //     paymentMethod: formData.paymentMethod,
  //     virtualAccount: formData.virtualAccount,
  //     proofFile: formData.proofFile?.name,
  //   });
  //   alert("Donasi berhasil dikirim!");
  //   // setIsFlipped(false); // Bisa di un-comment jika ingin menutup form setelah sukses
  // };

  const handleSubmitDonasi = async () => {
    if (!formData.proofFile) {
      ToastError("Harap unggah bukti pembayaran terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      ToastSuccess("Donasi berhasil dibuat! Menunggu konfirmasi admin.");
      navigate('/riwayat-transaksi', { state: { defaultTab: 'donasi' } });
      
    } catch (error) {
      ToastError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateVirtualAccount = () => {
    return `${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`;
  };

  return (
    <motion.div
      layout
      transition={cardTransition}
      className="relative w-full"
      style={{ perspective: 1200 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={cardTransition}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full origin-center"
          >
            <div className="min-h-107.5 rounded-2xl bg-white p-4 shadow-sm md:p-5">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt="Program donasi"
                  className="h-52 w-full object-cover md:h-60"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#344237] text-white text-[10px] font-semibold">
                  {status}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm text-primary/80">
                <MdLocationOn className="text-base text-primary/70" />
                <span>{location}</span>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm text-primary">
                  <div className="flex items-center gap-1">
                    <PiLeafFill className="text-primary text-xl" />
                    <span className="text-xl font-semibold md:text-2xl">
                      {formatNumber(collected)}
                    </span>
                    <span className="font-semibold text-primary/80 mt-1">Bibit</span>
                  </div>
                  <span className="font-bold">{Math.round(progress)}%</span>
                </div>

                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-2 text-xs font-semibold text-primary/70">
                  dari target {formatNumber(target)} Bibit
                </p>
              </div>

              <Button
                label="Donasi Sekarang"
                variant="primary"
                size="md"
                className="mt-6 w-full"
                onClick={handleOpenDonation}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={cardTransition}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full origin-center"
          >
            <DonationStepper
              currentStep={currentStep}
              formData={formData}
              onChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
              onCheckStatus={handleSubmitDonasi}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProgramSummaryCard;
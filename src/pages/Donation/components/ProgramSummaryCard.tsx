import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/Button";
import { MdLocationOn } from "react-icons/md";
import DonationStepper, { type DonationFormData } from "./stepper/DonationStepper";

interface ProgramSummaryCardProps {
  title: string;
  location: string;
  image: string;
  collected: number;
  target: number;
}

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const cardTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

const ProgramSummaryCard: React.FC<ProgramSummaryCardProps> = ({
  location,
  image,
  collected,
  target,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DonationFormData>({
    name: "",
    email: "",
    phone: "",
    amount: "",
    paymentMethod: "",
    virtualAccount: ""
  });

  const progress = useMemo(
    () => Math.min((collected / target) * 100, 100),
    [collected, target]
  );

  const handleChange = (field: keyof DonationFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenDonation = () => {
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

    const handleCheckStatus = () => {
    console.log("Check payment status:", {
        amount: formData.amount,
        paymentMethod: formData.paymentMethod,
        virtualAccount: formData.virtualAccount,
    });
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
              <div className="overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt="Program donasi"
                  className="h-52 w-full object-cover md:h-60"
                />
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm text-primary/80">
                <MdLocationOn className="text-base text-primary" />
                <span>{location}</span>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm text-primary">
                  <span className="text-xl font-semibold md:text-2xl">
                    {formatRupiah(collected)}
                  </span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>

                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-2 text-xs font-medium text-primary/70">
                  dari target {formatRupiah(target)}
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
            onCheckStatus={handleCheckStatus}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProgramSummaryCard;
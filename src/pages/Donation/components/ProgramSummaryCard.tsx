import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/Button";
import { MdLocationOn } from "react-icons/md";
import { PiLeafFill } from "react-icons/pi";
import DonationStepper, {
  type DonationFormData,
} from "./stepper/DonationStepper";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastError, ToastSuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";
import {
  createDonationAPI,
  createDonorAPI,
  createTransactionAPI,
} from "@/services/donation.service";

interface ProgramSummaryCardProps {
  programId: number;
  title: string;
  location: string;
  image: string;
  collected: number;
  // HAPUS properti target disini
  status: "Aktif" | "Non-Aktif";
}

const formatNumber = (num: number) =>
  new Intl.NumberFormat("id-ID").format(num);

const cardTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

const ProgramSummaryCard: React.FC<ProgramSummaryCardProps> = ({
  programId,
  location,
  image,
  collected,
  status,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const locations = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DonationFormData>({
    name: "",
    address: "",
    amount: "0",
    selectedBibits: [],
    paymentMethod: "",
    virtualAccount: "",
    proofFile: null,
  });

  const handleChange = (field: keyof DonationFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenDonation = () => {
    if (!user) {
      ToastError("Anda harus login terlebih dahulu untuk melakukan donasi.");
      navigate("/login", { state: { from: locations } });
      return;
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

  const handleSubmitDonasi = async () => {
    if (!formData.proofFile) {
      ToastError("Harap unggah bukti pembayaran terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    try {
      const donorPayload = {
        user_id: null,
        donor_name: formData.name,
        address: formData.address || "Tidak diketahui",
      };
      const resDonor = await createDonorAPI(donorPayload);
      const donorId = resDonor.payload.id;

      let firstDonationId = null;
      for (const bibit of formData.selectedBibits) {
        const donationPayload = {
          donation_program_id: programId,
          donor_id: donorId,
          seed_id: Number(bibit.id),
          seed_quantity: bibit.quantity,
          seed_status: "Pending",
        };
        const resDonation = await createDonationAPI(donationPayload);
        if (!firstDonationId) firstDonationId = resDonation.payload.id;
      }

      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      const transactionPayload = {
        donation_id: firstDonationId,
        donor_id: donorId,
        amount: Number(formData.amount),
        transaction_date: formattedDate,
        payment_method: formData.paymentMethod,
        status: "Pending",
      };
      await createTransactionAPI(transactionPayload);

      ToastSuccess("Donasi berhasil dibuat! Menunggu konfirmasi admin.");
      navigate("/donasi/riwayat-transaksi");
    } catch (error: any) {
      ToastError(error.message || "Terjadi kesalahan. Silakan coba lagi.");
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
                    <span className="font-semibold text-primary/80 mt-1">
                      Bibit Terkumpul
                    </span>
                  </div>
                </div>
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

import React from "react";
import Button from "@/components/Button";
import DonationStepIndicator from "./DonationStepIndicator";
import DonationIdentityStep from "./DonationIdentityStep";
import DonationAmountStep from "./DonationAmountStep";
import DonationPaymentStep from "./DonationPaymentStep";

export interface SelectedBibit {
  id: string;
  label: string;
  price: number;
  quantity: number;
}

export interface DonationFormData {
  name: string;
  amount: string;
  selectedBibits: SelectedBibit[];
  paymentMethod: string;
  virtualAccount: string;
  proofFile: File | null;
}

interface DonationStepperProps {
  currentStep: number;
  formData: DonationFormData;
  isSubmitting?: boolean;
  onChange: (field: keyof DonationFormData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
  onCheckStatus: () => void;
}

const STEP_ITEMS = ["Identitas", "Donasi", "Pembayaran"] as const;

const stepTitleMap: Record<number, string> = {
  1: "Masukan Data Identitas",
  2: "Pilih Bibit & Pembayaran",
  3: "Pembayaran Donasi",
};

const DonationStepper: React.FC<DonationStepperProps> = ({
  currentStep,
  formData,
  isSubmitting,
  onChange,
  onNext,
  onBack,
  onCheckStatus,
}) => {
  return (
    <div className="min-h-180 rounded-2xl bg-customWhite p-1 md:p-2">
      <div className="rounded-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-primary md:text-3xl">
            {stepTitleMap[currentStep]}
          </h2>
        </div>

        <DonationStepIndicator currentStep={currentStep} steps={STEP_ITEMS} />

        {currentStep === 1 && (
          <DonationIdentityStep
            name={formData.name}
            onChange={onChange}
          />
        )}

        {currentStep === 2 && (
          <DonationAmountStep
            selectedBibits={formData.selectedBibits}
            paymentMethod={formData.paymentMethod}
            onChange={onChange}
          />
        )}

        {currentStep === 3 && (
          <DonationPaymentStep
            amount={formData.amount}
            paymentMethod={formData.paymentMethod}
            virtualAccount={formData.virtualAccount}
            proofFile={formData.proofFile}
            onChange={onChange}
          />
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {currentStep === 1 && (
            <Button
              label="Selanjutnya"
              variant="primary"
              size="md"
              className="w-full"
              onClick={onNext}
            />
          )}

          {currentStep === 2 && (
            <>
              <Button
                label="Sebelumnya"
                variant="secondary"
                size="md"
                className="w-full"
                onClick={onBack}
              />
              <Button
                label="Submit"
                variant="primary"
                size="md"
                className="w-full"
                onClick={onNext}
                disabled={formData.selectedBibits.length === 0}
              />
            </>
          )}

          {currentStep === 3 && (
            <>
              <Button
                label="Kembali"
                variant="secondary"
                size="md"
                className="w-full"
                onClick={onBack}
                disabled={isSubmitting}
              />
              <Button
                label={isSubmitting ? "Memproses..." : "Konfirmasi Pembayaran"}
                variant="primary"
                size="md"
                className={`w-full ${isSubmitting ? 'bg-gray-400 cursor-not-allowed border-none' : ''}`}
                onClick={onCheckStatus}
                disabled={!formData.proofFile || isSubmitting}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationStepper;
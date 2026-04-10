import React from "react";
import Button from "@/components/Button";
import DonationStepIndicator from "./DonationStepIndicator";
import DonationIdentityStep from "./DonationIdentityStep";
import DonationAmountStep from "./DonationAmountStep";
import DonationPaymentStep from "./DonationPaymentStep";

export interface DonationFormData {
  name: string;
  email: string;
  phone: string;
  amount: string;
  paymentMethod: string;
  virtualAccount: string;
}

interface DonationStepperProps {
  currentStep: number;
  formData: DonationFormData;
  onChange: (field: keyof DonationFormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  onCheckStatus: () => void;
}

const STEP_ITEMS = ["Identitas", "Donasi", "Pembayaran"] as const;

const stepTitleMap: Record<number, string> = {
  1: "Masukan Data Identitas",
  2: "Pilih Metode Pembayaran",
  3: "Pembayaran Donasi Berhasil",
};

const DonationStepper: React.FC<DonationStepperProps> = ({
  currentStep,
  formData,
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
            email={formData.email}
            phone={formData.phone}
            onChange={(field, value) => onChange(field, value)}
          />
        )}

        {currentStep === 2 && (
          <DonationAmountStep
            amount={formData.amount}
            paymentMethod={formData.paymentMethod}
            onChange={(field, value) => onChange(field, value)}
          />
        )}

        {currentStep === 3 && (
          <DonationPaymentStep
            amount={formData.amount}
            paymentMethod={formData.paymentMethod}
            virtualAccount={formData.virtualAccount}
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
              />
              <Button
                label="Cek Status"
                variant="primary"
                size="md"
                className="w-full"
                onClick={onCheckStatus}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationStepper;
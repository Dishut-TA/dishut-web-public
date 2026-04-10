import React from "react";
import { FiCopy } from "react-icons/fi";

interface DonationPaymentStepProps {
  amount: string;
  paymentMethod: string;
  virtualAccount: string;
}

const formatRupiah = (value: string) => {
  const numericValue = value.replace(/\D/g, "");

  if (!numericValue) return "-";

  return `Rp ${new Intl.NumberFormat("id-ID").format(Number(numericValue))}`;
};

const DonationPaymentStep: React.FC<DonationPaymentStepProps> = ({
  amount,
  paymentMethod,
  virtualAccount,
}) => {
  const handleCopy = async () => {
    if (!virtualAccount) return;

    try {
      await navigator.clipboard.writeText(virtualAccount);
    } catch (error) {
      console.error("Failed to copy virtual account:", error);
    }
  };

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
      <p className="text-2xl font-semibold text-primary md:text-3xl">
        {paymentMethod || "Virtual Account"}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <p className="text-3xl font-bold tracking-wide text-primary md:text-4xl">
          {virtualAccount || "-"}
        </p>

        <button
          type="button"
          onClick={handleCopy}
          className="text-primary transition hover:opacity-70"
          aria-label="Copy virtual account"
        >
          <FiCopy className="text-xl" />
        </button>
      </div>

      <p className="mt-5 max-w-md text-sm leading-6 text-primary/80 md:text-base">
        Lakukan pembayaran ke no VA diatas sesuai nominal donasi yaitu sebesar{" "}
        <span className="font-semibold text-primary">{formatRupiah(amount)}</span>
      </p>
    </div>
  );
};

export default DonationPaymentStep;
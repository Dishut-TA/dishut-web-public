import React, { useRef } from "react";
import { FiCopy, FiUploadCloud } from "react-icons/fi";
import { type DonationFormData } from "./DonationStepper";

interface DonationPaymentStepProps {
  amount: string;
  paymentMethod: string;
  virtualAccount: string;
  proofFile: File | null;
  onChange: (field: keyof DonationFormData, value: any) => void;
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
  proofFile,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    if (!virtualAccount) return;
    try {
      await navigator.clipboard.writeText(virtualAccount);
      alert("Virtual Account berhasil disalin!");
    } catch (error) {
      console.error("Failed to copy virtual account:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange("proofFile", e.target.files[0]);
    }
  };

  return (
    <div className="flex min-h-80 flex-col items-center justify-center text-center">
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

      {/* Field Upload Bukti Pembayaran */}
      <div className="mt-8 w-full max-w-md mx-auto text-left">
        <label className="mb-2 block text-sm font-medium text-primary text-center">
          Unggah Bukti Pembayaran
        </label>
        
        <div 
          className="mt-2 flex flex-col items-center justify-center w-full h-36 border-2 border-[#98C98A] border-dashed rounded-2xl cursor-pointer bg-[#DCECE0]/10 hover:bg-[#DCECE0]/30 transition-all duration-300 relative"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiUploadCloud className="w-8 h-8 mb-3 text-primary/60" />
            <p className="mb-1 text-sm text-primary">
              <span className="font-semibold">Klik untuk unggah</span> bukti
            </p>
            <p className="text-xs text-primary/60">JPG, PNG, atau PDF (Max. 5MB)</p>
          </div>
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            accept="image/*,application/pdf" 
          />
        </div>

        {proofFile && (
          <div className="mt-3 p-3 bg-[#DCECE0] rounded-xl flex items-center justify-between text-sm">
            <span className="text-[#2E7D32] font-medium truncate w-3/4">
              {proofFile.name}
            </span>
            <button 
              type="button"
              onClick={() => onChange("proofFile", null)}
              className="text-red-500 hover:underline text-xs font-semibold"
            >
              Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationPaymentStep;
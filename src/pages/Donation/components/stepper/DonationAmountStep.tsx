import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { type DonationFormData } from "./DonationStepper";

interface DonationAmountStepProps {
  jenisBibit: string;
  jumlahBibit: string;
  paymentMethod: string;
  onChange: (field: keyof DonationFormData, value: string) => void;
}

interface PaymentOption {
  id: string;
  label: string;
  code: string;
}

interface BibitOption {
  id: string;
  label: string;
  price: number;
}

const paymentOptions: PaymentOption[] = [
  { id: "bri", label: "Bank Rakyat Indonesia (BRI)", code: "BRI" },
  { id: "bca", label: "Bank Central Asia (BCA)", code: "BCA" },
  { id: "bni", label: "Bank Negara Indonesia (BNI)", code: "BNI" },
  { id: "mandiri", label: "Bank Mandiri", code: "MDR" },
];

const bibitOptions: BibitOption[] = [
  { id: "mahoni", label: "Mahoni", price: 15000 },
  { id: "sengon", label: "Sengon", price: 10000 },
  { id: "mangrove", label: "Mangrove", price: 20000 },
];

// 1. Disesuaikan dengan style DonationIdentityStep
const inputClassName =
  "w-full rounded-full border border-[#98C98A] bg-transparent px-5 py-4 text-sm text-primary outline-none transition-all duration-300 placeholder:text-primary/60 focus:border-primary";

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const DonationAmountStep: React.FC<DonationAmountStepProps> = ({
  jenisBibit,
  jumlahBibit,
  paymentMethod,
  onChange,
}) => {
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const paymentWrapperRef = useRef<HTMLDivElement | null>(null);

  // Cari data bibit yang dipilih untuk mendapatkan harga
  const selectedBibit = useMemo(
    () => bibitOptions.find((b) => b.label === (jenisBibit || "Mahoni")),
    [jenisBibit]
  );
  
  const hargaPerBibit = selectedBibit?.price || 0;
  const jumlah = parseInt(jumlahBibit) || 0;
  const totalPembayaran = hargaPerBibit * jumlah;

  // Update field "amount" di master form secara reaktif saat jumlah/jenis berubah
  useEffect(() => {
    onChange("amount", totalPembayaran.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPembayaran]);

  const selectedPayment = useMemo(
    () => paymentOptions.find((item) => item.label === paymentMethod),
    [paymentMethod]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!paymentWrapperRef.current?.contains(event.target as Node)) {
        setIsOpenPayment(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    onChange("jumlahBibit", numericValue);
  };

  return (
    <div className="space-y-5">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {/* Label disesuaikan: font-medium text-primary */}
          <label className="mb-2 block text-sm font-medium text-primary">
            Jenis Bibit
          </label>
          <div className="relative">
            <select
              value={jenisBibit || "Mahoni"}
              onChange={(e) => onChange("jenisBibit", e.target.value)}
              className={`${inputClassName} appearance-none cursor-pointer`}
            >
              {bibitOptions.map((bibit) => (
                <option key={bibit.id} value={bibit.label}>
                  {bibit.label}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/60 pointer-events-none"/>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-primary">
            Jumlah Bibit
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={jumlahBibit}
            onChange={handleJumlahChange}
            className={inputClassName}
          />
        </div>
      </div>

      
      <div>
        <label className="mb-2 block text-sm font-medium text-primary">
          Pilih Metode Pembayaran
        </label>
        <div ref={paymentWrapperRef} className="relative">
          {/* Button style disamakan dengan inputClassName */}
          <button
            type="button"
            onClick={() => setIsOpenPayment((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-full border border-[#98C98A] bg-transparent px-5 py-4 text-left text-sm text-primary transition-all duration-300 focus:border-primary"
          >
            <span className={selectedPayment ? "text-primary" : "text-primary/60"}>
              {selectedPayment?.label ?? "Pilih Metode Pembayaran"}
            </span>
            <FiChevronDown className={`text-lg text-primary/60 transition-transform duration-300 ${isOpenPayment ? "rotate-180" : ""}`} />
          </button>

          {isOpenPayment && (
            <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-lg">
              {paymentOptions.map((option) => {
                const isSelected = paymentMethod === option.label;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onChange("paymentMethod", option.label);
                      setIsOpenPayment(false);
                    }}
                    className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-all duration-200 ${
                      isSelected
                        ? "bg-[#DCECE0] text-[#2E7D32] font-medium"
                        : "text-primary hover:bg-primary/5"
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold ${
                        isSelected
                          ? "bg-white text-[#2E7D32]"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {option.code}
                    </div>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      
      <div className="mt-6 rounded-2xl bg-[#DCECE0]/60 p-5">
        <h3 className="text-base font-bold text-primary mb-4">
          Ringkasan Transaksi
        </h3>
        
        <div className="space-y-3 text-sm text-primary/80 font-medium">
          <div className="flex justify-between items-center">
            <span>Harga per Bibit</span>
            <span>{formatRupiah(hargaPerBibit)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Jumlah Bibit</span>
            <span>{jumlah || 0} Bibit ({selectedBibit?.label || "Mahoni"})</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Biaya Operasional (0%)</span>
            <span>Rp 0</span>
          </div>
        </div>

        <hr className="my-4 border-[#98C98A]/30" />

        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-primary">Total Pembayaran</span>
          <span className="text-lg font-bold text-[#2E7D32]">
            {formatRupiah(totalPembayaran)}
          </span>
        </div>
      </div>

    </div>
  );
};

export default DonationAmountStep;
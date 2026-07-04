import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiMinus, FiPlus } from "react-icons/fi";
import { type DonationFormData, type SelectedBibit } from "./DonationStepper";

interface DonationAmountStepProps {
  selectedBibits: SelectedBibit[];
  paymentMethod: string;
  onChange: (field: keyof DonationFormData, value: any) => void;
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

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const DonationAmountStep: React.FC<DonationAmountStepProps> = ({
  selectedBibits,
  paymentMethod,
  onChange,
}) => {
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const paymentWrapperRef = useRef<HTMLDivElement | null>(null);

  // Kalkulasi total otomatis
  const totalPembayaran = useMemo(
    () => selectedBibits.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [selectedBibits]
  );
  
  const totalJumlahBibit = useMemo(
    () => selectedBibits.reduce((acc, curr) => acc + curr.quantity, 0),
    [selectedBibits]
  );

  useEffect(() => {
    onChange("amount", totalPembayaran.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPembayaran]);

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

  const selectedPayment = useMemo(
    () => paymentOptions.find((item) => item.label === paymentMethod),
    [paymentMethod]
  );

  // Fungsi untuk menambah/mengurangi bibit
  const handleQuantityChange = (bibitId: string, delta: number) => {
    let newSelected = [...selectedBibits];
    const existingIndex = newSelected.findIndex((b) => b.id === bibitId);

    if (existingIndex >= 0) {
      const newQuantity = Math.max(0, newSelected[existingIndex].quantity + delta);
      if (newQuantity === 0) {
        newSelected.splice(existingIndex, 1);
      } else {
        newSelected[existingIndex].quantity = newQuantity;
      }
    } else if (delta > 0) {
      const option = bibitOptions.find((b) => b.id === bibitId);
      if (option) {
        newSelected.push({ ...option, quantity: delta });
      }
    }

    onChange("selectedBibits", newSelected);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-primary">
          Pilih Bibit & Jumlah
        </label>
        <div className="grid grid-cols-1 gap-3">
          {bibitOptions.map((bibit) => {
            const selected = selectedBibits.find((b) => b.id === bibit.id);
            const quantity = selected?.quantity || 0;

            return (
              <div
                key={bibit.id}
                className="flex items-center justify-between rounded-2xl border border-[#98C98A] bg-transparent p-4 transition-all duration-300"
              >
                <div>
                  <h4 className="text-sm font-semibold text-primary">{bibit.label}</h4>
                  <p className="text-sm text-primary/70">{formatRupiah(bibit.price)}</p>
                </div>
                
                <div className="flex items-center gap-4 rounded-full border border-[#98C98A] px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(bibit.id, -1)}
                    className="text-primary hover:opacity-70 disabled:opacity-30"
                    disabled={quantity === 0}
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-primary">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(bibit.id, 1)}
                    className="text-primary hover:opacity-70"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-primary">
          Pilih Metode Pembayaran
        </label>
        <div ref={paymentWrapperRef} className="relative">
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
          {selectedBibits.length > 0 ? (
             selectedBibits.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span>{item.quantity}x Bibit {item.label}</span>
                  <span>{formatRupiah(item.price * item.quantity)}</span>
                </div>
             ))
          ) : (
            <div className="text-center italic text-primary/50">Belum ada bibit yang dipilih</div>
          )}

          <div className="flex justify-between items-center pt-2">
            <span>Total Bibit</span>
            <span>{totalJumlahBibit} Bibit</span>
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
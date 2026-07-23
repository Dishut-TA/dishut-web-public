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
  stock: number; // TAMBAHKAN TIPE STOK
}

const paymentOptions: PaymentOption[] = [
  { id: "bri", label: "Bank Rakyat Indonesia (BRI)", code: "BRI" },
  { id: "bca", label: "Bank Central Asia (BCA)", code: "BCA" },
  { id: "bni", label: "Bank Negara Indonesia (BNI)", code: "BNI" },
  { id: "mandiri", label: "Bank Mandiri", code: "MDR" },
];

// TAMBAHKAN DATA MOCK STOK BIBIT (Real-Time Ketersediaan)
const bibitOptions: BibitOption[] = [
  { id: "mahoni", label: "Mahoni", price: 15000, stock: 150 },
  { id: "sengon", label: "Sengon", price: 10000, stock: 300 },
  { id: "mangrove", label: "Mangrove", price: 20000, stock: 50 },
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

  // Fungsi Tambah Kurang (Button)
  const handleQuantityChange = (bibitId: string, delta: number, maxStock: number) => {
    let newSelected = [...selectedBibits];
    const existingIndex = newSelected.findIndex((b) => b.id === bibitId);

    if (existingIndex >= 0) {
      // Batasi agar tidak melebihi stock maksimal
      const newQuantity = Math.max(0, Math.min(newSelected[existingIndex].quantity + delta, maxStock));
      if (newQuantity === 0) {
        newSelected.splice(existingIndex, 1);
      } else {
        newSelected[existingIndex].quantity = newQuantity;
      }
    } else if (delta > 0) {
      const option = bibitOptions.find((b) => b.id === bibitId);
      if (option) {
        newSelected.push({ ...option, quantity: Math.min(delta, maxStock) });
      }
    }

    onChange("selectedBibits", newSelected);
  };

  // Fungsi Ketik Manual (Input)
  const handleManualInput = (bibitId: string, value: string, maxStock: number) => {
    // Hanya ambil angka
    let numValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (isNaN(numValue)) numValue = 0;
    
    // Batasi input agar tidak lebih dari stok
    if (numValue > maxStock) numValue = maxStock;

    let newSelected = [...selectedBibits];
    const existingIndex = newSelected.findIndex((b) => b.id === bibitId);

    if (existingIndex >= 0) {
      if (numValue === 0) {
        newSelected.splice(existingIndex, 1);
      } else {
        newSelected[existingIndex].quantity = numValue;
      }
    } else if (numValue > 0) {
      const option = bibitOptions.find((b) => b.id === bibitId);
      if (option) {
        newSelected.push({ ...option, quantity: numValue });
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
                className="flex items-center justify-between rounded-2xl border border-[#98C98A] bg-transparent p-4 transition-all duration-300 hover:shadow-sm"
              >
                <div>
                  <h4 className="text-sm font-semibold text-primary">{bibit.label}</h4>
                  <p className="text-sm text-primary/70">
                    {formatRupiah(bibit.price)} <span className="text-xs ml-1 text-primary/50">| Stok: {bibit.stock}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-2 rounded-full border border-[#98C98A] px-2 py-1.5 bg-white">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(bibit.id, -1, bibit.stock)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-primary transition-colors hover:bg-gray-100 disabled:opacity-30 active:scale-95"
                    disabled={quantity === 0}
                  >
                    <FiMinus size={14} />
                  </button>
                  
                  {/* UBAH KE INPUT FIELD AGAR BISA DIKETIK */}
                  <input
                    type="text"
                    value={quantity === 0 ? "" : quantity}
                    onChange={(e) => handleManualInput(bibit.id, e.target.value, bibit.stock)}
                    placeholder="0"
                    className="w-10 text-center text-sm font-medium text-primary bg-transparent outline-none"
                  />
                  
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(bibit.id, 1, bibit.stock)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-primary transition-colors hover:bg-gray-100 disabled:opacity-30 active:scale-95"
                    disabled={quantity >= bibit.stock} // Disable button if reaches max stock
                  >
                    <FiPlus size={14} />
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
            className="flex cursor-pointer w-full items-center justify-between rounded-full border border-[#98C98A] bg-transparent px-5 py-4 text-left text-sm text-primary transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 active:scale-[0.98]"
          >
            <span className={selectedPayment ? "text-primary font-medium" : "text-primary/60"}>
              {selectedPayment?.label ?? "Pilih Metode Pembayaran"}
            </span>
            <FiChevronDown 
              className={`text-lg transition-transform duration-300 ease-in-out ${
                isOpenPayment ? "rotate-180 text-primary" : "text-primary/60"
              }`} 
            />
          </button>

          <div 
            className={`absolute left-0 z-10 mt-2 w-full overflow-hidden rounded-2xl border border-primary/10 bg-white/90 backdrop-blur-md shadow-xl transition-all duration-300 ease-out origin-top ${
              isOpenPayment 
                ? "scale-100 opacity-100 translate-y-0 visible pointer-events-auto" 
                : "scale-95 opacity-0 -translate-y-3 invisible pointer-events-none"
            }`}
          >
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
                  className={`group cursor-pointer flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm transition-colors duration-200 ${
                    isSelected
                      ? "bg-[#DCECE0]/80 text-[#2E7D32] font-semibold"
                      : "text-primary hover:bg-primary/5"
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold transition-transform duration-200 group-hover:scale-110 ${
                      isSelected
                        ? "bg-white text-[#2E7D32] shadow-sm"
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
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-[#DCECE0]/60 p-5 transition-all duration-300 hover:bg-[#DCECE0]/80">
        <h3 className="text-base font-bold text-primary mb-4">
          Ringkasan Transaksi
        </h3>
        
        <div className="space-y-3 text-sm text-primary/80 font-medium">
          {selectedBibits.length > 0 ? (
             selectedBibits.map((item) => (
                <div key={item.id} className="flex justify-between items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <span>{item.quantity}x Bibit {item.label}</span>
                  <span>{formatRupiah(item.price * item.quantity)}</span>
                </div>
             ))
          ) : (
            <div className="text-center italic text-primary/50 py-2">Belum ada bibit yang dipilih</div>
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
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiMinus, FiPlus } from "react-icons/fi";
import { type DonationFormData, type SelectedBibit } from "./DonationStepper";
import { ToastError } from "@/utils/toast";

interface DonationAmountStepProps {
  jenisBibit: any[]; 
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
  tinggi: string; 
  price: number;
  stock: number;
}

const paymentOptions: PaymentOption[] = [
  { id: "bri", label: "Bank Rakyat Indonesia (BRI)", code: "BRI" },
  { id: "bca", label: "Bank Central Asia (BCA)", code: "BCA" },
  { id: "bni", label: "Bank Negara Indonesia (BNI)", code: "BNI" },
  { id: "mandiri", label: "Bank Mandiri", code: "MDR" },
];

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const DonationAmountStep: React.FC<DonationAmountStepProps> = ({
  jenisBibit = [],
  selectedBibits,
  paymentMethod,
  onChange,
}) => {
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const paymentWrapperRef = useRef<HTMLDivElement | null>(null);

  const bibitOptions: BibitOption[] = useMemo(() => {
    return jenisBibit.map((item: any) => {
      // Ambil spesifikasi pertama (atau sesuaikan jika ada banyak spesifikasi)
      const spec = item.specifications && item.specifications.length > 0 
        ? item.specifications[0] 
        : null;

      return {
        id: item.id.toString(),
        label: item.nama || item.name,
        tinggi: spec ? `${spec.min_height}-${spec.max_height} cm` : "30-60 cm", 
        price: spec ? Number(spec.price) : 0, // 👈 Mengambil harga asli dari database
        stock: spec ? Number(spec.stock) : 0, // 👈 Mengambil stok asli dari database
      };
    });
  }, [jenisBibit]);
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

  const handleQuantityChange = (bibitId: string, delta: number, maxStock: number) => {
    let newSelected = [...selectedBibits];
    const existingIndex = newSelected.findIndex((b) => b.id === bibitId);
    
    let currentQty = existingIndex >= 0 ? newSelected[existingIndex].quantity : 0;
    let newQuantity = currentQty + delta;

    if (newQuantity > maxStock) {
      if (currentQty !== maxStock) {
        ToastError(`Stok maksimal untuk bibit ini hanya ${maxStock} batang.`);
      }
      newQuantity = maxStock;
    } else if (newQuantity < 0) {
      newQuantity = 0;
    }

    if (existingIndex >= 0) {
      if (newQuantity === 0) {
        newSelected.splice(existingIndex, 1);
      } else {
        newSelected[existingIndex].quantity = newQuantity;
      }
    } else if (newQuantity > 0) {
      const option = bibitOptions.find((b) => b.id === bibitId);
      if (option) {
        newSelected.push({ ...option, quantity: newQuantity });
      }
    }

    onChange("selectedBibits", newSelected);
  };

  const handleManualInput = (bibitId: string, value: string, maxStock: number) => {
    let numValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (isNaN(numValue)) numValue = 0;
    
    if (numValue > maxStock) {
      ToastError(`Stok maksimal untuk bibit ini hanya ${maxStock} batang.`);
      numValue = maxStock;
    }

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
        
        {bibitOptions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#98C98A] p-6 text-center text-sm text-primary/70">
            Tidak ada bibit yang tersedia untuk program ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 max-h-72 overflow-y-auto pr-1">
            {bibitOptions.map((bibit) => {
              const selected = selectedBibits.find((b) => b.id === bibit.id);
              const quantity = selected?.quantity || 0;

              return (
                <div
                  key={bibit.id}
                  className="flex items-center justify-between rounded-2xl border border-[#98C98A] bg-transparent p-4 transition-all duration-300 hover:shadow-sm"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-primary">
                      {bibit.label} <span className="font-normal text-primary/70">({bibit.tinggi})</span>
                    </h4>
                    <p className="text-sm text-primary/70 mt-0.5">
                      {formatRupiah(bibit.price)} <span className="text-xs ml-1 text-primary/50">| Stok: {bibit.stock}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 rounded-full border border-[#98C98A] px-2 py-1.5 bg-white">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(bibit.id, -1, bibit.stock)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-primary transition-colors hover:bg-gray-100 disabled:opacity-30 active:scale-95 cursor-pointer"
                      disabled={quantity === 0}
                    >
                      <FiMinus size={14} />
                    </button>
                    
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
                      className="flex h-7 w-7 items-center justify-center rounded-full text-primary transition-colors hover:bg-gray-100 disabled:opacity-30 active:scale-95 cursor-pointer"
                      disabled={quantity >= bibit.stock}
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bagian Metode Pembayaran & Ringkasan Transaksi tetap sama */}
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
            className={`absolute left-0 z-100 mt-2 w-full overflow-hidden rounded-2xl border border-primary/10 bg-white/95 backdrop-blur-md shadow-xl transition-all duration-300 ease-out origin-top ${
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

      <div className="mt-6 rounded-2xl bg-[#DCECE0]/60 p-5">
        <h3 className="text-base font-bold text-primary mb-4">
          Ringkasan Transaksi
        </h3>
        
        <div className="space-y-3 text-sm text-primary/80 font-medium">
          {selectedBibits.length > 0 ? (
             selectedBibits.map((item) => (
               <div key={item.id} className="flex justify-between items-center">
                 <span>{item.quantity}x Bibit {item.label} ({item.tinggi})</span>
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
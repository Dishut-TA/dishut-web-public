import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DonationAmountStepProps {
  amount: string;
  paymentMethod: string;
  onChange: (field: "amount" | "paymentMethod", value: string) => void;
}

interface PaymentOption {
  id: string;
  label: string;
  code: string;
}

const quickAmounts = ["10000", "20000", "50000", "100000", "200000", "500000"];

const paymentOptions: PaymentOption[] = [
  { id: "bri", label: "Bank Rakyat Indonesia (BRI)", code: "BRI" },
  { id: "bca", label: "Bank Central Asia (BCA)", code: "BCA" },
  { id: "bni", label: "Bank Negara Indonesia (BNI)", code: "BNI" },
  { id: "mandiri", label: "Bank Mandiri", code: "MDR" },
];

const inputClassName =
  "w-full rounded-full border border-[#5D9C59] bg-transparent px-5 py-4 text-sm text-primary outline-none transition-all duration-300 placeholder:text-primary/60 focus:border-primary";

const formatRupiahInput = (value: string) => {
  const numericValue = value.replace(/\D/g, "");

  if (!numericValue) return "";

  return new Intl.NumberFormat("id-ID").format(Number(numericValue));
};

const DonationAmountStep: React.FC<DonationAmountStepProps> = ({
  amount,
  paymentMethod,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = useMemo(
    () => paymentOptions.find((item) => item.label === paymentMethod),
    [paymentMethod]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAmountInputChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    onChange("amount", numericValue);
  };

  const displayAmount = amount ? `Rp ${formatRupiahInput(amount)}` : "";

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-4 block text-sm font-semibold text-primary">
          Nominal Donasi
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {quickAmounts.map((item) => {
            const isActive = amount === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => onChange("amount", item)}
                className={`rounded-full border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-[#5D9C59] bg-transparent text-primary hover:border-primary"
                }`}
              >
                Rp {formatRupiahInput(item)}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Input Nominal"
          value={displayAmount}
          onChange={(e) => handleAmountInputChange(e.target.value)}
          className={inputClassName}
        />
        <p className="mt-2 text-xs text-primary/70">
          Input nominal jika jumlah tidak tersedia
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">
          Pilih Metode Pembayaran
        </label>

        <div ref={wrapperRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-full border border-[#5D9C59] bg-transparent px-5 py-4 text-left text-sm text-primary transition-all duration-300"
          >
            <span className={selectedOption ? "text-primary" : "text-primary/60"}>
              {selectedOption?.label ?? "Pilih Metode..."}
            </span>

            <FiChevronDown
              className={`text-lg transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-md">
              {paymentOptions.map((option) => {
                const isSelected = paymentMethod === option.label;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onChange("paymentMethod", option.label);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-200 ${
                      isSelected
                        ? "bg-[#A9D39E] text-white"
                        : "text-primary hover:bg-primary/5"
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold ${
                        isSelected
                          ? "bg-white text-primary"
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
    </div>
  );
};

export default DonationAmountStep;
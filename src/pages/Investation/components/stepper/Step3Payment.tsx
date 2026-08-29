import { FiCopy } from "react-icons/fi";
import { useState } from "react";
import { simulatePaymentWebhookAPI } from "@/services/invest.service";
import { ToastSuccess, ToastError } from "@/utils/toast";

const Step3Payment = ({ onNext, onBack, nominal, transactionId }: { onNext: () => void; onBack: () => void; nominal: number; transactionId?: string; token?: string }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  const handleCekStatus = async () => {
    if (transactionId) {
      setIsUpdating(true);
      try {
        // Simulasi hit dari Payment Gateway ke webhook backend
        await simulatePaymentWebhookAPI(transactionId);
        ToastSuccess("Pembayaran berhasil diverifikasi!");
        onNext();
      } catch (e: any) {
        console.error(e);
        ToastError("Pembayaran belum diterima. Silakan coba lagi.");
      } finally {
        setIsUpdating(false);
      }
    } else {
      // Fallback jika id transaksi gagal didapatkan dari step 2
      onNext();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-lg font-bold text-center text-[#333] mb-8">Pembayaran Investasi</h3>
      
      <div className="text-center mb-6">
        <p className="text-sm text-[#4F6352] mb-2 font-medium">Virtual Account</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl font-bold text-primary tracking-wide">1824718923743183</span>
          <button className="text-primary hover:text-[#144818] transition-colors">
            <FiCopy className="text-xl" />
          </button>
        </div>
      </div>

      <p className="text-sm text-center text-[#4F6352] leading-relaxed mb-8 px-4">
        Lakukan pembayaran ke no VA diatas sesuai nominal Investasi yaitu sebesar <span className="font-bold text-[#8B734A]">{formatCurrency(nominal)}</span>
      </p>

      <div className="flex w-full gap-3">
        <button onClick={onBack} disabled={isUpdating} className="w-1/2 py-3 border border-primary text-primary rounded-full text-sm font-semibold hover:bg-primary/10 transition-colors">
          Kembali
        </button>
        <button onClick={handleCekStatus} disabled={isUpdating} className="w-1/2 py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-[#144818] transition-colors">
          {isUpdating ? 'Memproses...' : 'Cek Status'}
        </button>
      </div>
    </div>
  );
};

export default Step3Payment;

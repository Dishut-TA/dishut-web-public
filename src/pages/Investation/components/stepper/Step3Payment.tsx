import { FiCopy } from "react-icons/fi";

const Step3Payment = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => (
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
      Lakukan pembayaran ke no VA diatas sesuai nominal Investasi yaitu sebesar <span className="font-bold text-[#8B734A]">Rp 500.000</span>
    </p>

    <div className="flex w-full gap-3">
      <button onClick={onBack} className="w-1/2 py-3 border border-primary text-primary rounded-full text-sm font-semibold hover:bg-primary/10 transition-colors">
        Kembali
      </button>
      <button onClick={onNext} className="w-1/2 py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-[#144818] transition-colors">
        Cek Status
      </button>
    </div>
  </div>
);

export default Step3Payment;
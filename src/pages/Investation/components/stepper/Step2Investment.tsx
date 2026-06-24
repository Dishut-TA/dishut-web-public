import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const nominals = ["Rp 10.000", "Rp 20.000", "Rp 50.000", "Rp 100.000", "Rp 200.000", "Rp 500.000"];
const banks = ["Bank Rakyat Indonesia (BRI)", "Bank Central Asia (BCA)", "Bank Negara Indonesia (BNI)", "Bank Mandiri"];

const Step2Investment = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [selectedNominal, setSelectedNominal] = useState("Rp 500.000");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");

  const inputStyle = "w-full px-4 py-3 bg-transparent border border-[#7BA884] text-[#333] rounded-full text-sm outline-none";

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-center text-[#333] mb-6">Pilih Nominal & Metode Pembayaran</h3>
      
      <div className="mb-4">
        <label className="text-sm text-[#333] font-medium block mb-3">Nominal Donasi</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
          {nominals.map((nom) => (
            <button
              key={nom}
              onClick={() => setSelectedNominal(nom)}
              className={`py-2 rounded-full border text-sm font-medium transition-colors 
                ${selectedNominal === nom ? "bg-primary text-white border-primary" : "border-[#7BA884] text-[#333] hover:bg-[#7BA884]/20"}`}
            >
              {nom}
            </button>
          ))}
        </div>
        <input type="text" placeholder="Input Nominal" className={inputStyle} value={selectedNominal} readOnly />
        <p className="text-xs text-[#4F6352] mt-1.5">Input nominal jika jumlah tidak tersedia</p>
      </div>

      <div className="mb-4">
        <input type="text" value="*Presentase Keuntungan*" className={inputStyle + " text-[#4F6352]"} readOnly disabled />
        <p className="text-xs text-[#4F6352] mt-1.5">Pembagian keuntungan sesuai dengan perjanjian 60:40</p>
      </div>

      <div className="mb-8 relative">
        <label className="text-sm text-[#333] font-medium block mb-2">Pilih Metode Pembayaran</label>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`${inputStyle} flex justify-between items-center text-left ${selectedBank ? "text-[#333]" : "text-[#4F6352]"}`}
        >
          {selectedBank || "Pilih Metode..."}
          <FiChevronDown className="text-lg" />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-[#E0E0E0] z-10 overflow-hidden">
            {banks.map((bank) => (
              <div 
                key={bank} 
                onClick={() => { setSelectedBank(bank); setIsDropdownOpen(false); }}
                className="px-4 py-3 text-sm text-[#333] hover:bg-[#81C784] hover:text-white cursor-pointer transition-colors"
              >
                {bank}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="w-full py-3 border border-primary text-primary rounded-full text-sm font-semibold hover:bg-primary/10 transition-colors">
          Kembali
        </button>
        <button onClick={onNext} className="w-full py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-[#144818] transition-colors">
          Lanjutkan Pembayaran
        </button>
      </div>
    </div>
  );
};

export default Step2Investment;
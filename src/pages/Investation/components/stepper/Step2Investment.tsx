import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const nominals = ["Rp 10.000", "Rp 20.000", "Rp 50.000", "Rp 100.000", "Rp 200.000", "Rp 500.000"];
const banks = ["Bank Rakyat Indonesia (BRI)", "Bank Central Asia (BCA)", "Bank Negara Indonesia (BNI)", "Bank Mandiri"];

const Step2Investment = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [selectedNominal, setSelectedNominal] = useState("Rp 500.000");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const inputStyle = "w-full px-4 py-3 bg-transparent border border-[#7BA884] text-[#333] rounded-full text-sm outline-none transition-all duration-300";

  // Fitur agar dropdown nutup otomatis pas klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-center text-[#333] mb-6">Pilih Nominal & Metode Pembayaran</h3>
      
      <div className="mb-4">
        <label className="text-sm text-[#333] font-medium block mb-3">Nominal Investasi</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
          {nominals.map((nom) => (
            <button
              key={nom}
              onClick={() => setSelectedNominal(nom)}
              className={`py-2 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-[1.03] active:scale-95 
                ${selectedNominal === nom ? "bg-primary text-white border-primary shadow-md" : "border-[#7BA884] text-[#333] hover:bg-[#7BA884]/10"}`}
            >
              {nom}
            </button>
          ))}
        </div>
        <input 
          type="text" 
          placeholder="Input Nominal" 
          className={`${inputStyle} cursor-text focus:border-primary focus:ring-4 focus:ring-primary/10`} 
          value={selectedNominal} 
          onChange={(e) => setSelectedNominal(e.target.value)} 
        />
        <p className="text-xs text-[#4F6352] mt-1.5">Input nominal jika jumlah tidak tersedia</p>
      </div>

      <div className="mb-4">
        <input type="text" value="*Presentase Keuntungan*" className={`${inputStyle} text-[#4F6352] bg-gray-50/50 cursor-not-allowed`} readOnly disabled />
        <p className="text-xs text-[#4F6352] mt-1.5">Pembagian keuntungan sesuai dengan perjanjian 60:40</p>
      </div>

      <div className="mb-8 relative" ref={dropdownRef}>
        <label className="text-sm text-[#333] font-medium block mb-2">Pilih Metode Pembayaran</label>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`${inputStyle} flex justify-between items-center text-left cursor-pointer focus:border-primary focus:ring-4 focus:ring-primary/10 active:scale-[0.98] ${selectedBank ? "text-[#333] font-medium" : "text-[#4F6352]"}`}
        >
          <span>{selectedBank || "Pilih Metode..."}</span>
          <FiChevronDown className={`text-lg transition-transform duration-300 ease-in-out ${isDropdownOpen ? "rotate-180 text-primary" : "text-[#4F6352]"}`} />
        </button>

        {/* DROPDOWN DENGAN ANIMASI GLASSMORPHISM */}
        {/* z-50 ditambahin biar nggak kepotong */}
        <div 
          className={`absolute top-[calc(100%+8px)] left-0 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#7BA884]/30 z-50 overflow-hidden transition-all duration-300 ease-out origin-top
            ${isDropdownOpen ? "scale-100 opacity-100 translate-y-0 visible pointer-events-auto" : "scale-95 opacity-0 -translate-y-3 invisible pointer-events-none"}`}
        >
          {banks.map((bank) => {
            const isSelected = selectedBank === bank;
            return (
              <div 
                key={bank} 
                onClick={() => { setSelectedBank(bank); setIsDropdownOpen(false); }}
                className={`px-5 py-3.5 text-sm cursor-pointer transition-colors duration-200 
                  ${isSelected ? "bg-[#DCECE0]/80 text-[#2E7D32] font-semibold" : "text-[#333] hover:bg-[#7BA884]/10"}`}
              >
                {bank}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="w-full py-3 border border-primary text-primary rounded-full text-sm font-semibold hover:bg-primary/5 active:scale-95 transition-all cursor-pointer">
          Kembali
        </button>
        <button onClick={onNext} className="w-full py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-[#144818] hover:shadow-lg active:scale-95 transition-all cursor-pointer">
          Lanjutkan Pembayaran
        </button>
      </div>
    </div>
  );
};

export default Step2Investment;
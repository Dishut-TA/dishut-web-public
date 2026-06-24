import { FiUploadCloud } from "react-icons/fi";

const inputWrapper = "flex flex-col gap-1.5 mb-4";
const labelStyle = "text-sm text-[#333] font-medium";
const inputStyle = "w-full px-4 py-2.5 bg-transparent border border-[#7BA884] text-[#333] rounded-full text-sm outline-none focus:border-[#1B5E20]";

const Step1Identity = ({ onNext }: { onNext: () => void }) => (
  <div className="w-full">
    <h3 className="text-lg font-bold text-center text-[#333] mb-6">Masukan Data Identitas</h3>
    
    <div className={inputWrapper}>
      <label className={labelStyle}>Nama</label>
      <input type="text" placeholder="Input Nama" className={inputStyle} />
    </div>
    
    <div className={inputWrapper}>
      <label className={labelStyle}>Email</label>
      <input type="email" placeholder="Cth : example@gmail.com" className={inputStyle} />
    </div>

    <div className={inputWrapper}>
      <label className={labelStyle}>No. Telepon</label>
      <input type="tel" placeholder="Cth : 08xxxxxxxxxx" className={inputStyle} />
    </div>

    <label className="flex items-center gap-2 mb-6 cursor-pointer">
      <input type="checkbox" className="w-4 h-4 accent-primary border-[#7BA884] rounded cursor-pointer" />
      <span className="text-sm text-[#4F6352]">Isi otomatis data sesuai akun</span>
    </label>

    <div className="mb-6">
      <label className={labelStyle + " block mb-2"}>Upload Dokumen Perjanjian</label>
      <div className="w-full py-4 border border-[#7BA884] rounded-full flex justify-center items-center bg-transparent cursor-pointer hover:bg-[#7BA884]/10 transition-colors">
        <FiUploadCloud className="text-xl text-[#333]" />
      </div>
      <p className="text-xs text-[#4F6352] mt-2 leading-relaxed">
        Unggah Dokumen Perjanjian yang telah anda unduh dari menu detail investasi
      </p>
    </div>

    <button onClick={onNext} className="w-full py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-[#144818] transition-colors">
      Selanjutnya
    </button>
  </div>
);

export default Step1Identity;
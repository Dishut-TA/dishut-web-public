const Step4Success = () => (
  <div className="w-full flex flex-col items-center text-center py-4">
    <h3 className="text-xl font-bold text-[#333] mb-6">Pembayaran Berhasil!</h3>
    
    <div className="w-32 h-32 mb-6 flex items-center justify-center bg-[#81C784]/20 rounded-full">
      <span className="text-6xl">🏅</span>
    </div>

    <p className="text-sm text-[#4F6352] leading-relaxed mb-8 px-2">
      Selamat! Pembayaran Investasi Anda telah berhasil. Klik tombol di bawah ini untuk melanjutkan ke dashboard dan melihat ringkasan investasi Anda.
    </p>

    <button className="w-full py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-[#144818] transition-colors">
      Ke Dashboard
    </button>
  </div>
);

export default Step4Success;
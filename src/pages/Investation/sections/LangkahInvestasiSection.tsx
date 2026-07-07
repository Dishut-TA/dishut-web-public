const LANGKAH_DATA = [
  {
    nomor: "01",
    judul: "Tetapkan Tujuan Investasi",
    deskripsi: "Pelajari detail materi proyek, laporan pra-kelayakan, serta profil Kelompok Tani Hutan (KTH) yang mendampingi di lapangan"
  },
  {
    nomor: "02",
    judul: "Tinjau Rincian Anggaran & Prospek",
    deskripsi: "Lihat transparansi dan alokasi dana secara mendalam sebelum menyetujui detail implementasi lapangan."
  },
  {
    nomor: "03",
    judul: "Kenali Toleransi Resiko",
    deskripsi: "Ketahui seberapa besar risiko yang dapat Anda terima. Ini akan membantu Anda memilih jenis investasi yang sesuai dengan profil risiko Anda"
  },
  {
    nomor: "04",
    judul: "Setor Dana & Monitoring Progres",
    deskripsi: "Lakukan pembayaran aman dan dapatkan update progres berkala."
  }
];

const LangkahInvestasiSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-customWhite">
      <div className="mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
            Langkah Mudah Sebelum Memulai Investasi
          </h2>
          <p className="text-sm md:text-base text-primary/80 font-medium max-w-3xl mx-auto">
            Ikuti alur kerja kami demi transparansi antara Anda dengan para Kelompok Tani Hutan di lapangan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LANGKAH_DATA.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex justify-end mb-6">
                <span className="bg-[#DCECE0] text-primary font-bold text-lg px-4 py-1.5 rounded-lg">
                  {item.nomor}
                </span>
              </div>
              
              <h3 className="font-bold text-primary text-lg leading-snug mb-3">
                {item.judul}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LangkahInvestasiSection;
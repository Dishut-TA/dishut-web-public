import React from "react";

const TreeIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22v-6" />
    <path d="M12 2l-6 7h4l-4 7h12l-4-7h4z" />
  </svg>
);

const schemeData = [
  // {
  //   id: 1,
  //   iconBg: "bg-[#DCECE0]",
  //   title: "Hasil Panen Agroforestry",
  //   category: "KOMODITAS KAYU & BUAH-BUAHAN",
  //   description:
  //     "Investor mendapatkan bagi hasil berkala langsung dari hasil penjualan bagi hasil panen komoditas kayu berkelanjutan, buah-buahan eksotis, dan tanaman sela di lahan hutan garapan.",
  // },
  {
    id: 1,
    iconBg: "bg-[#FDF0DE]",
    title: "Pengolahan Produk",
    category: "PENINGKATAN NILAI TAMBAH PASCA PANEN",
    description:
      "Investor memperoleh keuntungan dari nilai tambah pengolahan produk mentah agroforesty menjadi barang setengah jadi atau barang jadi siap pasar.",
  },
  {
    id: 2,
    iconBg: "bg-[#DEE8F5]",
    title: "Pembangunan Ekowisata",
    category: "OPERASIONAL DESTINASI EKOWISATA",
    description:
      "Investor mendapatkan bagi hasil dari operasional destinasi wisata berbasis kehutanan (glamping, area edukasi lingkungan, tiket masuk harian, penyewaan alat outdoor).",
  },
];

const ProgramScheme: React.FC = () => {
  return (
    <section className="w-full bg-customWhite py-16 md:py-24 px-5 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2E7D32] mb-4">
            Skema Program Investasi Agroforesty
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#3A4D3F] leading-relaxed">
            Dukung pengelolaan hutan berkelanjutan melalui investasi pada hasil
            panen, pengolahan produk, atau pengembangan ekowisata agroforestry
            yang memberikan manfaat ekonomi bagi masyarakat dan lingkungan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {schemeData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[20px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-6 ${item.iconBg}`}
              >
                <TreeIcon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>

              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              
              <p className="text-[10px] md:text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                {item.category}
              </p>
              
              <p className="text-sm md:text-base text-primary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default ProgramScheme;
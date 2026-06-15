import React from "react";
import Glass from "@/assets/images/MagnifyingGlass.png";

const benefitsData = [
  {
    id: 1,
    title: "Keuntungan Finansial yang Kompetitif",
    description:
      "Agroforesty menyatukan ketangguhan investasi kayu jangka panjang dan likuiditas tanaman buah/pangan musiman jangka pendek, menghasilkan tingkat pengembalian modal yang stabil.",
  },
  {
    id: 2,
    title: "Pemberdayaan Kelompok Tani Hutan (KTH)",
    description:
      "Dengan sistem ini, Anda memfasilitasi lapangan kerja ramah lingkungan dan memberdayakan kesejahteraan petani lokal secara berdaulat.",
  },
  {
    id: 3,
    title: "Mitigasi Perubahan Iklim Nyata",
    description:
      "Setiap rupiah yang Anda investasikan membantu restorasi tanah tandus dan menjaga keanekaragaman hayati satwa liar di Jawa Barat.",
  },
  {
    id: 4,
    title: "Aset Defensif Terhadap Inflasi",
    description:
      "Harga kayu berkualitas dan produk komoditas pangan olahan terus merangkak naik melebihi laju inflasi dari tahun ke tahun.",
  },
];

const WhySection: React.FC = () => {
  return (
    <section className="w-full bg-customWhite py-16 md:py-24 px-5 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <img
            src={Glass}
            alt="Ilustrasi Mengapa Berinvestasi"
            className="w-40 md:w-48 object-contain m-auto mb-8 lg:mb-10 drop-shadow-md"
          />

          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-6">
            Mengapa Berinvestasi di Agroforesty Sangat Penting?
          </h2>
          
          <p className="text-base md:text-lg text-[#333333] leading-relaxed">
            Berbeda dengan investasi kehutanan konvesional yang sering merusak
            tatanan hutan purba (monokultur), agroforesty memadukan tanaman
            pohon kayu keras berketinggian tingi dengan tanaman produktif
            musiman dan buah-buahan secara harmonis.
          </p>
        </div>

        {/* Kanan: Stacked Cards */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-5">
          {benefitsData.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow duration-300"
            >
              <h3 className="text-[17px] md:text-lg font-bold text-[#333333] mb-2">
                {benefit.title}
              </h3>
              {/* Warna teks hijau gelap disesuaikan dengan desain */}
              <p className="text-sm md:text-[15px] text-primary leading-relaxed opacity-90">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhySection;
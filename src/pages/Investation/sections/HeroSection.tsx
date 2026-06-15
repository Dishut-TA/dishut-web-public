import React from "react";
import { FiChevronRight } from "react-icons/fi";
import HeroBG from '@/assets/images/Gambar Investasi 1.png'
import Button from "@/components/Button";

const statsData = [
  { id: 1, value: "0000", label: "Total Proyek" },
  { id: 2, value: "0000", label: "Total Dana Terkumpul" },
  { id: 3, value: "0000", label: "Program Berjalan" },
  { id: 4, value: "0000", label: "Jumlah Investor" },
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-customWhite pt-16 pb-24 md:pt-24 md:pb-32 px-5 md:px-8 lg:px-12">
      
      {/* Konten Utama: Gambar & Teks */}
      {/* UBAH DI SINI: Gunakan justify-center dan atur gap agar jaraknya bisa dikontrol */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
        
        {/* Kiri: Gambar Ilustrasi */}
        <div className="flex justify-center order-2 lg:order-1">
          <img
            src={HeroBG}
            alt="Ilustrasi Investasi Hijau"
            // Pastikan menggunakan width yang aman, jika w-80.75 tidak ada di tailwind config, gunakan nilai pasti seperti w-[350px]
            className="w-80 lg:w-112.5 object-contain" 
          />
        </div>

        {/* Kanan: Tipografi & Tombol */}
        {/* Hapus w-1/2 dan gunakan max-w-xl agar teks tidak melebar tak beraturan */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-1 lg:order-2 max-w-xl">
          
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-primary mb-1">
            Investasi Hijau:
          </h2>
          
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#7A6E3A] leading-[1.2] mb-6">
            Dari Rehabilitasi Hutan<br className="hidden lg:block" /> Menuju Investasi<br className="hidden lg:block" /> Agroforestry Berkelanjutan
          </h1>
          
          <p className="text-sm md:text-base text-primary max-w-lg mb-8 leading-relaxed">
            Platform digital untuk mendukung pendanaan rehabilitasi hutan dan investasi agroforestry berbasis ekonomi kreatif
          </p>

          <Button label="Mulai Investasi" size="lg" rightIcon={<FiChevronRight />}/>
          
        </div>
      </div>

      {/* Area Statistik (Floating Cards) */}
      <div className="max-w-5xl mx-auto mt-16 lg:mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {statsData.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white py-5 px-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="text-xl md:text-2xl font-bold text-primary mb-1">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-medium text-primary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import InvestmentCard, { type InvestmentProgram } from "../components/InvestmentCard"; 
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

const mockPrograms: InvestmentProgram[] = [
  {
    id: 1,
    scheme: "Skema 3: Ekowisata Hutan",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80",
    location: "Lembang, Bandung Barat",
    title: "Ekowisata Rimba Pinus & Canopy Walkway",
    description:
      "Pembangunan fasilitas jembatan gantung antar kanopi pohon pinus dan kemah glamping bertaraf ekologis tinggi untuk menghidupkan pariwisata hijau berkelanjutan.",
    collected: 450000000,
    target: 500000000,
  },
  {
    id: 2,
    scheme: "Skema 3: Ekowisata Hutan",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80",
    location: "Lembang, Bandung Barat",
    title: "Ekowisata Rimba Pinus & Canopy Walkway",
    description:
      "Pembangunan fasilitas jembatan gantung antar kanopi pohon pinus dan kemah glamping bertaraf ekologis tinggi untuk menghidupkan pariwisata hijau berkelanjutan.",
    collected: 450000000,
    target: 500000000,
  },
];

const RecomendationSection: React.FC = () => {
    const navigate = useNavigate();

  return (
    <section className="w-full bg-customWhite py-16 md:py-24 px-5 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-10">
          <div>
            <p className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider mb-1 md:mb-2">
              Rekomendasi Utama
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
              Program Investasi Sedang Berjalan
            </h2>
          </div>
          
          <Button label="Lihat Selengkapnya" variant="ghost" size="lg" rightIcon={<FiChevronRight className="text-lg transition-transform group-hover:translate-x-1" />} onClick={() => {navigate('/investasi/explore')}}/>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 gap-6">
          {mockPrograms.map((program) => (
            <InvestmentCard key={program.id} program={program} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default RecomendationSection;
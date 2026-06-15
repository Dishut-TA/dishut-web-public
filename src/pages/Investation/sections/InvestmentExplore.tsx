import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
// Pastikan path import ini sesuai dengan lokasi komponen InvestmentCard di proyekmu
import InvestmentCard, { type InvestmentProgram } from "../components/InvestmentCard"; 

// --- MOCK DATA ---
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

const InvestmentExplore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fitur pencarian berdasarkan judul atau lokasi
  const filteredPrograms = useMemo(() => {
    const keyword = searchQuery.toLowerCase().trim();
    if (!keyword) return mockPrograms;

    return mockPrograms.filter(
      (program) =>
        program.title.toLowerCase().includes(keyword) ||
        program.location.toLowerCase().includes(keyword)
    );
  }, [searchQuery]);

  return (
    <section className="min-h-screen w-full bg-customWhite py-16 md:py-24 px-5 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-12">
          
          {/* Title Area */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-2">
              Investasi Tersedia
            </h1>
            <p className="text-sm md:text-base text-[#4F6352]">
              Berikut kami berikan investasi yang tersedia saat ini
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 lg:w-96">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#98C98A] bg-transparent pl-12 pr-5 py-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32]"
            />
          </div>
          
        </div>

        {/* Cards Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 gap-6">
            {filteredPrograms.map((program) => (
              <InvestmentCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          /* Empty State jika pencarian tidak ditemukan */
          <div className="w-full py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-lg font-medium text-gray-500 mb-2">
              Program investasi tidak ditemukan.
            </p>
            <p className="text-sm text-gray-400">
              Coba gunakan kata kunci pencarian yang lain.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default InvestmentExplore;
import React, { useMemo, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import InvestmentCard, { type InvestmentProgram } from "../components/InvestmentCard"; 
import { getPublicProgramsAPI } from "@/services/invest.service";

const InvestmentExplore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allPrograms, setAllPrograms] = useState<InvestmentProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const result = await getPublicProgramsAPI();
        
        const mappedData: InvestmentProgram[] = result
          .filter((item: any) => item.status === 'ACTIVE') 
          .map((item: any) => ({
            id: item.id,
            image: item.gambar,
            title: item.nama_program,
            description: item.deskripsi,
            collected: Number(item.dana_terkumpul) || 0,
            target: Number(item.target_dana) || 0,
          }));

        setAllPrograms(mappedData);
      } catch (error) {
        console.error("Gagal memuat program:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // 2. Filter Berdasarkan Pencarian (Sekarang hanya mencari dari title/nama program)
  const filteredPrograms = useMemo(() => {
    const keyword = searchQuery.toLowerCase().trim();
    if (!keyword) return allPrograms;

    return allPrograms.filter((program) =>
      program.title.toLowerCase().includes(keyword)
    );
  }, [searchQuery, allPrograms]);

  return (
    <section className="min-h-screen w-full bg-customWhite py-16 md:py-24 px-5 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-2">
              Investasi Tersedia
            </h1>
            <p className="text-sm md:text-base text-[#4F6352]">
              Berikut kami berikan investasi yang tersedia saat ini
            </p>
          </div>
          <div className="relative w-full md:w-80 lg:w-96">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Cari investasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#98C98A] bg-transparent pl-12 pr-5 py-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32]"
            />
          </div>
        </div>

        {/* Kondisi Loading & Empty State */}
        {isLoading ? (
          <div className="w-full py-20 flex justify-center items-center">
            <span className="text-[#2E7D32] font-semibold animate-pulse text-lg">Memuat daftar investasi...</span>
          </div>
        ) : filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 gap-6">
            {filteredPrograms.map((program) => (
              <InvestmentCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#98C98A] rounded-2xl bg-white/50">
            <p className="text-lg font-medium text-[#1B4332] mb-2">
              Program investasi tidak ditemukan.
            </p>
            <p className="text-sm text-[#4F6352]">
              Coba gunakan kata kunci pencarian yang lain.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default InvestmentExplore;
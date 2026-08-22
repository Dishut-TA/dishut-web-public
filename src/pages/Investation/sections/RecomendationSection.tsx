import React, { useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import InvestmentCard, { type InvestmentProgram } from "../components/InvestmentCard"; 
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { getPublicProgramsAPI } from "@/services/invest.service";

const RecomendationSection: React.FC = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<InvestmentProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const result = await getPublicProgramsAPI();
        
        const mappedData: InvestmentProgram[] = result
          .filter((item: any) => item.status === 'ACTIVE') 
          .slice(0, 2) 
          .map((item: any) => ({
            id: item.id,
            image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80", 
            title: item.nama_program,
            description: item.deskripsi,
            collected: Number(item.dana_terkumpul) || 0,
            target: Number(item.target_dana) || 0,
          }));

        setPrograms(mappedData);
      } catch (error) {
        console.error("Gagal mengambil rekomendasi program:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <section className="w-full bg-customWhite py-16 md:py-24 px-5 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
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

        {isLoading ? (
          <div className="w-full py-10 flex justify-center">
            <span className="text-gray-500 font-medium animate-pulse">Memuat rekomendasi...</span>
          </div>
        ) : programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 gap-6">
            {programs.map((program) => (
              <InvestmentCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="w-full py-10 text-center border-2 border-dashed border-gray-200 rounded-xl">
            <span className="text-gray-500 text-sm">Belum ada rekomendasi program saat ini.</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecomendationSection;
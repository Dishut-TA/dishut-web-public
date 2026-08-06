import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ProgramCard from "@/components/ProgramCard";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getDonationProgramsAPI } from "@/services/program-donasi.service";

type StatItem = {
  value: string;
  label: string;
};

const stats: StatItem[] = [
  { value: "50+", label: "Total Bibit Didonasikan" },
  { value: "40+", label: "Bibit Terealisasi" },
  { value: "1000+", label: "Sedang Diproses" },
];

const StatsSection = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getDonationProgramsAPI();
        // Hanya tampilkan program yang Aktif, dan batasi 3 item saja untuk Beranda
        const activePrograms = response.payload
          .filter((p: any) => p.status.toLowerCase() === 'active' || p.status.toLowerCase() === 'aktif')
          .slice(0, 3);
        setPrograms(activePrograms);
      } catch (error) {
        console.error("Gagal memuat data program:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <section className="relative z-20 bg-customWhite">
      <div className="px-4 -mb-12 md:-mb-16 relative z-10">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] px-6 py-5 md:px-10 md:py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between text-center gap-4 sm:gap-0">
              {stats.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <h2 className="text-[22px] md:text-[26px] font-semibold text-[#7A6E3A]">
                    {item.value}
                  </h2>
                  <p className="text-[12px] md:text-[14px] text-[#2E7D32] mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary w-full rounded-t-[28rem] pt-20 md:pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mt-20 gap-4 mb-8 md:mb-10">
            <h1 className="text-lg md:text-xl font-semibold text-customWhite text-center md:text-left">
              Bersama Kita Pulihkan Hutan Jawa Barat
            </h1>

            <Button
              label="Lihat Selengkapnya"
              variant="ghost"
              rightIcon={<MdOutlineKeyboardArrowRight size={20} />}
              className="font-semibold"
              onClick={() => navigate('/donasi/explore')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading ? (
              <div className="col-span-3 text-center text-white py-10">Memuat program donasi...</div>
            ) : programs.length > 0 ? (
              programs.map((item) => (
                <ProgramCard 
                  key={item.id} 
                  id={item.id}
                  title={item.name}
                  location={item.location}
                  // Menggunakan placeholder jika backend belum punya field ini
                  description={item.description || "Bantu kami merehabilitasi hutan dan lahan kritis melalui program penanaman pohon untuk menjaga kelestarian lingkungan."}
                  image={item.image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"}
                  collected={item.total_seeds_collected.toString()}
                  status="Aktif" 
                  onClick={() => navigate(`/donasi/detail/${item.id}`)} 
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-white py-10">Belum ada program donasi aktif.</div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;
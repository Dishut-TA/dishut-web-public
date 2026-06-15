import Button from "@/components/Button";
import ProgramCard from "@/components/ProgramCard";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type StatItem = {
  value: string;
  label: string;
};

const stats: StatItem[] = [
  { value: "50+", label: "Total Bibit Didonasikan" },
  { value: "40+", label: "Bibit Terealisasi" },
  { value: "1000+", label: "Sedang Diproses" },
];

// DATA diperbarui agar sesuai dengan tipe props ProgramCard terbaru
const DATA = [
  {
    id: 1,
    title: "Pemulihan Lahan Kritis Cisadane",
    location: "Kabupaten Bogor",
    description:
      "Bantu kami merehabilitasi hutan dan lahan kritis melalui program penanaman pohon untuk menjaga kelestarian lingkungan.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    collected: "2000",
    status: "Aktif" as const,
  },
  {
    id: 2,
    title: "Rehabilitasi Hutan DAS Cimanuk",
    location: "Garut, Jawa Barat",
    description:
      "Bantu kami merehabilitasi hutan dan lahan kritis melalui program penanaman pohon untuk menjaga kelestarian lingkungan.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    collected: "13.000",
    status: "Aktif" as const,
  },
  {
    id: 3,
    title: "Pemulihan Kawasan Resapan Air",
    location: "Bandung, Jawa Barat",
    description:
      "Dukung pemulihan kawasan resapan air melalui penanaman vegetasi dan penguatan ekosistem daerah tangkapan air.",
    image:
      "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=1200&q=80",
    collected: "9.500",
    status: "Aktif" as const,
  },
];

const StatsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative z-20 bg-customWhite">

      {/* FLOATING STATS CARD */}
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

      {/* MAIN BG SECTION */}
      <div className="bg-secondary w-full rounded-t-[28rem] pt-20 md:pt-24 pb-12 px-4 md:px-6">
        
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
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

          {/* PROGRAM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DATA.map((item) => (
              <ProgramCard 
                key={item.id} 
                {...item} 
                onClick={() => navigate(`/donasi/detail/${item.id}`)} 
              />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default StatsSection;
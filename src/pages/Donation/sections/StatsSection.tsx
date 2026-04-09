import Button from "@/components/Button";
import ProgramCard from "@/components/ProgramCard";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

type StatItem = {
  value: string;
  label: string;
};

const stats: StatItem[] = [
  { value: "50+", label: "Program telah berjalan" },
  { value: "40+", label: "Lokasi penyaluran" },
  { value: "1000+", label: "Pohon telah ditanam" },
];

const DATA = [
  {
    id: 1,
    title: "Rehabilitasi Hutan DAS Cimanuk",
    location: "Garut, Jawa Barat",
    description:
      "Bantu kami merehabilitasi hutan dan lahan kritis melalui program penanaman pohon untuk menjaga kelestarian lingkungan.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    collected: 130000000,
    target: 200000000,
  },
  {
    id: 2,
    title: "Rehabilitasi Hutan DAS Cimanuk",
    location: "Garut, Jawa Barat",
    description:
      "Bantu kami merehabilitasi hutan dan lahan kritis melalui program penanaman pohon untuk menjaga kelestarian lingkungan.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    collected: 130000000,
    target: 200000000,
  },
];

const StatsSection = () => {
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
            />
          </div>

          {/* PROGRAM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DATA.map((item) => (
              <ProgramCard key={item.id} {...item} />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default StatsSection;
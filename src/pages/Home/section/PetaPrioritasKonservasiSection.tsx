import { HiOutlineInformationCircle } from "react-icons/hi2";
import MapCard from "../components/MapCard";

const PetaPrioritasKonservasiSection = () => {
  return (
    <section className="w-full py-12 md:py-16 px-5 md:px-12 lg:px-24 bg-[#F5F7F5]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-primary mb-1.5 md:mb-2">
            Peta Prioritas Konservasi Hutan
          </h2>
          <p className="text-sm md:text-base text-primary/80 font-medium">
            Menampilkan lokasi rehabilitasi hutan dan lahan kritis di Jawa Barat
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#DCECE0] px-4 md:px-5 py-3 md:py-4 rounded-xl mb-6 md:mb-8 shadow-sm">
          <HiOutlineInformationCircle className="text-primary shrink-0" size={22} />
          <p className="text-xs md:text-sm text-primary font-medium leading-relaxed">
            Pilih dan klik button <span className="font-bold">"Lihat Pemetaan Lengkap"</span> di bawah ini untuk melihat detail peta kekritisan dan peta kegiatan.
          </p>
        </div>
        <MapCard showNavigateButton />

      </div>
    </section>
  );
};

export default PetaPrioritasKonservasiSection;
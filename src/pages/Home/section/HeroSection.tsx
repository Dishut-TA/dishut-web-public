import BG from "@/assets/images/BGHutan.png";
import Button from "@/components/Button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center">
      
      <div className="absolute inset-0">
        <img
          src={BG}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65 backdrop-blur-md" />
      </div>

      <div className="relative z-10 max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl text-customWhite">
          
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
            Platform Konservasi Hutan Terintegrasi Berbasis WebGIS
          </h1>

          <p className="text-sm md:text-base mb-6 text-customWhite/90">
            Mendukung rehabilitasi lahan kritis melalui pemetaan prioritas, 
            monitoring lapangan berbasis bukti, serta transparansi kontribusi publik dan investasi
          </p>

          <div className="flex mx-auto m-auto mt-12 items-center justify-center flex-col sm:flex-row gap-3">
            <Button onClick={() => navigate('/pemetaan')} label="Lihat Peta Konservasi" variant="secondary" size="lg" rightIcon={<MdOutlineKeyboardArrowRight size={24}/>}/>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
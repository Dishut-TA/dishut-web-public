import BG from "@/assets/images/DonasiHero.png";
import Button from "@/components/Button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-customWhite pt-16 pb-32 md:pb-40 px-12 md:px-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">

          {/* LEFT: TEXT */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-semibold text-primary leading-tight">
              Dukung Program Rehabilitasi Hutan
            </h1>
            <p className="mt-4 text-sm md:text-base text-primary/80">
              Setiap donasi yang Anda berikan akan membantu program rehabilitasi hutan dan menjaga kelestarian lingkungan.
            </p>
            <Button label="Lihat Program Donasi" rightIcon={<MdOutlineKeyboardArrowRight size={20} />} size="lg" className="mt-4" onClick={() => { navigate('/donasi/explore') }} />
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex-1 flex justify-center">
            <img
              src={BG}
              alt="Hero Donasi"
              className="w-full max-w-md md:max-w-lg object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
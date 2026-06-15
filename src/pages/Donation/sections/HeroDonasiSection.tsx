import Button from "@/components/Button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type HeroDonasiSectionProps = {
  backgroundImage: string;
};

const HeroDonasiSection = ({ backgroundImage }: HeroDonasiSectionProps) => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full min-h-125 md:min-h-150 flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-4 text-customWhite">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed mb-4">
          “Setiap pohon yang kita tanam hari ini adalah harapan bagi bumi di masa depan”
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8">
          Hutan bukan hanya milik kita hari ini, tetapi warisan untuk generasi yang akan datang.
          Mari bersama menjaganya!
        </p>
          <Button
          label="Mulai Donasi Sekarang"
          variant="secondary"
          size="lg"
          className="mt-2 mx-auto"
          rightIcon={<MdOutlineKeyboardArrowRight size={20} />}
          onClick={() => {navigate('/donasi/explore')}}
        />
      </div>
    </section>
  );
};

export default HeroDonasiSection;
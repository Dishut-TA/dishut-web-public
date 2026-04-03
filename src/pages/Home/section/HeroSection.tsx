import BG from "@/assets/images/BGHutan.png";
import Button from "@/components/Button";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center">
      
      <div className="absolute inset-0">
        <img
          src={BG}
          className="w-full h-full object-"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-1/2 text-customWhite">
          
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Platform Konservasi Hutan Terintegrasi Berbasis WebGIS
          </h1>

          <p className="text-sm md:text-base mb-6 text-customWhite/90">
            Mendukung rehabilitasi lahan kritis melalui pemetaan prioritas, 
            monitoring lapangan berbasis bukti, serta transparansi kontribusi publik dan investasi
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button label="Lihat Peta Konservasi" variant="secondary" size="lg" />
            <Button label="Donasi Sekarang" variant="tertiary" size="lg" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
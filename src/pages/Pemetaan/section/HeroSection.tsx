import BG from "@/assets/images/PemetaanHero.png";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      
      {/* Background */}
      <img
        src={BG}
        className="absolute bottom-0 left-0 w-full h-full object-cover"
        alt="Hero Background"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 pt-20 md:pt-28 pb-40">
        
        <h1 className="text-primary font-semibold leading-tight
          text-3xl md:text-5xl lg:text-6xl max-w-3xl">
          Pemetaan Wilayah & 
          <br />
          Kekritisan Lahan
        </h1>

        <p className="mt-4 text-primary text-sm md:text-base max-w-lg leading-relaxed">
          Visualisasi data spasial untuk mendukung pengambilan keputusan rehabilitasi hutan
        </p>

      </div>
    </section>
  );
};

export default HeroSection;
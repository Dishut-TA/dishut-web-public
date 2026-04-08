import Button from "@/components/Button";
import BG from "@/assets/images/Hutan2.png";

const CtaKonservasiSection = () => {
  return (
    <section className="relative w-full">
      
      {/* Background */}
      <div className="relative w-full h-75 sm:h-100 md:h-125">
        <img
          src={BG}
          alt="Konservasi Hutan"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-3xl px-4 md:px-6 text-center text-white">
          
          {/* Title */}
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-3">
            “Mari Bersama Memulihkan Hutan Jawa Barat”
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-white/90 mb-6">
            Bergabunglah dalam program rehabilitasi hutan melalui donasi atau investasi berkelanjutan
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              label="Donasi Sekarang"
              variant="secondary"
              size="md"
            />
            <Button
              label="Investasi Program"
              variant="tertiary"
              size="md"
            />
          </div>

        </div>
      </div>

    </section>
  );
};

export default CtaKonservasiSection;
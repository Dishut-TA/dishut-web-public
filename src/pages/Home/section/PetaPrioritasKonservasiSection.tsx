import MapCard from "../components/MapCard";

const PetaPrioritasKonservasiSection = () => {
  return (
    <section className="w-full py-16 px-12 md:px-24 bg-customWhite">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-primary">
            Peta Prioritas Konservasi Hutan
          </h2>
          <p className="text-sm md:text-base text-primary mt-1">
            Menampilkan lokasi rehabilitasi hutan dan lahan kritis di Jawa Barat
          </p>
        </div>

        {/* Map */}
        <MapCard />

      </div>
    </section>
  );
};

export default PetaPrioritasKonservasiSection;
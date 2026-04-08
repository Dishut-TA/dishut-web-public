import ProgramCard from "@/components/ProgramCard";

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

const ProgramKonservasiSection = () => {
  return (
    <section className="w-full py-16 px-12 md:px-24 bg-customWhite">
      <div className="mx-auto">
        
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-primary">
            Program Konservasi Aktif
          </h2>
          <p className="text-sm md:text-base text-primary mt-1">
            Dukung berbagai program rehabilitasi hutan dan konservasi lahan kritis yang sedang berjalan
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DATA.map((item) => (
            <ProgramCard key={item.id} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProgramKonservasiSection;
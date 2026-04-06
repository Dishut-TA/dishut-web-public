import DampakCard from "@/components/DampakCard";

const DampakProgramSection = () => {
  const data = [
    { value: "10000 Ha", label: "Luas Lahan Kritis" },
    { value: "10000 Pohon", label: "Jumlah Pohon Ditanam" },
    { value: "10000 Ha", label: "Jumlah Lokasi Rehabilitasi" },
    { value: "10000 KTH", label: "Jumlah KTH" },
  ];

  return (
    <section className="bg-[#F5F5F5] py-16 px-12 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        
        <div className="flex-1">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4 leading-snug">
            Dampak Program Konservasi <br />
            Hutan Jawa Barat
          </h2>

          <p className="text-primary text-sm md:text-base max-w-md">
            Lorem ipsum dolor sit amet consectetur. Sed arcu elementum eu
            feugiat mattis posuere. Tempus quis consequat in amet. Commodo
            dignissim sed tellus mi.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {data.map((item, index) => (
            <DampakCard
              key={index}
              value={item.value}
              label={item.label}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default DampakProgramSection;
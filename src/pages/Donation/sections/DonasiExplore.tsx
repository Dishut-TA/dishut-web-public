import React, { useMemo, useState } from "react";
import ProgramCard from "@/components/ProgramCard";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Perbarui data mock
const PROGRAM_DATA = [
  {
    id: 1,
    title: "Pemulihan Lahan Kritis Cisadane", // Perbarui judul data mock agar sesuai gambar
    location: "Kabupaten Bogor",
    description:
      "Bantu kami merehabilitasi hutan dan lahan kritis melalui program penanaman pohon untuk menjaga kelestarian lingkungan.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    collected: "2000", // Ubah ke angka mentah bibit (string)
    status: "Aktif", // Tambahkan status
  },
  {
    id: 2,
    title: "Rehabilitasi Hutan DAS Cimanuk",
    location: "Garut, Jawa Barat",
    description:
      "Bantu kami merehabilitasi hutan dan lahan kritis melalui program penanaman pohon untuk menjaga kelestarian lingkungan.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    collected: "13.000", // Ubah ke angka mentah bibit (string)
    status: "Aktif", // Tambahkan status
  },
  {
    id: 3,
    title: "Pemulihan Kawasan Resapan Air",
    location: "Bandung, Jawa Barat",
    description:
      "Dukung pemulihan kawasan resapan air melalui penanaman vegetasi dan penguatan ekosistem daerah tangkapan air.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    collected: "9.500", // Ubah ke angka mentah bibit (string)
    status: "Aktif", // Tambahkan status
  },
  {
    id: 4,
    title: "Konservasi Lahan Kritis Pegunungan",
    location: "Sumedang, Jawa Barat",
    description:
      "Mari berkontribusi dalam pemulihan lahan kritis di wilayah pegunungan untuk mendukung keseimbangan lingkungan.",
    image:
      "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=1200&q=80",
    collected: "7.800", // Ubah ke angka mentah bibit (string)
    status: "Aktif", // Tambahkan status
  },
];

const DonasiExplore: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredPrograms = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return PROGRAM_DATA;

    return PROGRAM_DATA.filter((item) =>
      [item.title, item.location, item.description].some((value) =>
        value.toLowerCase().includes(keyword)
      )
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-customWhite">
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-20 lg:px-12">
        {/* Heading + Search */}
        <section className="mb-8 md:mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* Title */}
            <div className="max-w-3xl">
              <h1 className="text-2xl font-semibold leading-tight text-primary md:text-4xl mt-4 ">
                Jelajahi Program
              </h1>
              <p className="mt-3 text-sm text-primary/80 md:text-base">
                Berikut kami sediakan donasi yang tersedia saat ini
              </p>
            </div>

            {/* Search */}
            <div className="w-full lg:max-w-sm">
              <div className="flex items-center gap-3 rounded-full border border-primary/40 bg-white px-4 py-3 shadow-sm">
                <FiSearch className="text-lg text-primary/70" />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-primary/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Card List */}
        <section>
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-2">
              {filteredPrograms.map((program) => (
                <ProgramCard
                  key={program.id}
                  id={program.id} 
                  title={program.title}
                  location={program.location}
                  description={program.description}
                  image={program.image}
                  collected={program.collected}
                  status={program.status as "Aktif" | "Non-Aktif"} // Tetapkan status dari data mock
                  onClick={() => navigate(`/donasi/detail/${program.id}`)} // Tetap gunakan prop onClick untuk navigasi
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-primary/30 bg-white px-6 py-12 text-center">
              <p className="text-sm text-primary/70 md:text-base">
                Program donasi tidak ditemukan.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DonasiExplore;
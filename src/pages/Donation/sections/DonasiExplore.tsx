import React, { useMemo, useState, useEffect } from "react";
import ProgramCard from "@/components/ProgramCard";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getDonationProgramsAPI } from "@/services/program-donasi.service";

const DonasiExplore: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getDonationProgramsAPI();
        const activePrograms = response.payload.filter(
          (p: any) => 
            p.status.toLowerCase() === 'active' || 
            p.status.toLowerCase() === 'aktif'
        );
        setPrograms(activePrograms);
      } catch (error) {
        console.error("Gagal memuat program:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const filteredPrograms = useMemo(() => {
    const keyword = search.toLowerCase().trim();
    if (!keyword) return programs;

    return programs.filter((item) =>
      [item.name, item.location].some((value) =>
        value?.toLowerCase().includes(keyword)
      )
    );
  }, [search, programs]);

  return (
    <div className="min-h-screen bg-customWhite">
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-20 lg:px-12">
        <section className="mb-8 md:mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-2xl font-semibold leading-tight text-primary md:text-4xl mt-4">
                Jelajahi Program
              </h1>
              <p className="mt-3 text-sm text-primary/80 md:text-base">
                Berikut kami sediakan donasi yang tersedia saat ini
              </p>
            </div>

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

        <section>
          {isLoading ? (
            <div className="py-12 text-center text-primary/70">Memuat data program...</div>
          ) : filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-2">
              {filteredPrograms.map((program) => (
                <ProgramCard
                  key={program.id}
                  id={program.id} 
                  title={program.name}
                  location={program.location}
                  description={program.description || "Bantu kami merehabilitasi hutan dan lahan kritis melalui program penanaman pohon untuk menjaga kelestarian lingkungan."}
                  image={program.image_url || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"}
                  collected={program.total_seeds_collected.toLocaleString('id-ID')}
                  status={program.status} // Mengambil status langsung dari API (misal: "Aktif" / "Menunggu Verifikasi")
                  onClick={() => navigate(`/donasi/detail/${program.id}`)} 
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
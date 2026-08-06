import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiClock, FiShare2, FiUsers } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import AllocationTable, { type AllocationItem } from "../components/AllocationTable";
import DonorList from "../components/DonorList";
import ProgramSummaryCard from "../components/ProgramSummaryCard";
import { getDonationProgramByIdAPI } from "@/services/program-donasi.service";

// Mock Data Sementara untuk fitur yang belum ada di backend
const mockDonors = [
  { id: 1, name: "Raisha Nabila", amount: 20000, timeAgo: "15 menit yang lalu" },
  { id: 2, name: "Muhamein Iskandar", amount: 10000, timeAgo: "25 menit yang lalu" },
  { id: 3, name: "Debora Ananta", amount: 10000, timeAgo: "30 menit yang lalu" },
];

const mockAllocations = [
  {
    id: 1,
    label: "Pembelanjaan Bibit Tanaman",
    percentage: 100,
    amount: 1200000,
    isStrikethrough: false,
  },
] as AllocationItem[];

const DonasiDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (!id) return;
        const response = await getDonationProgramByIdAPI(id);
        setProgram(response.payload);
      } catch (error) {
        console.error("Gagal memuat detail:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-customWhite text-primary">Memuat Detail Program...</div>;
  }

  if (!program) {
    return <div className="min-h-screen flex items-center justify-center bg-customWhite text-primary">Program tidak ditemukan!</div>;
  }

  return (
    <div className="min-h-screen bg-customWhite">
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <section className="lg:col-span-6 xl:col-span-6">
            <button
              onClick={() => navigate(-1)}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:opacity-80"
            >
              <FiArrowLeft className="text-base" />
              <span>Kembali</span>
            </button>

            <h1 className="text-3xl font-semibold leading-tight text-primary md:text-4xl">
              {program.name}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-primary/80 md:text-base">
              {program.description || "Bantu kami merehabilitasi hutan dan lahan kritis melalui program penanaman pohon untuk menjaga kelestarian lingkungan di wilayah Jawa Barat."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-primary/80">
              <div className="flex items-center gap-2">
                <FiUsers className="text-base" />
                <span>20 donatur</span> {/* Mock */}
              </div>

              <div className="flex items-center gap-2">
                <FiClock className="text-base" />
                <span>Tersisa 25 hari lagi</span> {/* Mock */}
              </div>

              <button type="button" className="inline-flex items-center gap-2 transition hover:opacity-80">
                <FiShare2 className="text-base" />
                <span>Bagikan</span>
              </button>
            </div>

            <div className="mt-10">
                <AllocationTable
                title="Alokasi Dana (100% Pembelian Bibit)"
                items={mockAllocations}
                totalAmount={1200000} // Mock total dana
                />
            </div>

            <div className="mt-10">
              <h2 className="mb-4 text-xl font-semibold text-primary md:text-2xl">
                Donatur Terbaru
              </h2>
              <DonorList donors={mockDonors} />
            </div>
          </section>

          <aside className="lg:col-span-6 xl:col-span-6">
            <ProgramSummaryCard
              programId={Number(program.id)}
              title={program.name}
              location={program.location}
              image={program.image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"}
              collected={program.total_seeds_collected}
              status="Aktif"
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DonasiDetail;
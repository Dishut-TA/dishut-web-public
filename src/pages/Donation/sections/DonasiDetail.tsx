import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiClock, FiShare2, FiUsers } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import AllocationTable from "../components/AllocationTable";
import DonorList from "../components/DonorList";
import ProgramSummaryCard from "../components/ProgramSummaryCard";
import { getDonationProgramByIdAPI } from "@/services/program-donasi.service";
import { getDonationsAPI } from "@/services/donation.service";

const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Baru saja';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
  return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
};

const DonasiDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<any>(null);
  const [donors, setDonors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        
        const [programRes, donationsRes] = await Promise.all([
          getDonationProgramByIdAPI(id),
          getDonationsAPI().catch(() => ({ payload: [] })) 
        ]);

        setProgram(programRes.payload); 
        
        const rawDonations = Array.isArray(donationsRes.payload) 
          ? donationsRes.payload 
          : (donationsRes.data || []);

        const programDonations = rawDonations.filter((d: any) => 
          d.donation_program_id === Number(id) && 
          ['Terkumpul', 'Disalurkan', 'Terealisasi'].includes(d.seed_status)
        );

        const sortedDonations = programDonations.sort((a: any, b: any) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

          const mappedDonors = sortedDonations.map((d: any, index: number) => {
          // Hitung total jumlah bibit dari array seed_details
          const totalBibit = Array.isArray(d.seed_details) 
            ? d.seed_details.reduce((sum: number, bibit: any) => sum + (Number(bibit.quantity) || 0), 0)
            : 0;

          return {
            id: d.id || index,
            name: d.donor?.donor_name || "Hamba Allah",
            amount: totalBibit, // <--- Gunakan total yang baru dihitung
            timeAgo: getTimeAgo(d.created_at) 
          };
        });

        
        setDonors(mappedDonors);
      } catch (error) {
        console.error("Gagal memuat detail:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:opacity-80 cursor-pointer"
            >
              <FiArrowLeft className="text-base" />
              <span>Kembali</span>
            </button>

            <h1 className="text-3xl font-semibold leading-tight text-primary md:text-4xl">
              {program.name}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-primary/80 md:text-base">
              {program.description || "Bantu kami merehabilitasi hutan dan lahan kritis melalui program penanaman pohon untuk menjaga kelestarian lingkungan."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-primary/80">
              <div className="flex items-center gap-2">
                <FiUsers className="text-base" />
                <span>{donors.length} donatur</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FiClock className="text-base" />
                <span>Program Aktif</span>
              </div>

              <button type="button" className="inline-flex items-center gap-2 transition hover:opacity-80 cursor-pointer">
                <FiShare2 className="text-base" />
                <span>Bagikan</span>
              </button>
            </div>

            <div className="mt-10">
                <AllocationTable
                  title="Alokasi Dana (100% Pembelian Bibit)"
                  items={program.allocations || []} 
                  totalAmount={program.total_dana || 0}
                />
            </div>

            <div className="mt-10">
              <h2 className="mb-4 text-xl font-semibold text-primary md:text-2xl">
                Donatur Terbaru
              </h2>
              {donors.length > 0 ? (
                 <DonorList donors={donors} />
              ) : (
                 <p className="text-sm text-gray-500 italic">Belum ada donatur untuk program ini. Jadilah yang pertama!</p>
              )}
            </div>
          </section>

          <aside className="lg:col-span-6 xl:col-span-6">
            <ProgramSummaryCard
              programId={Number(program.id)}
              title={program.name}
              location={program.location}
              image={program.image_url || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"}
              collected={program.total_seeds_collected}
              status={program.status || "Aktif"}
              jenisBibit={program.jenis_bibit || []} 
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DonasiDetail;
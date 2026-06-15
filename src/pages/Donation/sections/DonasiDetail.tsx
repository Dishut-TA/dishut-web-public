import React from "react";
import { FiArrowLeft, FiClock, FiShare2, FiUsers } from "react-icons/fi";
import AllocationTable, { type AllocationItem } from "../components/AllocationTable";
import DonorList from "../components/DonorList";
import ProgramSummaryCard from "../components/ProgramSummaryCard";

// Sesuaikan data mock
const donationDetail = {
  id: 1,
  title: "Rehabilitasi Hutan DAS Cimanuk",
  description: "Lorem ipsum dolor sit amet consectetur...",
  location: "Garut, Jawa Barat",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  
  collectedBibit: 13000, 
  targetBibit: 20000,
  collectedDana: 1200000, // Total donasi terkumpul dalam Rupiah (seperti di gambar)
  status: "Aktif",
  
  donorCount: 20,
  remainingDays: 25,
  
  // Data alokasi disesuaikan dengan gambar UI
  allocationTitle: "Alokasi Dana (100% Pembelian Bibit)",
  allocations: [
    {
      id: 1,
      label: "Pembelanjaan Bibit Sengon",
      percentage: 100,
      amount: 1200000,
      isStrikethrough: false,
    },
    {
      id: 2,
      label: "Operasional Platform / BPDAS",
      percentage: 0,
      amount: 0,
      isStrikethrough: true,
    },
    {
      id: 3,
      label: "Biaya Perawatan oleh KTH",
      percentage: 0,
      customValueText: "Ditanggung Pemerintah",
      isStrikethrough: true,
    },
  ] as AllocationItem[],
};

const donors = [
  {
    id: 1,
    name: "Raisha Nabila",
    amount: 20000,
    timeAgo: "15 menit yang lalu",
  },
  {
    id: 2,
    name: "Muhamein Iskandar",
    amount: 10000,
    timeAgo: "25 menit yang lalu",
  },
  {
    id: 3,
    name: "Debora Ananta",
    amount: 10000,
    timeAgo: "30 menit yang lalu",
  },
];

const DonasiDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-customWhite">
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <section className="lg:col-span-6 xl:col-span-6">
            <button
              type="button"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:opacity-80"
            >
              <FiArrowLeft className="text-base" />
              <span>Kembali</span>
            </button>

            <h1 className="text-3xl font-semibold leading-tight text-primary md:text-4xl">
              {donationDetail.title}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-primary/80 md:text-base">
              {donationDetail.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-primary/80">
              <div className="flex items-center gap-2">
                <FiUsers className="text-base" />
                <span>{donationDetail.donorCount} donatur</span>
              </div>

              <div className="flex items-center gap-2">
                <FiClock className="text-base" />
                <span>Tersisa {donationDetail.remainingDays} hari lagi</span>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 transition hover:opacity-80"
              >
                <FiShare2 className="text-base" />
                <span>Bagikan</span>
              </button>
            </div>

            {/* Bagian Alokasi Dana */}
            <div className="mt-10">
                <AllocationTable
                title={donationDetail.allocationTitle}
                items={donationDetail.allocations}
                totalAmount={donationDetail.collectedDana}
                />
            </div>

            <div className="mt-10">
              <h2 className="mb-4 text-xl font-semibold text-primary md:text-2xl">
                Donatur Terbaru
              </h2>

              <DonorList donors={donors} />
            </div>
          </section>

          <aside className="lg:col-span-6 xl:col-span-6">
            <ProgramSummaryCard
            title={donationDetail.title}
            location={donationDetail.location}
            image={donationDetail.image}
            collected={donationDetail.collectedBibit}
            target={donationDetail.targetBibit} 
            status={donationDetail.status as "Aktif" | "Non-Aktif"}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DonasiDetail;
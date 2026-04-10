import React from "react";
import { FiArrowLeft, FiClock, FiShare2, FiUsers } from "react-icons/fi";
import AllocationTable from "../components/AllocationTable";
import DonorList from "../components/DonorList";
import ProgramSummaryCard from "../components/ProgramSummaryCard";

const donationDetail = {
    id: 1,
    title: "Rehabilitasi Hutan DAS Cimanuk",
    description:
        "Lorem ipsum dolor sit amet consectetur. Sed arcu elementum eu feugiat mattis posuere. Tempus quis consequat in amet. Commodo dignissim sed tellus mi. Rhoncus lectus habitant leo urna et tortor nunc velit accumsan. Adipiscing sed turpis sit aliquet dictum iaculis posuere a.",
    location: "Garut, Jawa Barat",
    image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    collected: 130000000,
    target: 200000000,
    donorCount: 20,
    remainingDays: 25,
    allocations: [
        { id: 1, label: "Bibit Pohon dan Penanaman", amount: 80000000 },
        { id: 2, label: "Perawatan dan Monitoring Tanaman", amount: 40000000 },
        { id: 3, label: "Kegiatan Rehabilitasi Lahan", amount: 35000000 },
        { id: 4, label: "Pelibatan Masyarakat Lokal", amount: 25000000 },
        { id: 5, label: "Operasional dan Transportasi", amount: 10000000 },
        { id: 6, label: "Biaya Administrasi", amount: 10000000 },
    ],
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

const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(num);

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

                        <div className="mt-10">
                            <h2 className="mb-4 text-xl font-semibold text-primary md:text-2xl">
                                Rincian Alokasi Dana
                            </h2>

                            <AllocationTable
                                items={donationDetail.allocations}
                                total={donationDetail.target}
                                formatter={formatRupiah}
                            />
                        </div>

                        <div className="mt-10">
                            <h2 className="mb-4 text-xl font-semibold text-primary md:text-2xl">
                                Donatur Terbaru
                            </h2>

                            <DonorList donors={donors} formatter={formatRupiah} />
                        </div>
                    </section>

                    <aside className="lg:col-span-6 xl:col-span-6">
                        <ProgramSummaryCard
                            title={donationDetail.title}
                            location={donationDetail.location}
                            image={donationDetail.image}
                            collected={donationDetail.collected}
                            target={donationDetail.target}
                        />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default DonasiDetail;
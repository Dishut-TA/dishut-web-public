import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { HiOutlineInbox, HiOutlineArrowPath } from 'react-icons/hi2';
import { PiPlant } from 'react-icons/pi';
import StatCard from './components/StatCard';
import RecentStatus from './components/RecentStatus';
import PromoBanner from './components/PromoBanner';
import { getTransactionsAPI } from '@/services/transaction.service';

const DashboardDonation: React.FC = () => {
  const { user } = useAuth(); 
  const [data, setData] = useState<{ stats: any, recent_statuses: any[] }>({
    stats: { total_donasi: 0, terealisasi: 0, diproses: 0 },
    recent_statuses: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getTransactionsAPI();
        const transactions = Array.isArray(res.payload) ? res.payload : [];
        let userTransactions = transactions;
        if (user && user.id) {
          userTransactions = transactions.filter((item: any) => item.donor?.user_id === user.id);
        }

        let totalDonasi = 0;
        let terealisasi = 0;
        let diproses = 0;
        const recentStatuses: any[] = [];

        userTransactions.forEach((trx: any) => {
          trx.donations?.forEach((d: any) => {
            if (d.seed_status === 'Batal' || d.seed_status === 'Ditolak') return;

            let qty = 0;
            let firstSeedName = 'Bibit';

            if (Array.isArray(d.seed_details)) {
              qty = d.seed_details.reduce((sum: number, bibit: any) => sum + (Number(bibit.quantity) || 0), 0);
              if (d.seed_details.length > 0) firstSeedName = d.seed_details[0].name || 'Bibit';
            } else if (d.seed) {
              qty = Number(d.seed_quantity) || 0;
              firstSeedName = d.seed?.nama || 'Bibit';
            }

            totalDonasi += qty;
            
            if (d.seed_status === 'Terealisasi') {
              terealisasi += qty;
            } else if (['Pending', 'Terkumpul', 'Disalurkan', 'Menunggu Verifikasi'].includes(d.seed_status)) {
              diproses += qty;
            }

            recentStatuses.push({
              id: d.id,
              title: `${qty} ${firstSeedName}`,
              program: d.donation_program?.name || 'Program Umum',
              status: d.seed_status || 'Pending',
              created_at: d.created_at || trx.transaction_date
            });
          });
        });

        // Sort by date descending and get top 5
        recentStatuses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const top5 = recentStatuses.slice(0, 5);

        setData({
          stats: {
            total_donasi: totalDonasi,
            terealisasi: terealisasi,
            diproses: diproses
          },
          recent_statuses: top5
        });

      } catch (error) {
        console.error("Gagal load dashboard", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchDashboard();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F5F7F5] animate-[fadeIn_0.3s_ease-out]">
      <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Halo, {user?.nama_pengguna || 'Orang Baik'}!
          </h1>
          <p className="text-sm text-primary mt-1">
            Terima kasih telah berkontribusi untuk bumi yang lebih hijau
          </p>
        </div>

        {isLoading ? (
          <div className="text-gray-500 animate-pulse">Memuat data donasi Anda...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <StatCard 
                title="Total Bibit Didonasikan" 
                value={`${data.stats.total_donasi} Pohon`} 
                icon={<HiOutlineInbox size={24} />} 
              />
              <StatCard 
                title="Bibit Terealisasi" 
                value={`${data.stats.terealisasi} Pohon`} 
                icon={<PiPlant size={24} />} 
              />
              <StatCard 
                title="Sedang Diproses" 
                value={`${data.stats.diproses} Pohon`} 
                icon={<HiOutlineArrowPath size={24} />} 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 h-full">
                <RecentStatus statuses={data.recent_statuses} />
              </div>
              <div className="lg:col-span-7 h-full">
                <PromoBanner />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardDonation;
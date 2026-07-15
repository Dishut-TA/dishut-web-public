import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  HiOutlineInbox, 
  HiOutlineArrowPath, 
  HiOutlineMap 
} from 'react-icons/hi2';
import StatCard from './components/StatCard';
import RecentStatus from './components/RecentStatus';
import PromoBanner from './components/PromoBanner';
import { PiPlant } from 'react-icons/pi';

const DashboardDonation: React.FC = () => {
  const { user } = useAuth(); 

  return (
    <div className="min-h-screen bg-[#F5F7F5] animate-[fadeIn_0.3s_ease-out]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Halo, {user?.nama_pengguna || 'Anggara Bagas'}!
          </h1>
          <p className="text-sm  text-primary">
            Terima kasih telah berkontribusi untuk bumi yang lebih hijau
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard 
            title="Total Bibit Didonasikan" 
            value="2 Pohon" 
            icon={<HiOutlineInbox size={24} />} 
          />
          <StatCard 
            title="Bibit Terealisasi" 
            value="2 Pohon" 
            icon={<PiPlant size={24} />} 
          />
          <StatCard 
            title="Sedang Diproses" 
            value="2 Pohon" 
            icon={<HiOutlineArrowPath size={24} />} 
          />
          <StatCard 
            title="Target Penghijauan" 
            value="40 Hektar" 
            icon={<HiOutlineMap size={24} />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 h-full">
            <RecentStatus />
          </div>

          <div className="lg:col-span-7 h-full">
            <PromoBanner />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardDonation;
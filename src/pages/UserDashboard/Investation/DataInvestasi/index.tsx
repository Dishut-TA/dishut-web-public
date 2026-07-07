import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import InvestmentCard from './components/InvestmentCard';

const mockInvestments = [
  { id: '1', item: 'Ekowisata Kebun Stroberi', date: '< 2 Bulan Tersisa', status: 'Active', progress: 70, image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80' },
  { id: '2', item: 'Ekowisata Kebun Stroberi', date: '< 2 Bulan Tersisa', status: 'Active', progress: 70, image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80' },
  { id: '3', item: 'Ekowisata Kebun Stroberi', date: '< 2 Bulan Tersisa', status: 'Active', progress: 70, image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80' },
];

const DataInvestasi: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockInvestments.filter((item) =>
    item.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          Data Investasi
        </h1>
        
        <div className="relative w-full md:w-80">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" size={20} />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-full border border-primary text-primary focus:outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((data) => (
            <InvestmentCard key={data.id} data={data} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400">
            Data tidak ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataInvestasi;
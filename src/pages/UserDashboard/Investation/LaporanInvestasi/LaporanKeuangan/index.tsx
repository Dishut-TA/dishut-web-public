import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

interface LaporanData {
  id: string;
  namaInvestasi: string;
  tanggal: string;
  pendapatan: number;
  pengeluaran: number;
  keuntungan: number;
  kerugian: number;
}

const mockLaporanData: LaporanData[] = [
  {
    id: '1',
    namaInvestasi: 'Pembangunan Ekowisata Pinus',
    tanggal: '01/01/2024',
    pendapatan: 10000000,
    pengeluaran: 5000000,
    keuntungan: 5000000,
    kerugian: 0,
  },
  {
    id: '2',
    namaInvestasi: 'Ekowisata Kebun Stroberi',
    tanggal: '15/02/2024',
    pendapatan: 8000000,
    pengeluaran: 8500000,
    keuntungan: 0,
    kerugian: 500000,
  }
];

const LaporanKeuangan: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockLaporanData.filter((data) =>
    data.namaInvestasi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatRupiah = (amount: number) => {
    if (amount === 0) return '-';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount).replace('Rp', 'Rp.');
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          Laporan Keuangan
        </h1>
        
        <div className="relative w-full md:w-80">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-primary/60">
            <HiSearch size={20} />
            <span className="text-primary/30 text-lg font-light leading-none">|</span>
          </div>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-2.5 rounded-full border border-primary text-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm font-medium placeholder:text-primary/60 bg-transparent"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-primary text-primary font-semibold text-xs tracking-wide">
              <th className="py-4 px-2 md:px-4 uppercase">Nama Investasi</th>
              <th className="py-4 px-2 md:px-4 uppercase">Tanggal</th>
              <th className="py-4 px-2 md:px-4 uppercase">Biaya Pendapatan</th>
              <th className="py-4 px-2 md:px-4 uppercase">Biaya Pengeluaran</th>
              <th className="py-4 px-2 md:px-4 uppercase">Keuntungan</th>
              <th className="py-4 px-2 md:px-4 uppercase">Kerugian</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data) => (
                <tr 
                  key={data.id} 
                  className="border-b border-primary/30 transition-colors duration-200 text-sm font-bold hover:bg-gray-50/50"
                >
                  <td className="py-6 px-2 md:px-4 text-primary">
                    {data.namaInvestasi}
                  </td>
                  <td className="py-6 px-2 md:px-4 text-primary">
                    {data.tanggal}
                  </td>
                  <td className="py-6 px-2 md:px-4 text-primary">
                    {formatRupiah(data.pendapatan)}
                  </td>
                  <td className="py-6 px-2 md:px-4 text-primary">
                    {formatRupiah(data.pengeluaran)}
                  </td>
                  <td className="py-6 px-2 md:px-4 text-primary">
                    {formatRupiah(data.keuntungan)}
                  </td>
                  <td className="py-6 px-2 md:px-4 text-primary">
                    {formatRupiah(data.kerugian)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400 font-medium text-sm">
                  Laporan keuangan tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default LaporanKeuangan;
import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

interface PendapatanData {
  id: string;
  namaInvestasi: string;
  tanggal: string;
  biayaPendapatan: number;
  dokumen: string;
}

const mockPendapatanData: PendapatanData[] = [
  {
    id: '1',
    namaInvestasi: 'Pembangunan Ekowisata Pinus',
    tanggal: '01/01/2024',
    biayaPendapatan: 5000000,
    dokumen: 'Pendapatan.pdf',
  },
  {
    id: '2',
    namaInvestasi: 'Ekowisata Kebun Stroberi',
    tanggal: '15/02/2024',
    biayaPendapatan: 8500000,
    dokumen: 'Invoice_Stroberi.pdf',
  }
];

const BiayaPendapatan: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockPendapatanData.filter((data) =>
    data.namaInvestasi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatRupiah = (amount: number) => {
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
          Biaya Pendapatan
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
              <th className="py-4 px-2 md:px-4 uppercase">Dokumen</th>
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
                    {formatRupiah(data.biayaPendapatan)}
                  </td>
                  <td className="py-6 px-2 md:px-4 text-primary">
                    {/* Menggunakan tag anchor dengan underline untuk meniru tampilan link dokumen */}
                    <a 
                      href={`#download-${data.id}`} 
                      className="underline decoration-1 underline-offset-4 hover:text-green-800 hover:decoration-green-800 transition-colors cursor-pointer"
                      title={`Unduh ${data.dokumen}`}
                    >
                      {data.dokumen}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center text-gray-400 font-medium text-sm">
                  Data biaya pendapatan tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default BiayaPendapatan;
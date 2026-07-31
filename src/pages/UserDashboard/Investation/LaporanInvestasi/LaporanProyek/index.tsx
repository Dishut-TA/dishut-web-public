import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineFunnel, HiOutlineEye } from 'react-icons/hi2';

interface LaporanProyekData {
  id: string;
  no: number;
  tanggal: string;
  namaInvestasi: string;
  status: string;
}

const mockData: LaporanProyekData[] = [
  {
    id: 'PRJ-001',
    no: 1,
    tanggal: '24/08/2025',
    namaInvestasi: 'Investasi Ekowisata Kebun Stroberi',
    status: 'Sedang Berjalan',
  },
  {
    id: 'PRJ-002',
    no: 1, // Di gambar Figma nomornya 1 lagi, tapi idealnya urut
    tanggal: '24/08/2025',
    namaInvestasi: 'Investasi Ekowisata Kebun Stroberi',
    status: 'Selesai',
  }
];

const LaporanProyek: React.FC = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    if (status === 'Sedang Berjalan') return 'text-orange-500';
    if (status === 'Selesai') return 'text-emerald-600';
    return 'text-[#185325]';
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] w-full max-w-screen-2xl mx-auto pb-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <h1 className="text-xl md:text-2xl font-bold text-[#185325]">
          Laporan Proyek Investasi
        </h1>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-[#185325] text-[#185325] text-sm font-semibold rounded-lg hover:bg-[#185325]/5 transition-colors">
          <HiOutlineFunnel className="w-5 h-5" /> Filter
        </button>
      </div>

      {/* Tabel dengan Style Laporan Keuangan (Sesuai Snippet) */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#185325] text-[#185325] font-semibold text-xs tracking-wide">
              <th className="py-4 px-2 md:px-4 uppercase text-center w-16">No</th>
              <th className="py-4 px-2 md:px-4 uppercase">Tanggal</th>
              <th className="py-4 px-2 md:px-4 uppercase">Nama Investasi</th>
              <th className="py-4 px-2 md:px-4 uppercase">Status</th>
              <th className="py-4 px-2 md:px-4 uppercase text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((data, idx) => (
              <tr 
                key={data.id} 
                className="border-b border-[#185325]/30 transition-colors duration-200 text-sm font-bold hover:bg-gray-50/50"
              >
                <td className="py-6 px-2 md:px-4 text-[#185325] text-center">
                  {idx + 1}
                </td>
                <td className="py-6 px-2 md:px-4 text-[#185325]">
                  {data.tanggal}
                </td>
                <td className="py-6 px-2 md:px-4 text-[#185325]">
                  {data.namaInvestasi}
                </td>
                <td className={`py-6 px-2 md:px-4 ${getStatusColor(data.status)}`}>
                  {data.status}
                </td>
                <td className="py-6 px-2 md:px-4 flex justify-center items-center">
                  <button 
                    title="Lihat Detail"
                    onClick={() => navigate(`/laporan-investasi/proyek/${data.id}`)}
                    className="p-1.5 text-[#185325] hover:bg-[#185325]/10 rounded-full transition-colors"
                  >
                    <HiOutlineEye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default LaporanProyek;
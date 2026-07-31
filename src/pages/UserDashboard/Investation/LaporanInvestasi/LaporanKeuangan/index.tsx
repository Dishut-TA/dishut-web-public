import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineFunnel, HiOutlineEye } from 'react-icons/hi2';

interface LaporanKeuanganData {
  id: string;
  no: number;
  periode: string;
  namaInvestasi: string;
  totalPendapatan: string;
  totalPengeluaran: string;
  labaBersih: string;
  status: string;
}

const mockData: LaporanKeuanganData[] = [
  {
    id: 'LK-001',
    no: 1,
    periode: 'Jan - Juni 2025',
    namaInvestasi: 'Ekowisata Kebun Stroberi',
    totalPendapatan: 'Rp 120.000.000',
    totalPengeluaran: 'Rp 80.000.000',
    labaBersih: 'Rp 40.000.000',
    status: 'Menunggu Pembagian',
  },
  {
    id: 'LK-002',
    no: 2,
    periode: 'Jan - Juni 2025',
    namaInvestasi: 'Ekowisata Kebun Stroberi',
    totalPendapatan: 'Rp 120.000.000',
    totalPengeluaran: 'Rp 80.000.000',
    labaBersih: 'Rp 40.000.000',
    status: 'Sudah Dibagikan',
  }
];

const LaporanKeuangan: React.FC = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    if (status === 'Menunggu Pembagian') return 'text-orange-500';
    if (status === 'Sudah Dibagikan') return 'text-[#185325]';
    return 'text-gray-800';
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] w-full max-w-screen-2xl mx-auto pb-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <h1 className="text-xl md:text-2xl font-bold text-[#185325]">
          Laporan Keuangan
        </h1>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-[#185325] text-[#185325] text-sm font-semibold rounded-lg hover:bg-[#185325]/5 transition-colors">
          <HiOutlineFunnel className="w-5 h-5" /> Filter
        </button>
      </div>

      {/* Tabel */}
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#185325] text-[#185325] font-bold text-xs tracking-wide">
              <th className="py-4 px-4 uppercase text-center w-16">No</th>
              <th className="py-4 px-4 uppercase">Periode</th>
              <th className="py-4 px-4 uppercase">Nama Investasi</th>
              <th className="py-4 px-4 uppercase">Total Pendapatan</th>
              <th className="py-4 px-4 uppercase">Total Pengeluaran</th>
              <th className="py-4 px-4 uppercase">Laba Bersih</th>
              <th className="py-4 px-4 uppercase">Status</th>
              <th className="py-4 px-4 uppercase text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((data, idx) => (
              <tr 
                key={data.id} 
                className="border-b border-[#185325]/20 transition-colors duration-200 text-sm font-bold hover:bg-gray-50/50"
              >
                <td className="py-5 px-4 text-[#185325] text-center">
                  {idx + 1}
                </td>
                <td className="py-5 px-4 text-[#185325]">
                  {data.periode}
                </td>
                <td className="py-5 px-4 text-[#185325]">
                  {data.namaInvestasi}
                </td>
                <td className="py-5 px-4 text-[#185325]">
                  {data.totalPendapatan}
                </td>
                <td className="py-5 px-4 text-[#185325]">
                  {data.totalPengeluaran}
                </td>
                <td className="py-5 px-4 text-[#185325]">
                  {data.labaBersih}
                </td>
                <td className={`py-5 px-4 ${getStatusColor(data.status)}`}>
                  {data.status}
                </td>
                <td className="py-5 px-4 flex justify-center items-center">
                  <button 
                    title="Lihat Detail"
                    onClick={() => navigate(`/laporan-investasi/keuangan/${data.id}`)}
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

export default LaporanKeuangan;
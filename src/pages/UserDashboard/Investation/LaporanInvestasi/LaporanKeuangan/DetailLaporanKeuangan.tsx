import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlinePrinter } from 'react-icons/hi2';

const DATA_PENDAPATAN = [
  { id: 1, tanggal: '01/01/2024', keterangan: 'Tiket Masuk', nominal: 'Rp. 80.000.000', dokumen: 'kwitansi.pdf' },
  { id: 2, tanggal: '01/01/2024', keterangan: 'Camping', nominal: 'Rp. 40.000.000', dokumen: 'kwitansi.pdf' },
];

const DATA_PENGELUARAN = [
  { id: 1, tanggal: '01/01/2024', keterangan: 'Gaji Pegawai', nominal: 'Rp. 40.000.000', dokumen: 'kwitansi.pdf' },
  { id: 2, tanggal: '01/01/2024', keterangan: 'Operasional', nominal: 'Rp. 40.000.000', dokumen: 'kwitansi.pdf' },
];

const InfoRow = ({ label, value, valueColor = "text-gray-800" }: { label: string, value: string, valueColor?: string }) => (
  <div className="grid grid-cols-[160px_20px_1fr] items-start text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-500">:</span>
    <span className={`font-bold ${valueColor}`}>{value}</span>
  </div>
);

const TransactionTable = ({ title, data, total }: { title: string, data: any[], total: string }) => (
  <div className="mt-8">
    <h3 className="text-base font-bold text-gray-800 mb-4">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-gray-400 text-gray-800">
            <th className="py-3 px-2 font-medium">Tanggal</th>
            <th className="py-3 px-2 font-medium">Keterangan</th>
            <th className="py-3 px-2 font-medium">Nominal</th>
            <th className="py-3 px-2 font-medium">Dokumen</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 text-gray-800">
              <td className="py-4 px-2 font-medium">{row.tanggal}</td>
              <td className="py-4 px-2 font-bold">{row.keterangan}</td>
              <td className="py-4 px-2 font-medium">{row.nominal}</td>
              <td className="py-4 px-2 font-medium italic text-gray-600">{row.dokumen}</td>
            </tr>
          ))}
          <tr className="bg-[#DCECE0] text-gray-800 font-bold border-b border-gray-200">
            <td colSpan={2} className="py-4 px-2">Total</td>
            <td colSpan={2} className="py-4 px-2">{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const DetailLaporanKeuangan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isSudahDibagikan = id === 'LK-002';
  const statusText = isSudahDibagikan ? 'Dibagikan' : 'Menunggu Pembagian';
  const statusColor = isSudahDibagikan ? 'text-[#185325]' : 'text-orange-500';

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-20 animate-[fadeIn_0.3s_ease-out] relative">
      
      {/* Header Halaman */}
      <div className="relative mb-10 flex items-center justify-center">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-0 flex items-center gap-2 text-sm font-bold text-[#185325] hover:underline"
        >
          <HiOutlineChevronLeft className="stroke-2" /> Kembali
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mt-8 md:mt-0">Detail Laporan Keuangan</h1>
      </div>

      <div className="px-4 sm:px-0">
        
        {/* 1. Informasi Laporan */}
        <h2 className="text-base font-bold text-gray-800 mb-4">Informasi Laporan</h2>
        <div className="flex flex-col gap-3">
          <InfoRow label="Nama Investasi" value="Ekowisata Kebun Stroberi" />
          <InfoRow label="Periode" value="Januari - Juni 2025" />
          <InfoRow label="Status" value={statusText} valueColor={statusColor} />
          <div className="mt-2"></div>
          <InfoRow label="Total Pendapatan" value="Rp 120.000.000" />
          <InfoRow label="Total Pengeluaran" value="Rp 80.000.000" />
          <InfoRow label="Laba Bersih" value="Rp 40.000.000" />
        </div>

        {/* 2. Tabel Pendapatan */}
        <TransactionTable 
          title="Tabel Pendapatan" 
          data={DATA_PENDAPATAN} 
          total="Rp 120.000.000" 
        />

        {/* 3. Tabel Pengeluaran */}
        <TransactionTable 
          title="Pengeluaran" 
          data={DATA_PENGELUARAN} 
          total="Rp 80.000.000" 
        />

        {/* 4. Ringkasan Pembagian Keuntungan */}
        <div className="bg-[#DCECE0] rounded-xl p-6 mt-10 max-w-2xl">
          <h3 className="text-base font-bold text-gray-800 mb-4">Ringkasan Pembagian Keuntungan</h3>
          <div className="flex flex-col gap-3">
            <InfoRow label="Laba Bersih" value="Rp 40.000.000" />
            <InfoRow label="KTH (60%)" value="Rp 24.000.000" />
            <InfoRow label="Investor (40%)" value="Rp 16.000.000" />
          </div>
        </div>

        {/* 5. Aksi (Hanya muncul jika status "Sudah Dibagikan") */}
        {isSudahDibagikan && (
          <div className="flex justify-end mt-8">
            <button className="flex items-center gap-2 px-8 py-3 bg-[#185325] text-white text-sm font-bold rounded-full hover:bg-[#123d1c] transition-colors shadow-sm active:scale-95">
              <HiOutlinePrinter className="w-5 h-5" /> Cetak Laporan
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default DetailLaporanKeuangan;
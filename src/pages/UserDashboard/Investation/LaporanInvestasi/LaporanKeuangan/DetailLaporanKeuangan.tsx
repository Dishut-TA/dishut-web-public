import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlinePrinter } from 'react-icons/hi2';
import { getLaporanKeuanganByIdAPI } from '@/services/invest.service';
import { useAuth } from '@/context/AuthContext';
import { ToastError } from '@/utils/toast';

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
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <tr key={row.id || index} className="border-b border-gray-200 text-gray-800">
                <td className="py-4 px-2 font-medium">
                  {row.tanggal || row.created_at ? new Date(row.tanggal || row.created_at).toLocaleDateString('id-ID') : '-'}
                </td>
                <td className="py-4 px-2 font-bold">{row.keterangan || row.deskripsi || '-'}</td>
                <td className="py-4 px-2 font-medium">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(row.nominal || row.amount || 0)}
                </td>
                <td className="py-4 px-2 font-medium italic text-gray-600">
                  {row.dokumen_url ? (
                    <a href={row.dokumen_url} target="_blank" rel="noopener noreferrer" className="not-italic underline hover:text-gray-800">
                      Lihat Bukti
                    </a>
                  ) : '-'}
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-b border-gray-200 text-gray-500 text-center">
              <td colSpan={4} className="py-4 px-2 italic">Belum ada rincian data.</td>
            </tr>
          )}
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
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const token = (user as any)?.token || localStorage.getItem('token') || '';
        const userId = (user as any)?.id || '';
        if (!userId || !token || !id) return;

        const response = await getLaporanKeuanganByIdAPI(token, userId, id);
        console.log("Detail Laporan Keuangan:", response);
        setData(response);
      } catch (error: any) {
        console.error(error);
        ToastError(error.message || 'Gagal memuat detail laporan keuangan');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, user]);

  const statusText = data?.status_laporan || data?.status || 'Menunggu Pembagian';
  const isSudahDibagikan = statusText.toLowerCase().includes('sudah') || statusText.toLowerCase().includes('bagi');
  const statusColor = isSudahDibagikan ? 'text-[#185325]' : 'text-orange-500';

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount || 0);
  };

  if (loading) {
    return <div className="p-10 text-center font-bold text-[#185325]">Memuat detail laporan...</div>;
  }

  if (!data) {
    return <div className="p-10 text-center font-bold text-red-500">Data laporan tidak ditemukan.</div>;
  }

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
          <InfoRow label="Nama Investasi" value={data.program?.nama_program || data.nama_program || '-'} />
          <InfoRow label="Periode" value={data.periode || (data.bulan && data.tahun ? `${data.bulan} ${data.tahun}` : '-')} />
          <InfoRow label="Status" value={statusText} valueColor={statusColor} />
          <div className="mt-2"></div>
          <InfoRow label="Total Pendapatan" value={formatRupiah(data.total_pendapatan || data.pendapatan || 0)} />
          <InfoRow label="Total Pengeluaran" value={formatRupiah(data.total_pengeluaran || data.pengeluaran || 0)} />
          <InfoRow label="Laba Bersih" value={formatRupiah(data.laba_bersih || data.keuntungan || 0)} />
        </div>

        {/* 2. Tabel Pendapatan */}
        <TransactionTable 
          title="Tabel Pendapatan" 
          data={data.rincian_pendapatan || data.pendapatan_list || []} 
          total={formatRupiah(data.total_pendapatan || data.pendapatan || 0)} 
        />

        {/* 3. Tabel Pengeluaran */}
        <TransactionTable 
          title="Pengeluaran" 
          data={data.rincian_pengeluaran || data.pengeluaran_list || []} 
          total={formatRupiah(data.total_pengeluaran || data.pengeluaran || 0)} 
        />

        {/* 4. Ringkasan Pembagian Keuntungan */}
        <div className="bg-[#DCECE0] rounded-xl p-6 mt-10 max-w-2xl">
          <h3 className="text-base font-bold text-gray-800 mb-4">Ringkasan Pembagian Keuntungan</h3>
          <div className="flex flex-col gap-3">
            <InfoRow label="Laba Bersih" value={formatRupiah(data.laba_bersih || data.keuntungan || 0)} />
            <InfoRow label="KTH (60%)" value={formatRupiah(data.pembagian_kth || ((data.laba_bersih || data.keuntungan || 0) * 0.6))} />
            <InfoRow label="Investor (40%)" value={formatRupiah(data.pembagian_investor || ((data.laba_bersih || data.keuntungan || 0) * 0.4))} />
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
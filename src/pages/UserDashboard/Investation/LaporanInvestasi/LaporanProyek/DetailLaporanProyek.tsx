import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
import { getLaporanProyekByIdAPI } from '@/services/invest.service';
import { useAuth } from '@/context/AuthContext';
import { ToastError } from '@/utils/toast';

const InfoRow = ({
  label,
  value,
  valueColor = "text-gray-800",
  isItalic = false,
  isLink = false,
  isDeskripsi = false,
}: {
  label: string;
  value: React.ReactNode;
  valueColor?: string;
  isItalic?: boolean;
  isLink?: boolean;
  isDeskripsi?: boolean;
}) => (
  <div className="grid grid-cols-[160px_20px_1fr] items-start text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-500">:</span>
    <span 
      className={`font-medium ${valueColor} ${isItalic ? 'italic text-gray-600' : ''} ${isLink ? 'underline cursor-pointer hover:text-gray-600 text-gray-800' : ''} ${isDeskripsi ? 'text-gray-500 font-normal leading-relaxed text-justify' : ''}`}
    >
      {value}
    </span>
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-base font-bold text-gray-800 mb-4 mt-8">{title}</h2>
);

const DetailLaporanProyek: React.FC = () => {
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

        const response = await getLaporanProyekByIdAPI(token, userId, id);
        console.log("Detail Laporan Proyek:", response);
        setData(response);
      } catch (error: any) {
        console.error(error);
        ToastError(error.message || 'Gagal memuat detail laporan proyek');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, user]);

  const statusText = data?.status_laporan || data?.status || 'Sedang Berjalan';
  const statusLower = statusText.toLowerCase();
  
  let statusColor = 'text-[#185325]';
  if (statusLower.includes('jalan') || statusLower.includes('proses')) {
    statusColor = 'text-orange-500';
  } else if (statusLower.includes('selesai') || statusLower.includes('diterima')) {
    statusColor = 'text-emerald-600';
  }

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
        <h1 className="text-2xl font-bold text-gray-800 mt-8 md:mt-0">Detail Laporan Proyek</h1>
      </div>

      <div className="px-4 sm:px-0">
        
        {/* 1. Informasi Laporan */}
        <h2 className="text-base font-bold text-gray-800 mb-4">Informasi Laporan</h2>
        <div className="flex flex-col gap-3">
          <InfoRow label="Nama Investasi" value={data.program?.nama_program || data.nama_program || '-'} />
          <InfoRow label="Periode Laporan" value={data.tanggal_laporan || data.created_at ? new Date(data.tanggal_laporan || data.created_at).toLocaleDateString('id-ID') : '-'} />
          <InfoRow label="Status" value={statusText} valueColor={statusColor} />
        </div>

        {/* 2. Informasi Milestone */}
        <SectionTitle title="Informasi Milestone" />
        <div className="flex flex-col gap-3">
          <InfoRow label="Nama Milestone" value={data.milestone?.judul_milestone || data.nama_milestone || '-'} />
          <InfoRow label="Batas Milestone" value={data.milestone?.target_tanggal ? new Date(data.milestone.target_tanggal).toLocaleDateString('id-ID') : '-'} />
          <InfoRow 
            label="Status" 
            value={
              <span className={`flex items-center gap-1 ${data.milestone?.status === 'Tercapai' ? 'text-emerald-600' : 'text-orange-500'}`}>
                {data.milestone?.status || '-'} {data.milestone?.status === 'Tercapai' && <span className="font-bold">✓</span>}
              </span>
            } 
          />
          <InfoRow 
            label="Deskripsi" 
            value={data.milestone?.deskripsi || data.milestone?.deskripsi || '-'} 
            isDeskripsi={true}
          />
        </div>

        {/* 3. Penggunaan Dana */}
        <SectionTitle title="Penggunaan Dana" />
        <div className="flex flex-col gap-3">
          <InfoRow label="Dana Terpakai" value={formatRupiah(data.dana_terpakai || data.penggunaan_dana || 0)} />
          <InfoRow label="Sisa Dana" value={formatRupiah(data.sisa_dana || 0)} />
        </div>

        {/* 4. Dokumen Perkembangan */}
        <SectionTitle title="Dokumen Perkembangan" />
        <div className="flex flex-col gap-3">
          {data.dokumen_pendukung_url ? (
            <a href={data.dokumen_pendukung_url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-800 font-medium underline cursor-pointer hover:text-gray-600 w-fit">
              Lihat Bukti Lampiran
            </a>
          ) : (
            <span className="text-sm text-gray-500">Tidak ada dokumen.</span>
          )}
        </div>

      </div>
    </div>
  );
};

export default DetailLaporanProyek;
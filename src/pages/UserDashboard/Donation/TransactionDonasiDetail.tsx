import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiDownload } from 'react-icons/fi';
import { ToastSuccess, ToastError } from '@/utils/toast';
import { toPng } from 'html-to-image'; 
import { jsPDF } from 'jspdf';
import CertificateTemplate from '@/components/CertificateTemplate';
import { mockDonasi } from './TransactionHistoryDonasi';
import type { TransactionData } from '@/utils/interface';

const TransactionDonasiDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<TransactionData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const matchData = mockDonasi.find(item => item.id.replace('#', '') === id);
      if (matchData) {
        setData(matchData);
      }
    }
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-semibold">
        Data transaksi tidak ditemukan atau sedang memuat...
      </div>
    );
  }

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: 1123, 
        height: 794,
      });

      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210);
      pdf.save(`Sertifikat_${data.userName?.replace(/\s+/g, '_')}.pdf`);
      ToastSuccess("Sertifikat berhasil diunduh!");
    } catch (error) {
      ToastError("Gagal mengunduh sertifikat.");
    } finally {
      setIsDownloading(false);
    }
  };

  const jumlahBibit = Math.floor(data.amount / 20000);

  return (
    <div className="min-h-screen animate-[fadeIn_0.4s_ease-out]">
      <CertificateTemplate
        ref={certificateRef}
        nama={data.userName || "Hamba Allah"}
        lokasi={"Jl. Pandanwangi no. 90 Rt 007/Rw. 019 Desa Cinunuk Kec. Cileunyi Kab. Bandung"}
        jumlahBibit={jumlahBibit}
        tanggal={"Bandung, 05 Juli 2026"} 
      />

      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex cursor-pointer items-center gap-1 text-primary font-bold text-sm hover:text-tertiary transition-all"
          >
            <FiChevronLeft className="text-lg" /> Kembali
          </button>

          {data.status === 'Sudah Dibayar' && (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex cursor-pointer items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm disabled:opacity-50"
            >
              {isDownloading ? "Memproses..." : "Download PDF"} <FiDownload size={16} />
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm border border-gray-100/50">
          <h1 className="text-2xl md:text-[32px] font-bold text-primary tracking-tight mb-6">
            Order #{id}
          </h1>
          <div className="grid grid-cols-[120px_10px_1fr] md:grid-cols-[150px_10px_1fr] gap-y-3 text-sm md:text-[15px] text-primary font-medium mb-10">
            <div>Tanggal Donasi</div>
            <div>:</div>
            <div>{data.date}, pukul 09.40</div> 

            <div>Program</div>
            <div>:</div>
            <div>{data.activityName}</div>

            <div>Jenis Bibit</div>
            <div>:</div>
            <div>-</div>

            <div>Status</div>
            <div>:</div>
            <div className="font-bold text-primary">{data.status}</div>
          </div>

          <hr className="border-[#98C98A]/50 mb-6" />

          <h2 className="text-xl md:text-2xl font-bold text-primary mb-5">
            {data.activityName}
          </h2>

          <div className="flex justify-between items-center text-sm md:text-[15px] text-primary font-medium mb-6">
            <span>Jumlah Donasi</span>
            <span>{formatRupiah(data.amount)}</span>
          </div>

          <hr className="border-[#98C98A]/50 mb-6" />

          <div className="flex justify-between items-center text-sm md:text-[15px] text-primary font-medium mb-3">
            <span>Tanggal Pembayaran</span>
            <span>{data.date}, pukul 09.48</span>
          </div>

          <div className="flex justify-between items-center text-sm md:text-[15px] text-primary font-medium mb-8">
            <span>Metode Pembayaran</span>
            <span>{data.paymentMethod}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-primary font-bold text-sm md:text-base">Total</span>
            <span className="text-primary font-bold text-2xl md:text-[28px]">
              {formatRupiah(data.amount)}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransactionDonasiDetail;
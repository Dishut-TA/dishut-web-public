import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiDownload } from 'react-icons/fi';
import { ToastSuccess, ToastError } from '@/utils/toast';
import { mockInvestasi } from '../../Investation/RiwayatTransaksiInvestasi/TransactionHistoryInvestasi';
import type { TransactionData } from '@/utils/interface';

const TransactionInvestasiDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<TransactionData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (id) {
      const matchData = mockInvestasi.find(item => item.id.replace('#', '') === id);
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
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        ToastSuccess("Bukti Transaksi Investasi berhasil diunduh!");
      } catch (error) {
        ToastError("Gagal mengunduh bukti transaksi.");
      } finally {
        setIsDownloading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen animate-[fadeIn_0.4s_ease-out]">
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
            <div>Tanggal</div>
            <div>:</div>
            <div>{data.date}, pukul 09.40</div> 

            <div>Untuk</div>
            <div>:</div>
            <div>{data.userName}</div>

            <div>Status</div>
            <div>:</div>
            <div className={`font-bold ${data.status === 'Menunggu Konfirmasi' ? 'text-orange-500' : 'text-primary'}`}>
              {data.status}
            </div>
          </div>

          <hr className="border-[#98C98A]/50 mb-6" />

          <h2 className="text-xl md:text-2xl font-bold text-primary mb-5">
            {data.activityName}
          </h2>

          <div className="flex justify-between items-center text-sm md:text-[15px] text-primary font-medium mb-6">
            <span>Jumlah Investasi</span>
            <span>{formatRupiah(data.amount)}</span>
          </div>

          <hr className="border-[#98C98A]/50 mb-6" />

          <div className="flex justify-between items-center text-sm md:text-[15px] text-primary font-medium mb-8">
            <span>Metode Pembayaran</span>
            <span>{data.paymentMethod || '-'}</span>
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

export default TransactionInvestasiDetail;
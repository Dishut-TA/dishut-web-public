import React, { useState, useRef } from 'react';
import { 
  FiArrowLeft, FiDownload, FiCheckCircle, FiUser, 
  FiMail, FiPhone, FiActivity, FiCalendar, FiCreditCard 
} from 'react-icons/fi';
import Button from '@/components/Button';
import type { TransactionData } from '@/utils/interface';
import { ToastSuccess, ToastError } from '@/utils/toast';
import { toPng } from 'html-to-image'; 
import { jsPDF } from 'jspdf';
import CertificateTemplate from '@/components/CertificateTemplate';

interface Props {
  data: TransactionData;
  onBack: () => void;
}

const TransactionDonasiDetail: React.FC<Props> = ({ data, onBack }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

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

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210);
      
      const safeName = (data.userName || 'Donatur').replace(/\s+/g, '_');
      pdf.save(`Sertifikat_${safeName}.pdf`);
      
      ToastSuccess("Sertifikat berhasil diunduh!");
    } catch (error) {
      ToastError("Gagal mengunduh sertifikat.");
      console.error("Error detail:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const jumlahBibit = Math.floor(data.amount / 20000);

  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <CertificateTemplate
        ref={certificateRef}
        nama={data.userName || "Hamba Allah"}
        lokasi={"Jl. Pandanwangi no. 90 Rt 007/Rw. 019 Desa Cinunuk Kec. Cileunyi Kab. Bandung"}
        jumlahBibit={jumlahBibit}
        tanggal={"Bandung, 05 Juli 2026"} 
      />

      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
        <button 
          onClick={onBack} 
          className="p-2.5 bg-white border border-gray-200 hover:bg-gray-50 hover:text-primary rounded-xl transition-all duration-300 shadow-sm active:scale-95 text-gray-500"
        >
          <FiArrowLeft size={22} />
        </button>
        <div>
          <h2 className="text-2xl font-extrabold text-primary">Detail Donasi</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">ID: <span className="text-primary">{data.id || `TRX-${Math.floor(Math.random() * 10000)}`}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-secondary rounded-full"></span> Informasi Donatur
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                <FiUser size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">Nama Lengkap</p>
                <p className="font-bold text-primary text-base">{data.userName || '-'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                <FiMail size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">Email</p>
                <p className="font-bold text-primary text-base">{data.userEmail || '-'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                <FiPhone size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">No. Telepon</p>
                <p className="font-bold text-primary text-base">{data.userPhone || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-secondary rounded-full"></span> Detail Kegiatan
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-[#2E7D32] shrink-0">
                <FiActivity size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">Nama Kegiatan</p>
                <p className="font-bold text-primary text-base line-clamp-1">{data.activityName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-[#2E7D32] shrink-0">
                <FiCalendar size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">Tanggal Donasi</p>
                <p className="font-bold text-primary text-base">{data.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-[#2E7D32] shrink-0">
                <FiCreditCard size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">Metode Pembayaran</p>
                <p className="font-bold text-primary text-base">{data.paymentMethod || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 bg-linear-to-br from-primary to-[#2E7D32] p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <p className="text-sm font-medium text-white/80 mb-2">Total Donasi</p>
          <p className="text-3xl lg:text-4xl font-extrabold tracking-tight">{formatRupiah(data.amount)}</p>
        </div>

        <div className="md:w-2/3 bg-white p-6 md:p-8 rounded-3xl border border-[#98C98A]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {data.status === 'Sudah Dibayar' && (
            <div className="absolute top-0 left-0 w-2 h-full bg-[#2E7D32]"></div>
          )}
          
          <div className="flex items-center gap-5 w-full sm:w-auto">
            <div className="w-14 h-14 rounded-full bg-[#DCECE0] flex items-center justify-center text-[#2E7D32]">
              <FiCheckCircle size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Status Pembayaran</p>
              <p className="text-xl font-bold text-[#2E7D32]">Berhasil</p>
            </div>
          </div>

          {data.status === 'Sudah Dibayar' && (
            <Button
              label={isDownloading ? "Memproses PDF..." : "Unduh Sertifikat"}
              variant="primary"
              leftIcon={<FiDownload size={20} />}
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDonasiDetail;
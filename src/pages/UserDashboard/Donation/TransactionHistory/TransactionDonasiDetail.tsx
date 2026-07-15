import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiDownload, FiCheck } from 'react-icons/fi';
import { ToastSuccess, ToastError } from '@/utils/toast';
import { toPng } from 'html-to-image'; 
import { jsPDF } from 'jspdf';
import CertificateTemplate from '@/components/CertificateTemplate';
import { mockDonasiList } from './TransactionHistoryDonasi';
import type { TransactionDonasiData } from '@/utils/interface';
import { PiPlant } from 'react-icons/pi';

const JourneyStepper = ({ currentStatus }: { currentStatus: string }) => {
  const steps = ['Menunggu Verifikasi', 'Terkumpul', 'Disalurkan', 'Terealisasi'];
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="mb-2">
      <h3 className="text-xl font-bold text-primary mb-8">Status Perjalanan Bibit</h3>
      <div className="flex items-center justify-between relative px-2">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          return (
            <div key={step} className="flex flex-col items-center bg-white px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-2 transition-colors
                ${isCompleted ? 'bg-tertiary' : 'bg-primary'}`}>
                {isCompleted ? <FiCheck size={18} /> : index + 1}
              </div>
              <span className={`text-xs md:text-sm font-semibold max-w-22.5 text-center leading-tight ${isCompleted ? 'text-primary' : 'text-gray-400'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TransactionDonasiDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<TransactionDonasiData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const matchData = mockDonasiList.find(item => item.id === id || item.id.replace('#', '') === id);
      if (matchData) setData(matchData);
    }
  }, [id]);

  if (!data) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-semibold">Data transaksi tidak ditemukan...</div>;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount).replace('Rp', 'Rp. ');
  };

  const totalHarga = data.amount;

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(certificateRef.current, { quality: 1, pixelRatio: 2, backgroundColor: '#ffffff', width: 1123, height: 794 });
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210);
      pdf.save(`Sertifikat_${data.userName?.replace(/\s+/g, '_')}_${data.id}.pdf`);
      ToastSuccess("Sertifikat berhasil diunduh!");
    } catch {
      ToastError("Gagal mengunduh sertifikat.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 animate-[fadeIn_0.4s_ease-out]">
      
      <CertificateTemplate
        ref={certificateRef}
        nama={data.userName.toUpperCase() || "HAMBA ALLAH"} 
        lokasi={data.lahanProgram}
        jumlahBibit={data.jumlah}
        tanggal={data.tanggal} 
      />

      <div className="mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-primary font-bold text-sm hover:text-tertiary transition-all">
            <FiChevronLeft className="text-lg" /> Kembali
          </button>
          
            <button onClick={handleDownload} disabled={isDownloading} className="flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm">
              {isDownloading ? "Memproses..." : "Download Sertifikat"} <FiDownload size={16} />
            </button>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
          <h1 className="text-2xl md:text-[32px] font-bold text-primary tracking-tight mb-6">
            Order {data.id.startsWith('#') ? data.id : `#${data.id}`}
          </h1>
          
          <div className="grid grid-cols-[130px_10px_1fr] md:grid-cols-[150px_10px_1fr] gap-y-2.5 text-sm md:text-[15px] text-[#4F6352] mb-8">
            <div>Tanggal Donasi</div><div>:</div><div>{data.tanggal}, pukul 09.40</div> 
            <div>Program</div><div>:</div><div>{data.lahanProgram}</div>
            <div>Jenis Bibit</div><div>:</div><div>{data.jenisBibit}</div>
            <div>Status</div><div>:</div><div className="font-bold text-primary">{data.status}</div>
          </div>

          <hr className="border-primary mb-6" />

          <h2 className="text-xl md:text-2xl font-bold text-primary mb-5">
            {data.lahanProgram}
          </h2>

          <div className="flex justify-between items-center text-sm md:text-[15px] text-[#4F6352] mb-6">
            <span>Jumlah Donasi ({data.jumlah} Bibit)</span>
            <span>{formatRupiah(totalHarga)}</span>
          </div>

          <hr className="border-primary mb-6" />

          <div className="flex justify-between items-center text-sm md:text-[15px] text-[#4F6352] mb-3">
            <span>Tanggal Pembayaran</span>
            <span>{data.tanggal}, pukul 09.48</span>
          </div>

          <div className="flex justify-between items-center text-sm md:text-[15px] text-[#4F6352] mb-8">
            <span>Metode Pembayaran</span>
            <span>{data.paymentMethod}</span>
          </div>

          <div className="flex justify-between items-center mb-10">
            <span className="text-primary font-bold text-sm md:text-base">Total</span>
            <span className="text-primary font-bold text-2xl md:text-[28px]">
              {formatRupiah(totalHarga)}
            </span>
          </div>

          <hr className="border-primary mb-6" />

          <JourneyStepper currentStatus={data.status} />

          <hr className="border-gray-100 my-10" />

          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <PiPlant className="text-2xl" />
            Transparansi & Bukti Penanaman
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-primary font-semibold mb-3">Foto Realisasi di Lapangan</p>
              {data.status === 'Terealisasi' && data.fotoRealisasi ? (
                <div className="space-y-3">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm">
                    <img src={data.fotoRealisasi} alt="Bukti Tanam" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-black/50 p-2 flex justify-between text-white text-xs font-medium backdrop-blur-sm">
                      <span>Lat: {data.lat}, Long: {data.long}</span>
                      <span>{data.tanggal}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600">
                    Bibit Anda telah di tanam di <span className="font-bold text-primary">{data.lahanProgram}</span> oleh Kelompok Tani Hutan setempat.
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200">
                  Foto bukti belum tersedia
                </div>
              )}
            </div>

            <div>
              <p className="text-primary font-semibold mb-3">Rincian Alokasi Dana Pribadi</p>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
                <div className="flex justify-between text-sm text-primary">
                  <span className="w-2/3">Pembelian Bibit {data.jenisBibit} ({data.jumlah}x)</span>
                  <span className="font-medium">{formatRupiah(totalHarga)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-sm font-bold text-primary">
                  <span>Total Donasi ({data.jumlah} Bibit)</span>
                  <span>{formatRupiah(totalHarga)}</span>
                </div>
                <p className="text-xs text-[#10B981] italic mt-4 leading-relaxed">
                  *100% donasi dialokasikan untuk program tanpa potongan platform.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransactionDonasiDetail;
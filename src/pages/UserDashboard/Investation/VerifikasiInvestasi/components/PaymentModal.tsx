import React, { useState } from 'react';
import { HiX, HiOutlineDownload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { ToastSuccess } from '@/utils/toast';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    transactionData: {
        id: string;
        amount: number;
    } | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, transactionData }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'QR' | 'VA'>('QR');

    if (!isOpen || !transactionData) return null;

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount).replace('Rp', 'Rp.');
    };

    const handleDownloadQR = () => {
        ToastSuccess("QR Code berhasil diunduh");
    };

    const handleCheckStatus = () => {
        // Aksi pas tombol "Cek Status Pembayaran" diklik
        // Bisa redirect ke halaman detail histori investasi
        onClose();
        navigate(`/investasi/history/${transactionData.id}`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 animate-[zoomIn_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 border border-gray-300 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                >
                    <HiX size={20} />
                </button>

                <h2 className="text-2xl font-bold text-primary text-center mb-8">
                    Pembayaran
                </h2>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-xl text-primary font-medium flex items-center gap-2">
                                Order ID <span className="font-bold">#91902478hwdo8ahd</span>
                            </h3>
                        </div>

                        <div className="text-sm font-medium text-primary">
                            <span className="text-gray-500">Selesaikan pembayaran dalam</span> <span className="font-bold ml-2">00.15.39</span>
                        </div>

                        <p className="text-sm text-primary font-medium">
                            Lakukan pembayaran untuk menyelesaikan pembayaran Investasi Anda!
                        </p>

                        <div>
                            <p className="text-sm text-primary font-medium mb-1">Total Bayar</p>
                            <p className="text-3xl font-bold text-primary tracking-tight">
                                {formatRupiah(transactionData.amount)}
                            </p>
                        </div>

                        <div className="pt-4">
                            <h4 className="text-sm font-bold text-primary mb-2">Panduan Pembayaran</h4>
                            <ol className="list-decimal pl-4 space-y-1.5 text-sm text-primary font-medium">
                                <li>Buka aplikasi pembayaran QRIS yang mendukung</li>
                                <li>Unduh atau pindai atau download QRIS di layar kamu</li>
                                <li>Konfirmasi pembayaran di aplikasi</li>
                                <li>Pembayaran Berhasil</li>
                            </ol>
                        </div>
                    </div>

                    <div className="w-full lg:w-87.5 flex flex-col items-center shrink-0 lg:pl-10">
                        <div className="flex w-full rounded-full border border-gray-200 p-1 mb-6">
                            <button
                                onClick={() => setActiveTab('QR')}
                                className={`flex-1 cursor-pointer py-2 text-sm font-bold rounded-full transition-all ${activeTab === 'QR' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                QR
                            </button>
                            <button
                                onClick={() => setActiveTab('VA')}
                                className={`flex-1 cursor-pointer py-2 text-sm font-bold rounded-full transition-all ${activeTab === 'VA' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                VA
                            </button>
                        </div>

                        <p className="text-sm font-medium text-primary mb-4 text-center">
                            Pindai atau Download {activeTab}
                        </p>

                        <div className="w-full aspect-square flex items-center justify-center bg-white mb-6">
                            {activeTab === 'QR' ? (
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=Pembayaran_${transactionData.id}`}
                                    alt="QR Code"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-2">Nomor Virtual Account</p>
                                    <p className="text-xl font-bold tracking-widest text-primary">8890 2341 5567</p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleDownloadQR}
                            className="w-full py-3 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                        >
                            Download {activeTab} <HiOutlineDownload size={18} />
                        </button>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        onClick={handleCheckStatus}
                        className="w-full py-4 rounded-full bg-primary text-white font-bold hover:bg-[#144a18] transition-colors shadow-md"
                    >
                        Cek Status Pembayaran
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PaymentModal;
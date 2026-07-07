import { useState } from 'react';
import { HiEye, HiOutlineArrowRight, HiEyeSlash, HiOutlinePlusCircle } from 'react-icons/hi2';
import TransactionItem from './components/TransactionItem';
import { HiOutlineLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const mockTransactions = [
    { id: 1, type: 'Transfer Bank', date: '10/09/2024 - 10.00', amount: -1000000, bank: 'Bank BCA' },
    { id: 2, type: 'Isi Saldo', date: '01/01/2024 - 19.00', amount: 8000000, bank: 'Bank BCA' },
    { id: 3, type: 'Isi Saldo', date: '01/01/2024 - 19.00', amount: 1000000, bank: 'Bank BCA' },
    { id: 4, type: 'Transfer Bank', date: '10/09/2024 - 10.00', amount: -15000000, bank: 'Bank BCA' },
];

const SaldoKeuntungan = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const totalBalance = 3750000;

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
        }).format(amount).replace('Rp', 'Rp.');
    };

    return (
        <div className="max-w-2xl mx-auto animate-[fadeIn_0.3s_ease-out]">
            <div className="text-center mb-8">
                <h2 className="text-primary font-bold text-2xl mb-2">Saldo Keuntungan</h2>
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-2xl font-medium text-tertiary tracking-tight">
                        {isVisible ? "Rp. *******" : formatRupiah(totalBalance)}
                    </h1>
                    <button onClick={() => setIsVisible(!isVisible)} className="text-tertiary cursor-pointer hover:text-primary transition-colors">
                        {isVisible ? <HiEye size={20} /> : <HiEyeSlash size={20} />}
                    </button>
                </div>
            </div>

            <div className="flex justify-center gap-12 mb-10">
                <button className="flex cursor-pointer flex-col items-center text-primary hover:text-tertiary transition-colors" onClick={() => navigate('/saldo/isi-saldo')}>
                    <div className="w-12 h-12 flex items-center justify-center">
                        <HiOutlinePlusCircle size={24} />
                    </div>
                    <span className="text-sm font-semibold">Isi Saldo</span>
                </button>
                <button className="flex cursor-pointer flex-col items-center text-primary hover:text-tertiary transition-colors" onClick={() => navigate('/saldo/tarik-saldo')}>
                    <div className="w-12 h-12 flex items-center justify-center">
                        <HiOutlineLogout size={24} />
                    </div>
                    <span className="text-sm font-semibold">Tarik Saldo</span>
                </button>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-primary font-bold text-lg">Riwayat Transaksi</h3>
                    <button
                        onClick={() => navigate('/saldo/riwayat-transaksi')}
                        className="text-primary cursor-pointer rounded-full border-primary border py-1 px-4 text-sm font-semibold flex items-center gap-1 hover:text-tertiary hover:border-tertiary transition-colors"
                    >
                        Lihat Semua <HiOutlineArrowRight size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    {mockTransactions.map((tx) => (
                        <TransactionItem key={tx.id} transaction={tx} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SaldoKeuntungan;
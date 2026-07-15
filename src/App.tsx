import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import ProtectedRoute from './components/route/ProtectedRoute'; 

import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout'; 

import Register from './pages/Authentication/Register';
import Login from './pages/Authentication/Login';
import ForgotPassword from './pages/Authentication/ForgotPassword';

import Home from './pages/Home';
import Pemetaan from './pages/Pemetaan';
import Donation from './pages/Donation';
import DonasiExplore from './pages/Donation/sections/DonasiExplore';
import DonasiDetail from './pages/Donation/sections/DonasiDetail';
import Investation from './pages/Investation';
import InvestmentExplore from './pages/Investation/sections/InvestmentExplore';
import InvestmentDetail from './pages/Investation/sections/InvestmentDetail';
import NotFound from './pages/NotFound';

import Dashboard from './pages/UserDashboard/Dashboard'; 
import Profile from './pages/UserDashboard/Profile';
import TransactionHistoryDonasi from './pages/UserDashboard/Donation/TransactionHistory/TransactionHistoryDonasi';
import TransactionDonasiDetail from './pages/UserDashboard/Donation/TransactionHistory/TransactionDonasiDetail';
import TransactionHistoryInvestasi from './pages/UserDashboard/Investation/RiwayatTransaksiInvestasi/TransactionHistoryInvestasi';
import TransactionInvestasiDetail from './pages/UserDashboard/TransactionHistory/sections/TransactionInvestasiDetail';
import VerifikasiInvestasi from './pages/UserDashboard/Investation/VerifikasiInvestasi';
import DataInvestasi from './pages/UserDashboard/Investation/DataInvestasi';
import DetailInvestasi from './pages/UserDashboard/Investation/DataInvestasi/DetailInvestasi';
import SaldoKeuntungan from './pages/UserDashboard/SaldoKeuntungan';
import IsiSaldo from './pages/UserDashboard/SaldoKeuntungan/IsiSaldo';
import TarikSaldo from './pages/UserDashboard/SaldoKeuntungan/TarikSaldo';
import RiwayatTransaksi from './pages/UserDashboard/SaldoKeuntungan/RiwayatTransaksi';
import LaporanKeuangan from './pages/UserDashboard/Investation/LaporanInvestasi/LaporanKeuangan';
import BiayaPendapatan from './pages/UserDashboard/Investation/LaporanInvestasi/BiayaPendapatan';
import BiayaPengeluaran from './pages/UserDashboard/Investation/LaporanInvestasi/BiayaPengeluaran';
import DashboardDonation from './pages/UserDashboard/Donation/DashboardDonation/DashboardDonation';

function App() {
  return (
    <Router>
      <Routes>

        {/* START OF PUBLIC ROUTE */}
        {/* Layout Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Layout Main */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pemetaan" element={<Pemetaan />} />
          <Route path="/donasi" element={<Donation />} />
          <Route path="/donasi/explore" element={<DonasiExplore />} />
          <Route path="/donasi/detail/:id" element={<DonasiDetail />} />
          <Route path="/investasi" element={<Investation />} />
          <Route path="/investasi/explore" element={<InvestmentExplore />} />
          <Route path="/investasi/detail/:id" element={<InvestmentDetail />} />
        </Route>

        {/* START OF PROTECTED ROUTE */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/donasi/dashboard" element={<DashboardDonation />} />
            <Route path="/donasi/riwayat-transaksi" element={<TransactionHistoryDonasi />} />
            <Route path="/donasi/riwayat-transaksi/:id" element={<TransactionDonasiDetail />} />
            <Route path="/investasi/data" element={<DataInvestasi />} />
            <Route path="/investasi/data/detail/:id" element={<DetailInvestasi />} />
            <Route path="/investasi/riwayat-transaksi" element={<TransactionHistoryInvestasi />} />
            <Route path="/investasi/riwayat-transaksi/:id" element={<TransactionInvestasiDetail />} />
            <Route path="/investasi/verifikasi" element={<VerifikasiInvestasi />} />
            <Route path="/saldo" element={<SaldoKeuntungan />} />
            <Route path="/saldo/isi-saldo" element={<IsiSaldo />} />
            <Route path="/saldo/tarik-saldo" element={<TarikSaldo />} />
            <Route path="/saldo/riwayat-transaksi" element={<RiwayatTransaksi />} />
            <Route path="/laporan-investasi/keuangan" element={<LaporanKeuangan />} />
            <Route path="/laporan-investasi/pendapatan" element={<BiayaPendapatan />} />
            <Route path="/laporan-investasi/pengeluaran" element={<BiayaPengeluaran />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
        
      </Routes>
      <Toaster position="top-center" richColors />
    </Router>
  );
}

export default App;
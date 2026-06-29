import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Authentication/Register';
import Login from './pages/Authentication/Login';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import Home from './pages/Home';

import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import Donation from './pages/Donation';
import DonasiExplore from './pages/Donation/sections/DonasiExplore';
import DonasiDetail from './pages/Donation/sections/DonasiDetail';
import Investation from './pages/Investation';
import InvestmentExplore from './pages/Investation/sections/InvestmentExplore';
import Pemetaan from './pages/Pemetaan';
import InvestmentDetail from './pages/Investation/sections/InvestmentDetail';
import { Toaster } from 'sonner';
import TransactionHistory from './pages/TransactionHistory';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pemetaan" element={<Pemetaan />} />
          <Route path="/donasi" element={<Donation />} />
          <Route path="/donasi/explore" element={<DonasiExplore />} />
          <Route path="/donasi/detail/:id" element={<DonasiDetail />} />
          <Route path="/investasi" element={<Investation />} />
          <Route path="/investasi/explore" element={<InvestmentExplore />} />
          <Route path="/investasi/detail/:id" element={<InvestmentDetail />} />
          <Route path="/riwayat-transaksi" element={<TransactionHistory />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </Router>
  );
}

export default App;
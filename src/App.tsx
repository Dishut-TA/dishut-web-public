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
import Pemetaan from './pages/Pemetaan';

function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH (tanpa navbar) */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* MAIN APP (pakai navbar) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pemetaan" element={<Pemetaan />} />
          <Route path="/donasi" element={<Donation />} />
          <Route path="/donasi/explore" element={<DonasiExplore />} />
          <Route path="/donasi/detail/:id" element={<DonasiDetail />} />
        </Route>

        {/* 404 Page */}

      </Routes>
    </Router>
  );
}

export default App;
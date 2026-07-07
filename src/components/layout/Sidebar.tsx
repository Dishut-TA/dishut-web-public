import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineHome, HiOutlineLogout, HiArrowLeft, HiX, HiChevronDown, HiChevronUp,
  HiOutlineClock, HiOutlineDocumentReport, HiOutlineChartPie
} from "react-icons/hi";
import { HiOutlineBriefcase, HiOutlineGift, HiOutlineWallet } from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/services/auth.service";
import { ToastError, ToastSuccess } from "@/utils/toast";
import { AlertConfirm } from "@/utils/alert";

interface SidebarProps { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState({ donasi: false, investasi: false });

  const toggleDropdown = (key: 'donasi' | 'investasi') => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const isConfirmed = await AlertConfirm(
      "Keluar Akun",
      "Apakah Anda yakin ingin keluar dari akun ini?",
      "Ya, Keluar",
      "Batal"
    );

    if (!isConfirmed) return;

    try {
      await logoutUser();
      logout();
      ToastSuccess("Berhasil logout");
      navigate("/");
    } catch (error) {
      ToastError("Gagal logout, silakan coba lagi");
    }
  };

  const NavItem = ({ label, path, icon }: any) => (
    <NavLink 
      to={path} 
      onClick={() => setIsOpen(false)} 
      className={({ isActive }) => 
        `flex items-center cursor-pointer gap-3 px-4 py-3 text-sm transition-all ${
          isActive 
            ? "font-bold text-tertiary"
            : "text-primary font-semibold hover:text-tertiary"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  return (
    <aside className={`fixed inset-y-0 left-0 bg-customWhite w-64 z-50 flex flex-col transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="h-20 flex items-center justify-between px-6">
        <span className="font-bold text-2xl text-primary cursor-pointer" onClick={() => navigate("/")}>LOGO</span>
        <button className="md:hidden" onClick={() => setIsOpen(false)}><HiX size={24} /></button>
      </div>

      <div className="flex-1 py-4 px-4 space-y-1 overflow-y-auto">
        <NavItem label="Dashboard" path="/dashboard" icon={<HiOutlineHome size={20} />} />
        <div>
          <button onClick={() => toggleDropdown('donasi')} className="w-full cursor-pointer flex items-center justify-between px-4 py-3 text-sm font-semibold text-primary hover:text-tertiary">
            <span className="flex items-center gap-3"><HiOutlineGift size={20} /> Donasi</span>
            {openDropdowns.donasi ? <HiChevronUp /> : <HiChevronDown />}
          </button>
          {openDropdowns.donasi && <div className="pl-6"><NavItem label="Riwayat Transaksi" path="/riwayat-transaksi" icon={<HiOutlineClock size={18} />} /></div>}
        </div>

        <div>
          <button onClick={() => toggleDropdown('investasi')} className="w-full cursor-pointer flex items-center justify-between px-4 py-3 text-sm font-semibold text-primary hover:text-tertiary">
            <span className="flex items-center gap-3"><HiOutlineBriefcase size={20} /> Investasi</span>
            {openDropdowns.investasi ? <HiChevronUp /> : <HiChevronDown />}
          </button>
          {openDropdowns.investasi && (
            <div className="pl-6 space-y-1">
              <NavItem label="Data Investasi" path="/investasi/data" icon={<HiOutlineChartPie size={18} />} />
              <NavItem label="Verifikasi Investasi" path="/investasi/verifikasi" icon={<HiOutlineClock size={18} />} />
              <NavItem label="Riwayat Transaksi" path="/investasi/history" icon={<HiOutlineClock size={18} />} />
            </div>
          )}
        </div>

        <NavItem label="Saldo Keuntungan" path="/saldo" icon={<HiOutlineWallet size={20} />} />
        <NavItem label="Laporan Keuangan" path="/laporan" icon={<HiOutlineDocumentReport size={20} />} />
        <NavItem label="Biaya Pendapatan" path="/pendapatan" icon={<HiOutlineWallet size={20} />} />
        <NavItem label="Biaya Pengeluaran" path="/pengeluaran" icon={<HiOutlineWallet size={20} />} />
      </div>

      <div className="p-4 space-y-3">
        <button
          onClick={() => navigate("/")}
          className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-primary transition-colors hover:text-tertiary"
        >
          <HiArrowLeft size={20} />
          <span>Kembali ke Beranda</span>
        </button>

        <div
          onClick={() => navigate("/profile")}
          className="flex items-center justify-between px-4 py-3 transition-colors hover:text-tertiary cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {user?.nama_pengguna?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-primary/60">Halo,</p>
              <p className="font-semibold text-primary hover:text-tertiary">{user?.nama_pengguna}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl cursor-pointer p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            title="Logout"
          >
            <HiOutlineLogout size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
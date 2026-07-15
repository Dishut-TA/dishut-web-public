import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineHome, HiOutlineLogout, HiArrowLeft, HiX, HiChevronDown,
  HiOutlineClock, HiOutlineDocumentReport, HiOutlineChartPie
} from "react-icons/hi";
import { HiOutlineBriefcase, HiOutlineGift, HiOutlineShieldCheck, HiOutlineWallet } from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/services/auth.service";
import { ToastError, ToastSuccess } from "@/utils/toast";
import { AlertConfirm } from "@/utils/alert";

interface SidebarProps { 
  isOpen: boolean; 
  setIsOpen: (isOpen: boolean) => void; 
}

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

  const NavItem = ({ label, path, icon }: { label: string, path: string, icon: React.ReactNode }) => (
    <NavLink 
      to={path} 
      onClick={() => setIsOpen(false)} 
      className={({ isActive }) => 
        `flex items-center cursor-pointer gap-3 px-4 py-3 text-sm transition-all duration-200 ${
          isActive 
            ? "font-bold text-tertiary"
            : "text-primary font-semibold hover:text-tertiary hover:bg-gray-50/50 rounded-xl"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 bg-customWhite w-64 z-50 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        <div className="h-20 shrink-0 flex items-center justify-between px-6 border-b border-gray-100/50">
          <span 
            className="font-extrabold text-2xl text-primary tracking-tight cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => navigate("/")}
          >
            LOGO
          </span>
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer" 
            onClick={() => setIsOpen(false)}
          >
            <HiX size={24} />
          </button>
        </div>

        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          <NavItem label="Dashboard" path="/dashboard" icon={<HiOutlineHome size={20} />} />
          
          <div className="flex flex-col">
            <button 
              onClick={() => toggleDropdown('donasi')} 
              className="w-full cursor-pointer flex items-center justify-between px-4 py-3 text-sm font-semibold text-primary hover:text-tertiary hover:bg-gray-50/50 rounded-xl transition-all duration-200"
            >
              <span className="flex items-center gap-3"><HiOutlineGift size={20} /> Donasi</span>
              <HiChevronDown className={`transition-transform duration-300 ${openDropdowns.donasi ? "rotate-180" : ""}`} />
            </button>
            
            <div className={`grid transition-all duration-300 ease-in-out ${openDropdowns.donasi ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden pl-6">
                <NavItem label="Dashboard Donasi" path="/donasi/dashboard" icon={<HiOutlineHome size={18} />} />
                <NavItem label="Riwayat Transaksi" path="/donasi/riwayat-transaksi" icon={<HiOutlineClock size={18} />} />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <button 
              onClick={() => toggleDropdown('investasi')} 
              className="w-full cursor-pointer flex items-center justify-between px-4 py-3 text-sm font-semibold text-primary hover:text-tertiary hover:bg-gray-50/50 rounded-xl transition-all duration-200"
            >
              <span className="flex items-center gap-3"><HiOutlineBriefcase size={20} /> Investasi</span>
              <HiChevronDown className={`transition-transform duration-300 ${openDropdowns.investasi ? "rotate-180" : ""}`} />
            </button>
            
            <div className={`grid transition-all duration-300 ease-in-out ${openDropdowns.investasi ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden pl-6 space-y-1">
                <NavItem label="Data Investasi" path="/investasi/data" icon={<HiOutlineChartPie size={18} />} />
                <NavItem label="Verifikasi Investasi" path="/investasi/verifikasi" icon={<HiOutlineShieldCheck size={18} />} />
                <NavItem label="Riwayat Transaksi" path="/investasi/riwayat-transaksi" icon={<HiOutlineClock size={18} />} />
              </div>
            </div>
          </div>

          <NavItem label="Saldo Keuntungan" path="/saldo" icon={<HiOutlineWallet size={20} />} />
          <NavItem label="Laporan Keuangan" path="/laporan-investasi/keuangan" icon={<HiOutlineDocumentReport size={20} />} />
          <NavItem label="Biaya Pendapatan" path="/laporan-investasi/pendapatan" icon={<HiOutlineWallet size={20} />} />
          <NavItem label="Biaya Pengeluaran" path="/laporan-investasi/pengeluaran" icon={<HiOutlineWallet size={20} />} />
        </div>

        <div className="p-4 space-y-3 shrink-0 bg-customWhite">
          <button
            onClick={() => navigate("/")}
            className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-primary transition-colors hover:text-tertiary hover:bg-gray-50/50"
          >
            <HiArrowLeft size={20} />
            <span>Kembali ke Beranda</span>
          </button>

          <div
            onClick={() => navigate("/profile")}
            className="flex items-center justify-between px-3 py-3 rounded-2xl transition-all hover:bg-gray-50/80 cursor-pointer group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-sm">
                {user?.nama_pengguna?.charAt(0).toUpperCase()}
              </div>
              <div className="truncate">
                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Akun Saya</p>
                <p className="font-bold text-sm text-primary group-hover:text-tertiary transition-colors truncate">
                  {user?.nama_pengguna || "User"}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="rounded-xl shrink-0 p-2.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
              title="Keluar"
            >
              <HiOutlineLogout size={20} />
            </button>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
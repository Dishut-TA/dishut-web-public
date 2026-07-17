import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import Button from "@/components/Button";
import { logoutUser } from "@/services/auth.service";
import { ToastError, ToastSuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";
import { AlertConfirm } from "@/utils/alert";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";

export const menus = [
  { label: "Beranda", path: "/" },
  { label: "Pemetaan", path: "/pemetaan" },
  { label: "Donasi", path: "/donasi" },
  { label: "Investasi", path: "/investasi" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const [openMobile, setOpenMobile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
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
      setOpenMobile(false);
      ToastSuccess("Berhasil logout");
      navigate("/");
    } catch (error) {
      ToastError("Gagal logout, silakan coba lagi");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-5000 bg-customWhite/90 backdrop-blur-md transition-all duration-300 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between relative">
        <div
          className="font-bold text-xl cursor-pointer text-primary transform hover:scale-105 active:scale-95 transition-all duration-200"
          onClick={() => { navigate("/"); setOpenMobile(false); }}
        >
          LOGO
        </div>

        <ul className="hidden md:flex gap-8 text-sm font-semibold">
          {menus.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative py-2 transition-all duration-300 block group ${
                    isActive ? "text-tertiary font-bold" : "text-primary hover:text-tertiary"
                  }`
                }
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <div className="flex items-center gap-4">
              <NotificationDropdown />
              <ProfileDropdown user={user} onLogout={handleLogout} />
            </div>
          ) : (
            <div className="flex gap-3">
              <Button label="Masuk" variant="outline" onClick={() => navigate("/login")} />
              <Button label="Buat Akun" onClick={() => navigate("/register")} />
            </div>
          )}
        </div>
        
        <button
          className="md:hidden text-primary text-2xl focus:outline-none p-1 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpenMobile(!openMobile)}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className={`absolute transition-all duration-300 transform ${openMobile ? "rotate-180 opacity-0" : "rotate-0 opacity-100"}`}>
              <HiMenu />
            </span>
            <span className={`absolute transition-all duration-300 transform ${openMobile ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"}`}>
              <HiX />
            </span>
          </div>
        </button>
      </div>

      <MobileMenu 
        isOpen={openMobile} 
        setIsOpen={setOpenMobile} 
        menus={menus} 
        user={user} 
        onLogout={handleLogout} 
      />
    </nav>
  );
};

export default Navbar;
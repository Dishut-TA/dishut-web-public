import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  HiOutlineBell,
  HiChevronDown,
  HiOutlineUser,
  HiOutlinePresentationChartBar,
  HiOutlineClock,
  HiOutlineLogout,
  HiMenu,
  HiX,
} from "react-icons/hi";
import Button from "../Button";
import { logoutUser } from "@/services/auth.service";
import { ToastError, ToastSuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";
import { AlertConfirm } from "@/utils/alert";

const menus = [
  { label: "Beranda", path: "/" },
  { label: "Pemetaan", path: "/pemetaan" },
  { label: "Monitoring", path: "/monitoring" },
  { label: "Donasi", path: "/donasi" },
  { label: "Investasi", path: "/investasi" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const isConfirmed = await AlertConfirm(
      "Keluar Akun",
      "Apakah Anda yakin ingin keluar dari akun ini?",
      "Ya, Keluar",
      "Batal",
    );

    if (!isConfirmed) return;

    try {
      await logoutUser();
      logout();
      setIsDropdownOpen(false);
      setOpen(false);
      ToastSuccess("Berhasil logout");
      navigate("/");
    } catch (error) {
      ToastError("Gagal logout, silakan coba lagi");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-5000 bg-customWhite/90 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div
          className="font-bold text-xl cursor-pointer text-primary transform hover:scale-105 active:scale-95 transition-all duration-200"
          onClick={() => {
            navigate("/");
            setOpen(false);
          }}
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
                    isActive
                      ? "text-tertiary font-bold"
                      : "text-primary hover:text-tertiary"
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
              <button className="text-primary hover:text-tertiary p-2 cursor-pointer transform active:scale-90 transition-all duration-200 focus:outline-none relative">
                <HiOutlineBell size={24} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex cursor-pointer items-center gap-3 focus:outline-none group py-1.5 px-3 rounded-full transition-all duration-200"
                >
                  <img
                    src={
                      user.foto ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nama_pengguna)}&background=1B5E20&color=ffffff`
                    }
                    className="w-8 h-8 rounded-full object-cover transition-colors"
                    alt="Avatar"
                  />
                  <span className="font-semibold text-primary text-sm max-w-30 truncate">
                    {user.nama_pengguna}
                  </span>
                  <HiChevronDown
                    className={`text-primary transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-tertiary" : ""}`}
                    size={18}
                  />
                </button>

                <div
                  className={`absolute right-0 mt-3 w-56 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-2xl p-2 border border-gray-100 flex flex-col gap-1 transition-all duration-300 origin-top-right ${
                    isDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div
                    className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl text-primary text-sm font-medium transition-colors"
                    onClick={() => {
                      navigate("/profile");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <HiOutlineUser size={18} className="text-primary" /> Profile
                  </div>
                  <div
                    className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl text-primary text-sm font-medium transition-colors"
                    onClick={() => {
                      navigate("/dashboard");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <HiOutlinePresentationChartBar
                      size={18}
                      className="text-primary"
                    />{" "}
                    Dashboard
                  </div>
                  <div
                    className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl text-primary text-sm font-medium transition-colors"
                    onClick={() => {
                      navigate("/riwayat-transaksi");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <HiOutlineClock size={18} className="text-primary" />{" "}
                    Riwayat Transaksi
                  </div>
                  <hr className="my-1 border-gray-100" />
                  <div
                    className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-red-50 rounded-xl text-red-600 text-sm font-semibold transition-colors"
                    onClick={handleLogout}
                  >
                    <HiOutlineLogout size={18} /> Keluar
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                label="Masuk"
                variant="outline"
                onClick={() => navigate("/login")}
              />
              <Button label="Buat Akun" onClick={() => navigate("/register")} />
            </div>
          )}
        </div>

        <button
          className="md:hidden text-primary text-2xl focus:outline-none p-1 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span
              className={`absolute transition-all duration-300 transform ${open ? "rotate-180 opacity-0" : "rotate-0 opacity-100"}`}
            >
              <HiMenu />
            </span>
            <span
              className={`absolute transition-all duration-300 transform ${open ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"}`}
            >
              <HiX />
            </span>
          </div>
        </button>
      </div>

      <div
        className={`md:hidden absolute left-0 w-full bg-customWhite shadow-lg border-t border-gray-100 transition-all duration-300 overflow-y-auto ${
          open
            ? "max-h-[calc(100vh-72px)] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {menus.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-3 border-b border-gray-50 text-sm font-medium transition-all ${
                  isActive
                    ? "text-tertiary font-bold pl-2"
                    : "hover:text-tertiary hover:pl-2"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="mt-4 pt-2">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 py-3 px-3 mb-2 rounded-xl">
                  <img
                    src={
                      user.foto ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nama_pengguna)}&background=random`
                    }
                    className="w-10 h-10 rounded-full object-cover"
                    alt="Avatar"
                  />
                  <div>
                    <p className="font-bold text-sm text-primary">
                      {user.nama_pengguna}
                    </p>
                    <p className="text-xs text-gray-400">Akun Aktif</p>
                  </div>
                </div>

                <Button
                  label="Profile"
                  variant="outline"
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="w-full text-sm"
                />
                <Button
                  label="Dashboard"
                  variant="outline"
                  onClick={() => {
                    navigate("/dashboard");
                    setOpen(false);
                  }}
                  className="w-full text-sm"
                />
                <Button
                  label="Riwayat Transaksi"
                  variant="outline"
                  onClick={() => {
                    navigate("/riwayat-transaksi");
                    setOpen(false);
                  }}
                  className="w-full text-sm"
                />

                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3 px-4 mt-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl flex items-center gap-2 justify-center transition-all active:scale-95"
                >
                  <HiOutlineLogout size={18} /> Keluar Akun
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Button
                  label="Masuk"
                  variant="outline"
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="w-full"
                />
                <Button
                  label="Buat Akun"
                  onClick={() => {
                    navigate("/register");
                    setOpen(false);
                  }}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

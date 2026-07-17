import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import Button from "@/components/Button";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  menus: { label: string; path: string }[];
  user: any;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, menus, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`md:hidden absolute left-0 top-full w-full bg-customWhite shadow-lg border-t border-gray-100 transition-all duration-300 ${
        isOpen ? "max-h-[85vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
      }`}
    >
      <div className="px-6 py-4 flex flex-col gap-1">
        {menus.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-3 border-b border-gray-50 text-sm font-medium transition-all ${
                isActive ? "text-tertiary font-bold pl-2" : "text-primary hover:text-tertiary hover:pl-2"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <div className="mt-4 pt-2">
          {user ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 py-3 px-3 mb-2 rounded-xl border border-gray-100 bg-white">
                <img
                  src={user.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nama_pengguna)}&background=1B5E20&color=ffffff`}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Avatar"
                />
                <div>
                  <p className="font-bold text-sm text-primary">{user.nama_pengguna}</p>
                  <p className="text-xs text-gray-400">Akun Aktif</p>
                </div>
              </div>
              <Button label="Profile" variant="outline" onClick={() => { navigate("/profile"); setIsOpen(false); }} className="w-full text-sm" />
              <Button label="Dashboard" variant="outline" onClick={() => { navigate("/dashboard"); setIsOpen(false); }} className="w-full text-sm" />
              <button
                onClick={onLogout}
                className="w-full text-left py-3 px-4 mt-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl flex items-center gap-2 justify-center transition-all active:scale-95"
              >
                <HiOutlineLogout size={18} /> Keluar Akun
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Button label="Masuk" variant="outline" onClick={() => { navigate("/login"); setIsOpen(false); }} className="w-full" />
              <Button label="Buat Akun" onClick={() => { navigate("/register"); setIsOpen(false); }} className="w-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
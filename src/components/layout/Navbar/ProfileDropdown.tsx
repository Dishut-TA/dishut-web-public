import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronDown, HiOutlineUser, HiOutlinePresentationChartBar, HiOutlineLogout } from "react-icons/hi";

interface ProfileDropdownProps {
  user: any;
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-3 focus:outline-none group py-1.5 px-3 rounded-full transition-all duration-200"
      >
        <img
          src={user.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nama_pengguna)}&background=1B5E20&color=ffffff`}
          className="w-8 h-8 rounded-full object-cover transition-colors"
          alt="Avatar"
        />
        <span className="font-semibold text-primary text-sm max-w-30 truncate">
          {user.nama_pengguna}
        </span>
        <HiChevronDown className={`text-primary transition-transform duration-300 ${isOpen ? "rotate-180 text-tertiary" : ""}`} size={18} />
      </button>

      <div
        className={`absolute right-0 mt-3 w-56 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-2xl p-2 border border-gray-100 flex flex-col gap-1 transition-all duration-300 origin-top-right ${
          isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div onClick={() => handleNavigation("/profile")} className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl text-primary text-sm font-medium transition-colors">
          <HiOutlineUser size={18} className="text-primary" /> Profile
        </div>
        <div onClick={() => handleNavigation("/dashboard")} className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl text-primary text-sm font-medium transition-colors">
          <HiOutlinePresentationChartBar size={18} className="text-primary" /> Dashboard
        </div>
        <hr className="my-1 border-gray-100" />
        <div onClick={onLogout} className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-red-50 rounded-xl text-red-600 text-sm font-semibold transition-colors">
          <HiOutlineLogout size={18} /> Keluar
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
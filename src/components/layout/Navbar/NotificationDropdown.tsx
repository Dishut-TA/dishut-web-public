import { useState, useRef, useEffect } from "react";
import { HiOutlineBell } from "react-icons/hi";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 cursor-pointer transform active:scale-90 transition-all duration-200 focus:outline-none relative rounded-full ${
          isOpen ? "bg-primary/10 text-primary" : "text-primary hover:text-tertiary"
        }`}
      >
        <HiOutlineBell size={24} />
        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#E53935] rounded-full animate-pulse border border-white"></span>
      </button>

      <div
        className={`absolute right-0 mt-3 w-80 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-2xl p-4 border border-gray-100 flex flex-col gap-3 transition-all duration-300 origin-top-right ${
          isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="font-bold text-primary text-base">Notifikasi</span>
          <button className="text-xs text-primary hover:text-tertiary font-medium transition-colors cursor-pointer">
            Tandai dibaca
          </button>
        </div>

        <div className="flex flex-col gap-3 py-2 max-h-60 overflow-y-auto">
          <div className="flex flex-col gap-1 items-center justify-center py-6 text-gray-400">
            <HiOutlineBell size={32} className="mb-2 opacity-50" />
            <p className="text-sm font-medium">Belum ada notifikasi baru</p>
          </div>
        </div>

        <button className="w-full text-center py-2 text-sm text-primary font-bold hover:text-tertiary border-t border-gray-100 pt-3 transition-colors mt-1 cursor-pointer">
          Lihat Semua
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
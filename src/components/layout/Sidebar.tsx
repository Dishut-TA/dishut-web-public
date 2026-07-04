import { NavLink, useNavigate } from "react-router-dom";
import { 
  HiOutlineHome, 
  HiOutlineLogout, 
  HiArrowLeft,
  HiX,
  HiOutlineClock
} from "react-icons/hi";
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

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <HiOutlineHome size={20} /> },
    { label: "Riwayat Transaksi", path: "/riwayat-transaksi", icon: <HiOutlineClock size={20} /> },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 bg-secondary shadow-lg w-64 z-50 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6">
          <span 
            className="font-extrabold text-2xl cursor-pointer text-primary tracking-wide drop-shadow-sm"
            onClick={() => navigate("/")}
          >
            LOGO
          </span>
          <button 
            className="md:hidden text-primary p-2 hover:bg-primary/10 rounded-xl transition-colors" 
            onClick={() => setIsOpen(false)}
          >
            <HiX size={24} />
          </button>
        </div>

        <div className="flex-1 py-2 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-customWhite shadow-md"
                    : "text-primary hover:bg-primary/10"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 space-y-3">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold text-primary hover:bg-primary/10 transition-all"
          >
            <HiArrowLeft size={20} /> Kembali ke Beranda
          </button>

          <div 
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
            className="bg-customWhite/40 p-3 rounded-2xl cursor-pointer hover:bg-customWhite/60 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={user?.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nama_pengguna || 'User')}&background=1B5E20&color=ffffff`}
                className="w-11 h-11 rounded-full object-cover group-hover:border-primary transition-all duration-300"
                alt="Avatar"
              />
              <div className="overflow-hidden">
                <p className="font-bold text-sm text-primary truncate">{user?.nama_pengguna}</p>
                <p className="text-xs text-primary/80 truncate">{user?.email}</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-red-600 bg-customWhite shadow-sm hover:bg-red-50 hover:text-red-700 transition-all active:scale-95 mt-1"
            >
              <HiOutlineLogout size={18} /> Keluar Akun
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
        Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Selamat datang kembali, <span className="font-semibold text-primary">{user?.nama_pengguna}</span>!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Donasi</h3>
          <p className="text-2xl font-bold text-primary mt-2">Rp 0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Investasi</h3>
          <p className="text-2xl font-bold text-primary mt-2">Rp 0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Pohon Tertanam</h3>
          <p className="text-2xl font-bold text-[#2E7D32] mt-2">0 Pohon</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
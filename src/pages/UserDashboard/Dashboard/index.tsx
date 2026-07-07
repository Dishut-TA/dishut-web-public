import { useAuth } from "@/context/AuthContext";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HiOutlineGift, HiOutlineTrendingUp, HiOutlineTrendingDown, HiOutlineBriefcase } from "react-icons/hi";

const data = [{ name: 'Jan', val: 40 }, { name: 'Feb', val: 30 }, { name: 'Mar', val: 60 }, { name: 'Apr', val: 40 }, { name: 'Mei', val: 80 }, { name: 'Jun', val: 60 }];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Halo, {user?.nama_pengguna}!</h1>
        <p className="text-primary text-sm">Selamat datang kembali di dashboard investasi Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Donasi</p>
            <p className="text-2xl font-bold text-primary">100 Bibit</p>
          </div>
          <div className="w-12 h-12 bg-secondary/20 flex items-center justify-center rounded-full text-primary"><HiOutlineGift size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Investasi</p>
            <p className="text-2xl font-bold text-primary">Rp 1.000.000</p>
          </div>
          <div className="w-12 h-12 bg-secondary/20 flex items-center justify-center rounded-full text-primary"><HiOutlineBriefcase size={24} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1B5E20" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="val" stroke="#1B5E20" fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6 h-full lg:h-80">
          <div className="bg-white p-6 rounded-3xl shadow-sm flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-center gap-4 text-center">
              <div>
                <p className="text-primary text-xs font-bold uppercase">
                  Total Pendapatan
                </p>
                <p className="text-2xl font-bold text-primary mt-1">
                  Rp. 600.000
                </p>
              </div>
              <div className="flex p-2 items-center justify-center rounded-[14px] border border-primary">
                <HiOutlineTrendingUp className="text-primary text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-center gap-4 text-center">
              <div>
                <p className="text-primary text-xs font-bold uppercase">
                  Total Pengeluaran
                </p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  Rp. 180.000
                </p>
              </div>

              <div className="flex p-2 items-center justify-center rounded-[14px] border border-red-500">
                <HiOutlineTrendingDown className="text-red-500 text-xl" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
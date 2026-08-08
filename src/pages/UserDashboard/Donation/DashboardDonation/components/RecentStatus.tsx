import React from 'react';

interface StatusItem {
  id: number;
  title: string;
  program: string;
  status: string;
}

interface RecentStatusProps {
  statuses: StatusItem[];
}

const RecentStatus: React.FC<RecentStatusProps> = ({ statuses }) => {
  const getColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'terkumpul': return 'bg-purple-100 text-purple-700';
      case 'disalurkan': return 'bg-blue-100 text-blue-700';
      case 'terealisasi': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
      <h3 className="text-base md:text-lg font-bold text-primary mb-6">
        Status Bibit Terakhir
      </h3>
      
      <div className="space-y-6">
        {statuses && statuses.length > 0 ? (
          statuses.map((item, index) => (
            <div key={item.id} className="flex gap-4">
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold ${getColor(item.status)}`}>
                {index + 1}
              </div>
              <div>
                <p className="font-semibold text-primary text-sm md:text-base">
                  {item.title}
                </p>
                <p className="text-xs md:text-sm text-gray-400 mb-2">
                  Program: {item.program}
                </p>
                <span className={`text-[10px] md:text-xs px-3 py-1 rounded-full font-bold ${getColor(item.status)}`}>
                  Status: {item.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">Belum ada riwayat donasi.</p>
        )}
      </div>
    </div>
  );
};

export default RecentStatus;
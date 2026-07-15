import React from 'react';

const mockStatuses = [
  {
    id: 1,
    title: '50 Bibit Mahoni',
    program: 'Penghijauan Hulu Citarum',
    status: 'Disalurkan',
    numberColor: 'bg-blue-100 text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    title: '50 Bibit Mahoni',
    program: 'Penghijauan Hulu Citarum',
    status: 'Terealisasi (Sudah Ditanam)',
    numberColor: 'bg-green-100 text-green-700',
    badgeColor: 'bg-green-100 text-green-700',
  }
];

const RecentStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
      <h3 className="text-base md:text-lg font-bold text-primary mb-6">
        Status Bibit Terakhir
      </h3>
      
      <div className="space-y-6">
        {mockStatuses.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold ${item.numberColor}`}>
              {item.id}
            </div>
            <div>
              <p className="font-semibold text-primary text-sm md:text-base">
                {item.title}
              </p>
              <p className="text-xs md:text-sm text-gray-400 mb-2">
                Program: {item.program}
              </p>
              <span className={`text-[10px] md:text-xs px-3 py-1 rounded-full font-bold ${item.badgeColor}`}>
                Status: {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentStatus;
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-xs md:text-sm text-gray-500 font-medium mb-1.5">{title}</p>
        <p className="text-xl md:text-2xl font-bold text-primary">{value}</p>
      </div>
      <div className="w-12 h-12 shrink-0 rounded-xl bg-[#E5F0E8] text-primary flex items-center justify-center shadow-sm">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
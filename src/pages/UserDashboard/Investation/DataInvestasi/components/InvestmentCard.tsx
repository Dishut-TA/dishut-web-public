import React from 'react';
import { HiOutlineCalendar } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface InvestmentCardProps {
  data: {
    id: string;
    item: string;
    date: string;
    status: string;
    progress: number;
    image: string;
  };
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <h3 className="font-bold text-primary text-base mb-3">{data.item}</h3>
      
      <img 
        src={data.image} 
        alt={data.item} 
        className="w-full h-40 object-cover rounded-xl mb-3"
      />

      <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
        <div 
          className="h-full bg-primary rounded-full" 
          style={{ width: `${data.progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-primary mb-4">
        <div className="flex items-center gap-1.5 font-medium">
          <HiOutlineCalendar size={14} />
          {data.date}
        </div>
        <div className="font-bold">
          Progress {data.progress}%
        </div>
      </div>

      <div className="flex items-end justify-end">
      <button 
        onClick={() => navigate(`/investasi/data/detail/${data.id}`)}
        className="bg-primary hover:bg-[#144a18] text-white font-semibold py-2 px-4 rounded-full text-sm transition-colors"
      >
        Lihat Detail
      </button>
      </div>
    </div>
  );
};

export default InvestmentCard;
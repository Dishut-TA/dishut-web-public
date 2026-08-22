import React from "react";
import { useNavigate } from "react-router-dom"; 
import Button from "@/components/Button";

export interface InvestmentProgram {
  id: string | number;
  image: string;
  title: string;
  description: string;
  collected: number;
  target: number;
}

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

interface InvestmentCardProps {
  program: InvestmentProgram;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ program }) => {
  const navigate = useNavigate(); 
  const progress = Math.min((program.collected / program.target) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col grow">
        <h3 className="text-lg md:text-xl font-bold text-primary leading-tight mb-3 line-clamp-2">
          {program.title}
        </h3>
        <p className="text-sm text-[#4F6352] leading-relaxed mb-6 line-clamp-3">
          {program.description}
        </p>
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-gray-500">Target Terkumpul</span>
            <span className="text-base font-bold text-gray-800">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                Terkumpul
              </span>
              <span className="text-xs font-bold text-gray-800">
                {formatRupiah(program.collected)}
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                Dari Target
              </span>
              <span className="text-xs font-bold text-gray-800">
                {formatRupiah(program.target)}
              </span>
            </div>
          </div>
          
          <Button 
            label="Investasi Sekarang" 
            size="lg" 
            className="w-full cursor-pointer"
            onClick={() => navigate(`/investasi/detail/${program.id}`)} 
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
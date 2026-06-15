import React from "react";
import { MdLocationOn } from "react-icons/md";
import Button from "@/components/Button";

export interface InvestmentProgram {
  id: number;
  scheme: string;
  image: string;
  location: string;
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
  const progress = Math.min((program.collected / program.target) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      
      {/* Image & Badge */}
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-semibold text-gray-800 shadow-sm">
          {program.scheme}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col grow">
        
        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm font-medium text-[#4F6352] mb-3">
          <MdLocationOn className="text-lg" />
          <span>{program.location}</span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg md:text-xl font-bold text-primary leading-tight mb-3">
          {program.title}
        </h3>
        <p className="text-sm text-[#4F6352] leading-relaxed mb-6 line-clamp-3">
          {program.description}
        </p>

        {/* Progress Section */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-gray-500">Target Terkumpul</span>
            <span className="text-base font-bold text-gray-800">{Math.round(progress)}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Stats Info */}
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

          {/* Button */}
          <Button 
            label="Investasi Sekarang" size="lg" className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
import React from "react";
import Button from "@/components/Button";
import { MdLocationOn } from "react-icons/md";

interface Props {
  title: string;
  location: string;
  description: string;
  image: string;
  collected: number;
  target: number;
  onClick?: () => void;
}

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const ProgramCard: React.FC<Props> = ({
  title,
  location,
  description,
  image,
  collected,
  target,
  onClick
}) => {
  const progress = Math.min((collected / target) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      
      {/* Image */}
      <div className="w-full h-40 md:h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        
        {/* Location */}
        <div className="flex items-center text-xs text-primary gap-1">
          <MdLocationOn className="text-primary text-sm" />
          <span>{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm md:text-base font-semibold text-primary line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-primary line-clamp-3">
          {description}
        </p>

        {/* Progress */}
        <div className="mt-1">
          <div className="flex justify-between text-xs text-primary mb-1">
            <span className="text-primary font-semibold">
              {formatRupiah(collected)}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 font-semibold"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-[10px] font-semibold text-primary mt-1">
            dari target {formatRupiah(target)}
          </p>
        </div>

        {/* Button */}
        <Button
          label="Donasi Sekarang"
          variant="primary"
          size="md"
          className="mt-2"
          onClick={onClick}
        />

      </div>
    </div>
  );
};

export default ProgramCard;
import React from "react";
import { MdLocationOn } from "react-icons/md";
import { PiLeafFill } from "react-icons/pi";

interface Props {
  id: number;
  title: string;
  location: string;
  description: string;
  image: string;
  collected: string; 
  status: string;
  onClick?: () => void; 
}

const ProgramCard: React.FC<Props> = ({
  title,
  location,
  description,
  image,
  collected,
  status,
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-40 md:h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#344237] text-white text-[10px] font-semibold">
          {status}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-sm md:text-base font-semibold text-primary line-clamp-2">
          {title}
        </h3>

        <p className="text-xs md:text-sm text-primary/80 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center text-xs text-primary/80 gap-1 mt-1">
          <MdLocationOn className="text-primary/70 text-sm" />
          <span>{location}</span>
        </div>

        <div className="flex items-center text-xs text-primary gap-1">
          <PiLeafFill className="text-primary text-sm" />
          <span className="font-semibold text-primary/90">{collected} Bibit Terkumpul</span>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
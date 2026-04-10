import React from "react";
import { FiUser } from "react-icons/fi";

interface Donor {
  id: number;
  name: string;
  amount: number;
  timeAgo: string;
}

interface DonorItemProps {
  donor: Donor;
  formatter: (value: number) => string;
}

const DonorItem: React.FC<DonorItemProps> = ({ donor, formatter }) => {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white px-4 py-3 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
        <FiUser className="text-lg" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-primary">{donor.name}</h3>
        <p className="text-sm text-primary/80">
          Berdonasi sebesar {formatter(donor.amount)}
        </p>
        <p className="mt-1 text-xs text-primary/60">{donor.timeAgo}</p>
      </div>
    </div>
  );
};

export default DonorItem;
import React from "react";
import DonorItem from "./DonorItem";

interface Donor {
  id: number;
  name: string;
  amount: number;
  timeAgo: string;
}

interface DonorListProps {
  donors: Donor[];
}

const DonorList: React.FC<DonorListProps> = ({ donors }) => {
  return (
    <div className="space-y-3">
      {donors.map((donor) => (
        <DonorItem key={donor.id} donor={donor} />
      ))}
    </div>
  );
};

export default DonorList;
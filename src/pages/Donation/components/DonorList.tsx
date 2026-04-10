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
  formatter: (value: number) => string;
}

const DonorList: React.FC<DonorListProps> = ({ donors, formatter }) => {
  return (
    <div className="space-y-3">
      {donors.map((donor) => (
        <DonorItem key={donor.id} donor={donor} formatter={formatter} />
      ))}
    </div>
  );
};

export default DonorList;
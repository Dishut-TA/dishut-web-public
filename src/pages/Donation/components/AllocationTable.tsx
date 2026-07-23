import React from "react";

export interface AllocationItem {
  id: number;
  label: string;
  percentage: number;
  amount?: number; 
  customValueText?: string;
  isStrikethrough?: boolean;
}

interface AllocationTableProps {
  title: string;
  items: AllocationItem[];
  totalAmount: number;
}

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const AllocationTable: React.FC<AllocationTableProps> = ({
  title,
  items,
  totalAmount,
}) => {
  return (
    <div className="">
        <h3 className="mb-4 text-xl font-semibold text-primary md:text-2xl">
          {title}
        </h3>
      <div className="rounded-xl bg-[#F8F9FA] p-5 md:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <span className="text-primary font-medium text-[15px] md:text-base">
            Total Donasi Terkumpul:
          </span>
          <span className="text-primary font-medium text-[15px] md:text-base">
            {formatRupiah(totalAmount)}
          </span>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-start justify-between gap-4 text-[14px] md:text-[15px] ${
                item.isStrikethrough ? "text-primary" : "text-primary"
              }`}
            >
              <span
                className={`${item.isStrikethrough ? "line-through" : "font-semibold"}`}
              >
                {index + 1}. {item.label} ({item.percentage}%)
              </span>
              <span
                className={`whitespace-nowrap ${
                  item.isStrikethrough ? "" : "font-bold text-primary"
                }`}
              >
                {item.customValueText
                  ? item.customValueText
                  : item.amount !== undefined
                  ? formatRupiah(item.amount)
                  : "Rp 0"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllocationTable;
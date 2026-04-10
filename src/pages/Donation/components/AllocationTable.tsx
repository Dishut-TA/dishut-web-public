import React from "react";

interface AllocationItem {
  id: number;
  label: string;
  amount: number;
}

interface AllocationTableProps {
  items: AllocationItem[];
  total: number;
  formatter: (value: number) => string;
}

const AllocationTable: React.FC<AllocationTableProps> = ({
  items,
  total,
  formatter,
}) => {
  return (
    <div className="rounded-2xl bg-transparent">
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 pb-2 text-sm md:text-base"
          >
            <span className="text-primary">{item.label}</span>
            <span className="whitespace-nowrap font-medium text-primary">
              {formatter(item.amount)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t-2 border-primary/30 pt-4 text-sm font-semibold text-primary md:text-base">
        <span>Total</span>
        <span>{formatter(total)}</span>
      </div>
    </div>
  );
};

export default AllocationTable;
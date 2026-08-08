import React from "react";

export interface AllocationItem {
  id: string | number;
  namaBibit: string;
  jumlah: number;
  hargaSatuan: number;
  subTotal: number;
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
      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-white px-5 py-4">
          <h3 className="font-bold text-gray-800 text-sm">Rincian Pembelanjaan Bibit Terkumpul</h3>
        </div>
        
        <div className="px-5 py-2 bg-white">
          <div className="divide-y divide-gray-100">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {index + 1}. Bibit {item.namaBibit}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.jumlah} Batang x {formatRupiah(item.hargaSatuan)}
                    </span>
                  </div>
                  <span className="font-bold text-gray-700">
                    {formatRupiah(item.subTotal)}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-4 text-sm text-gray-500 italic text-center">
                Belum ada donasi bibit yang terkumpul.
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#f0f9f3] px-5 py-4 border-t border-[#e2f1e6] flex justify-between items-center">
          <span className="text-sm font-bold text-[#185325]">Total Donasi Terkumpul:</span>
          <span className="text-lg font-bold text-[#185325]">{formatRupiah(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default AllocationTable;
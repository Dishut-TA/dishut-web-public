import React from 'react';
import { HiOutlineFolderOpen } from 'react-icons/hi';

interface EmptyStateProps {
  type: 'donasi' | 'investasi';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fadeIn">
      <HiOutlineFolderOpen className="text-8xl text-tertiary mb-4" />
      <h3 className="text-xl font-bold text-primary mb-2">
        Kamu Belum Melakukan Transaksi
      </h3>
      <p className="text-sm text-gray-500 max-w-md">
        Yuk! Bantu kegiatan pelestarian dan rehabilitasi hutan dengan melakukan kegiatan {type === 'donasi' ? 'Donasi' : 'Investasi'}
      </p>
    </div>
  );
};

export default EmptyState;
import React from 'react';
import { HiOutlineDocumentReport } from 'react-icons/hi';

interface Step2Props {
  onNext: () => void;
  onBack?: () => void; 
}

const milestones = [
  {
    id: 1,
    nama: 'Milestone 1',
    batas: '22/04/2024',
    status: 'Belum Dimulai',
    doc: '-',
    deskripsi: 'Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur. Enim aliquam sed nibh bibendum.'
  },
  {
    id: 2,
    nama: 'Milestone 2',
    batas: '22/04/2024',
    status: 'Belum Dimulai',
    doc: '-',
    deskripsi: 'Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur. Enim aliquam sed nibh bibendum.'
  }
];

const Step2Milestone: React.FC<Step2Props> = ({ onNext }) => {
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="space-y-8">
        {milestones.map((ms) => (
          <div key={ms.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="space-y-3 text-sm text-primary">
              <div className="flex">
                <span className="w-40 font-medium">Nama Milestone</span> 
                <span className="font-bold">: {ms.nama}</span>
              </div>
              <div className="flex">
                <span className="w-40 font-medium">Batas Milestone</span> 
                <span className="font-medium">: {ms.batas}</span>
              </div>
              <div className="flex items-center">
                <span className="w-40 font-medium">Status</span> 
                <span className="font-medium flex items-center gap-2">: {ms.status} <HiOutlineDocumentReport size={20} /></span>
              </div>
              <div className="flex">
                <span className="w-40 font-medium">Dokumen Milestone</span> 
                <span className="font-medium">: {ms.doc}</span>
              </div>
              <div className="flex flex-col pt-2">
                <span className="font-medium mb-1">Deskripsi</span>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {ms.deskripsi}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button 
          onClick={onNext}
          className="w-full bg-primary hover:bg-[#144a18] text-white font-bold py-3.5 rounded-full transition-all"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default Step2Milestone;
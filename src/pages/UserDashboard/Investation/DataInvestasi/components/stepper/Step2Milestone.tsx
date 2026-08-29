import React from 'react';
import { HiOutlineDocumentReport } from 'react-icons/hi';

interface Step2Props {
  onNext: () => void;
  onBack?: () => void; 
  program: any;
}

const Step2Milestone: React.FC<Step2Props> = ({ onNext, program }) => {
  const milestones = program?.milestones || [];
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="space-y-8">
        {milestones.length > 0 ? milestones.map((ms: any) => (
          <div key={ms.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="space-y-3 text-sm text-primary">
              <div className="flex">
                <span className="w-40 font-medium">Nama Milestone</span> 
                <span className="font-bold">: {ms.judul_milestone}</span>
              </div>
              <div className="flex">
                <span className="w-40 font-medium">Batas Milestone</span> 
                <span className="font-medium">: {new Date(ms.target_tanggal).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex items-center">
                <span className="w-40 font-medium">Status</span> 
                <span className="font-medium flex items-center gap-2">: {ms.status || 'Belum Dimulai'} <HiOutlineDocumentReport size={20} /></span>
              </div>
              <div className="flex">
                <span className="w-40 font-medium">Dokumen Milestone</span> 
                <span className="font-medium">: {ms.doc || '-'}</span>
              </div>
              <div className="flex flex-col pt-2">
                <span className="font-medium mb-1">Deskripsi</span>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {ms.deskripsi}
                </p>
              </div>
            </div>
          </div>
        )) : <div className="text-center text-gray-400 py-10">Belum ada milestone</div>}
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
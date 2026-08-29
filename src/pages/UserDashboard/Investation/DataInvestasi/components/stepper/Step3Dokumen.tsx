import React from 'react';

interface Step3Props {
  onFinish: () => void;
  program: any;
}

const Step3Dokumen: React.FC<Step3Props> = ({ onFinish, program }) => {
  const documents = program?.dokumens || [];
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <h3 className="text-center font-bold text-primary mb-8">Dokumen Pendukung</h3>
      <div className="space-y-4 mb-10">
        {documents.length > 0 ? documents.map((doc: any, index: number) => (
          <div key={index} className="flex text-sm">
            <span className="w-56 font-medium text-primary">{doc.tipe_dokumen}</span>
            <span className="font-bold text-primary mr-2">:</span>
            <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-tertiary underline cursor-pointer truncate font-medium">
              Lihat Dokumen
            </a>
          </div>
        )) : <div className="text-center text-gray-400 py-10">Belum ada dokumen</div>}
      </div>

      <button 
        onClick={onFinish}
        className="w-full bg-primary hover:bg-[#144a18] text-white font-bold py-3.5 rounded-full transition-all"
      >
        Kembali ke Investasi
      </button>
    </div>
  );
};

export default Step3Dokumen;
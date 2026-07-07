import React from 'react';

interface Step3Props {
  onFinish: () => void;
}

const documents = [
  { label: 'Dokumen Perjanjian Investasi', file: 'PerjanjianInvestasi.pdf' },
  { label: 'Dokumen Rencana Bisnis', file: 'RencanaProyekPembangunanWisataDiving.pdf' },
  { label: 'Dokumen Proyek Keuangan', file: 'ProyekKeuanganWisataDiving.pdf' },
  { label: 'Dokumen Hukum dan Perizinan', file: 'HukumDanPerizinanInvestasi.pdf' },
  { label: 'Template Perjanjian Investor', file: 'DokumenPerjanjian.pdf' },
];

const Step3Dokumen: React.FC<Step3Props> = ({ onFinish }) => {
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <h3 className="text-center font-bold text-primary mb-8">Dokumen Pendukung</h3>
      <div className="space-y-4 mb-10">
        {documents.map((doc, index) => (
          <div key={index} className="flex text-sm">
            <span className="w-56 font-medium text-primary">{doc.label}</span>
            <span className="font-bold text-primary mr-2">:</span>
            <span className="text-primary hover:text-tertiary underline cursor-pointer truncate font-medium">
              {doc.file}
            </span>
          </div>
        ))}
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
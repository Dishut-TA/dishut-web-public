import React from 'react';

interface TabDokumenProps {
  onDownloadTemplate: () => void;
}

const TabDokumen: React.FC<TabDokumenProps> = ({ onDownloadTemplate }) => {
  const docStyle = "flex items-start md:items-center gap-2 text-sm text-[#333333] py-1";
  const linkStyle = "text-[#2E7D32] hover:underline font-semibold italic cursor-pointer";

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] space-y-3">
      <p className="text-sm font-semibold text-gray-700 mb-2">Berikut beberapa dokumen-dokumen investasi di SIGAP Jabar</p>
      
      <div className="space-y-2 font-medium">
        <div className={docStyle}>
          <span className="w-48 shrink-0">Dokumen Rencana Bisnis</span>
          <span>:</span>
          <a className={linkStyle}>RencanaProyekPembangunanEkowisata.pdf</a>
        </div>
        <div className={docStyle}>
          <span className="w-48 shrink-0">Dokumen Proyek Keuangan</span>
          <span>:</span>
          <a className={linkStyle}>ProyekKeuanganWisataDiving.pdf</a>
        </div>
        <div className={docStyle}>
          <span className="w-48 shrink-0">Dokumen Hukum dan Perizinan</span>
          <span>:</span>
          <a className={linkStyle}>HukumDanPerizinanInvestasi.pdf</a>
        </div>
        <div className={docStyle}>
          <span className="w-48 shrink-0">Template Perjanjian Investor</span>
          <span>:</span>
          <span onClick={onDownloadTemplate} className={linkStyle}>DokumenPerjanjian.pdf</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-6 italic">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
  );
};

export default TabDokumen;
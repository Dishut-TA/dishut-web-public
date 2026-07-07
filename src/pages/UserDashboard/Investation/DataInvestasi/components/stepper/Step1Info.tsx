import React from 'react';

interface Step1Props {
  onNext: () => void;
}

const Step1Info: React.FC<Step1Props> = ({ onNext }) => {
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
      
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg" />
        ))}
      </div>

      <div className="space-y-3 text-sm text-primary mb-6">
        <div className="flex"><span className="w-40 font-medium">Target Funding</span> <p className='font-medium text-tertiary'> : 100.000.000</p></div>
        <div className="flex"><span className="w-40 font-medium">Persentase Keuntungan</span> <p className='font-medium text-primary'> : 60 : 40%</p></div>
        <div className="flex">
          <span className="w-40 font-medium">Tenggat Waktu</span> : 
          <span className="text-orange-500 font-semibold ml-1">20 Agustus 2024</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur. 
        Enim aliquam sed nibh bibendum. Pulvinar nec risus et vulputate consequat tortor.
      </p>

      <div className="flex flex-col gap-2 text-sm font-semibold text-primary mb-8">
        <div>KTH <span className="ml-2 font-bold">: 60%</span></div>
        <div>Investor <span className="ml-2 font-bold">: 40%</span></div>
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-primary hover:bg-[#144a18] text-white font-bold py-3.5 rounded-full transition-all"
      >
        Selanjutnya
      </button>
    </div>
  );
};

export default Step1Info;
import React from 'react';

interface Step1Props {
  onNext: () => void;
  program: any;
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
};

const Step1Info: React.FC<Step1Props> = ({ onNext, program }) => {
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="w-full h-48 rounded-xl mb-4 overflow-hidden bg-gray-200">
        <img src={program.gambar || 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80'} alt={program.nama_program} className="w-full h-full object-cover" />
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg overflow-hidden">
            <img src={program.gambar || 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80'} alt="" className="w-full h-full object-cover opacity-50" />
          </div>
        ))}
      </div>

      <div className="space-y-3 text-sm text-primary mb-6">
        <div className="flex"><span className="w-40 font-medium">Target Funding</span> <p className='font-medium text-tertiary'> : {formatCurrency(program.target_dana)}</p></div>
        <div className="flex"><span className="w-40 font-medium">Persentase Keuntungan</span> <p className='font-medium text-primary'> : {100 - program.persentase_keuntungan} : {program.persentase_keuntungan}%</p></div>
        <div className="flex">
          <span className="w-40 font-medium">Tenggat Waktu</span> : 
          <span className="text-orange-500 font-semibold ml-1">{new Date(program.batas_waktu_pengumpulan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-6 whitespace-pre-line line-clamp-4">
        {program.deskripsi}
      </p>

      <div className="flex flex-col gap-2 text-sm font-semibold text-primary mb-8">
        <div>KTH <span className="ml-2 font-bold">: {100 - program.persentase_keuntungan}%</span></div>
        <div>Investor <span className="ml-2 font-bold">: {program.persentase_keuntungan}%</span></div>
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
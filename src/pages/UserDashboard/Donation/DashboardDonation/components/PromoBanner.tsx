import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromoBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full min-h-65 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-end p-6 lg:p-8 group">
      <img 
        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" 
        alt="Planting Tree" 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      
      <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/80 to-transparent" />
      
      <div className="relative z-10 text-white">
        <h3 className="text-2xl lg:text-[28px] font-bold mb-2 leading-tight">
          Satu Pohon <br /> Sejuta Harapan
        </h3>
        <p className="text-xs md:text-sm text-white/90 mb-5 max-w-sm leading-relaxed">
          Ribuan lahan kritis masih menunggu aksi nyata kita. Mari selaraskan langkah untuk menghijaukan kembali bumi pertiwi.
        </p>
        <button 
          onClick={() => navigate('/donasi/explore')}
          className="bg-white cursor-pointer text-primary font-bold px-6 py-2.5 rounded-full text-xs md:text-sm hover:bg-gray-200 transition-colors shadow-sm active:scale-95"
        >
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
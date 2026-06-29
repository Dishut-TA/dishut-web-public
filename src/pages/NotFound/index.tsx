import { useNavigate } from 'react-router-dom';
import { HiOutlineMap, HiArrowLeft } from 'react-icons/hi';
import Button from '@/components/Button'; 

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-customWhite flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="z-10 flex flex-col items-center text-center max-w-2xl animate-[fadeIn_0.5s_ease-in-out]">
        
        <div className="flex items-center justify-center text-8xl md:text-[150px] font-extrabold text-primary mb-4 tracking-widest drop-shadow-sm">
          <span className="animate-[bounce_2s_infinite]">4</span>
          
          <div className="mx-2 text-tertiary animate-[float_3s_ease-in-out_infinite]">
            <HiOutlineMap className="w-24 h-24 md:w-36 md:h-36 drop-shadow-lg" />
          </div>
          
          <span className="animate-[bounce_2s_infinite_0.2s]">4</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          Waduh! Sepertinya Kamu Tersesat...
        </h1>
        
        <p className="text-gray-500 text-sm md:text-base mb-8 md:px-12 leading-relaxed">
          Jalan yang kamu cari tidak ditemukan di peta kami atau mungkin <span className='font-bold text-black'>Al-Giffari yang JAGO BANGET itu lagi kelelahan, jadi belum diberesin fiturnya.</span> Mungkin halamannya sedang direboisasi atau pindah ke ujung hutan lain. Yuk, kembali ke jalan yang benar!
        </p>

        <div className="group">
          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="flex items-center gap-2 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" size={20} />
            Kembali ke Beranda
          </Button>
        </div>

      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
import React from 'react';

const TabPanduan: React.FC = () => {
  return (
    <div className="animate-[fadeIn_0.3s_ease-out] text-[#333333] text-sm md:text-[15px] leading-relaxed">
      <p className="font-semibold mb-3">Berikut beberapa panduan dan informasi mengenai tata cara investasi di SIGAP Jabar:</p>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Pertama-tama, pilih investasi yang diinginkan.</li>
        <li>Untuk memahami lebih lanjut mengenai investasi, Anda dapat melihat detail investasi, panduan & informasi, serta dokumen terkait.</li>
        <li>Setelah Anda memahami investasinya, selanjutnya Anda dapat menekan tombol "Investasi Sekarang" untuk memulai proses investasi.</li>
        <li>Anda akan diarahkan ke halaman yang berisi formulir yang harus Anda isi. Terdapat tiga formulir, yaitu formulir identitas, investasi, dan pembayaran.</li>
        <li>Setelah investasi berhasil dilakukan Anda dapat menekan tombol "Ke Dashboard" untuk melihat ringkasan investasi Anda.</li>
      </ul>
    </div>
  );
};

export default TabPanduan;
import { forwardRef } from 'react';
import KDM from "@/assets/images/KDM.png";
import Dishut from "@/assets/images/LogoDishutJABAR.png";
import Jabar from "@/assets/images/LogoJABAR.png";

interface CertificateProps {
  nama: string;
  lokasi: string;
  jumlahBibit: number;
  tanggal: string;
}

const CertificateTemplate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ nama, lokasi, jumlahBibit, tanggal }, ref) => {
    return (
      <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none overflow-hidden">
        <div
          ref={ref}
          className="relative w-280.75 h-198.6 bg-white overflow-hidden font-sans text-customBlack flex"
        >
          {/* ORNAMEN SHAPES */}
          {/* Kiri Atas */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-secondary rounded-full opacity-80" />
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-primary rounded-full" />
          <div className="absolute top-8 left-8 w-20 h-20 rounded-full flex items-center justify-center">
            <img src={Jabar} alt="" />
          </div>

          {/* Kanan Atas */}
          <div className="absolute -top-32 -right-10 w-96 h-96 bg-primary rounded-full" />
          <div className="absolute -top-32 -right-10 w-50 h-full bg-primary opacity-90" />
          <div className="absolute -top-32 -right-10 w-68 h-64 bg-white rounded-full" />
          <div className="absolute top-8 right-8 w-20 h-20 rounded-full flex items-center justify-center shadow-md z-10">
            <img src={Dishut} alt="" />
          </div>
          {/* Bintang/Lingkaran kuning */}
          <div className="absolute top-32 right-80 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white text-3xl">✦</div>
          <div className="absolute top-48 right-76 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl">✦</div>

          {/* Kiri Bawah */}
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary rounded-full" />
          <div className="absolute -bottom-10 left-32 w-40 h-40 bg-yellow-500 rounded-full" />

          {/* Garis Vertikal Kiri */}
          <div className="absolute top-62.5 left-12 w-1 h-62.5 bg-customBlack rounded-full" />
          <div className="absolute top-127.5 left-10.75 w-3 h-3 bg-primary rounded-full" />
          <div className="absolute top-135 left-10.75 w-3 h-3 bg-primary rounded-full" />

          {/* BAGIAN KONTEN TENGAH */}
          <div className="relative z-10 flex-1 pt-6 pl-28 pr-75 flex flex-col">

            {/* Header Text */}
            <div className="text-center w-full mb-6 pl-16">
              <h2 className="text-xl font-bold tracking-wider">PEMERINTAH DAERAH PROVINSI JAWA BARAT</h2>
              <h1 className="text-3xl font-bold tracking-widest mt-1">DINAS KEHUTANAN</h1>
              <div className="flex justify-center gap-2 mt-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              <h1 className="text-6xl font-serif mt-3 tracking-widest text-customBlack" style={{ fontFamily: 'Georgia, serif' }}>
                SERTIFIKAT
              </h1>
              <h2 className="text-2xl font-bold tracking-[0.2em] mt-1">APRESIASI</h2>
            </div>

            {/* Penerima */}
            <div className="bg-primary text-white px-6 py-2 rounded-r-full w-64 -ml-28 mb-4 font-bold text-xl">
              Diberikan kepada
            </div>

            <div className="ml-4 text-lg font-bold">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-24 pb-2">Nama</td>
                    <td className="w-4 pb-2">:</td>
                    <td className="pb-2">{nama.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td className="align-top">Lokasi</td>
                    <td className="align-top">:</td>
                    <td className="font-normal text-base leading-snug">
                      {lokasi}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Paragraf */}
            <div className="mt-4 text-center text-[17px] font-semibold leading-relaxed pr-10">
              Sebagai Bentuk Apresiasi Atas Partisipasi Aktif dalam Gerakan Leuweung Hejo untuk
              Pelestarian Hutan dan Lingkungan di Jawa Barat, Melalui Kontribusi Nyata dalam Aksi
            </div>

            {/* Badge Jumlah Bibit */}
            <div className="mt-4 mx-auto bg-primary text-white px-8 py-2.5 rounded-full text-base font-bold shadow-md">
              Kontribusi Bibit Pohon dengan Kategori Perorangan sebanyak {jumlahBibit} bibit pohon.
            </div>

            {/* Tanda Tangan Area */}
            <div className="mt-4 ml-auto mr-12 flex flex-col items-center">
              <p className="mb-2 font-medium">{tanggal}</p>
              <p className="font-bold text-center leading-tight">
                a.n GUBERNUR JAWA BARAT<br />
                <span className="font-normal text-sm">Kepala Dinas Kehutanan Jawa Barat</span>
              </p>

              <div className="w-40 h-32 flex items-center justify-center my-1 relative">
                <div className="w-24 h-24 border-2 border-blue-800 rounded-full flex items-center justify-center text-blue-800 opacity-50 rotate-[-15deg]">
                  CAP RESMI
                </div>
              </div>

              <p className="font-bold border-b border-customBlack leading-tight">
                DODIT ARDIAN PANCAPANA, S.T., M.SC
              </p>
              <p className="text-sm">NIP. 19740405 199803 1 012</p>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-87.5 h-137.5 z-20 flex flex-col items-center justify-end">
            <div className="w-75 h-112.5">
              <img src={KDM} alt="Gubernur" />
            </div>
            <div className="absolute bottom-12 bg-yellow-500 w-[90%] py-2 rounded-full text-center">
              <p className="font-bold text-lg">H. DEDI MULYADI, S.H, M.M</p>
              <p className="font-semibold text-sm">Gubernur Jawa Barat</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
);

export default CertificateTemplate;
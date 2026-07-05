import { jsPDF } from "jspdf";
import CertificateTemplate from "@/assets/images/certificate-template.jpg"; // Pastikan path dan file ini ada

interface CertificateData {
  nama: string;
  lokasi: string;
  jumlahBibit: number;
  tanggal: string; // ex: "Bandung, 05 Juli 2026"
}

export const generateCertificate = async (data: CertificateData) => {
  return new Promise<void>((resolve, reject) => {
    // Buat instance PDF baru ukuran A4 Landscape
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });

    // Load gambar template
    const img = new Image();
    img.src = CertificateTemplate;
    img.crossOrigin = "Anonymous"; // Mencegah isu CORS jika gambar dari URL luar

    img.onload = () => {
      // Masukkan gambar full ke background A4 Landscape (297mm x 210mm)
      doc.addImage(img, "JPEG", 0, 0, 297, 210);

      // --- PENGATURAN TEKS ---
      // Catatan: Koordinat (X, Y) di bawah ini adalah estimasi. 
      // Silakan ubah angkanya sedikit-sedikit (dalam satuan milimeter) 
      // untuk mengepaskan posisinya dengan template aslimu.
      
      doc.setTextColor(30, 30, 30); // Warna teks dark grey / black
      
      // 1. Nama
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(data.nama.toUpperCase(), 85, 96); // X: 85mm dari kiri, Y: 96mm dari atas

      // 2. Lokasi
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      // splitTextToSize digunakan agar teks panjang otomatis turun ke baris baru (wrap)
      const splitLokasi = doc.splitTextToSize(data.lokasi, 130); // Lebar teks max 130mm
      doc.text(splitLokasi, 85, 104);

      // 3. Kalimat Kontribusi (Jumlah Bibit)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255); // Warna putih untuk teks di dalam pita hijau
      const teksKontribusi = `Kontribusi Bibit Pohon dengan Kategori Perorangan sebanyak ${data.jumlahBibit} bibit pohon.`;
      doc.text(teksKontribusi, 80, 138);

      // 4. Tanggal
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30); // Kembali ke hitam
      doc.text(data.tanggal, 120, 160); // Sesuaikan letak tanggal di atas tanda tangan

      // Simpan file
      doc.save(`Sertifikat_Apresiasi_${data.nama.replace(/\s+/g, '_')}.pdf`);
      resolve();
    };

    img.onerror = () => {
      reject(new Error("Gagal memuat template sertifikat."));
    };
  });
};
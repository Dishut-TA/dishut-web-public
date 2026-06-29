export interface User {
  id: number;
  nama_pengguna: string;
  email: string;
  nip: string;
  foto?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  message?: string;
}

export interface RegisterPayload {
  nama_pengguna: string;
  email: string;
  kata_sandi: string;
}

export interface TransactionData {
  id: string;
  activityName: string;
  date: string;
  status: 'Menunggu Konfirmasi' | 'Diverifikasi' | 'Dibatalkan' | 'Sudah Dibayar';
  amount: number;
  userName?: string;
  userPhone?: string;
  userEmail?: string;
  paymentMethod?: string;
}
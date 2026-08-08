export interface User {
  id: number;
  nama_pengguna: string;
  email: string;
  nip: string;
  foto?: string;
  no_telepon?: string;
  tanggal_lahir?: string;
  alamat?: string;
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

export interface TransactionDonasiData {
  id: string;
  tanggal: string;
  lahanProgram: string;
  namaProgram: string;
  jenisBibit: string;
  jumlah: number;
  amount: number;
  userName: string;
  userPhone?: string;
  userEmail?: string;
  paymentMethod: string;
  status: string;
  seedStatus?: string; 
  lat?: string;
  long?: string;
  fotoRealisasi?: string | null;
}

export interface TransactionData {
  id: string;
  date: string;
  userName: string;
  status: string;
  activityName: string;
  amount: number;
  paymentMethod?: string;
  userPhone: string;
  userEmail: string;
}
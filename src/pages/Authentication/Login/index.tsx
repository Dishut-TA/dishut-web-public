import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import InputField from '@/components/InputField';
import PasswordField from '@/components/PasswordField';
import Button from "@/components/Button";
import { loginUser } from '@/services/auth.service';
import { ToastError, ToastSuccess } from '@/utils/toast';
import type { LoginFormData, FormErrors } from '@/utils/interface';
import BG from '@/assets/images/Login.png';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState<LoginFormData>({ 
    email: '', 
    password: '' 
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!form.email || !form.password) {
      setErrors({ message: 'Email dan kata sandi wajib diisi' });
      ToastError('Mohon isi email dan kata sandi');
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser(form.email, form.password);
      
      // 1. Simpan ke LocalStorage
      localStorage.setItem('token', response.payload.token);
      localStorage.setItem('user', JSON.stringify(response.payload.user));
      
      // 2. Update Global State Context (Penting agar Navbar mendeteksi perubahan seketika)
      setUser(response.payload.user);
      
      // 3. Tampilkan Pesan Sukses
      ToastSuccess('Login Berhasil! Selamat datang.');
      
      // 4. Redirect
      setTimeout(() => navigate('/'), 800);
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Email atau Kata Sandi Salah';
      ToastError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row pt-20 md:pt-0"> 
      {/* Catatan: pt-20 ditambahkan agar form login tidak tertutup oleh navbar yang posisinya absolute */}
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        <form
          className="w-full max-w-md p-6 md:p-8 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-primary text-center mb-2">
            Selamat Datang Kembali
          </h2>
          <p className="text-center text-primary mb-6 text-sm">
            Silakan Masukkan Akunmu
          </p>

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="contoh@email.com"
          />

          <PasswordField
            label="Kata Sandi"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Masukkan kata sandi"
          />

          <p
            onClick={() => navigate('/forgot-password')}
            className="text-right text-sm mt-2 text-primary font-semibold cursor-pointer hover:underline"
          >
            Lupa Kata Sandi?
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-semibold transition-all p-4 rounded-full mt-6 
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-tertiary cursor-pointer shadow-md hover:shadow-lg'
              }`}
          >
            {isLoading ? 'Sedang Memproses...' : 'Masuk'}
          </button>

          <p className="text-center text-sm mt-4 text-primary">
            Tidak punya akun?{" "}
            <span
              onClick={() => navigate('/register')}
              className="font-bold cursor-pointer hover:underline transition-all"
            >
              Buat Akun
            </span>
          </p>

          <div className="flex items-center my-6">
            <div className="grow h-px bg-gray-200"></div>
            <span className="mx-3 text-gray-400 text-sm">Atau</span>
            <div className="grow h-px bg-gray-200"></div>
          </div>

          <Button
            variant="outline"
            fullWidth
            size="lg"
            leftIcon={<FcGoogle size={20} />}
            onClick={() => console.log("Login with Google")}
            className='font-semibold py-3 flex justify-center items-center gap-2'
          >
            Login dengan Google
          </Button>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2 bg-secondary">
        <img src={BG} alt="Login Background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
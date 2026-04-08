import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '@/components/InputField';
import PasswordField from '@/components/PasswordField';
import Alert from '@/components/Alert';
import BG from '@/assets/images/Login.png';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: any = {};

    if (!form.email) newErrors.email = 'Email wajib diisi';
    if (!form.password) newErrors.password = 'Kata sandi wajib diisi';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (form.email === 'admin@example.com' && form.password === '123456') {
        setStatus('success');
      } else {
        setStatus('error');
        setErrors({ password: 'Kata Sandi Salah' });
      }
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        <form
          className="w-full max-w-md p-6 md:p-8 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-primary text-center mb-2">
            Selamat Datang Kembali
          </h2>
          <p className="text-center text-primary mb-6">
            Silakan Masukkan Akunmu
          </p>

          {status === 'error' && (
            <Alert type="error" message="Email atau Kata Sandi Salah" />
          )}
          {status === 'success' && (
            <Alert type="success" message="Login Berhasil!" />
          )}

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

          {/* FORGOT PASSWORD */}
          <p
            onClick={() => navigate('/forgot-password')}
            className="text-right text-sm mt-1 text-primary font-semibold cursor-pointer hover:underline"
          >
            Lupa Kata Sandi?
          </p>

          <button
            type="submit"
            className="w-full bg-primary text-white transition-all cursor-pointer p-4 rounded-full mt-4 hover:bg-tertiary"
          >
            Masuk
          </button>

          <p className="text-center text-sm mt-4 text-primary">
            Tidak punya akun?{' '}
            <span
              onClick={() => navigate('/register')}
              className="font-bold cursor-pointer hover:underline transition-all"
            >
              Buat Akun
            </span>
          </p>
        </form>
      </div>
      <div className="hidden md:block md:w-1/2 bg-secondary">
        <img src={BG} alt="" />
      </div>
    </div>
  );
};

export default Login;
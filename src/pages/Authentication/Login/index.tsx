import React, { useState } from 'react';
import InputField from '../../../components/InputField';
import PasswordField from '../../../components/PasswordField';
import Alert from '../../../components/Alert';

const Login = () => {
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
      // Contoh logic API login
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
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-8 min-h-screen">
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-primary text-center mb-4">Selamat Datang Kembali</h2>
          <p className="text-center text-primary mb-4">Silakan Masukkan Akunmu</p>

          {status === 'error' && <Alert type="error" message="Email atau Kata Sandi Salah" />}
          {status === 'success' && <Alert type="success" message="Login Berhasil!" />}

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
          <p className="text-right text-sm mt-1 text-primary font-semibold cursor-pointer hover:underline">
            Lupa Kata Sandi?
          </p>
          <button
            type="submit"
            className="w-full bg-primary text-white p-4 rounded-full mt-4 hover:bg-tertiary"
          >
            Masuk
          </button>

          <p className="text-center text-sm mt-4 text-primary">
            Tidak punya akun? <span className="font-bold">Buat Akun</span>
          </p>
        </form>
      </div>
      <div className="flex-1 bg-secondary"></div>
    </div>
  );
};

export default Login;
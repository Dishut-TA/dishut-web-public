import React, { useState } from 'react';
import InputField from '@/components/InputField';
import PasswordField from '@/components/PasswordField';
import Alert from '@/components/Alert';
import SignUp from '@/assets/images/SignUp.png';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { FcGoogle } from 'react-icons/fc';
import { registerUser } from '@/services/auth.service';
import { AlertSuccess, AlertError } from '@/utils/alert';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<any>({});
    const [status, setStatus] = useState<'success' | 'error' | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { setUser } = useAuth(); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let newErrors: any = {};

        // Validasi HANYA untuk field yang dibutuhkan oleh API + Confirm Password
        if (!form.name) newErrors.name = 'Nama wajib diisi';
        if (!form.email) newErrors.email = 'Email wajib diisi';
        if (!form.password) newErrors.password = 'Kata sandi wajib diisi';
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Password tidak sama';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            setStatus(null);
            
            try {
                const response = await registerUser({
                    nama_pengguna: form.name,
                    email: form.email,
                    kata_sandi: form.password
                });

                setStatus('success');
                AlertSuccess("Pendaftaran Berhasil!", "Akun Anda telah berhasil dibuat.");

                localStorage.setItem('token', response.payload.token);
                localStorage.setItem('user', JSON.stringify(response.payload.user));
                setUser(response.payload.user);

                setTimeout(() => navigate('/'), 1500);

            } catch (error: any) {
                setStatus('error');
                const errorMessage = error.response?.data?.message || 'Gagal membuat akun, silakan coba lagi';
                AlertError("Pendaftaran Gagal", errorMessage);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <div className="hidden md:block md:w-1/2 bg-secondary">
                <img src={SignUp} className='object-cover mx-auto m-auto' alt="Sign Up" />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
                <form className="w-full max-w-md p-6 md:p-8 rounded-2xl" onSubmit={handleSubmit}>

                    <h2 className="text-2xl font-bold text-primary text-center mb-6">
                        Buat Akun
                    </h2>

                    {status === 'success' && <Alert type="success" message="Akun Berhasil Dibuat!" />}
                    {status === 'error' && <Alert type="error" message="Akun Gagal Dibuat!" />}

                    <InputField label="Nama Lengkap" placeholder='Nama Lengkap' name="name" value={form.name} onChange={handleChange} error={errors.name} />
                    <InputField label="Email" placeholder='Cth: example@gmail.com' name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />

                    <div className="flex flex-col md:flex-row gap-4">
                        <InputField
                            label="No. Telepon (Opsional)"
                            name="phone"
                            placeholder='089xxxxxxxxx'
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Tanggal Lahir (Opsional)"
                            name="dob"
                            type="date"
                            value={form.dob}
                            onChange={handleChange}
                        />
                    </div>

                    <InputField label="Alamat (Opsional)" placeholder='Jl. Sekeloa Tengah No. 27' name="address" value={form.address} onChange={handleChange} />

                    <PasswordField placeholder='*********' label="Kata Sandi" name="password" value={form.password} onChange={handleChange} error={errors.password} />
                    <PasswordField placeholder='*********' label="Konfirmasi Kata Sandi" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`w-full transition-all text-white p-4 rounded-full mt-4 font-semibold
                            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-tertiary cursor-pointer'}
                        `}
                    >
                        {isLoading ? 'Memproses...' : 'Buat Akun'}
                    </button>

                    <p className="text-center text-sm mt-4 text-primary">
                        Sudah punya akun? <span className='font-bold cursor-pointer transition-all hover:text-tertiary' onClick={() => navigate("/login")}>Masuk</span>
                    </p>
                    
                    <div className="flex items-center my-6">
                        <div className="grow h-px bg-customBlack"></div>
                        <span className="mx-3 text-customBlack text-sm">Or</span>
                        <div className="grow h-px bg-customBlack"></div>
                    </div>
            
                    <Button
                        variant="outline"
                        fullWidth
                        size="lg"
                        leftIcon={<FcGoogle size={20} />}
                        onClick={() => console.log("Login with Google")}
                        className='font-semibold flex justify-center items-center'
                    >
                        Sign Up with Google
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Register;
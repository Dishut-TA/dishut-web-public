import React, { useState } from 'react';
import InputField from '../../../components/InputField';
import PasswordField from '../../../components/PasswordField';
import Alert from '../../../components/Alert';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let newErrors: any = {};

        if (!form.name) newErrors.name = 'Nama wajib diisi';
        if (!form.email) newErrors.email = 'Email wajib diisi';
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Password tidak sama';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setStatus('success');
            // logic register API
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <div className="hidden md:block md:w-1/2 bg-secondary"></div>
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
                            label="No. Telepon"
                            name="phone"
                            placeholder='089xxxxxxxxx'
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Tanggal Lahir"
                            name="dob"
                            type="date"
                            value={form.dob}
                            onChange={handleChange}
                        />
                    </div>

                    <InputField label="Alamat" placeholder='Jl. Sekeloa Tengah No. 27' name="address" value={form.address} onChange={handleChange} />

                    <PasswordField placeholder='*********' label="Kata Sandi" name="password" value={form.password} onChange={handleChange} error={errors.password} />
                    <PasswordField placeholder='*********' label="Konfirmasi Kata Sandi" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

                    <button type="submit" className="w-full bg-primary text-white p-4 rounded-full mt-4 hover:bg-tertiary">
                        Buat Akun
                    </button>

                    <p className="text-center text-sm mt-4 text-primary">
                        Sudah punya akun? <span className='font-bold'>Masuk</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
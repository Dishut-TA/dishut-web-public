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
        <div className="flex h-screen overflow-hidden">
            <div className="flex-1 bg-secondary"></div>
            <div className="flex-1 flex items-center justify-center p-8 min-h-screen">
                <form className="w-full p-8" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-primary text-center mb-6">Buat Akun</h2>

                    {status === 'success' && <Alert type="success" message="Akun Berhasil Dibuat!" />}
                    {status === 'error' && <Alert type="error" message="Akun Gagal Dibuat!" />}

                    <InputField label="Nama Lengkap" placeholder='Nama Lengkap' name="name" value={form.name} onChange={handleChange} error={errors.name} />
                    <InputField label="Email" placeholder='Cth: example@gmail.com' name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <InputField
                                label="No. Telepon"
                                name="phone"
                                placeholder='089xxxxxxxxx'
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex-1">
                            <InputField
                                label="Tanggal Lahir"
                                name="dob"
                                type="date"
                                value={form.dob}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <InputField label="Alamat" placeholder='Jl. Sekeloa Tengah No. 27' name="address" value={form.address} onChange={handleChange} />
                    <PasswordField placeholder='*********' label="Kata Sandi" name="password" value={form.password} onChange={handleChange} error={errors.password} />
                    <PasswordField placeholder='*********' label="Konfirmasi Kata Sandi" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

                    <button type="submit" className="w-full bg-primary text-white p-4 rounded-full mt-4 hover:bg-tertiary">
                        Buat Akun
                    </button>

                    <p className="text-center text-sm mt-4 text-primary">Sudah punya akun? <span className='font-bold'>Masuk</span></p>
                </form>
            </div>
        </div>
    );
};

export default Register;
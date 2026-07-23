import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserProfile, updateUserProfile } from '@/services/user.service';
import { ToastSuccess, ToastError } from '@/utils/toast';
import { AlertConfirm } from '@/utils/alert'; // Tambahan Import Alert
import { FiCalendar, FiEye, FiEyeOff } from 'react-icons/fi';
import ProfileImagePicker from './components/ProfileImagePicker';
import ProfileInput from './components/ProfileInput';
import LoadingScreen from '@/components/LoadingScreen';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    nama_pengguna: '',
    no_telepon: '',
    tanggal_lahir: '',
    alamat: '',
    email: '',
    kata_sandi: '',
  });
  const [previewFoto, setPreviewFoto] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        const userData = response.payload || response.data || response; 
        
        setFormData({
          nama_pengguna: userData.nama_pengguna || '',
          no_telepon: userData.no_telepon || '',
          tanggal_lahir: userData.tanggal_lahir || '',
          alamat: userData.alamat || '',
          email: userData.email || '',
          kata_sandi: '',
        });
        setPreviewFoto(userData.foto || null);
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        ToastError("Gagal mengambil data profil terbaru");
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewFoto(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    const isConfirmed = await AlertConfirm(
      "Simpan Perubahan",
      "Apakah Anda yakin ingin menyimpan perubahan profil ini?",
      "Ya, Simpan",
      "Batal"
    );
    if (!isConfirmed) return; 
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append('nama_pengguna', formData.nama_pengguna);
      data.append('no_telepon', formData.no_telepon);
      data.append('tanggal_lahir', formData.tanggal_lahir);
      data.append('alamat', formData.alamat);
      data.append('email', formData.email);
      
      if (formData.kata_sandi) {
        data.append('kata_sandi', formData.kata_sandi);
      }
      if (selectedFile) {
        data.append('foto', selectedFile);
      }
      
      const response = await updateUserProfile(user.id, data);
      const updatedUser = response.payload || response.data || response;
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSelectedFile(null);
      setFormData(prev => ({ ...prev, kata_sandi: '' }));

      ToastSuccess('Profil berhasil diperbarui!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Gagal memperbarui profil.';
      ToastError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-[fadeIn_0.5s_ease-in-out]">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-12">
        <ProfileImagePicker 
          previewFoto={previewFoto} 
          userName={formData.nama_pengguna} 
          onFileChange={handleFileChange} 
        />
        <div className="w-full md:w-2/3 space-y-6">
          <ProfileInput 
            label="Nama Lengkap" name="nama_pengguna" 
            value={formData.nama_pengguna} onChange={handleInputChange} 
            placeholder="Masukkan nama lengkap" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput 
              label="No. Telepon" name="no_telepon" 
              value={formData.no_telepon} onChange={handleInputChange} 
              placeholder="08xxxxxxxxxx" 
            />
            <ProfileInput 
              label="Tanggal Lahir" name="tanggal_lahir" type="date"
              value={formData.tanggal_lahir} onChange={handleInputChange} 
              icon={<FiCalendar size={18} />} 
            />
          </div>

          <ProfileInput 
            label="Alamat" name="alamat" 
            value={formData.alamat} onChange={handleInputChange} 
            placeholder="Masukkan alamat lengkap" 
          />

          <ProfileInput 
            label="Email" name="email" type="email"
            value={formData.email} onChange={handleInputChange} 
            placeholder="email@example.com" 
          />

          <ProfileInput 
            label="Ganti Kata Sandi" name="kata_sandi" 
            type={showPassword ? "text" : "password"}
            value={formData.kata_sandi} onChange={handleInputChange} 
            placeholder="Isi jika ingin mengganti kata sandi" 
            rightAction={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            }
          />

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white font-semibold py-4 rounded-full transition-all shadow-md active:scale-[0.98] ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-tertiary'
              }`}
            >
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
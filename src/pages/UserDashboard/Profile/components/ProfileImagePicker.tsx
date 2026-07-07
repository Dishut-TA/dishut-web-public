import React, { useRef } from 'react';
import { FiEdit2 } from 'react-icons/fi';

interface ProfileImagePickerProps {
  previewFoto: string | null;
  userName: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({ 
  previewFoto, 
  userName, 
  onFileChange 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'User')}&background=1B5E20&color=ffffff&size=200`;

  return (
    <div className="w-full md:w-1/3 flex flex-col items-center pt-4">
      <div className="relative">
        <img
          src={previewFoto || fallbackImage}
          alt="Profile"
          className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg"
        />
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={onFileChange}
        accept="image/*"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary hover:text-tertiary transition-colors"
      >
        <FiEdit2 size={16} /> Ganti foto profile
      </button>
    </div>
  );
};

export default ProfileImagePicker;
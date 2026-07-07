import React from 'react';

interface ProfileInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  rightAction?: React.ReactNode;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  icon,
  rightAction
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full rounded-full border border-secondary bg-gray-50/50 px-5 py-3.5 text-sm text-primary outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white ${icon || rightAction ? 'appearance-none' : ''}`}
          placeholder={placeholder}
        />
        
        {icon && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/60 pointer-events-none">
            {icon}
          </div>
        )}

        {rightAction && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary transition-colors cursor-pointer">
            {rightAction}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInput;
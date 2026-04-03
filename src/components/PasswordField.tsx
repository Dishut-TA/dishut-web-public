import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error?: string;
  placeholder?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label, placeholder, name, value, onChange, error }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-primary mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full placeholder:text-primary px-4 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary 
            ${error ? 'border-red-500' : 'border-secondary'}`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-3 transition-all cursor-pointer text-primary hover:text-primary"
        >
          {show ? <HiEyeOff size={20} /> : <HiEye size={20} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordField;
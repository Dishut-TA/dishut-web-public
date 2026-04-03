import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label,name,  type = "text", value, onChange, placeholder, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-primary mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border-2 placeholder:text-primary rounded-full focus:outline-none focus:ring-2 focus:ring-secondary 
          ${error ? 'border-red-500' : 'border-secondary'}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
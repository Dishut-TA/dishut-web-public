import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const bgColor = type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
  return (
    <div className={`px-4 py-2 rounded-md mb-4 ${bgColor}`}>
      {message}
    </div>
  );
};

export default Alert;
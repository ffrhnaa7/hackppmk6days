import React from 'react';

interface ColorfulInputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const ColorfulInput: React.FC<ColorfulInputProps> = ({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  icon,
  className = '',
  required = false,
  disabled = false
}) => {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mint-500">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full rounded-xl border border-mint-200 bg-white/90 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-mint-500 focus:border-transparent hover:bg-white hover:border-mint-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          icon ? 'pl-10 pr-4' : 'px-4'
        } py-3 text-gray-700 placeholder-gray-400`}
      />
    </div>
  );
};

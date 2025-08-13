import React from 'react';

interface ColorfulInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  className?: string;
}

export const ColorfulInput: React.FC<ColorfulInputProps> = ({
  placeholder,
  value,
  onChange,
  icon,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border border-gray-300 bg-white/90 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white ${
          icon ? 'pl-10 pr-4' : 'px-4'
        } py-3`}
      />
    </div>
  );
};

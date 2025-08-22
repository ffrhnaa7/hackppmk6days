import React from 'react';

interface ColorfulInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

export const ColorfulInput: React.FC<ColorfulInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  className = '',
  disabled = false,
  required = false,
  name,
  id
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        name={name}
        id={id}
        className={`
          w-full 
          ${icon ? 'pl-12' : 'pl-4'} 
          pr-4 
          py-3 
          border-2 
          border-gray-200 
          rounded-xl 
          focus:ring-2 
          focus:ring-mint-500 
          focus:border-transparent 
          transition-all 
          duration-300 
          placeholder-gray-400
          disabled:bg-gray-100
          disabled:cursor-not-allowed
          hover:border-mint-300
          ${className}
        `}
      />
    </div>
  );
};

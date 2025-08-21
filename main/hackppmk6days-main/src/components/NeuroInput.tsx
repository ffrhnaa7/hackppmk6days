import React from 'react';

interface NeuroInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const NeuroInput: React.FC<NeuroInputProps> = ({
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  icon
}) => {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neuro-500">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full bg-neuro-bg rounded-neuro shadow-neuro-inset
          px-4 py-3 text-neuro-700 placeholder-neuro-400
          border-0 outline-none focus:shadow-neuro-pressed
          transition-all duration-200
          ${icon ? 'pl-12' : 'pl-4'}
        `}
      />
    </div>
  );
};

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ModernInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
}

export const ModernInput: React.FC<ModernInputProps> = ({
  placeholder,
  value,
  onChange,
  type = 'text',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  error,
  label
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`input-modern focus-modern ${
            Icon && iconPosition === 'left' ? 'pl-12' : ''
          } ${
            Icon && iconPosition === 'right' ? 'pr-12' : ''
          } ${
            error ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''
          }`}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

import React from 'react';

interface NeuroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'pressed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const NeuroButton: React.FC<NeuroButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200 font-medium border-0 cursor-pointer';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg'
  };

  const variantClasses = {
    primary: disabled 
      ? 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed'
      : 'bg-gray-100 text-gray-700 shadow-md hover:shadow-lg active:shadow-sm',
    secondary: disabled
      ? 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'
      : 'bg-gray-200 text-gray-600 shadow-sm hover:shadow-md active:shadow-none',
    pressed: 'bg-gray-100 text-gray-600 shadow-inner'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

import React from 'react';

interface ColorfulButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  title?: string;
}

export const ColorfulButton: React.FC<ColorfulButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  title
}) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-300 border-0 cursor-pointer transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg'
  };

  const variantClasses = {
    primary: disabled 
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700',
    secondary: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700',
    accent: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700',
    success: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700',
    outline: disabled
      ? 'border-2 border-gray-300 text-gray-500 bg-transparent shadow-none cursor-not-allowed transform-none'
      : 'border-2 border-blue-500 text-blue-600 bg-transparent hover:bg-blue-50 hover:border-blue-600',
    ghost: disabled
      ? 'text-gray-400 bg-transparent shadow-none cursor-not-allowed transform-none'
      : 'text-blue-600 bg-transparent hover:bg-blue-50 shadow-none hover:shadow-sm'
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

import React from 'react';

interface ColorfulButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const ColorfulButton: React.FC<ColorfulButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'rounded-xl font-semibold transition-all duration-300 border-0 cursor-pointer transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: disabled 
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-primary text-white hover:from-blue-600 hover:to-blue-700',
    secondary: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-secondary text-white hover:from-mint-600 hover:to-mint-700',
    accent: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-accent text-white hover:from-blue-500 hover:to-mint-500',
    outline: disabled
      ? 'border-2 border-gray-300 text-gray-500 bg-transparent shadow-none cursor-not-allowed transform-none'
      : 'border-2 border-blue-500 text-blue-600 bg-transparent hover:bg-blue-50 hover:border-blue-600',
    ghost: disabled
      ? 'text-gray-400 bg-transparent shadow-none cursor-not-allowed transform-none'
      : 'text-blue-600 bg-transparent hover:bg-blue-50 shadow-none hover:shadow-md'
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

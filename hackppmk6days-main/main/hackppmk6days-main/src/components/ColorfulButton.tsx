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
  const baseClasses = 'rounded-xl font-semibold transition-all duration-300 border-0 cursor-pointer transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: disabled 
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-primary text-white hover:shadow-mint-500/25 mint-glow',
    secondary: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-secondary text-white hover:shadow-ocean-500/25',
    accent: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-accent text-white hover:shadow-mint-400/25',
    success: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-success text-white hover:shadow-sage-500/25',
    outline: disabled
      ? 'border-2 border-gray-300 text-gray-500 bg-transparent shadow-none cursor-not-allowed transform-none'
      : 'border-2 border-mint-500 text-mint-600 bg-transparent hover:bg-mint-50 hover:border-mint-600',
    ghost: disabled
      ? 'text-gray-400 bg-transparent shadow-none cursor-not-allowed transform-none'
      : 'text-mint-600 bg-transparent hover:bg-mint-50 shadow-none hover:shadow-md'
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

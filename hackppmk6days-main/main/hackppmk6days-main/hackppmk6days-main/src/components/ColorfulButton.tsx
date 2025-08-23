import React from 'react';
import { cn } from '../utils/cn';

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
      : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:shadow-purple-500/25',
    secondary: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 hover:shadow-blue-500/25',
    accent: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-400/25',
    success: disabled
      ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed transform-none'
      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:shadow-green-500/25',
    outline: disabled
      ? 'border-2 border-gray-300 text-gray-500 bg-transparent shadow-none cursor-not-allowed transform-none'
      : 'border-2 border-indigo-500 text-indigo-600 bg-transparent hover:bg-indigo-50 hover:border-indigo-600',
    ghost: disabled
      ? 'text-gray-400 bg-transparent shadow-none cursor-not-allowed transform-none'
      : 'text-indigo-600 bg-transparent hover:bg-indigo-50 shadow-none hover:shadow-md'
  };

  return (
    <button
      type={type}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

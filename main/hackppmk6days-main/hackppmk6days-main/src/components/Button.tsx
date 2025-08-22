import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'gradient' | 'glass' | 'bordered' | 'emerald' | 'sky' | 'purple' | 'rose';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg',
    gradient: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 focus:ring-purple-500 shadow-lg hover:shadow-xl',
    glass: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 focus:ring-white/50',
    bordered: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 focus:ring-emerald-500 shadow-lg hover:shadow-xl',
    sky: 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 focus:ring-sky-500 shadow-lg hover:shadow-xl',
    purple: 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 focus:ring-violet-500 shadow-lg hover:shadow-xl',
    rose: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 focus:ring-rose-500 shadow-lg hover:shadow-xl'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

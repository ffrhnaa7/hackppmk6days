import React from 'react';
import { cn } from '../utils/cn';

interface ColorfulCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'bordered' | 'emerald' | 'sky' | 'purple' | 'rose';
  hover?: boolean;
}

export const ColorfulCard: React.FC<ColorfulCardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = true
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white shadow-lg border border-gray-100',
    gradient: 'bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-xl',
    glass: 'bg-white/80 backdrop-blur-lg shadow-xl border border-white/20',
    bordered: 'bg-white border-2 border-indigo-200 shadow-md',
    emerald: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 shadow-xl border border-emerald-100',
    sky: 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 shadow-xl border border-sky-100',
    purple: 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 shadow-xl border border-purple-100',
    rose: 'bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 shadow-xl border border-rose-100'
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-[1.02]' : '';

  return (
    <div className={cn(
      baseClasses,
      variantClasses[variant],
      hoverClasses,
      className
    )}>
      {children}
    </div>
  );
};

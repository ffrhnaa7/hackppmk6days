import React from 'react';

interface ColorfulCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'bordered';
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
    gradient: 'bg-gradient-to-br from-white via-mint-50 to-blue-50 shadow-xl',
    glass: 'bg-white/80 backdrop-blur-lg shadow-xl border border-white/20',
    bordered: 'bg-white border-2 border-mint-200 shadow-md'
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-[1.02]' : '';

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

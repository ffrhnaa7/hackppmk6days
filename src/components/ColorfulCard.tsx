import React from 'react';

interface ColorfulCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
}

export const ColorfulCard: React.FC<ColorfulCardProps> = ({
  children,
  className = '',
  variant = 'default'
}) => {
  const baseClasses = 'rounded-2xl shadow-lg transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white border border-gray-100',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
    gradient: 'bg-gradient-to-br from-white to-blue-50 border border-blue-100'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

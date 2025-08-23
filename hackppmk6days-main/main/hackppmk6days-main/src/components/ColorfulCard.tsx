import React from 'react';

interface ColorfulCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'mint' | 'ocean';
  hover?: boolean;
}

export const ColorfulCard: React.FC<ColorfulCardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = true
}) => {
  const baseClasses = `rounded-2xl shadow-lg transition-all duration-300 ${hover ? 'hover:shadow-xl hover:scale-105' : ''}`;
  
  const variantClasses = {
    default: 'bg-white border border-mint-100',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
    gradient: 'bg-gradient-card border border-mint-100',
    mint: 'bg-gradient-to-br from-mint-50 to-mint-100 border border-mint-200',
    ocean: 'bg-gradient-to-br from-ocean-50 to-ocean-100 border border-ocean-200'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

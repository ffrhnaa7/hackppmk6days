import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ModernCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'floating' | 'gradient';
  className?: string;
  hover?: boolean;
  glow?: boolean;
  icon?: LucideIcon;
  iconColor?: string;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  variant = 'default',
  className = '',
  hover = true,
  glow = false,
  icon: Icon,
  iconColor = 'text-mint-500'
}) => {
  const baseClasses = 'relative overflow-hidden';
  
  const variantClasses = {
    default: 'card-floating',
    glass: 'card-glass',
    floating: 'card-floating',
    gradient: 'bg-gradient-modern-2 rounded-2xl shadow-modern border border-white/30'
  };

  const hoverClasses = hover ? 'hover-lift hover-glow' : '';
  const glowClasses = glow ? 'mint-glow' : '';

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${glowClasses} ${className}`}>
      {Icon && (
        <div className="absolute top-4 right-4 opacity-10">
          <Icon className={`h-16 w-16 ${iconColor}`} />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
      {glow && (
        <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-2xl"></div>
      )}
    </div>
  );
};

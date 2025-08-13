import React from 'react';

interface NeuroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'pressed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const NeuroButton: React.FC<NeuroButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'rounded-neuro transition-all duration-200 font-medium border-0 cursor-pointer';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: disabled 
      ? 'bg-neuro-bg text-neuro-400 shadow-none cursor-not-allowed'
      : 'bg-neuro-bg text-neuro-700 shadow-neuro hover:shadow-neuro-sm active:shadow-neuro-pressed',
    secondary: disabled
      ? 'bg-neuro-200 text-neuro-400 shadow-none cursor-not-allowed'
      : 'bg-neuro-200 text-neuro-600 shadow-neuro-sm hover:shadow-neuro active:shadow-neuro-pressed',
    pressed: 'bg-neuro-bg text-neuro-600 shadow-neuro-pressed'
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

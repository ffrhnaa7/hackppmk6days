import React from 'react';

interface NeuroCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'elevated' | 'inset' | 'flat';
  padding?: 'sm' | 'md' | 'lg';
}

export const NeuroCard: React.FC<NeuroCardProps> = ({
  children,
  className = '',
  variant = 'elevated',
  padding = 'md'
}) => {
  const baseClasses = 'bg-neuro-bg rounded-neuro';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantClasses = {
    elevated: 'shadow-neuro',
    inset: 'shadow-neuro-inset',
    flat: 'shadow-none border border-neuro-300'
  };

  return (
    <div className={`${baseClasses} ${paddingClasses[padding]} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 600
}) => {
  const { ref, isVisible } = useScrollAnimation();

  const animationClasses = {
    fadeUp: isVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-8',
    fadeIn: isVisible 
      ? 'opacity-100' 
      : 'opacity-0',
    slideLeft: isVisible 
      ? 'opacity-100 translate-x-0' 
      : 'opacity-0 translate-x-8',
    slideRight: isVisible 
      ? 'opacity-100 translate-x-0' 
      : 'opacity-0 -translate-x-8',
    scale: isVisible 
      ? 'opacity-100 scale-100' 
      : 'opacity-0 scale-95'
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${animationClasses[animation]} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

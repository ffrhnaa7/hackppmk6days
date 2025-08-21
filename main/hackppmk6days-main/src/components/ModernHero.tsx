import React from 'react';
import { ModernButton } from './ModernButton';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ModernHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  backgroundImage?: string;
}

export const ModernHero: React.FC<ModernHeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-modern-3 py-24 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-mint-500/20 via-ocean-500/20 to-sage-500/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-mint-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sage-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
            <Sparkles className="h-5 w-5 text-white" />
            <span className="text-white font-semibold text-sm">{subtitle}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
            <span className="block">{title}</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
            {description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <ModernButton
              variant="primary"
              size="xl"
              icon={ArrowRight}
              iconPosition="right"
              onClick={primaryAction.onClick}
              className="bg-white text-mint-600 hover:bg-mint-50 shadow-2xl hover:shadow-3xl"
            >
              {primaryAction.label}
            </ModernButton>
            
            {secondaryAction && (
              <ModernButton
                variant="outline"
                size="xl"
                onClick={secondaryAction.onClick}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md"
              >
                {secondaryAction.label}
              </ModernButton>
            )}
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-white/40 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-white/30 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/50 rounded-full animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    </section>
  );
};

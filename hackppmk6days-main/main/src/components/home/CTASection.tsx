import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CTASectionProps {
  onStartNow: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onStartNow }) => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-r from-mint-500 via-ocean-500 to-sage-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('오늘부터 시작하세요', 'Start Today')}
        </h2>
        <p className="text-xl text-white/90 mb-12">
          {t(
            '더 나은 삶의 균형을 위한 첫 걸음을 내딛으세요',
            'Take the first step towards a better life balance'
          )}
        </p>
        
        <button
          onClick={onStartNow}
          className="group inline-flex items-center px-10 py-5 bg-white text-mint-600 font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
        >
          {t('무료로 시작하기', 'Start Free')}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <div className="mt-8 flex items-center justify-center text-white/80">
          <Heart className="h-5 w-5 mr-2 fill-current" />
          <span>{t('신용카드 불필요', 'No credit card required')}</span>
        </div>
      </div>
    </section>
  );
};

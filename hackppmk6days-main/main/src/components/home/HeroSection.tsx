import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroSectionProps {
  onStartNow: () => void;
  onShowProjectInfo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartNow, onShowProjectInfo }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-mint-500 via-ocean-500 to-sage-500 py-32">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-mint-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-ocean-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-white font-semibold">PPMK Hackathon 2024</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight">
            6DAYS
          </h1>
          <p className="text-2xl md:text-3xl text-white/95 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            {t(
              '매주 6일은 최대한 활동적으로, 1일은 완전한 휴식으로. 새로운 라이프스타일을 시작하세요.',
              'Live 6 days to the fullest, rest 1 day completely. Start your new lifestyle today.'
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button
              onClick={onStartNow}
              className="group relative px-10 py-5 bg-white text-mint-600 font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                {t('지금 시작하기', 'Start Now')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-mint-500 to-ocean-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </button>
            <button
              onClick={onShowProjectInfo}
              className="px-10 py-5 bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-3xl border-2 border-white/30 hover:bg-white/30 transform hover:scale-105 transition-all duration-300"
            >
              {t('프로젝트 소개', 'About Project')}
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-white/80">{t('활성 사용자', 'Active Users')}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-4xl font-bold text-white mb-2">87%</div>
            <div className="text-white/80">{t('생산성 향상', 'Productivity Boost')}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-4xl font-bold text-white mb-2">4.9★</div>
            <div className="text-white/80">{t('사용자 평점', 'User Rating')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

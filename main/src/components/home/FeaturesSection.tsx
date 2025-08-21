import React from 'react';
import { Zap, Coffee, Target } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-white" />,
      gradient: 'from-mint-500 to-mint-600',
      title: { ko: '6일 활동 모드', en: '6-Day Active Mode' },
      description: { ko: '매주 6일간 최대한 활동적으로 살아보세요', en: 'Live your most active life for 6 days each week' },
      stats: '87%',
      statsLabel: { ko: '생산성 향상', en: 'Productivity Boost' }
    },
    {
      icon: <Coffee className="h-10 w-10 text-white" />,
      gradient: 'from-ocean-500 to-ocean-600',
      title: { ko: '1일 휴식 모드', en: '1-Day Rest Mode' },
      description: { ko: '완전한 휴식으로 재충전하는 하루', en: 'One day of complete rest and recharge' },
      stats: '100%',
      statsLabel: { ko: '회복률', en: 'Recovery Rate' }
    },
    {
      icon: <Target className="h-10 w-10 text-white" />,
      gradient: 'from-sage-500 to-sage-600',
      title: { ko: '목표 달성', en: 'Goal Achievement' },
      description: { ko: '체계적인 주간 계획으로 목표를 달성하세요', en: 'Achieve your goals with systematic weekly planning' },
      stats: '3x',
      statsLabel: { ko: '성공률', en: 'Success Rate' }
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('왜 6DAYS인가?', 'Why 6DAYS?')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(
              '과학적으로 설계된 주간 리듬으로 최고의 성과와 완벽한 휴식을 동시에',
              'Scientifically designed weekly rhythm for peak performance and perfect rest'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              
              <div className="relative p-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t(feature.title.ko, feature.title.en)}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t(feature.description.ko, feature.description.en)}
                </p>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mint-500 to-ocean-500">
                    {feature.stats}
                  </span>
                  <span className="text-sm text-gray-500">
                    {t(feature.statsLabel.ko, feature.statsLabel.en)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

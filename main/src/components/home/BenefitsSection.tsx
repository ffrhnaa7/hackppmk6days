import React from 'react';
import { Brain, Activity, Rocket } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const BenefitsSection: React.FC = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: { ko: '정신 건강', en: 'Mental Health' },
      description: { ko: '번아웃 방지와 스트레스 관리', en: 'Prevent burnout and manage stress' }
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: { ko: '신체 건강', en: 'Physical Health' },
      description: { ko: '균형잡힌 활동과 휴식', en: 'Balanced activity and rest' }
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: { ko: '생산성', en: 'Productivity' },
      description: { ko: '지속가능한 고성능 유지', en: 'Sustainable high performance' }
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-mint-50 via-ocean-50 to-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('당신이 얻게 될 변화', 'The Changes You\'ll Experience')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-mint-600 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t(benefit.title.ko, benefit.title.en)}
              </h3>
              <p className="text-gray-600">
                {t(benefit.description.ko, benefit.description.en)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

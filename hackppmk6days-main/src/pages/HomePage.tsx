import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Zap, TrendingUp, Clock, Target, X, Award, Code, Heart, ArrowRight, Sparkles, Star } from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { ModernCard } from '../components/ModernCard';
import { ModernButton } from '../components/ModernButton';
import { ModernHero } from '../components/ModernHero';
import { ModernStats } from '../components/ModernStats';
import { AnimatedSection } from '../components/AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';
import { useStaggeredAnimation } from '../hooks/useScrollAnimation';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showProjectInfo, setShowProjectInfo] = useState(false);

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-mint-600" />,
      title: { ko: '6일 활동 모드', en: '6-Day Active Mode' },
      description: { ko: '매주 6일간 최대한 활동적으로 살아보세요', en: 'Live your most active life for 6 days each week' }
    },
    {
      icon: <Clock className="h-8 w-8 text-ocean-600" />,
      title: { ko: '1일 휴식 모드', en: '1-Day Rest Mode' },
      description: { ko: '완전한 휴식으로 재충전하는 하루', en: 'One day of complete rest and recharge' }
    },
    {
      icon: <Target className="h-8 w-8 text-sage-600" />,
      title: { ko: '목표 달성', en: 'Goal Achievement' },
      description: { ko: '체계적인 주간 계획으로 목표를 달성하세요', en: 'Achieve your goals with systematic weekly planning' }
    }
  ];

  const stats = [
    { 
      number: '6', 
      label: { ko: '활동일', en: 'Active Days' }, 
      color: 'text-mint-700',
      icon: Zap,
      trend: { value: 15, isPositive: true }
    },
    { 
      number: '1', 
      label: { ko: '휴식일', en: 'Rest Day' }, 
      color: 'text-ocean-700',
      icon: Clock,
      trend: { value: 8, isPositive: true }
    },
    { 
      number: '100%', 
      label: { ko: '라이프스타일', en: 'Lifestyle' }, 
      color: 'text-sage-700',
      icon: Target,
      trend: { value: 23, isPositive: true }
    }
  ];

  const modernStats = [
    {
      label: t('활성 사용자', 'Active Users'),
      value: '2.5K+',
      icon: Users,
      color: 'text-mint-700',
      trend: { value: 12, isPositive: true }
    },
    {
      label: t('완료된 목표', 'Goals Completed'),
      value: '15.2K',
      icon: Target,
      color: 'text-ocean-700',
      trend: { value: 8, isPositive: true }
    },
    {
      label: t('만족도', 'Satisfaction'),
      value: '98%',
      icon: Star,
      color: 'text-sage-700',
      trend: { value: 5, isPositive: true }
    }
  ];

  const { containerRef: featuresRef, visibleItems: featuresVisible } = useStaggeredAnimation(3, 200);

  const handleStartNow = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    setShowProjectInfo(true);
  };

  const ProjectInfoModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <ModernCard variant="glass" className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-modern">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 heading-modern">
                  {t('프로젝트 소개', 'About This Project')}
                </h2>
                <p className="text-mint-700 font-semibold">PPMK Hackathon 2024</p>
              </div>
            </div>
            <button
              onClick={() => setShowProjectInfo(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors hover-scale"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Creator Info */}
          <ModernCard variant="gradient" className="p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-modern">
                <span className="text-2xl font-bold text-white">F</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 heading-modern">Farhana</h3>
                <p className="text-gray-700">
                  {t('개발자 & 디자이너', 'Developer & Designer')}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Code className="h-4 w-4 text-mint-700" />
                  <span className="text-sm text-mint-700 font-medium">PPMK Hackathon Participant</span>
                </div>
              </div>
            </div>
            <p className="text-gray-800 leading-relaxed">
              {t(
                '안녕하세요! 저는 Farhana입니다. 이 프로젝트는 PPMK 해커톤을 위해 개발된 6DAYS 라이프스타일 플랫폼입니다. 현대인들의 번아웃을 해결하고 지속가능한 생산성을 제공하는 것이 목표입니다.',
                'Hello! I\'m Farhana. This project is the 6DAYS lifestyle platform developed for the PPMK Hackathon. The goal is to solve modern burnout and provide sustainable productivity.'
              )}
            </p>
          </ModernCard>

          {/* Project Details */}
          <div className="space-modern">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center heading-modern">
                <Target className="h-5 w-5 text-mint-700 mr-2" />
                {t('프로젝트 목표', 'Project Goals')}
              </h4>
              <div className="space-y-2 text-gray-800">
                <p>• {t('주 6일 활동, 1일 완전 휴식의 새로운 라이프스타일 제안', 'Propose a new lifestyle of 6 days active, 1 day complete rest')}</p>
                <p>• {t('번아웃 방지와 지속가능한 생산성 향상', 'Prevent burnout and improve sustainable productivity')}</p>
                <p>• {t('개인 맞춤형 활동 및 휴식 계획 제공', 'Provide personalized activity and rest planning')}</p>
                <p>• {t('커뮤니티 기반 동기부여 시스템 구축', 'Build community-based motivation system')}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center heading-modern">
                <Code className="h-5 w-5 text-ocean-700 mr-2" />
                {t('기술 스택', 'Tech Stack')}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <ModernCard variant="glass" className="p-3">
                  <p className="font-medium text-gray-900">Frontend</p>
                  <p className="text-sm text-gray-700">React, TypeScript, Tailwind CSS</p>
                </ModernCard>
                <ModernCard variant="glass" className="p-3">
                  <p className="font-medium text-gray-900">Backend</p>
                  <p className="text-sm text-gray-700">Supabase, PostgreSQL</p>
                </ModernCard>
                <ModernCard variant="glass" className="p-3">
                  <p className="font-medium text-gray-900">Authentication</p>
                  <p className="text-sm text-gray-700">Supabase Auth</p>
                </ModernCard>
                <ModernCard variant="glass" className="p-3">
                  <p className="font-medium text-gray-900">Deployment</p>
                  <p className="text-sm text-gray-700">Vite, Modern Web</p>
                </ModernCard>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center heading-modern">
                <Heart className="h-5 w-5 text-red-600 mr-2" />
                {t('핵심 기능', 'Key Features')}
              </h4>
              <div className="space-y-2 text-gray-800">
                <p>• {t('개인 프로필 및 목표 설정', 'Personal profile and goal setting')}</p>
                <p>• {t('동아리 및 이벤트 탐색 시스템', 'Club and event discovery system')}</p>
                <p>• {t('RSVP 및 참여 관리', 'RSVP and participation management')}</p>
                <p>• {t('소셜 기능 (저장, 좋아요, 공유)', 'Social features (save, like, share)')}</p>
                <p>• {t('다국어 지원 (한국어/영어)', 'Multi-language support (Korean/English)')}</p>
              </div>
            </div>

            <ModernCard variant="gradient" className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 heading-modern">
                {t('PPMK 해커톤 2024', 'PPMK Hackathon 2024')}
              </h4>
              <p className="text-gray-800 leading-relaxed">
                {t(
                  '이 프로젝트는 PPMK 해커톤의 일환으로 개발되었습니다. 현대 사회의 워라밸 문제를 해결하고, 지속가능한 라이프스타일을 제안하는 혁신적인 솔루션을 목표로 합니다. 기술과 인간 중심 디자인을 결합하여 실제 사용자들에게 도움이 되는 플랫폼을 만들고자 했습니다.',
                  'This project was developed as part of the PPMK Hackathon. It aims to be an innovative solution that addresses modern work-life balance issues and proposes a sustainable lifestyle. We sought to create a platform that truly helps users by combining technology with human-centered design.'
                )}
              </p>
            </ModernCard>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <ModernButton
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="flex-1"
              onClick={() => {
                setShowProjectInfo(false);
                navigate('/auth');
              }}
            >
              {t('6DAYS 시작하기', 'Start 6DAYS')}
            </ModernButton>
            <ModernButton
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setShowProjectInfo(false)}
            >
              {t('닫기', 'Close')}
            </ModernButton>
          </div>
        </div>
      </ModernCard>
    </div>
  );

  return (
    <div className="min-h-screen gradient-modern-1">
      {/* Modern Hero Section */}
      <AnimatedSection animation="fadeIn" duration={800}>
        <ModernHero
          title="6DAYS"
          subtitle={t('더 나은 일상을 위해', 'For Better Living')}
          description={t(
            '매주 6일은 최대한 활동적으로, 1일은 완전한 휴식으로. 새로운 라이프스타일을 시작하세요.',
            'Live 6 days to the fullest, rest 1 day completely. Start your new lifestyle today.'
          )}
          primaryAction={{
            label: t('지금 시작하기', 'Start Now'),
            onClick: handleStartNow
          }}
          secondaryAction={{
            label: t('더 알아보기', 'Learn More'),
            onClick: handleLearnMore
          }}
        />
      </AnimatedSection>

      {/* Modern Stats Section */}
      <AnimatedSection animation="fadeUp" delay={200} className="py-20 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernStats stats={modernStats} />
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection animation="fadeUp" delay={400} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-mint-100 rounded-full px-6 py-3 mb-6">
              <Sparkles className="h-5 w-5 text-mint-700" />
              <span className="text-mint-800 font-semibold text-sm">
                {t('혁신적인 라이프스타일', 'Innovative Lifestyle')}
              </span>
            </div>
            <h2 className="text-5xl font-bold text-modern-gradient mb-6 heading-modern">
              {t('6DAYS 라이프스타일', '6DAYS Lifestyle')}
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              {t(
                '과학적으로 설계된 주간 리듬으로 최적의 생산성과 웰빙을 경험하세요',
                'Experience optimal productivity and wellbeing with scientifically designed weekly rhythm'
              )}
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-out ${
                  featuresVisible[index] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <ModernCard 
                  variant="floating" 
                  className="p-8 text-center group"
                  glow={true}
                  icon={feature.icon.type}
                  iconColor={feature.icon.props.className}
                >
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-white to-mint-50 rounded-3xl shadow-modern group-hover:shadow-modern-lg transition-all duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 heading-modern group-hover:text-mint-700 transition-colors duration-300">
                    {feature.title.ko}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description.ko}
                  </p>
                </ModernCard>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="scale" delay={600} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-modern-3"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/30">
            <Star className="h-5 w-5 text-white" />
            <span className="text-white font-semibold text-sm">
              {t('지금 바로 시작하세요', 'Start Right Now')}
            </span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6 heading-modern">
            {t('오늘부터 6DAYS 시작하기', 'Start Your 6DAYS Journey Today')}
          </h2>
          <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            {t(
              '수천 명이 이미 경험하고 있는 새로운 라이프스타일. 당신도 함께하세요.',
              'Join thousands who are already experiencing this new lifestyle. Be part of the movement.'
            )}
          </p>
          
          <ModernButton 
            variant="primary"
            size="xl"
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleStartNow}
            className="bg-white text-mint-700 hover:bg-mint-50 shadow-2xl hover:shadow-3xl"
          >
            {t('무료로 시작하기', 'Start Free')}
          </ModernButton>
        </div>
      </AnimatedSection>

      {/* Project Info Modal */}
      {showProjectInfo && <ProjectInfoModal />}
    </div>
  );
};

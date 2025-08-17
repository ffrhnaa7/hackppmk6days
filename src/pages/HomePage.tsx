import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Zap, TrendingUp, Clock, Target, X, Award, Code, Heart } from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showProjectInfo, setShowProjectInfo] = useState(false);

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-mint-500" />,
      title: { ko: '6일 활동 모드', en: '6-Day Active Mode' },
      description: { ko: '매주 6일간 최대한 활동적으로 살아보세요', en: 'Live your most active life for 6 days each week' }
    },
    {
      icon: <Clock className="h-8 w-8 text-ocean-500" />,
      title: { ko: '1일 휴식 모드', en: '1-Day Rest Mode' },
      description: { ko: '완전한 휴식으로 재충전하는 하루', en: 'One day of complete rest and recharge' }
    },
    {
      icon: <Target className="h-8 w-8 text-sage-500" />,
      title: { ko: '목표 달성', en: 'Goal Achievement' },
      description: { ko: '체계적인 주간 계획으로 목표를 달성하세요', en: 'Achieve your goals with systematic weekly planning' }
    }
  ];

  const stats = [
    { number: '6', label: { ko: '활동일', en: 'Active Days' }, color: 'text-mint-600' },
    { number: '1', label: { ko: '휴식일', en: 'Rest Day' }, color: 'text-ocean-600' },
    { number: '100%', label: { ko: '라이프스타일', en: 'Lifestyle' }, color: 'text-sage-600' }
  ];

  const handleStartNow = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    setShowProjectInfo(true);
  };

  const ProjectInfoModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {t('프로젝트 소개', 'About This Project')}
                </h2>
                <p className="text-mint-600 font-semibold">PPMK Hackathon 2024</p>
              </div>
            </div>
            <button
              onClick={() => setShowProjectInfo(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Creator Info */}
          <div className="bg-gradient-to-r from-mint-50 to-ocean-50 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">F</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Farhana</h3>
                <p className="text-gray-600">
                  {t('개발자 & 디자이너', 'Developer & Designer')}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Code className="h-4 w-4 text-mint-600" />
                  <span className="text-sm text-mint-600 font-medium">PPMK Hackathon Participant</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t(
                '안녕하세요! 저는 Farhana입니다. 이 프로젝트는 PPMK 해커톤을 위해 개발된 6DAYS 라이프스타일 플랫폼입니다. 현대인들의 번아웃을 해결하고 지속가능한 생산성을 제공하는 것이 목표입니다.',
                'Hello! I\'m Farhana. This project is the 6DAYS lifestyle platform developed for the PPMK Hackathon. The goal is to solve modern burnout and provide sustainable productivity.'
              )}
            </p>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Target className="h-5 w-5 text-mint-600 mr-2" />
                {t('프로젝트 목표', 'Project Goals')}
              </h4>
              <div className="space-y-2 text-gray-600">
                <p>• {t('주 6일 활동, 1일 완전 휴식의 새로운 라이프스타일 제안', 'Propose a new lifestyle of 6 days active, 1 day complete rest')}</p>
                <p>• {t('번아웃 방지와 지속가능한 생산성 향상', 'Prevent burnout and improve sustainable productivity')}</p>
                <p>• {t('개인 맞춤형 활동 및 휴식 계획 제공', 'Provide personalized activity and rest planning')}</p>
                <p>• {t('커뮤니티 기반 동기부여 시스템 구축', 'Build community-based motivation system')}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Code className="h-5 w-5 text-ocean-600 mr-2" />
                {t('기술 스택', 'Tech Stack')}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-800">Frontend</p>
                  <p className="text-sm text-gray-600">React, TypeScript, Tailwind CSS</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-800">Backend</p>
                  <p className="text-sm text-gray-600">Supabase, PostgreSQL</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-800">Authentication</p>
                  <p className="text-sm text-gray-600">Supabase Auth</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-800">Deployment</p>
                  <p className="text-sm text-gray-600">Vite, Modern Web</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                {t('핵심 기능', 'Key Features')}
              </h4>
              <div className="space-y-2 text-gray-600">
                <p>• {t('개인 프로필 및 목표 설정', 'Personal profile and goal setting')}</p>
                <p>• {t('동아리 및 이벤트 탐색 시스템', 'Club and event discovery system')}</p>
                <p>• {t('RSVP 및 참여 관리', 'RSVP and participation management')}</p>
                <p>• {t('소셜 기능 (저장, 좋아요, 공유)', 'Social features (save, like, share)')}</p>
                <p>• {t('다국어 지원 (한국어/영어)', 'Multi-language support (Korean/English)')}</p>
              </div>
            </div>

            <div className="bg-mint-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {t('PPMK 해커톤 2024', 'PPMK Hackathon 2024')}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {t(
                  '이 프로젝트는 PPMK 해커톤의 일환으로 개발되었습니다. 현대 사회의 워라밸 문제를 해결하고, 지속가능한 라이프스타일을 제안하는 혁신적인 솔루션을 목표로 합니다. 기술과 인간 중심 디자인을 결합하여 실제 사용자들에게 도움이 되는 플랫폼을 만들고자 했습니다.',
                  'This project was developed as part of the PPMK Hackathon. It aims to be an innovative solution that addresses modern work-life balance issues and proposes a sustainable lifestyle. We sought to create a platform that truly helps users by combining technology with human-centered design.'
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <ColorfulButton
              variant="primary"
              className="flex-1"
              onClick={() => {
                setShowProjectInfo(false);
                navigate('/auth');
              }}
            >
              {t('6DAYS 시작하기', 'Start 6DAYS')}
            </ColorfulButton>
            <ColorfulButton
              variant="outline"
              className="flex-1"
              onClick={() => setShowProjectInfo(false)}
            >
              {t('닫기', 'Close')}
            </ColorfulButton>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              6DAYS
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t(
                '매주 6일은 최대한 활동적으로, 1일은 완전한 휴식으로. 새로운 라이프스타일을 시작하세요.',
                'Live 6 days to the fullest, rest 1 day completely. Start your new lifestyle today.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ColorfulButton 
                variant="accent" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={handleStartNow}
              >
                {t('지금 시작하기', 'Start Now')}
              </ColorfulButton>
              <ColorfulButton 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-mint-600"
                onClick={handleLearnMore}
              >
                {t('더 알아보기', 'Learn More')}
              </ColorfulButton>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm font-medium">
                  {stat.label.ko}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-6days-primary mb-6">
              {t('6DAYS 라이프스타일', '6DAYS Lifestyle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(
                '과학적으로 설계된 주간 리듬으로 최적의 생산성과 웰빙을 경험하세요',
                'Experience optimal productivity and wellbeing with scientifically designed weekly rhythm'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ColorfulCard key={index} variant="gradient" className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-white rounded-2xl shadow-lg">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title.ko}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description.ko}
                </p>
              </ColorfulCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-mint-500 to-ocean-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('오늘부터 6DAYS 시작하기', 'Start Your 6DAYS Journey Today')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t(
              '수천 명이 이미 경험하고 있는 새로운 라이프스타일. 당신도 함께하세요.',
              'Join thousands who are already experiencing this new lifestyle. Be part of the movement.'
            )}
          </p>
          <ColorfulButton 
            variant="accent" 
            size="lg" 
            className="text-lg px-12 py-4 bg-white text-mint-600 hover:bg-mint-50"
            onClick={handleStartNow}
          >
            {t('무료로 시작하기', 'Start Free')}
          </ColorfulButton>
        </div>
      </section>

      {/* Project Info Modal */}
      {showProjectInfo && <ProjectInfoModal />}
    </div>
  );
};

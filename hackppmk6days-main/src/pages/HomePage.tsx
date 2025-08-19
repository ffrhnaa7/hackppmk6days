import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Zap, TrendingUp, Clock, Target, X, Award, Code, Heart, ArrowRight, Sparkles, Activity, Coffee, Rocket, Star } from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const [activeDay, setActiveDay] = useState(1);

  const weekDays = [
    { day: 1, type: 'active', icon: <Rocket className="h-5 w-5" />, label: 'MON' },
    { day: 2, type: 'active', icon: <Activity className="h-5 w-5" />, label: 'TUE' },
    { day: 3, type: 'active', icon: <Zap className="h-5 w-5" />, label: 'WED' },
    { day: 4, type: 'active', icon: <Star className="h-5 w-5" />, label: 'THU' },
    { day: 5, type: 'active', icon: <Target className="h-5 w-5" />, label: 'FRI' },
    { day: 6, type: 'active', icon: <TrendingUp className="h-5 w-5" />, label: 'SAT' },
    { day: 7, type: 'rest', icon: <Coffee className="h-5 w-5" />, label: 'SUN' }
  ];

  const features = [
    {
      icon: <Activity className="h-10 w-10" />,
      title: { ko: '활동 추적', en: 'Activity Tracking' },
      description: { ko: '매일의 활동을 기록하고 성장을 확인하세요', en: 'Track daily activities and monitor your growth' },
      color: 'from-mint-400 to-mint-600',
      stats: '98%',
      statsLabel: { ko: '달성률', en: 'Achievement' }
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: { ko: '커뮤니티', en: 'Community' },
      description: { ko: '같은 목표를 가진 사람들과 함께하세요', en: 'Connect with like-minded individuals' },
      color: 'from-ocean-400 to-ocean-600',
      stats: '2.5K+',
      statsLabel: { ko: '활동 멤버', en: 'Active Members' }
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: { ko: '보상 시스템', en: 'Rewards' },
      description: { ko: '목표 달성시 특별한 보상을 받으세요', en: 'Earn rewards for achieving your goals' },
      color: 'from-sage-400 to-sage-600',
      stats: '150+',
      statsLabel: { ko: '보상 종류', en: 'Reward Types' }
    }
  ];

  const testimonials = [
    {
      name: '김지은',
      role: { ko: '대학생', en: 'University Student' },
      content: { ko: '6DAYS로 완벽한 워라밸을 찾았어요!', en: 'Found perfect work-life balance with 6DAYS!' },
      rating: 5,
      avatar: '👩‍🎓'
    },
    {
      name: '박준호',
      role: { ko: '직장인', en: 'Office Worker' },
      content: { ko: '번아웃에서 벗어날 수 있었습니다', en: 'Escaped from burnout successfully' },
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: '이서연',
      role: { ko: '프리랜서', en: 'Freelancer' },
      content: { ko: '생산성이 놀랍게 향상되었어요', en: 'Productivity improved amazingly' },
      rating: 5,
      avatar: '👩‍💻'
    }
  ];

  const handleStartNow = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    setShowProjectInfo(true);
  };

  const ProjectInfoModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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

            <div className="bg-mint-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {t('PPMK 해커톤 2024', 'PPMK Hackathon 2024')}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {t(
                  '이 프로젝트는 PPMK 해커톤의 일환으로 개발되었습니다. 현대 사회의 워라밸 문제를 해결하고, 지속가능한 라이프스타일을 제안하는 혁신적인 솔루션을 목표로 합니다.',
                  'This project was developed as part of the PPMK Hackathon. It aims to be an innovative solution that addresses modern work-life balance issues and proposes a sustainable lifestyle.'
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
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-ocean-50">
      {/* Hero Section - Redesigned */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mint-500/10 via-transparent to-ocean-500/10"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-mint-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-ocean-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-mint-100 to-ocean-100 rounded-full px-4 py-2 mb-8 animate-bounce">
              <Sparkles className="h-4 w-4 text-mint-600" />
              <span className="text-sm font-semibold text-gray-700">
                {t('새로운 라이프스타일의 시작', 'Start of a New Lifestyle')}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-mint-600 via-ocean-600 to-sage-600 bg-clip-text text-transparent animate-gradient">
                6DAYS
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-light">
              {t('6일은 열정적으로', '6 Days of Passion')}
              <span className="text-mint-600 font-bold mx-2">•</span>
              {t('1일은 완벽하게', '1 Day of Perfect Rest')}
            </p>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              {t(
                '과학적으로 설계된 주간 리듬으로 번아웃 없는 지속가능한 성장을 경험하세요',
                'Experience sustainable growth without burnout through scientifically designed weekly rhythm'
              )}
            </p>

            {/* Week Visualization */}
            <div className="flex justify-center items-center space-x-2 mb-12">
              {weekDays.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={`group relative p-4 rounded-2xl transition-all duration-300 ${
                    day.type === 'rest' 
                      ? 'bg-gradient-to-br from-sage-100 to-sage-200 hover:from-sage-200 hover:to-sage-300' 
                      : activeDay === day.day
                      ? 'bg-gradient-to-br from-mint-500 to-ocean-500 text-white scale-110 shadow-xl'
                      : 'bg-white hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div className={`${activeDay === day.day ? 'text-white' : day.type === 'rest' ? 'text-sage-600' : 'text-mint-600'}`}>
                      {day.icon}
                    </div>
                    <span className={`text-xs font-bold ${activeDay === day.day ? 'text-white' : 'text-gray-600'}`}>
                      {day.label}
                    </span>
                  </div>
                  {activeDay === day.day && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-mint-500 rounded-full animate-ping"></div>
                  )}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartNow}
                className="group relative px-8 py-4 bg-gradient-to-r from-mint-600 to-ocean-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{t('무료로 시작하기', 'Start Free')}</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={handleLearnMore}
                className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-mint-300 transition-all duration-300"
              >
                {t('자세히 알아보기', 'Learn More')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-mint-600 to-ocean-600 bg-clip-text text-transparent">
                {t('왜 6DAYS인가?', 'Why 6DAYS?')}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(
                '균형잡힌 삶을 위한 완벽한 솔루션',
                'The perfect solution for a balanced life'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title.ko}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description.ko}
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <span className="text-3xl font-bold bg-gradient-to-r from-mint-600 to-ocean-600 bg-clip-text text-transparent">
                    {feature.stats}
                  </span>
                  <span className="text-sm text-gray-500">
                    {feature.statsLabel.ko}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-mint-50 to-ocean-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t('사용자 후기', 'User Reviews')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('6DAYS와 함께한 변화', 'Changes with 6DAYS')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role.ko}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content.ko}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-mint-600 to-ocean-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('지금 시작하세요', 'Start Now')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t(
                '더 나은 내일을 위한 첫 걸음',
                'The first step towards a better tomorrow'
              )}
            </p>
            <button
              onClick={handleStartNow}
              className="px-12 py-4 bg-white text-mint-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {t('무료 체험 시작', 'Start Free Trial')}
            </button>
          </div>
        </div>
      </section>

      {/* Project Info Modal */}
      {showProjectInfo && <ProjectInfoModal />}
    </div>
  );
};

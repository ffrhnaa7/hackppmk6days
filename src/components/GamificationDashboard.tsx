import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { gamificationFeatures } from '../data/gamificationFeatures';
import { Trophy, Star, Gift, Target, Calendar, Users } from 'lucide-react';

const GamificationDashboard: React.FC = () => {
  const { t } = useLanguage();

  const categoryIcons = {
    cultural: '🎭',
    language: '🗣️',
    volunteer: '🤝',
    social: '👥',
    academic: '📚',
    special: '⭐'
  };

  const categoryColors = {
    cultural: 'bg-purple-100 text-purple-800',
    language: 'bg-blue-100 text-blue-800',
    volunteer: 'bg-green-100 text-green-800',
    social: 'bg-pink-100 text-pink-800',
    academic: 'bg-yellow-100 text-yellow-800',
    special: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('게임화 시스템', 'Gamification System')}
        </h1>
        <p className="text-gray-600">
          {t(
            '한국 대학 문화에 참여하고 특별한 보상을 받아보세요!',
            'Participate in Korean university culture and earn special rewards!'
          )}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">{t('획득한 배지', 'Badges Earned')}</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">{t('포인트', 'Points')}</p>
              <p className="text-2xl font-bold text-gray-900">2,450</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">{t('연속 출석', 'Current Streak')}</p>
              <p className="text-2xl font-bold text-gray-900">7일</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">{t('레벨', 'Level')}</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gamification Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gamificationFeatures.map((feature) => (
          <div key={feature.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">
                  {categoryIcons[feature.category as keyof typeof categoryIcons]}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {t(feature.title.ko, feature.title.en)}
                  </h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    categoryColors[feature.category as keyof typeof categoryColors]
                  }`}>
                    {t(
                      feature.category === 'cultural' ? '문화' :
                      feature.category === 'language' ? '언어' :
                      feature.category === 'volunteer' ? '봉사' :
                      feature.category === 'social' ? '사교' :
                      feature.category === 'academic' ? '학술' : '특별',
                      feature.category.charAt(0).toUpperCase() + feature.category.slice(1)
                    )}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              {t(feature.description.ko, feature.description.en)}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Gift className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-sm font-medium text-red-600">
                  {feature.reward}
                </span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors">
                {t('도전하기', 'Start Challenge')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('이번 달 리더보드', 'This Month\'s Leaderboard')}
        </h2>
        
        <div className="space-y-4">
          {[
            { rank: 1, name: 'Sarah Kim', points: 3250, flag: '🇺🇸', reward: '스타벅스 기프티콘' },
            { rank: 2, name: 'Tanaka Hiroshi', points: 2890, flag: '🇯🇵', reward: 'CU 편의점 쿠폰' },
            { rank: 3, name: 'Emma Chen', points: 2650, flag: '🇨🇳', reward: '네이버페이 포인트' },
            { rank: 4, name: 'Lucas Silva', points: 2400, flag: '🇧🇷', reward: '올리브영 쿠폰' },
            { rank: 5, name: 'Marie Dubois', points: 2150, flag: '🇫🇷', reward: 'CGV 영화표' }
          ].map((user) => (
            <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                  user.rank === 1 ? 'bg-yellow-500' :
                  user.rank === 2 ? 'bg-gray-400' :
                  user.rank === 3 ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  {user.rank}
                </div>
                <span className="text-2xl mr-3">{user.flag}</span>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.points.toLocaleString()} {t('포인트', 'points')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">{user.reward}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationDashboard;

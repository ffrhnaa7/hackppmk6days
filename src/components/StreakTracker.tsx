import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Flame, Target, Award } from 'lucide-react';

interface StreakData {
  type: 'language' | 'cultural' | 'volunteer' | 'social';
  name: {
    ko: string;
    en: string;
  };
  current: number;
  best: number;
  target: number;
  reward: {
    ko: string;
    en: string;
  };
  icon: React.ReactNode;
  color: string;
}

const StreakTracker: React.FC = () => {
  const { t } = useLanguage();

  const streaks: StreakData[] = [
    {
      type: 'language',
      name: {
        ko: '언어교환 연속 출석',
        en: 'Language Exchange Streak'
      },
      current: 7,
      best: 15,
      target: 14,
      reward: {
        ko: '네이버페이 2,000P',
        en: 'Naver Pay 2,000P'
      },
      icon: <Flame className="h-6 w-6" />,
      color: 'text-orange-500'
    },
    {
      type: 'cultural',
      name: {
        ko: '문화 이벤트 참여',
        en: 'Cultural Event Participation'
      },
      current: 3,
      best: 8,
      target: 7,
      reward: {
        ko: '스타벅스 기프티콘',
        en: 'Starbucks Gifticon'
      },
      icon: <Calendar className="h-6 w-6" />,
      color: 'text-purple-500'
    },
    {
      type: 'volunteer',
      name: {
        ko: '봉사활동 연속 참여',
        en: 'Volunteer Activity Streak'
      },
      current: 5,
      best: 12,
      target: 10,
      reward: {
        ko: 'CGV 영화표 2매',
        en: '2 CGV Movie Tickets'
      },
      icon: <Target className="h-6 w-6" />,
      color: 'text-green-500'
    },
    {
      type: 'social',
      name: {
        ko: '사교 활동 연속 참여',
        en: 'Social Activity Streak'
      },
      current: 12,
      best: 20,
      target: 21,
      reward: {
        ko: '올리브영 15,000원',
        en: 'Olive Young 15,000 KRW'
      },
      icon: <Award className="h-6 w-6" />,
      color: 'text-blue-500'
    }
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStreakStatus = (current: number, target: number) => {
    if (current >= target) return 'completed';
    if (current >= target * 0.8) return 'close';
    return 'progress';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('연속 출석 트래커', 'Streak Tracker')}
        </h1>
        <p className="text-gray-600">
          {t('꾸준한 참여로 특별한 보상을 받아보세요!', 'Earn special rewards through consistent participation!')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {streaks.map((streak) => {
          const progress = getProgressPercentage(streak.current, streak.target);
          const status = getStreakStatus(streak.current, streak.target);
          
          return (
            <div key={streak.type} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`${streak.color} mr-3`}>
                    {streak.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t(streak.name.ko, streak.name.en)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t(`최고 기록: ${streak.best}일`, `Best: ${streak.best} days`)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{streak.current}</p>
                  <p className="text-sm text-gray-500">{t('일', 'days')}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{t('진행률', 'Progress')}</span>
                  <span>{streak.current}/{streak.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      status === 'completed' ? 'bg-green-500' :
                      status === 'close' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('목표 달성 보상', 'Target Reward')}</p>
                  <p className="font-medium text-green-600">
                    {t(streak.reward.ko, streak.reward.en)}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === 'completed' ? 'bg-green-100 text-green-800' :
                  status === 'close' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {status === 'completed' ? t('완료!', 'Complete!') :
                   status === 'close' ? t('거의 완료', 'Almost there') :
                   t('진행 중', 'In progress')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Challenge */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">
              {t('이번 주 챌린지', 'This Week\'s Challenge')}
            </h2>
            <p className="opacity-90">
              {t('3가지 다른 카테고리 이벤트에 참여하세요!', 'Participate in 3 different category events!')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">2/3</p>
            <p className="text-sm opacity-90">{t('완료', 'completed')}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: '66.7%' }}></div>
          </div>
          <p className="text-sm mt-2 opacity-90">
            {t('보상: 치킨 기프티콘 + 500 보너스 포인트', 'Reward: Chicken Gifticon + 500 Bonus Points')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StreakTracker;

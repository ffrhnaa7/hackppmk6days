import React from 'react';
import { Calendar, Info, Users, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { KoreanEventCard } from '../components/KoreanEventCard';
import { QuickActions } from '../components/QuickActions';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { koreanEvents } from '../data/koreanEvents';
import { useLanguage } from '../contexts/LanguageContext';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Filter events for personalized feed
  const personalizedEvents = koreanEvents.filter(event => 
    event.crossCultural || event.openToAll
  );

  const crossCulturalEvents = koreanEvents.filter(event => event.crossCultural);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              {t('맞춤형 이벤트 피드', 'Personalized Event Feed')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('당신의 관심사와 일정에 맞는 이벤트를 발견하세요 ✨', 'Discover events tailored to your interests and schedule ✨')}
            </p>
          </div>

          {/* Cultural Guide Banner */}
          <ColorfulCard className="mb-8 bg-gradient-to-r from-blue-50 to-mint-50 border-2 border-blue-200">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 rounded-full p-2">
                  <Info className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-800 mb-2">
                    {t('🌏 외국인 학생을 위한 문화 가이드', '🌏 Cultural Guide for International Students')}
                  </h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    {t(
                      'MT = 멤버십 트레이닝 (1박2일 단체 여행), 회식 = 함께 식사하며 친목 도모, 선후배 = 학년별 위계 관계',
                      'MT = Membership Training (2-day group retreat), Hoesik = Social dining for bonding, Seonhubae = Senior-junior hierarchy system'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </ColorfulCard>

          {/* Cross-Cultural Events Highlight */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Globe2 className="h-5 w-5 mr-2 text-mint-600" />
                {t('국제교류 추천 이벤트', 'Cross-Cultural Exchange Events')}
              </h3>
              <Link 
                to="/explore?filter=cross-cultural" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                {t('더보기', 'View All')} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crossCulturalEvents.slice(0, 2).map((event) => (
                <KoreanEventCard key={event.id} event={event} compact />
              ))}
            </div>
          </div>

          {/* All Events Grid */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t('모든 이벤트', 'All Events')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalizedEvents.map((event) => (
              <KoreanEventCard key={event.id} event={event} />
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-64">
          <div className="space-y-6">
            <QuickActions />
            
            {/* This Week Events */}
            <ColorfulCard variant="glass">
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <div className="bg-gradient-secondary rounded-lg p-1 mr-2">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  {t('이번 주', 'This Week')}
                </h3>
                <div className="space-y-3">
                  {koreanEvents.slice(0, 3).map((event, index) => (
                    <Link
                      key={event.id}
                      to={`/event/${event.id}`}
                      className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <img
                        src={event.image}
                        alt={language === 'ko' ? event.title.ko : event.title.en}
                        className="w-12 h-12 rounded-xl object-cover shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {language === 'ko' ? event.title.ko : event.title.en}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          {event.date}
                        </p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        index === 0 ? 'bg-green-400' : 
                        index === 1 ? 'bg-blue-400' : 'bg-purple-400'
                      } animate-pulse`} />
                    </Link>
                  ))}
                </div>
              </div>
            </ColorfulCard>

            {/* Language Learning Corner */}
            <ColorfulCard className="bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="p-6">
                <h3 className="font-bold text-purple-800 mb-3">
                  {t('🗣️ 언어 교환', '🗣️ Language Exchange')}
                </h3>
                <p className="text-purple-700 text-sm mb-4">
                  {t('한국어-영어 언어 교환 파트너를 찾아보세요!', 'Find Korean-English language exchange partners!')}
                </p>
                <ColorfulButton size="sm" className="w-full bg-purple-500 hover:bg-purple-600">
                  {t('파트너 찾기', 'Find Partner')}
                </ColorfulButton>
              </div>
            </ColorfulCard>
          </div>
        </aside>
      </div>
    </div>
  );
};

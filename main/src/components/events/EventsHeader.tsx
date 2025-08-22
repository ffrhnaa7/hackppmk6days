import React from 'react';
import { Calendar } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface EventsHeaderProps {
  totalEvents: number;
  upcomingEvents: number;
  categories: number;
}

export const EventsHeader: React.FC<EventsHeaderProps> = ({ 
  totalEvents, 
  upcomingEvents, 
  categories 
}) => {
  const { t } = useLanguage();

  return (
    <div className="mb-8 sm:mb-12 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
        <div className="bg-gradient-primary rounded-full p-3 sm:p-4 mb-4 sm:mb-0 sm:mr-4 shadow-lg">
          <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            {t('이벤트 캘린더', 'Event Calendar')}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-medium">
            {t('다양한 문화 교류 이벤트', 'Diverse Cultural Exchange Events')}
          </p>
        </div>
      </div>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
        {t('다양한 문화 교류 이벤트에 참여하고 새로운 경험을 만들어보세요', 
            'Join diverse cultural exchange events and create new experiences')}
      </p>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 max-w-2xl mx-auto">
        <div className="text-center group">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
              {totalEvents}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600">
              {t('총 이벤트', 'Total Events')}
            </div>
          </div>
        </div>
        <div className="text-center group">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-green-200">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2 flex items-center justify-center">
              {upcomingEvents}
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse ml-1 sm:ml-2"></div>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600">
              {t('예정된 이벤트', 'Upcoming')}
            </div>
          </div>
        </div>
        <div className="text-center group">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">
              {categories}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600">
              {t('카테고리', 'Categories')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

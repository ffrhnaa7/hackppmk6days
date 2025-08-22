import React from 'react';
import { Filter, Calendar } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface EventsResultsSummaryProps {
  totalResults: number;
  upcomingCount: number;
  todayCount: number;
}

export const EventsResultsSummary: React.FC<EventsResultsSummaryProps> = ({
  totalResults,
  upcomingCount,
  todayCount
}) => {
  const { t } = useLanguage();

  return (
    <div className="mb-6 sm:mb-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-gradient-primary rounded-full p-1.5 sm:p-2">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-gray-800">
                {t(`${totalResults}개의 이벤트`, `${totalResults} events`)}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {t('검색 결과', 'search results')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
          <div className="flex items-center space-x-1 sm:space-x-2 bg-green-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-200">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            <span className="font-bold text-green-700">{upcomingCount}</span>
            <span className="text-green-600">{t('예정', 'upcoming')}</span>
          </div>
          {todayCount > 0 && (
            <div className="flex items-center space-x-1 sm:space-x-2 bg-red-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-red-200">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-red-700">{todayCount}</span>
              <span className="text-red-600">{t('오늘', 'today')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

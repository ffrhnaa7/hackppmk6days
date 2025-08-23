import React from 'react';
import { Filter, Sparkles } from 'lucide-react';
import { ColorfulCard } from '../ColorfulCard';
import { ColorfulButton } from '../ColorfulButton';
import { useLanguage } from '../../contexts/LanguageContext';

interface EventsEmptyStateProps {
  onReset: () => void;
}

export const EventsEmptyState: React.FC<EventsEmptyStateProps> = ({ onReset }) => {
  const { t } = useLanguage();

  return (
    <ColorfulCard className="text-center p-8 sm:p-12 lg:p-16 border-0 shadow-xl">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-6 sm:p-8 w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 flex items-center justify-center shadow-inner">
          <Filter className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
          {t('검색 결과가 없습니다', 'No events found')}
        </h2>
        <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
          {t('검색 조건을 조정하거나 다른 키워드로 시도해보세요', 
             'Try adjusting your search criteria or using different keywords')}
        </p>
        <ColorfulButton
          size="lg"
          onClick={onReset}
          className="shadow-lg hover:shadow-xl"
        >
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          {t('모든 이벤트 보기', 'Show All Events')}
        </ColorfulButton>
      </div>
    </ColorfulCard>
  );
};

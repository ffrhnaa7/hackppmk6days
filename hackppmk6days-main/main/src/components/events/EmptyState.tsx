import React from 'react';
import { Calendar, Search, RefreshCw } from 'lucide-react';
import { ColorfulButton } from '../ColorfulButton';
import { useLanguage } from '../../contexts/LanguageContext';

interface EmptyStateProps {
  searchTerm: string;
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, onReset }) => {
  const { t } = useLanguage();

  return (
    <div className="text-center py-12 sm:py-16 lg:py-20">
      <div className="bg-gradient-to-br from-blue-50 via-mint-50 to-purple-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 max-w-2xl mx-auto shadow-xl">
        <div className="bg-white rounded-full p-4 sm:p-6 w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 shadow-lg flex items-center justify-center">
          {searchTerm ? (
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
          ) : (
            <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
          )}
        </div>
        
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
          {searchTerm 
            ? t('검색 결과가 없습니다', 'No Results Found')
            : t('이벤트가 없습니다', 'No Events Available')
          }
        </h3>
        
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
          {searchTerm 
            ? t(
                `"${searchTerm}"에 대한 검색 결과를 찾을 수 없습니다. 다른 검색어를 시도해보세요.`,
                `We couldn't find any events matching "${searchTerm}". Try adjusting your search.`
              )
            : t(
                '현재 예정된 이벤트가 없습니다. 나중에 다시 확인해주세요!',
                'There are no events scheduled at the moment. Check back later!'
              )
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <ColorfulButton
            onClick={onReset}
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline-block" />
            {t('필터 초기화', 'Reset Filters')}
          </ColorfulButton>
          
          <ColorfulButton
            onClick={() => window.location.href = '/clubs'}
            variant="outline"
            size="md"
            className="w-full sm:w-auto"
          >
            {t('클럽 둘러보기', 'Browse Clubs')}
          </ColorfulButton>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <h4 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            {t('이벤트를 찾는 다른 방법', 'Other Ways to Find Events')}
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">📅</div>
              <h5 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                {t('캘린더 확인', 'Check Calendar')}
              </h5>
              <p className="text-xs sm:text-sm text-gray-600">
                {t('전체 일정 보기', 'View all schedules')}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">🔔</div>
              <h5 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                {t('알림 설정', 'Set Notifications')}
              </h5>
              <p className="text-xs sm:text-sm text-gray-600">
                {t('새 이벤트 알림 받기', 'Get notified of new events')}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">👥</div>
              <h5 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                {t('클럽 가입', 'Join Clubs')}
              </h5>
              <p className="text-xs sm:text-sm text-gray-600">
                {t('클럽 회원 전용 이벤트', 'Member-only events')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-center mb-3">
            <span className="text-3xl sm:text-4xl">✨</span>
          </div>
          <h5 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            {t('팁', 'Pro Tip')}
          </h5>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {t(
              '관심 있는 클럽을 팔로우하면 새로운 이벤트가 등록될 때 알림을 받을 수 있습니다!',
              'Follow clubs you\'re interested in to get notified when they post new events!'
            )}
          </p>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
            {t('#캠퍼스라이프', '#CampusLife')}
          </span>
          <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
            {t('#클럽활동', '#ClubActivities')}
          </span>
          <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-mint-100 text-mint-700 rounded-full text-xs sm:text-sm font-medium">
            {t('#네트워킹', '#Networking')}
          </span>
        </div>
      </div>
    </div>
  );
};

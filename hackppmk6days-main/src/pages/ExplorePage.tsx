import React, { useState } from 'react';
import { Search, Filter, Map, List, MapPin, Calendar, Users, Globe } from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { ColorfulInput } from '../components/ColorfulInput';
import { KoreanEventCard } from '../components/KoreanEventCard';
import { koreanEvents } from '../data/koreanEvents';
import { useLanguage } from '../contexts/LanguageContext';

export const ExplorePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState({
    language: 'all',
    campus: 'all',
    eventType: 'all',
    openness: 'all'
  });

  const filteredEvents = koreanEvents.filter(event => {
    if (filters.language !== 'all' && event.language !== filters.language) return false;
    if (filters.campus !== 'all' && event.location.campus !== filters.campus) return false;
    if (filters.eventType !== 'all') {
      const hasMatchingTag = event.tags.some(tag => tag.category === filters.eventType);
      if (!hasMatchingTag) return false;
    }
    if (filters.openness === 'open' && !event.openToAll) return false;
    if (filters.openness === 'members' && event.openToAll) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          {t('이벤트 탐색', 'Explore Events')}
        </h1>
        <p className="text-gray-600 text-lg">
          {t('캠퍼스 전체의 다양한 이벤트를 발견하고 참여하세요', 'Discover and join various events across campus')}
        </p>
      </div>

      {/* Search and Filters */}
      <ColorfulCard className="mb-6">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <ColorfulInput
                placeholder={t('이벤트 검색...', 'Search events...')}
                icon={<Search className="h-5 w-5" />}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Language Filter */}
              <select
                value={filters.language}
                onChange={(e) => setFilters({...filters, language: e.target.value})}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('모든 언어', 'All Languages')}</option>
                <option value="korean">{t('한국어', 'Korean')}</option>
                <option value="english">{t('영어', 'English')}</option>
                <option value="bilingual">{t('이중언어', 'Bilingual')}</option>
              </select>

              {/* Campus Filter */}
              <select
                value={filters.campus}
                onChange={(e) => setFilters({...filters, campus: e.target.value})}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('모든 캠퍼스', 'All Campuses')}</option>
                <option value="서울">{t('서울 캠퍼스', 'Seoul Campus')}</option>
                <option value="경기">{t('경기 캠퍼스', 'Gyeonggi Campus')}</option>
                <option value="지방">{t('지방 캠퍼스', 'Regional Campus')}</option>
              </select>

              {/* Event Type Filter */}
              <select
                value={filters.eventType}
                onChange={(e) => setFilters({...filters, eventType: e.target.value})}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('모든 유형', 'All Types')}</option>
                <option value="학술">{t('학술', 'Academic')}</option>
                <option value="문화">{t('문화', 'Cultural')}</option>
                <option value="취미">{t('취미', 'Hobby')}</option>
                <option value="봉사">{t('봉사', 'Volunteer')}</option>
                <option value="MT">MT</option>
                <option value="회식">{t('회식', 'Hoesik')}</option>
              </select>

              {/* Openness Filter */}
              <select
                value={filters.openness}
                onChange={(e) => setFilters({...filters, openness: e.target.value})}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('모든 이벤트', 'All Events')}</option>
                <option value="open">{t('모든 학생', 'Open to All')}</option>
                <option value="members">{t('회원 전용', 'Members Only')}</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <ColorfulButton
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3 py-2"
              >
                <List className="h-4 w-4 mr-1" />
                {t('목록', 'List')}
              </ColorfulButton>
              <ColorfulButton
                variant={viewMode === 'map' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="px-3 py-2"
              >
                <Map className="h-4 w-4 mr-1" />
                {t('지도', 'Map')}
              </ColorfulButton>
            </div>
          </div>
        </div>
      </ColorfulCard>

      {/* Cross-Cultural Highlight */}
      <ColorfulCard className="mb-6 bg-gradient-to-r from-mint-50 to-blue-50 border-2 border-mint-200">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Globe className="h-6 w-6 text-mint-600" />
            <h3 className="text-lg font-bold text-mint-800">
              {t('🌍 국제교류 추천', '🌍 Cross-Cultural Recommendations')}
            </h3>
          </div>
          <p className="text-mint-700 text-sm">
            {t(
              '한국 학생과 외국인 학생이 함께 참여할 수 있는 특별한 이벤트들을 확인해보세요!',
              'Check out special events where Korean and international students can participate together!'
            )}
          </p>
        </div>
      </ColorfulCard>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          {t(`${filteredEvents.length}개의 이벤트를 찾았습니다`, `Found ${filteredEvents.length} events`)}
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>{t('교통정보 포함', 'Transportation info included')}</span>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="relative">
              <KoreanEventCard event={event} compact />
              {/* Transportation Info */}
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">
                      {event.transportation.subway.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">
                      {event.transportation.bus.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ColorfulCard className="h-96">
          <div className="p-6 h-full flex items-center justify-center">
            <div className="text-center">
              <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {t('지도 뷰', 'Map View')}
              </h3>
              <p className="text-gray-500 text-sm">
                {t('네이버 지도 / 카카오맵 연동 준비 중', 'Naver Map / KakaoMap integration coming soon')}
              </p>
              <div className="mt-4 space-y-2">
                <ColorfulButton size="sm" variant="outline">
                  {t('네이버 지도로 보기', 'View on Naver Map')}
                </ColorfulButton>
                <ColorfulButton size="sm" variant="outline">
                  {t('카카오맵으로 보기', 'View on KakaoMap')}
                </ColorfulButton>
              </div>
            </div>
          </div>
        </ColorfulCard>
      )}

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <ColorfulCard>
          <div className="p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {t('검색 결과가 없습니다', 'No events found')}
            </h3>
            <p className="text-gray-500">
              {t('다른 필터를 시도해보세요', 'Try different filters')}
            </p>
          </div>
        </ColorfulCard>
      )}
    </div>
  );
};

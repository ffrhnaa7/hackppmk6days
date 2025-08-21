import React, { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, Users, Search, Filter, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { ColorfulInput } from '../components/ColorfulInput';
import { useLanguage } from '../contexts/LanguageContext';
import { koreanEvents } from '../data/koreanEvents';

export const EventsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [upcomingOnly, setUpcomingOnly] = useState(true);

  // Get unique categories from tags
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    koreanEvents.forEach(event => {
      event.tags.forEach(tag => {
        const categoryName = language === 'ko' ? tag.ko : tag.en;
        categorySet.add(categoryName);
      });
    });
    return Array.from(categorySet).sort();
  }, [language]);

  // Filter events
  const filteredEvents = useMemo(() => {
    const now = new Date();
    
    return koreanEvents.filter(event => {
      const eventTitle = language === 'ko' ? event.title.ko : event.title.en;
      const eventDescription = language === 'ko' ? event.description.ko : event.description.en;
      const eventDate = new Date(event.date);
      
      // Search filter
      const matchesSearch = !searchTerm || 
        eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eventDescription.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter (check if any tag matches)
      const matchesCategory = selectedCategory === 'all' || 
        event.tags.some(tag => {
          const tagName = language === 'ko' ? tag.ko : tag.en;
          return tagName === selectedCategory;
        });

      // Upcoming filter
      const matchesUpcoming = !upcomingOnly || eventDate >= now;

      return matchesSearch && matchesCategory && matchesUpcoming;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [searchTerm, selectedCategory, upcomingOnly, language]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'ko' 
      ? date.toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        })
      : date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const isEventSoon = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          {t('이벤트 캘린더', 'Event Calendar')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('다양한 문화 교류 이벤트에 참여하세요', 'Join diverse cultural exchange events')}
        </p>
      </div>

      {/* Filters */}
      <ColorfulCard className="mb-8">
        <div className="p-6 space-y-4">
          {/* Search */}
          <ColorfulInput
            placeholder={t('이벤트 이름이나 설명으로 검색...', 'Search by event name or description...')}
            icon={<Search className="h-5 w-5" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category and Upcoming Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('카테고리', 'Category')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('모든 카테고리', 'All Categories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={upcomingOnly}
                  onChange={(e) => setUpcomingOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {t('예정된 이벤트만', 'Upcoming only')}
                </span>
              </label>
            </div>
          </div>
        </div>
      </ColorfulCard>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          {t(`${filteredEvents.length}개의 이벤트`, `${filteredEvents.length} events found`)}
        </p>
        <div className="flex items-center space-x-2 text-sm text-orange-600">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span>
            {filteredEvents.filter(event => isEventSoon(event.date)).length} {t('이번 주', 'this week')}
          </span>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <ColorfulCard className="text-center p-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('이벤트가 없습니다', 'No events found')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('검색 조건을 조정해보세요', 'Try adjusting your search criteria')}
          </p>
          <ColorfulButton
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setUpcomingOnly(false);
            }}
          >
            {t('필터 초기화', 'Reset Filters')}
          </ColorfulButton>
        </ColorfulCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const eventTitle = language === 'ko' ? event.title.ko : event.title.en;
            const eventDescription = language === 'ko' ? event.description.ko : event.description.en;
            const locationName = language === 'ko' ? event.location.ko : event.location.en;
            const clubName = language === 'ko' ? event.club.ko : event.club.en;
            const isSoon = isEventSoon(event.date);

            // Get primary tag for category display
            const primaryTag = event.tags[0];
            const primaryCategory = language === 'ko' ? primaryTag.ko : primaryTag.en;

            return (
              <ColorfulCard key={event.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-56">
                  <img
                    src={event.image}
                    alt={eventTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Soon Badge */}
                  {isSoon && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse shadow-lg">
                        {t('곧 시작', 'Soon')}
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {primaryCategory}
                    </span>
                  </div>

                  {/* Event Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{eventTitle}</h3>
                    <div className="flex items-center space-x-4 text-blue-200 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed line-clamp-3">
                    {eventDescription}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{locationName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} {t('명 참석', 'attendees')}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {t('태그', 'Tags')}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {event.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                        >
                          {language === 'ko' ? tag.ko : tag.en}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-800">
                        {t('주최', 'Organized by')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {clubName}
                    </p>
                  </div>

                  {/* Fee Information */}
                  {event.fee && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-800">
                          {t('참가비', 'Fee')}
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          ₩{event.fee.amount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {language === 'ko' ? event.fee.description.ko : event.fee.description.en}
                      </p>
                    </div>
                  )}

                  {/* Cultural Notes */}
                  {event.culturalNotes && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-purple-800 mb-1">
                        {t('문화 가이드', 'Cultural Guide')}
                      </h4>
                      <p className="text-xs text-purple-700">
                        {language === 'ko' ? event.culturalNotes.ko : event.culturalNotes.en}
                      </p>
                    </div>
                  )}

                  {/* View Details Button */}
                  <Link to={`/event/${event.id}`}>
                    <ColorfulButton className="w-full">
                      {t('자세히 보기', 'View Details')}
                    </ColorfulButton>
                  </Link>
                </div>
              </ColorfulCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

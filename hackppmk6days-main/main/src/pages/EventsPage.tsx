import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { koreanEvents } from '../data/koreanEvents';
import { EventsHeader } from '../components/events/EventsHeader';
import { EventsFilters } from '../components/events/EventsFilters';
import { EventCard } from '../components/events/EventCard';
import { EmptyState } from '../components/events/EmptyState';

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

      // Category filter
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

  // Calculate stats
  const stats = useMemo(() => {
    const now = new Date();
    const upcoming = koreanEvents.filter(event => new Date(event.date) >= now).length;
    return {
      total: koreanEvents.length,
      upcoming,
      categories: categories.length
    };
  }, [categories]);

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

  const getCategoryIcon = (category: string) => {
    if (category.includes('문화') || category.includes('Cultural')) return '🎭';
    if (category.includes('학술') || category.includes('Academic')) return '📚';
    if (category.includes('스포츠') || category.includes('Sports')) return '⚽';
    if (category.includes('음악') || category.includes('Music')) return '🎵';
    if (category.includes('예술') || category.includes('Art')) return '🎨';
    if (category.includes('기술') || category.includes('Tech')) return '💻';
    if (category.includes('봉사') || category.includes('Volunteer')) return '🤝';
    return '🌟';
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setUpcomingOnly(true);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <EventsHeader 
          totalEvents={stats.total}
          upcomingEvents={stats.upcoming}
          categories={stats.categories}
        />

        {/* Filters Section */}
        <EventsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          upcomingOnly={upcomingOnly}
          setUpcomingOnly={setUpcomingOnly}
          categories={categories}
          getCategoryIcon={getCategoryIcon}
          onReset={handleReset}
        />

        {/* Events Grid or Empty State */}
        {filteredEvents.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="mb-4 sm:mb-6 text-center">
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                {t(`${filteredEvents.length}개의 이벤트를 찾았습니다`, 
                   `Found ${filteredEvents.length} events`)}
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  isEventSoon={isEventSoon}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState 
            searchTerm={searchTerm}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

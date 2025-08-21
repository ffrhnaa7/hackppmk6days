import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, Calendar, MapPin, Star, Sparkles, TrendingUp, Award, Globe, Heart, Bookmark, Eye, Grid3x3, List, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { ColorfulInput } from '../components/ColorfulInput';
import { ClubInteractionButtons } from '../components/ClubInteractionButtons';
import { useLanguage } from '../contexts/LanguageContext';
import { koreanClubs } from '../data/koreanClubs';

export const ClubsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [recruitingOnly, setRecruitingOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'members' | 'established' | 'popular'>('popular');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [showFilters, setShowFilters] = useState(false);

  // Helper function to get category name based on language
  const getCategoryName = (category: string) => {
    if (language === 'ko') {
      return category;
    }
    
    // Convert Korean category to English
    switch (category) {
      case '학술':
        return 'Academic';
      case '문화':
        return 'Cultural';
      case '취미':
        return 'Hobby';
      case '봉사':
        return 'Volunteer';
      case '종교':
        return 'Religious';
      case '체육':
        return 'Sports';
      case '학생회':
        return 'Student Association';
      default:
        return category;
    }
  };

  // Get unique categories
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    koreanClubs.forEach(club => {
      const categoryName = getCategoryName(club.category);
      categorySet.add(categoryName);
    });
    return Array.from(categorySet).sort();
  }, [language]);

  // Filter and sort clubs
  const filteredClubs = useMemo(() => {
    let filtered = koreanClubs.filter(club => {
      const clubName = language === 'ko' ? club.name.ko : club.name.en;
      const clubDescription = language === 'ko' ? club.description.ko : club.description.en;
      
      // Search filter
      const matchesSearch = !searchTerm || 
        clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clubDescription.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const categoryName = getCategoryName(club.category);
      const matchesCategory = selectedCategory === 'all' || categoryName === selectedCategory;

      // Recruiting filter
      const matchesRecruiting = !recruitingOnly || club.recruiting;

      return matchesSearch && matchesCategory && matchesRecruiting;
    });

    // Sort clubs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          const nameA = language === 'ko' ? a.name.ko : a.name.en;
          const nameB = language === 'ko' ? b.name.ko : b.name.en;
          return nameA.localeCompare(nameB);
        case 'members':
          return b.memberCount - a.memberCount;
        case 'established':
          return b.established - a.established;
        case 'popular':
        default:
          // Sort by recruiting status first, then by member count
          if (a.recruiting && !b.recruiting) return -1;
          if (!a.recruiting && b.recruiting) return 1;
          return b.memberCount - a.memberCount;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, recruitingOnly, sortBy, language]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '학술':
      case 'Academic':
        return '📚';
      case '문화':
      case 'Cultural':
        return '🎭';
      case '취미':
      case 'Hobby':
        return '🎨';
      case '봉사':
      case 'Volunteer':
        return '🤝';
      case '종교':
      case 'Religious':
        return '🙏';
      case '체육':
      case 'Sports':
        return '⚽';
      case '학생회':
      case 'Student Association':
        return '🏛️';
      default:
        return '🌟';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '학술':
      case 'Academic':
        return 'from-blue-400 to-blue-600';
      case '문화':
      case 'Cultural':
        return 'from-purple-400 to-purple-600';
      case '취미':
      case 'Hobby':
        return 'from-pink-400 to-pink-600';
      case '봉사':
      case 'Volunteer':
        return 'from-green-400 to-green-600';
      case '종교':
      case 'Religious':
        return 'from-yellow-400 to-yellow-600';
      case '체육':
      case 'Sports':
        return 'from-orange-400 to-orange-600';
      case '학생회':
      case 'Student Association':
        return 'from-indigo-400 to-indigo-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simplified Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            {t('동아리 탐색', 'Explore Clubs')}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('당신의 열정을 찾아보세요', 'Find your passion')}
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-gray-800">{koreanClubs.length}</div>
            <div className="text-sm text-gray-500">{t('전체 동아리', 'Total Clubs')}</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
              {koreanClubs.filter(c => c.recruiting).length}
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></div>
            </div>
            <div className="text-sm text-gray-500">{t('모집 중', 'Recruiting')}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-gray-800">{categories.length}</div>
            <div className="text-sm text-gray-500">{t('카테고리', 'Categories')}</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={t('동아리 검색...', 'Search clubs...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex gap-2">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <option value="all">{t('모든 카테고리', 'All Categories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryIcon(category)} {category}
                  </option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <option value="popular">⭐ {t('인기순', 'Popular')}</option>
                <option value="name">🔤 {t('이름순', 'Name')}</option>
                <option value="members">👥 {t('멤버수', 'Members')}</option>
                <option value="established">📅 {t('설립순', 'Established')}</option>
              </select>

              {/* Recruiting Toggle */}
              <button
                onClick={() => setRecruitingOnly(!recruitingOnly)}
                className={`px-4 py-3 rounded-xl border transition-all flex items-center gap-2 ${
                  recruitingOnly 
                    ? 'bg-green-50 border-green-300 text-green-700' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${recruitingOnly ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="hidden sm:inline">{t('모집중', 'Recruiting')}</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'cards' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={t('카드 보기', 'Card View')}
                >
                  <Grid3x3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={t('목록 보기', 'List View')}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== 'all' || recruitingOnly || searchTerm) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {getCategoryIcon(selectedCategory)} {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 hover:text-blue-900"
                  >
                    ✕
                  </button>
                </span>
              )}
              {recruitingOnly && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {t('모집중', 'Recruiting')}
                  <button
                    onClick={() => setRecruitingOnly(false)}
                    className="ml-1 hover:text-green-900"
                  >
                    ✕
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  🔍 "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 hover:text-gray-900"
                  >
                    ✕
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setRecruitingOnly(false);
                }}
                className="text-sm text-gray-500 hover:text-gray-700 ml-2"
              >
                {t('모두 지우기', 'Clear all')}
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          {t(`${filteredClubs.length}개의 결과`, `${filteredClubs.length} results`)}
        </div>

        {/* Clubs Display */}
        {filteredClubs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('검색 결과가 없습니다', 'No clubs found')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('다른 검색어를 시도해보세요', 'Try different search terms')}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setRecruitingOnly(false);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                {t('필터 초기화', 'Reset Filters')}
              </button>
            </div>
          </div>
        ) : viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => {
              const clubName = language === 'ko' ? club.name.ko : club.name.en;
              const clubDescription = language === 'ko' ? club.description.ko : club.description.en;
              const categoryName = getCategoryName(club.category);

              return (
                <div
                  key={club.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Club Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={club.image}
                      alt={clubName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${getCategoryColor(categoryName)} shadow-lg`}>
                      {getCategoryIcon(categoryName)} {categoryName}
                    </div>

                    {/* Recruiting Badge */}
                    {club.recruiting && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        {t('모집중', 'Open')}
                      </div>
                    )}

                    {/* Club Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {clubName}
                      </h3>
                      <div className="flex items-center gap-3 text-white/90 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {club.memberCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {club.established}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Club Content */}
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {clubDescription}
                    </p>

                    {/* Activities Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {club.activities.slice(0, 3).map((activity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs"
                        >
                          {language === 'ko' ? activity.ko : activity.en}
                        </span>
                      ))}
                      {club.activities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs">
                          +{club.activities.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link to={`/club/${club.id}`} className="flex-1">
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium">
                          {t('자세히 보기', 'View Details')}
                        </button>
                      </Link>
                      <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
                      </button>
                      <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Bookmark className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredClubs.map((club) => {
              const clubName = language === 'ko' ? club.name.ko : club.name.en;
              const clubDescription = language === 'ko' ? club.description.ko : club.description.en;
              const categoryName = getCategoryName(club.category);

              return (
                <div
                  key={club.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6"
                >
                  <div className="flex gap-6">
                    {/* Club Image */}
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={club.image}
                        alt={clubName}
                        className="w-full h-full object-cover"
                      />
                      {club.recruiting && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                      )}
                    </div>

                    {/* Club Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">
                              {clubName}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${getCategoryColor(categoryName)}`}>
                              {getCategoryIcon(categoryName)} {categoryName}
                            </span>
                            {club.recruiting && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                {t('모집중', 'Recruiting')}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {club.memberCount} {t('명', 'members')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {t(`${club.established}년 설립`, `Est. ${club.established}`)}
                            </span>
                            {club.country && (
                              <span className="flex items-center gap-1">
                                <Globe className="h-4 w-4" />
                                {club.country}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          <Link to={`/club/${club.id}`}>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                              {t('상세보기', 'Details')}
                            </button>
                          </Link>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {clubDescription}
                      </p>

                      {/* Activities */}
                      <div className="flex flex-wrap gap-2">
                        {club.activities.slice(0, 5).map((activity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs"
                          >
                            {language === 'ko' ? activity.ko : activity.en}
                          </span>
                        ))}
                        {club.activities.length > 5 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs">
                            +{club.activities.length - 5} {t('더', 'more')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More */}
        {filteredClubs.length > 0 && filteredClubs.length >= 9 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              {t('더 보기', 'Load More')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

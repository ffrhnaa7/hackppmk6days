import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Filter, Users, Calendar, MapPin, Star, Sparkles, TrendingUp, Award, Globe, Heart, Bookmark, Eye, ChevronRight, Clock, UserPlus } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '문화':
      case 'Cultural':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case '취미':
      case 'Hobby':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case '봉사':
      case 'Volunteer':
        return 'bg-green-50 text-green-700 border-green-200';
      case '종교':
      case 'Religious':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case '체육':
      case 'Sports':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case '학생회':
      case 'Student Association':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" ref={containerRef}>
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating circle - moves slowly */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
          style={{
            top: '10%',
            left: '70%',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.15}px)`,
          }}
        />
        
        {/* Medium floating square - rotates and moves */}
        <div 
          className="absolute w-64 h-64 bg-gradient-to-tr from-green-200/20 to-teal-200/20 blur-2xl"
          style={{
            top: '40%',
            left: '-10%',
            transform: `translate(${scrollY * 0.2}px, ${scrollY * -0.1}px) rotate(${scrollY * 0.1}deg)`,
          }}
        />
        
        {/* Small floating circle - moves faster */}
        <div 
          className="absolute w-48 h-48 bg-gradient-to-bl from-pink-200/20 to-orange-200/20 rounded-full blur-2xl"
          style={{
            top: '60%',
            right: '5%',
            transform: `translate(${scrollY * -0.3}px, ${scrollY * -0.2}px)`,
          }}
        />
        
        {/* Floating triangle shape */}
        <div 
          className="absolute w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[260px] border-b-yellow-200/20 blur-2xl"
          style={{
            top: '20%',
            left: '30%',
            transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.1}px) rotate(${scrollY * -0.05}deg)`,
          }}
        />
        
        {/* Large background gradient circle */}
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/10 to-purple-200/10 rounded-full blur-3xl"
          style={{
            bottom: '-20%',
            left: '20%',
            transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.1}px)`,
          }}
        />
        
        {/* Floating diamond */}
        <div 
          className="absolute w-32 h-32 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 blur-xl"
          style={{
            top: '75%',
            left: '60%',
            transform: `translate(${scrollY * 0.25}px, ${scrollY * -0.15}px) rotate(45deg)`,
          }}
        />
        
        {/* Small accent circles */}
        <div 
          className="absolute w-24 h-24 bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-full blur-xl"
          style={{
            top: '35%',
            right: '25%',
            transform: `translate(${scrollY * -0.2}px, ${scrollY * 0.3}px)`,
          }}
        />
        
        <div 
          className="absolute w-36 h-36 bg-gradient-to-tl from-amber-200/20 to-yellow-200/20 rounded-full blur-2xl"
          style={{
            bottom: '30%',
            right: '40%',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.25}px)`,
          }}
        />
        
        {/* Animated floating dots */}
        <div 
          className="absolute w-4 h-4 bg-blue-400/30 rounded-full blur-sm animate-pulse"
          style={{
            top: '15%',
            left: '15%',
            transform: `translate(${scrollY * 0.5}px, ${scrollY * -0.3}px)`,
          }}
        />
        
        <div 
          className="absolute w-6 h-6 bg-purple-400/30 rounded-full blur-sm animate-pulse delay-1000"
          style={{
            top: '45%',
            right: '10%',
            transform: `translate(${scrollY * -0.4}px, ${scrollY * 0.2}px)`,
          }}
        />
        
        <div 
          className="absolute w-5 h-5 bg-green-400/30 rounded-full blur-sm animate-pulse"
          style={{
            bottom: '25%',
            left: '8%',
            transform: `translate(${scrollY * 0.3}px, ${scrollY * -0.4}px)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Simplified Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('동아리 탐색', 'Explore Clubs')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('다양한 동아리를 탐색하고 새로운 경험을 시작하세요', 
                'Explore diverse clubs and start new experiences')}
          </p>
        </div>

        {/* Quick Stats - Horizontal Layout */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{koreanClubs.length}</div>
            <div className="text-sm text-gray-600">{t('총 동아리', 'Total Clubs')}</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
              {koreanClubs.filter(c => c.recruiting).length}
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></div>
            </div>
            <div className="text-sm text-gray-600">{t('모집 중', 'Recruiting')}</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
            <div className="text-sm text-gray-600">{t('카테고리', 'Categories')}</div>
          </div>
        </div>

        {/* Search and Filters - Clean Layout */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('동아리 이름이나 설명으로 검색...', 'Search by club name or description...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Filter Controls - Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('카테고리', 'Category')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white/80 backdrop-blur-sm"
              >
                <option value="all">{t('모든 카테고리', 'All Categories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryIcon(category)} {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('정렬', 'Sort By')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white/80 backdrop-blur-sm"
              >
                <option value="popular">{t('인기순', 'Popular')}</option>
                <option value="name">{t('이름순', 'Name')}</option>
                <option value="members">{t('멤버수', 'Members')}</option>
                <option value="established">{t('설립년도', 'Established')}</option>
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('보기 모드', 'View Mode')}
              </label>
              <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-3 py-1.5 rounded text-sm font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('그리드', 'Grid')}
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-3 py-1.5 rounded text-sm font-medium transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('목록', 'List')}
                </button>
              </div>
            </div>

            {/* Recruiting Filter */}
            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer bg-gray-50/80 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-100/80 transition-colors w-full">
                <input
                  type="checkbox"
                  checked={recruitingOnly}
                  onChange={(e) => setRecruitingOnly(e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {t('모집 중만', 'Recruiting only')}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-700">
            <span className="font-semibold">{filteredClubs.length}</span> {t('개의 동아리', 'clubs found')}
          </p>
          {(searchTerm || selectedCategory !== 'all' || recruitingOnly) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setRecruitingOnly(false);
                setSortBy('popular');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {t('필터 초기화', 'Clear filters')}
            </button>
          )}
        </div>

        {/* Clubs Display */}
        {filteredClubs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100/80 backdrop-blur-sm rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('검색 결과가 없습니다', 'No clubs found')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('검색 조건을 조정해보세요', 'Try adjusting your search criteria')}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setRecruitingOnly(false);
                setSortBy('popular');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('모든 동아리 보기', 'Show All Clubs')}
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map((club) => {
                  const clubName = language === 'ko' ? club.name.ko : club.name.en;
                  const clubDescription = language === 'ko' ? club.description.ko : club.description.en;
                  const categoryName = getCategoryName(club.category);

                  return (
                    <div key={club.id} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      {/* Image Section */}
                      <div className="relative h-48">
                        <img
                          src={club.image}
                          alt={clubName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {club.recruiting && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              {t('모집중', 'Recruiting')}
                            </span>
                          )}
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(categoryName)}`}>
                            {getCategoryIcon(categoryName)} {categoryName}
                          </span>
                        </div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white">
                            {clubName}
                          </h3>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4">
                        {/* Description */}
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {clubDescription}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{club.memberCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{club.established}</span>
                          </div>
                          {club.country && (
                            <div className="flex items-center gap-1">
                              <Globe className="h-4 w-4" />
                              <span>{club.country}</span>
                            </div>
                          )}
                        </div>

                        {/* Activities */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {club.activities.slice(0, 3).map((activity, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {language === 'ko' ? activity.ko : activity.en}
                            </span>
                          ))}
                          {club.activities.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              +{club.activities.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Link to={`/club/${club.id}`} className="flex-1">
                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                              {t('자세히 보기', 'View Details')}
                            </button>
                          </Link>
                          {club.recruiting && (
                            <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
                              {t('가입 신청', 'Apply')}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredClubs.map((club) => {
                  const clubName = language === 'ko' ? club.name.ko : club.name.en;
                  const clubDescription = language === 'ko' ? club.description.ko : club.description.en;
                  const categoryName = getCategoryName(club.category);

                  return (
                    <div key={club.id} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex">
                        {/* Image Section */}
                        <div className="relative w-48 h-36 flex-shrink-0">
                          <img
                            src={club.image}
                            alt={clubName}
                            className="w-full h-full object-cover"
                          />
                          {club.recruiting && (
                            <div className="absolute top-2 left-2">
                              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                {t('모집중', 'Recruiting')}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {clubName}
                              </h3>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(categoryName)}`}>
                                {getCategoryIcon(categoryName)} {categoryName}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {clubDescription}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{club.memberCount}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{club.established}</span>
                              </div>
                              {club.country && (
                                <div className="flex items-center gap-1">
                                  <Globe className="h-4 w-4" />
                                  <span>{club.country}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <Link to={`/club/${club.id}`}>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1">
                                  {t('자세히', 'Details')}
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                              </Link>
                              {club.recruiting && (
                                <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
                                  {t('가입', 'Join')}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

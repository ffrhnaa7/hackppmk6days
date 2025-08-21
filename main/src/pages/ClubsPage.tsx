import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, Calendar, MapPin, Star, Sparkles, TrendingUp, Award, Globe, Heart, Bookmark, Eye } from 'lucide-react';
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
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '문화':
      case 'Cultural':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case '취미':
      case 'Hobby':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case '봉사':
      case 'Volunteer':
        return 'bg-green-100 text-green-800 border-green-200';
      case '종교':
      case 'Religious':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '체육':
      case 'Sports':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case '학생회':
      case 'Student Association':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-primary rounded-full p-4 mr-4 shadow-lg">
            <Users className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              {t('동아리 허브', 'Club Hub')}
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              {t('새로운 경험의 시작', 'Start Your New Journey')}
            </p>
          </div>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {t('다양한 동아리를 탐색하고 새로운 경험을 시작하세요. 한국 대학 생활의 핵심을 경험해보세요!', 
              'Explore diverse clubs and start new experiences. Experience the heart of Korean university life!')}
        </p>
        
        {/* Enhanced Quick Stats */}
        <div className="flex justify-center space-x-8 mt-8">
          <div className="text-center group">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">{koreanClubs.length}</div>
              <div className="text-sm font-semibold text-gray-600">{t('총 동아리', 'Total Clubs')}</div>
            </div>
          </div>
          <div className="text-center group">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2 flex items-center justify-center">
                {koreanClubs.filter(c => c.recruiting).length}
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></div>
              </div>
              <div className="text-sm font-semibold text-gray-600">{t('모집 중', 'Recruiting')}</div>
            </div>
          </div>
          <div className="text-center group">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">{categories.length}</div>
              <div className="text-sm font-semibold text-gray-600">{t('카테고리', 'Categories')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <ColorfulCard className="mb-8 overflow-hidden border-0 shadow-xl">
        <div className="bg-gradient-to-r from-blue-50 via-mint-50 to-purple-50 p-8">
          <div className="space-y-8">
            {/* Enhanced Search */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                <Search className="h-5 w-5 inline mr-2" />
                {t('동아리 검색', 'Search Clubs')}
              </label>
              <ColorfulInput
                placeholder={t('동아리 이름이나 설명으로 검색...', 'Search by club name or description...')}
                icon={<Search className="h-5 w-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg h-14 shadow-lg"
              />
            </div>

            {/* Enhanced Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Filter className="h-4 w-4 inline mr-2" />
                  {t('카테고리', 'Category')}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-md hover:shadow-lg transition-all font-medium"
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
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <TrendingUp className="h-4 w-4 inline mr-2" />
                  {t('정렬', 'Sort By')}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-md hover:shadow-lg transition-all font-medium"
                >
                  <option value="popular">{t('인기순', 'Popular')}</option>
                  <option value="name">{t('이름순', 'Name')}</option>
                  <option value="members">{t('멤버수', 'Members')}</option>
                  <option value="established">{t('설립년도', 'Established')}</option>
                </select>
              </div>

              {/* Recruiting Filter */}
              <div className="flex items-end">
                <label className="flex items-center space-x-3 cursor-pointer bg-white px-5 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-green-300 transition-all shadow-md hover:shadow-lg w-full">
                  <input
                    type="checkbox"
                    checked={recruitingOnly}
                    onChange={(e) => setRecruitingOnly(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-5 h-5"
                  />
                  <span className="text-sm font-bold text-gray-700">
                    {t('모집 중만', 'Recruiting only')}
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto"></div>
                </label>
              </div>

              {/* View Mode Toggle */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Eye className="h-4 w-4 inline mr-2" />
                  {t('보기 모드', 'View Mode')}
                </label>
                <div className="flex bg-white rounded-xl p-1 border-2 border-gray-200 shadow-md">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      viewMode === 'cards'
                        ? 'bg-gradient-primary text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {t('카드', 'Cards')}
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      viewMode === 'list'
                        ? 'bg-gradient-primary text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {t('목록', 'List')}
                  </button>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <ColorfulButton
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setRecruitingOnly(false);
                    setSortBy('popular');
                  }}
                  className="w-full h-12 font-bold shadow-md hover:shadow-lg"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t('초기화', 'Reset')}
                </ColorfulButton>
              </div>
            </div>
          </div>
        </div>
      </ColorfulCard>

      {/* Enhanced Results Summary */}
      <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary rounded-full p-2">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">
                  {t(`${filteredClubs.length}개의 동아리`, `${filteredClubs.length} clubs`)}
                </p>
                <p className="text-sm text-gray-500">{t('검색 결과', 'search results')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-green-700">{filteredClubs.filter(club => club.recruiting).length}</span>
                <span className="text-green-600">{t('모집 중', 'recruiting')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="font-bold text-blue-700">{filteredClubs.filter(club => club.established < 2020).length}</span>
                <span className="text-blue-600">{t('전통 동아리', 'established')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Clubs Display */}
      {filteredClubs.length === 0 ? (
        <ColorfulCard className="text-center p-16 border-0 shadow-xl">
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center shadow-inner">
              <Filter className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t('검색 결과가 없습니다', 'No clubs found')}
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {t('검색 조건을 조정하거나 다른 키워드로 시도해보세요', 'Try adjusting your search criteria or using different keywords')}
            </p>
            <ColorfulButton
              size="lg"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setRecruitingOnly(false);
                setSortBy('popular');
              }}
              className="shadow-lg hover:shadow-xl"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              {t('모든 동아리 보기', 'Show All Clubs')}
            </ColorfulButton>
          </div>
        </ColorfulCard>
      ) : (
        <div className={viewMode === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
          {filteredClubs.map((club) => {
            const clubName = language === 'ko' ? club.name.ko : club.name.en;
            const clubDescription = language === 'ko' ? club.description.ko : club.description.en;
            const categoryName = getCategoryName(club.category);

            if (viewMode === 'list') {
              return (
                <ColorfulCard key={club.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <div className="flex">
                    {/* Image Section */}
                    <div className="relative w-48 h-32 flex-shrink-0">
                      <img
                        src={club.image}
                        alt={clubName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                      
                      {/* Status Badges */}
                      <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {club.recruiting && (
                          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            {t('모집중', 'Recruiting')}
                          </div>
                        )}
                        {club.established < 2010 && (
                          <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {t('전통', 'Legacy')}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-mint-600 transition-colors">
                              {clubName}
                            </h3>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(categoryName)}`}>
                              <span className="mr-1">{getCategoryIcon(categoryName)}</span>
                              {categoryName}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {clubDescription}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{t(`${club.established}년`, `Est. ${club.established}`)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{club.memberCount.toLocaleString()}</span>
                            </div>
                            {club.country && (
                              <div className="flex items-center space-x-1">
                                <Globe className="h-4 w-4" />
                                <span>{club.country}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 ml-4">
                          <Link to={`/club/${club.id}`}>
                            <ColorfulButton size="sm" className="whitespace-nowrap">
                              {t('자세히', 'Details')}
                            </ColorfulButton>
                          </Link>
                        </div>
                      </div>

                      {/* Interaction Buttons */}
                      <ClubInteractionButtons
                        clubId={club.id}
                        clubName={clubName}
                        recruiting={club.recruiting}
                        showCounts={false}
                        className="justify-start"
                      />
                    </div>
                  </div>
                </ColorfulCard>
              );
            }

            // Card View
            return (
              <ColorfulCard key={club.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={club.image}
                    alt={clubName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Enhanced Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {club.recruiting && (
                      <div className="flex items-center space-x-2 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-xl animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                        <span>{t('모집중', 'Recruiting')}</span>
                      </div>
                    )}
                    {club.established < 2010 && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-xl">
                        <Award className="h-4 w-4 inline mr-1" />
                        {t('전통', 'Legacy')}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-xl border backdrop-blur-sm ${getCategoryColor(categoryName)} bg-white/95`}>
                      <span className="mr-2">{getCategoryIcon(categoryName)}</span>
                      {categoryName}
                    </div>
                  </div>

                  {/* Enhanced Club Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-mint-200 transition-colors mb-3">
                      {clubName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
                      <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                        <Calendar className="h-4 w-4" />
                        <span className="font-semibold">{t(`${club.established}년`, `Est. ${club.established}`)}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                        <Users className="h-4 w-4" />
                        <span className="font-semibold">{club.memberCount.toLocaleString()}</span>
                      </div>
                      {club.country && (
                        <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                          <Globe className="h-4 w-4" />
                          <span className="font-semibold">{club.country}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Enhanced Description */}
                  <div>
                    <p className="text-gray-700 leading-relaxed line-clamp-3 text-sm">
                      {clubDescription}
                    </p>
                  </div>

                  {/* Enhanced Officers Section */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      {t('주요 임원', 'Key Officers')}
                    </h4>
                    <div className="space-y-2">
                      {club.officers.slice(0, 2).map((officer, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-mint-50 rounded-xl border border-gray-100 hover:shadow-md transition-all">
                          <span className="text-gray-800 font-semibold text-sm">
                            {language === 'ko' ? officer.name.ko : officer.name.en}
                          </span>
                          <span className="text-blue-600 font-bold text-xs bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                            {language === 'ko' ? officer.role.ko : officer.role.en}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Activities */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 text-sm">
                      {t('주요 활동', 'Main Activities')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {club.activities.slice(0, 4).map((activity, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-gradient-to-r from-mint-100 to-blue-100 text-mint-800 rounded-full text-xs font-bold border border-mint-200 hover:shadow-md hover:scale-105 transition-all cursor-default"
                        >
                          {language === 'ko' ? activity.ko : activity.en}
                        </span>
                      ))}
                      {club.activities.length > 4 && (
                        <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-bold border border-gray-200 hover:bg-gray-200 transition-colors cursor-default">
                          +{club.activities.length - 4} {t('더', 'more')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Club Actions */}
                  <div className="border-t pt-6 space-y-4">
                    {/* Interaction Buttons */}
                    <ClubInteractionButtons
                      clubId={club.id}
                      clubName={clubName}
                      recruiting={club.recruiting}
                      showCounts={true}
                      className="mb-4"
                    />

                    {/* Enhanced Bottom Row: View Details */}
                    <div className="flex items-center">
                      <Link to={`/club/${club.id}`} className="flex-1">
                        <ColorfulButton className="w-full group-hover:shadow-lg transition-shadow font-bold">
                          <Sparkles className="h-4 w-4 mr-2" />
                          {t('자세히 보기', 'View Details')}
                        </ColorfulButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </ColorfulCard>
            );
          })}
        </div>
      )}

      {/* Enhanced Load More Button */}
      {filteredClubs.length > 0 && (
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-md mx-auto">
            <div className="mb-6">
              <div className="bg-gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {t('더 많은 동아리가 있어요!', 'More clubs available!')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('계속 탐색해보세요', 'Keep exploring')}
              </p>
            </div>
            <ColorfulButton size="lg" className="shadow-lg hover:shadow-xl font-bold">
              <Sparkles className="h-5 w-5 mr-2" />
              {t('더 많은 동아리 탐색', 'Explore More Clubs')}
            </ColorfulButton>
          </div>
        </div>
      )}
    </div>
  );
};

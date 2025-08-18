import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, Calendar, MapPin, Star, Sparkles, TrendingUp, Award, Globe } from 'lucide-react';
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

  // Get unique categories
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    koreanClubs.forEach(club => {
      const categoryName = language === 'ko' ? 
        (club.category === '학술' ? '학술' :
         club.category === '문화' ? '문화' :
         club.category === '취미' ? '취미' :
         club.category === '봉사' ? '봉사' :
         club.category === '종교' ? '종교' :
         club.category === '체육' ? '체육' :
         club.category === '학생회' ? '학생회' : club.category) :
        (club.category === '학술' ? 'Academic' :
         club.category === '문화' ? 'Cultural' :
         club.category === '취미' ? 'Hobby' :
         club.category === '봉사' ? 'Volunteer' :
         club.category === '종교' ? 'Religious' :
         club.category === '체육' ? 'Sports' :
         club.category === '학생회' ? 'Student Association' : club.category);
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
      const categoryName = language === 'ko' ? 
        (club.category === '학술' ? '학술' :
         club.category === '문화' ? '문화' :
         club.category === '취미' ? '취미' :
         club.category === '봉사' ? '봉사' :
         club.category === '종교' ? '종교' :
         club.category === '체육' ? '체육' :
         club.category === '학생회' ? '학생회' : club.category) :
        (club.category === '학술' ? 'Academic' :
         club.category === '문화' ? 'Cultural' :
         club.category === '취미' ? 'Hobby' :
         club.category === '봉사' ? 'Volunteer' :
         club.category === '종교' ? 'Religious' :
         club.category === '체육' ? 'Sports' :
         club.category === '학생회' ? 'Student Association' : club.category);
      
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
      {/* Clean Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-primary rounded-full p-3 mr-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('동아리 허브', 'Club Hub')}
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('다양한 동아리를 탐색하고 새로운 경험을 시작하세요. 한국 대학 생활의 핵심을 경험해보세요!', 
              'Explore diverse clubs and start new experiences. Experience the heart of Korean university life!')}
        </p>
        
        {/* Quick Stats */}
        <div className="flex justify-center space-x-8 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{koreanClubs.length}</div>
            <div className="text-sm text-gray-600">{t('총 동아리', 'Total Clubs')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{koreanClubs.filter(c => c.recruiting).length}</div>
            <div className="text-sm text-gray-600">{t('모집 중', 'Recruiting')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-sm text-gray-600">{t('카테고리', 'Categories')}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ColorfulCard className="mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 via-mint-50 to-purple-50 p-6">
          <div className="space-y-6">
            {/* Search */}
            <div>
              <ColorfulInput
                placeholder={t('동아리 이름이나 설명으로 검색...', 'Search by club name or description...')}
                icon={<Search className="h-5 w-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Filter className="h-4 w-4 inline mr-1" />
                  {t('카테고리', 'Category')}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  {t('정렬', 'Sort By')}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="popular">{t('인기순', 'Popular')}</option>
                  <option value="name">{t('이름순', 'Name')}</option>
                  <option value="members">{t('멤버수', 'Members')}</option>
                  <option value="established">{t('설립년도', 'Established')}</option>
                </select>
              </div>

              {/* Recruiting Filter */}
              <div className="flex items-end">
                <label className="flex items-center space-x-2 cursor-pointer bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={recruitingOnly}
                    onChange={(e) => setRecruitingOnly(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {t('모집 중만', 'Recruiting only')}
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </label>
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
                  className="w-full"
                >
                  {t('필터 초기화', 'Clear Filters')}
                </ColorfulButton>
              </div>
            </div>
          </div>
        </div>
      </ColorfulCard>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <p className="text-gray-600 font-medium">
            {t(`${filteredClubs.length}개의 동아리 발견`, `${filteredClubs.length} clubs found`)}
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">{filteredClubs.filter(club => club.recruiting).length}</span>
              <span>{t('모집 중', 'recruiting')}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center space-x-1 text-blue-600">
              <Award className="h-4 w-4" />
              <span className="font-semibold">{filteredClubs.filter(club => club.established < 2020).length}</span>
              <span>{t('전통 동아리', 'established clubs')}</span>
            </div>
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">{t('보기:', 'View:')}</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button className="px-3 py-1 bg-white rounded text-sm font-medium text-blue-600 shadow-sm">
              {t('카드', 'Cards')}
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800">
              {t('목록', 'List')}
            </button>
          </div>
        </div>
      </div>

      {/* Systematic Clubs Grid */}
      {filteredClubs.length === 0 ? (
        <ColorfulCard className="text-center p-12">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('검색 결과가 없습니다', 'No clubs found')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('검색 조건을 조정하거나 다른 키워드로 시도해보세요', 'Try adjusting your search criteria or using different keywords')}
            </p>
            <ColorfulButton
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setRecruitingOnly(false);
                setSortBy('popular');
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {t('모든 동아리 보기', 'Show All Clubs')}
            </ColorfulButton>
          </div>
        </ColorfulCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClubs.map((club) => {
            const clubName = language === 'ko' ? club.name.ko : club.name.en;
            const clubDescription = language === 'ko' ? club.description.ko : club.description.en;
            const categoryName = language === 'ko' ? 
              (club.category === '학술' ? '학술' :
               club.category === '문화' ? '문화' :
               club.category === '취미' ? '취미' :
               club.category === '봉사' ? '봉사' :
               club.category === '종교' ? '종교' :
               club.category === '체육' ? '체육' :
               club.category === '학생회' ? '학생회' : club.category) :
              (club.category === '학술' ? 'Academic' :
               club.category === '문화' ? 'Cultural' :
               club.category === '취미' ? 'Hobby' :
               club.category === '봉사' ? 'Volunteer' :
               club.category === '종교' ? 'Religious' :
               club.category === '체육' ? 'Sports' :
               club.category === '학생회' ? 'Student Association' : club.category);

            return (
              <ColorfulCard key={club.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={club.image}
                    alt={clubName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {club.recruiting && (
                      <div className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                        <span>{t('모집중', 'Recruiting')}</span>
                      </div>
                    )}
                    {club.established < 2010 && (
                      <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        <Award className="h-3 w-3 inline mr-1" />
                        {t('전통', 'Legacy')}
                      </div>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg border ${getCategoryColor(categoryName)} backdrop-blur-sm`}>
                      <span className="mr-1">{getCategoryIcon(categoryName)}</span>
                      {categoryName}
                    </div>
                  </div>

                  {/* Club Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-mint-200 transition-colors mb-3">
                      {clubName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
                      <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1 backdrop-blur-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{t(`${club.established}년`, `Est. ${club.established}`)}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1 backdrop-blur-sm">
                        <Users className="h-4 w-4" />
                        <span>{club.memberCount.toLocaleString()}</span>
                      </div>
                      {club.country && (
                        <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1 backdrop-blur-sm">
                          <Globe className="h-4 w-4" />
                          <span>{club.country}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Description */}
                  <div>
                    <p className="text-gray-700 leading-relaxed line-clamp-3 text-sm">
                      {clubDescription}
                    </p>
                  </div>

                  {/* Officers Section */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      {t('주요 임원', 'Key Officers')}
                    </h4>
                    <div className="space-y-2">
                      {club.officers.slice(0, 2).map((officer, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-gray-800 font-medium text-sm">
                            {language === 'ko' ? officer.name.ko : officer.name.en}
                          </span>
                          <span className="text-blue-600 font-semibold text-xs bg-blue-100 px-2 py-1 rounded-full">
                            {language === 'ko' ? officer.role.ko : officer.role.en}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 text-sm">
                      {t('주요 활동', 'Main Activities')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {club.activities.slice(0, 4).map((activity, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-mint-100 to-blue-100 text-mint-800 rounded-full text-xs font-semibold border border-mint-200 hover:shadow-md transition-shadow"
                        >
                          {language === 'ko' ? activity.ko : activity.en}
                        </span>
                      ))}
                      {club.activities.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                          +{club.activities.length - 4} {t('더', 'more')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Club Actions */}
                  <div className="border-t pt-4 space-y-4">
                    {/* Interaction Buttons */}
                    <ClubInteractionButtons
                      clubId={club.id}
                      clubName={clubName}
                      recruiting={club.recruiting}
                      showCounts={true}
                      className="mb-3"
                    />

                    {/* Bottom Row: View Details Only */}
                    <div className="flex items-center">
                      <Link to={`/club/${club.id}`} className="flex-1">
                        <ColorfulButton className="w-full group-hover:shadow-lg transition-shadow">
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

      {/* Load More Button */}
      {filteredClubs.length > 0 && (
        <div className="text-center mt-12">
          <ColorfulButton variant="outline" size="lg">
            <TrendingUp className="h-5 w-5 mr-2" />
            {t('더 많은 동아리 탐색', 'Explore More Clubs')}
          </ColorfulButton>
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, Calendar, MapPin, Star } from 'lucide-react';
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

  // Filter clubs
  const filteredClubs = useMemo(() => {
    return koreanClubs.filter(club => {
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
  }, [searchTerm, selectedCategory, recruitingOnly, language]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          {t('동아리 허브', 'Club Hub')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('다양한 동아리를 탐색하고 새로운 경험을 시작하세요', 'Explore diverse clubs and start new experiences')}
        </p>
      </div>

      {/* Filters */}
      <ColorfulCard className="mb-8">
        <div className="p-6 space-y-4">
          {/* Search */}
          <ColorfulInput
            placeholder={t('동아리 이름이나 설명으로 검색...', 'Search by club name or description...')}
            icon={<Search className="h-5 w-5" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category and Recruiting Filters */}
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
                  checked={recruitingOnly}
                  onChange={(e) => setRecruitingOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {t('모집 중인 동아리만', 'Recruiting only')}
                </span>
              </label>
            </div>
          </div>
        </div>
      </ColorfulCard>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          {t(`${filteredClubs.length}개의 동아리`, `${filteredClubs.length} clubs found`)}
        </p>
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>{filteredClubs.filter(club => club.recruiting).length} {t('모집 중', 'recruiting')}</span>
        </div>
      </div>

      {/* Clubs Grid */}
      {filteredClubs.length === 0 ? (
        <ColorfulCard className="text-center p-12">
          <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('검색 결과가 없습니다', 'No clubs found')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('검색 조건을 조정해보세요', 'Try adjusting your search criteria')}
          </p>
          <ColorfulButton
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setRecruitingOnly(false);
            }}
          >
            {t('필터 초기화', 'Reset Filters')}
          </ColorfulButton>
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
              <ColorfulCard key={club.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-56">
                  <img
                    src={club.image}
                    alt={clubName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Recruiting Badge */}
                  {club.recruiting && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse shadow-lg">
                        {t('모집중', 'Recruiting')}
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {categoryName}
                    </span>
                  </div>

                  {/* Club Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{clubName}</h3>
                    <div className="flex items-center space-x-4 text-blue-200 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{t(`${club.established}년 설립`, `Est. ${club.established}`)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{club.memberCount} {t('명', 'members')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed line-clamp-3">
                    {clubDescription}
                  </p>

                  {/* Officers */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {t('주요 임원', 'Key Officers')}
                    </h4>
                    <div className="space-y-1">
                      {club.officers.slice(0, 2).map((officer, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {language === 'ko' ? officer.name.ko : officer.name.en}
                          </span>
                          <span className="text-blue-600 font-medium">
                            {language === 'ko' ? officer.role.ko : officer.role.en}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {t('주요 활동', 'Main Activities')}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {club.activities.slice(0, 3).map((activity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-mint-100 text-mint-800 rounded-full text-xs font-medium"
                        >
                          {language === 'ko' ? activity.ko : activity.en}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Club Interaction Buttons */}
                  <div className="border-t pt-4">
                    <ClubInteractionButtons
                      clubId={club.id}
                      clubName={clubName}
                      recruiting={club.recruiting}
                      showCounts={true}
                      className="mb-4"
                    />
                  </div>

                  {/* View Details Button */}
                  <Link to={`/club/${club.id}`}>
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

import React, { useState } from 'react';
import { Search, Users, Calendar, Mail, MessageSquare, Bot, Info, Star, Filter, Globe, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { ColorfulInput } from '../components/ColorfulInput';
import { RSVPButton } from '../components/RSVPButton';
import { ClubInteractionButtons } from '../components/ClubInteractionButtons';
import { koreanClubs } from '../data/koreanClubs';
import { koreanEvents } from '../data/koreanEvents';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export const ClubHubPage: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCulturalGuide, setShowCulturalGuide] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', ko: '전체', en: 'All' },
    { id: '학술', ko: '학술', en: 'Academic' },
    { id: '문화', ko: '문화', en: 'Cultural' },
    { id: '취미', ko: '취미', en: 'Hobby' },
    { id: '봉사', ko: '봉사', en: 'Volunteer' },
    { id: '종교', ko: '종교', en: 'Religious' },
    { id: '체육', ko: '체육', en: 'Sports' },
    { id: '학생회', ko: '학생회', en: 'Student Association' }
  ];

  const filteredClubs = koreanClubs.filter(club => {
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      (language === 'ko' ? club.name.ko : club.name.en).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (club.country && club.country.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Separate student associations for special display
  const studentAssociations = filteredClubs.filter(club => club.category === '학생회');
  const otherClubs = filteredClubs.filter(club => club.category !== '학생회');

  // Group student associations by country for better organization
  const groupedAssociations = studentAssociations.reduce((acc, club) => {
    const country = club.country || 'Other';
    if (!acc[country]) acc[country] = [];
    acc[country].push(club);
    return acc;
  }, {} as Record<string, typeof studentAssociations>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          {t('동아리 허브', 'Club Hub')}
        </h1>
        <p className="text-gray-600 text-lg">
          {t('캠퍼스의 다양한 동아리와 학회를 탐색하고 가입하세요', 'Explore and join various clubs and societies on campus')}
        </p>
        {!user && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm">
              {t('동아리를 저장하고 관심표시를 하려면 로그인하세요', 'Login to save clubs and show interest')}
            </p>
          </div>
        )}
      </div>

      {/* Student Association Highlight Banner */}
      {selectedCategory === 'all' && (
        <ColorfulCard className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Globe className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-800 mb-2">
                    {t('🌍 국제 학생회 네트워크', '🌍 International Student Association Network')}
                  </h3>
                  <p className="text-blue-700 text-sm mb-3">
                    {t(
                      '한국에서 공부하는 전 세계 학생들과 연결되세요! 고향 친구들을 만나고 문화를 공유하며 서로 도우며 성장하세요.',
                      'Connect with students from around the world studying in Korea! Meet friends from your hometown, share cultures, and grow together.'
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(groupedAssociations).slice(0, 6).map((country) => (
                      <span key={country} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {country}
                      </span>
                    ))}
                    {Object.keys(groupedAssociations).length > 6 && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        +{Object.keys(groupedAssociations).length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ColorfulButton
                size="sm"
                onClick={() => setSelectedCategory('학생회')}
              >
                <MapPin className="h-4 w-4 mr-1" />
                {t('학생회 보기', 'View Associations')}
              </ColorfulButton>
            </div>
          </div>
        </ColorfulCard>
      )}

      {/* Cultural Guide Banner */}
      <ColorfulCard className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Bot className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-purple-800 mb-2">
                  {t('🤖 AI 문화 가이드', '🤖 AI Cultural Guide')}
                </h3>
                <p className="text-purple-700 text-sm">
                  {t(
                    '한국 대학 동아리 문화가 궁금하신가요? AI 가이드가 선후배 관계, 동아리 운영 방식 등을 설명해드립니다.',
                    'Curious about Korean university club culture? Our AI guide explains senior-junior relationships, club operations, and more.'
                  )}
                </p>
              </div>
            </div>
            <ColorfulButton
              size="sm"
              variant="outline"
              onClick={() => setShowCulturalGuide(!showCulturalGuide)}
            >
              <Info className="h-4 w-4 mr-1" />
              {t('가이드 보기', 'View Guide')}
            </ColorfulButton>
          </div>

          {showCulturalGuide && (
            <div className="mt-4 p-4 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">
                {t('한국 대학 동아리 문화 이해하기', 'Understanding Korean University Club Culture')}
              </h4>
              <div className="space-y-2 text-sm text-purple-700">
                <p>
                  <strong>{t('선후배 관계:', 'Senior-Junior Relationships:')}</strong>{' '}
                  {t(
                    '한국 동아리는 학년별 위계질서가 있습니다. 선배(선배님)를 존중하고 후배를 돌보는 문화입니다.',
                    'Korean clubs have a hierarchical system based on academic year. Seniors (seonbaenim) are respected and take care of juniors.'
                  )}
                </p>
                <p>
                  <strong>{t('동아리 운영:', 'Club Operations:')}</strong>{' '}
                  {t(
                    '회장, 부회장, 총무 등의 임원진이 있으며, 정기 모임과 MT(멤버십 트레이닝)를 통해 친목을 도모합니다.',
                    'Clubs have officers like president, vice president, and treasurer. Regular meetings and MT (Membership Training) build relationships.'
                  )}
                </p>
                <p>
                  <strong>{t('국제 학생회:', 'International Student Associations:')}</strong>{' '}
                  {t(
                    '각국 학생회는 고향의 문화를 유지하면서도 한국 문화에 적응할 수 있도록 도와줍니다. 언어, 음식, 전통 행사를 통해 정체성을 유지합니다.',
                    'International student associations help maintain homeland culture while adapting to Korean culture. They preserve identity through language, food, and traditional events.'
                  )}
                </p>
                <p>
                  <strong>{t('가입 절차:', 'Joining Process:')}</strong>{' '}
                  {t(
                    '대부분 면접이나 오리엔테이션을 거쳐 가입하며, 신입생은 "새내기"라고 불립니다.',
                    'Most clubs require interviews or orientation. New members are called "saenaegi" (freshmen).'
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </ColorfulCard>

      {/* Search and Filters */}
      <ColorfulCard className="mb-6">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <ColorfulInput
                placeholder={t('동아리 또는 국가 검색...', 'Search clubs or countries...')}
                icon={<Search className="h-5 w-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <ColorfulButton
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {language === 'ko' ? category.ko : category.en}
                  {category.id === '학생회' && (
                    <Globe className="h-3 w-3 ml-1" />
                  )}
                </ColorfulButton>
              ))}
            </div>
          </div>
        </div>
      </ColorfulCard>

      {/* Student Associations Section */}
      {(selectedCategory === 'all' || selectedCategory === '학생회') && studentAssociations.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Globe className="h-6 w-6 mr-2 text-blue-600" />
              {t('국제 학생회', 'International Student Associations')}
            </h2>
            <span className="text-sm text-gray-600">
              {t(`${studentAssociations.length}개 학생회`, `${studentAssociations.length} associations`)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentAssociations.map((club) => {
              const clubName = language === 'ko' ? club.name.ko : club.name.en;
              const clubDescription = language === 'ko' ? club.description.ko : club.description.en;
              const clubRequirements = language === 'ko' ? club.requirements.ko : club.requirements.en;
              const clubCulturalGuide = language === 'ko' ? club.culturalGuide.ko : club.culturalGuide.en;

              // Get past events for this club
              const pastEvents = koreanEvents.filter(event => club.pastEvents.includes(event.id));

              return (
                <ColorfulCard key={club.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <div className="relative h-48">
                    <img
                      src={club.image}
                      alt={clubName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Country Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Globe className="h-3 w-3 mr-1" />
                        {club.country}
                      </span>
                    </div>

                    {/* Recruiting Badge */}
                    {club.recruiting && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                          {t('모집중', 'Recruiting')}
                        </span>
                      </div>
                    )}

                    {/* Club Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1">{clubName}</h3>
                      <p className="text-blue-200 text-sm">
                        {t(`${club.established}년 설립`, `Est. ${club.established}`)} • {club.memberCount} {t('명', 'members')}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {clubDescription}
                    </p>

                    {/* Embassy Info */}
                    {club.embassy && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-800 text-xs">
                          <strong>{t('대사관 연계:', 'Embassy Connection:')}</strong> {club.embassy}
                        </p>
                      </div>
                    )}

                    {/* Officers */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {t('임원진', 'Officers')}
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
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {language === 'ko' ? activity.ko : activity.en}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cultural Guide */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-amber-800 text-xs leading-relaxed">
                          <strong>{t('문화 팁:', 'Cultural Tip:')}</strong> {clubCulturalGuide}
                        </p>
                      </div>
                    </div>

                    {/* Social Media Links */}
                    {club.socialMedia && (
                      <div className="flex space-x-2">
                        {club.socialMedia.facebook && (
                          <a href={`https://facebook.com/${club.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                            <span className="text-xs">Facebook</span>
                          </a>
                        )}
                        {club.socialMedia.instagram && (
                          <a href={`https://instagram.com/${club.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                            <span className="text-xs">Instagram</span>
                          </a>
                        )}
                        {club.socialMedia.website && (
                          <a href={club.socialMedia.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                            <span className="text-xs">Website</span>
                          </a>
                        )}
                      </div>
                    )}

                    {/* Past Events with RSVP */}
                    {pastEvents.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {t('최근 이벤트', 'Recent Events')}
                        </h4>
                        <div className="space-y-2">
                          {pastEvents.slice(0, 2).map((event) => (
                            <div key={event.id} className="bg-mint-50 rounded-lg p-3">
                              <Link
                                to={`/event/${event.id}`}
                                className="block text-sm font-medium text-mint-700 hover:text-mint-800 mb-2"
                              >
                                {language === 'ko' ? event.title.ko : event.title.en}
                              </Link>
                              <RSVPButton 
                                eventId={event.id} 
                                size="sm" 
                                showCounts={false}
                                className="mt-2"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Requirements */}
                    <div className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
                      <strong>{t('가입 조건:', 'Requirements:')}</strong> {clubRequirements}
                    </div>

                    {/* Club Interaction Buttons */}
                    <div className="border-t pt-4">
                      <ClubInteractionButtons
                        clubId={club.id}
                        clubName={clubName}
                        size="sm"
                        showCounts={true}
                        className="mb-3"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <ColorfulButton size="sm" className="flex-1" disabled={!club.recruiting}>
                        {club.recruiting ? t('가입 신청', 'Apply') : t('모집 마감', 'Closed')}
                      </ColorfulButton>
                      <ColorfulButton variant="outline" size="sm" className="px-3">
                        <MessageSquare className="h-4 w-4" />
                      </ColorfulButton>
                      <ColorfulButton variant="outline" size="sm" className="px-3">
                        <Mail className="h-4 w-4" />
                      </ColorfulButton>
                    </div>
                  </div>
                </ColorfulCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Other Clubs Section */}
      {(selectedCategory === 'all' || selectedCategory !== '학생회') && otherClubs.length > 0 && (
        <div>
          {selectedCategory === 'all' && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {t('일반 동아리', 'General Clubs')}
              </h2>
              <span className="text-sm text-gray-600">
                {t(`${otherClubs.length}개 동아리`, `${otherClubs.length} clubs`)}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherClubs.map((club) => {
              const clubName = language === 'ko' ? club.name.ko : club.name.en;
              const clubDescription = language === 'ko' ? club.description.ko : club.description.en;
              const clubRequirements = language === 'ko' ? club.requirements.ko : club.requirements.en;
              const clubCulturalGuide = language === 'ko' ? club.culturalGuide.ko : club.culturalGuide.en;

              // Get past events for this club
              const pastEvents = koreanEvents.filter(event => club.pastEvents.includes(event.id));

              return (
                <ColorfulCard key={club.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <img
                      src={club.image}
                      alt={clubName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Recruiting Badge */}
                    {club.recruiting && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                          {t('모집중', 'Recruiting')}
                        </span>
                      </div>
                    )}

                    {/* Club Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1">{clubName}</h3>
                      <p className="text-blue-200 text-sm">
                        {t(`${club.established}년 설립`, `Est. ${club.established}`)} • {club.memberCount} {t('명', 'members')}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {clubDescription}
                    </p>

                    {/* Officers */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {t('임원진', 'Officers')}
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
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {language === 'ko' ? activity.ko : activity.en}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cultural Guide */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-amber-800 text-xs leading-relaxed">
                          <strong>{t('문화 팁:', 'Cultural Tip:')}</strong> {clubCulturalGuide}
                        </p>
                      </div>
                    </div>

                    {/* Past Events with RSVP */}
                    {pastEvents.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {t('최근 이벤트', 'Recent Events')}
                        </h4>
                        <div className="space-y-2">
                          {pastEvents.slice(0, 2).map((event) => (
                            <div key={event.id} className="bg-mint-50 rounded-lg p-3">
                              <Link
                                to={`/event/${event.id}`}
                                className="block text-sm font-medium text-mint-700 hover:text-mint-800 mb-2"
                              >
                                {language === 'ko' ? event.title.ko : event.title.en}
                              </Link>
                              <RSVPButton 
                                eventId={event.id} 
                                size="sm" 
                                showCounts={false}
                                className="mt-2"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Requirements */}
                    <div className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
                      <strong>{t('가입 조건:', 'Requirements:')}</strong> {clubRequirements}
                    </div>

                    {/* Club Interaction Buttons */}
                    <div className="border-t pt-4">
                      <ClubInteractionButtons
                        clubId={club.id}
                        clubName={clubName}
                        size="sm"
                        showCounts={true}
                        className="mb-3"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <ColorfulButton size="sm" className="flex-1" disabled={!club.recruiting}>
                        {club.recruiting ? t('가입 신청', 'Apply') : t('모집 마감', 'Closed')}
                      </ColorfulButton>
                      <ColorfulButton variant="outline" size="sm" className="px-3">
                        <MessageSquare className="h-4 w-4" />
                      </ColorfulButton>
                      <ColorfulButton variant="outline" size="sm" className="px-3">
                        <Mail className="h-4 w-4" />
                      </ColorfulButton>
                    </div>
                  </div>
                </ColorfulCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredClubs.length === 0 && (
        <ColorfulCard className="text-center p-12">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('검색 결과가 없습니다', 'No clubs found')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('다른 검색어나 카테고리를 시도해보세요', 'Try different search terms or categories')}
          </p>
          <ColorfulButton onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
          }}>
            {t('전체 보기', 'Show All')}
          </ColorfulButton>
        </ColorfulCard>
      )}

      {/* AI Translation Service */}
      <ColorfulCard className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Bot className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-bold text-green-800">
              {t('🤖 AI 번역 메시징', '🤖 AI Translation Messaging')}
            </h3>
          </div>
          <p className="text-green-700 text-sm mb-4">
            {t(
              '동아리 임원진과 한국어 또는 영어로 메시지를 보내세요. AI가 실시간으로 번역해드립니다!',
              'Message club officers in Korean or English. AI will translate in real-time!'
            )}
          </p>
          <ColorfulButton size="sm" variant="secondary">
            {t('AI 번역 메시징 시작', 'Start AI Translation Messaging')}
          </ColorfulButton>
        </div>
      </ColorfulCard>
    </div>
  );
};

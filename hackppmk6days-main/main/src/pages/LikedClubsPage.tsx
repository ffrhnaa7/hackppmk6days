import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Users, Calendar, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { ColorfulInput } from '../components/ColorfulInput';
import { ClubInteractionButtons } from '../components/ClubInteractionButtons';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { koreanClubs } from '../data/koreanClubs';

interface LikedClub {
  id: string;
  club_id: string;
  created_at: string;
}

export const LikedClubsPage: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [likedClubs, setLikedClubs] = useState<LikedClub[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      loadLikedClubs();
    }
  }, [user]);

  const loadLikedClubs = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('club_hearts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLikedClubs(data || []);
    } catch (error) {
      console.error('Error loading liked clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get club details from liked club IDs
  const likedClubDetails = likedClubs
    .map(liked => koreanClubs.find(club => club.id === liked.club_id))
    .filter(Boolean)
    .filter(club => {
      if (!searchTerm) return true;
      const clubName = language === 'ko' ? club!.name.ko : club!.name.en;
      return clubName.toLowerCase().includes(searchTerm.toLowerCase());
    });

  // Get categories from liked clubs for AI insights
  const getPreferredCategories = () => {
    const categories: { [key: string]: number } = {};
    likedClubDetails.forEach(club => {
      if (club) {
        // Use the single category property instead of categories array
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
        categories[categoryName] = (categories[categoryName] || 0) + 1;
      }
    });
    return Object.entries(categories)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
  };

  const preferredCategories = getPreferredCategories();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ColorfulCard className="text-center p-8">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('로그인이 필요합니다', 'Login Required')}
          </h2>
          <p className="text-gray-600 mb-4">
            {t('좋아요한 동아리를 보려면 로그인하세요', 'Please login to view your liked clubs')}
          </p>
          <Link to="/auth">
            <ColorfulButton>
              {t('로그인', 'Login')}
            </ColorfulButton>
          </Link>
        </ColorfulCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          {t('좋아요한 동아리', 'Liked Clubs')}
        </h1>
        <p className="text-gray-600">
          {t('좋아요한 동아리를 기반으로 AI가 맞춤 추천을 제공합니다', 'AI provides personalized recommendations based on your liked clubs')}
        </p>
      </div>

      {/* AI Insights Card */}
      {likedClubDetails.length > 0 && (
        <ColorfulCard className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">
                {t('AI 인사이트', 'AI Insights')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {t('선호 카테고리', 'Preferred Categories')}
                </h4>
                <div className="space-y-2">
                  {preferredCategories.map(([category, count], index) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{category}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${(count / likedClubDetails.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {t('추천 알고리즘 상태', 'Recommendation Algorithm Status')}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>{t('데이터 수집', 'Data Collection')}</span>
                    <span className="text-green-600 font-semibold">
                      {likedClubDetails.length >= 3 ? t('충분', 'Sufficient') : t('더 필요', 'Need More')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t('추천 정확도', 'Recommendation Accuracy')}</span>
                    <span className="text-blue-600 font-semibold">
                      {likedClubDetails.length >= 5 ? t('높음', 'High') : 
                       likedClubDetails.length >= 3 ? t('보통', 'Medium') : t('낮음', 'Low')}
                    </span>
                  </div>
                </div>
                {likedClubDetails.length < 3 && (
                  <p className="text-xs text-amber-600 mt-2">
                    {t('더 정확한 추천을 위해 3개 이상의 동아리에 좋아요를 눌러주세요', 'Like 3+ clubs for more accurate recommendations')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </ColorfulCard>
      )}

      {/* Search */}
      <ColorfulCard className="mb-6">
        <div className="p-6">
          <ColorfulInput
            placeholder={t('좋아요한 동아리 검색...', 'Search liked clubs...')}
            icon={<Search className="h-5 w-5" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </ColorfulCard>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <ColorfulCard key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-xl"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </ColorfulCard>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && likedClubDetails.length === 0 && (
        <ColorfulCard className="text-center p-12">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {searchTerm 
              ? t('검색 결과가 없습니다', 'No search results')
              : t('아직 좋아요한 동아리가 없습니다', 'No liked clubs yet')
            }
          </h2>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? t('다른 검색어를 시도해보세요', 'Try a different search term')
              : t('동아리에 좋아요를 눌러 AI 추천 시스템을 활성화하세요', 'Start liking clubs to activate the AI recommendation system')
            }
          </p>
          {!searchTerm && (
            <Link to="/clubs">
              <ColorfulButton>
                {t('동아리 탐색하기', 'Explore Clubs')}
              </ColorfulButton>
            </Link>
          )}
        </ColorfulCard>
      )}

      {/* Liked Clubs Grid */}
      {!loading && likedClubDetails.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {t(`${likedClubDetails.length}개의 좋아요한 동아리`, `${likedClubDetails.length} liked clubs`)}
            </p>
            <div className="flex items-center space-x-2 text-sm text-purple-600">
              <Sparkles className="h-4 w-4" />
              <span>{t('AI 추천 데이터로 활용됩니다', 'Used for AI recommendations')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedClubDetails.map((club) => {
              if (!club) return null;
              
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

                    {/* Liked Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Heart className="h-3 w-3 mr-1 fill-current" />
                        {t('좋아요', 'Liked')}
                      </span>
                    </div>

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

                    {/* Category */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {t('카테고리', 'Category')}
                      </h4>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                        {categoryName}
                      </span>
                    </div>

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

                    {/* Club Interaction Buttons */}
                    <div className="border-t pt-4">
                      <ClubInteractionButtons
                        clubId={club.id}
                        clubName={clubName}
                        size="sm"
                        showCounts={true}
                        recruiting={club.recruiting}
                        className="mb-3"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Link to={`/club/${club.id}`} className="flex-1">
                        <ColorfulButton variant="outline" size="sm" className="w-full">
                          {t('자세히', 'Details')}
                        </ColorfulButton>
                      </Link>
                    </div>
                  </div>
                </ColorfulCard>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Bookmark, Heart, Users, Calendar, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { ColorfulInput } from '../components/ColorfulInput';
import { ClubInteractionButtons } from '../components/ClubInteractionButtons';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { koreanClubs } from '../data/koreanClubs';

interface SavedClub {
  id: string;
  club_id: string;
  created_at: string;
}

export const SavedClubsPage: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [savedClubs, setSavedClubs] = useState<SavedClub[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      loadSavedClubs();
    }
  }, [user]);

  const loadSavedClubs = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('saved_clubs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedClubs(data || []);
    } catch (error) {
      console.error('Error loading saved clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get club details from saved club IDs
  const savedClubDetails = savedClubs
    .map(saved => koreanClubs.find(club => club.id === saved.club_id))
    .filter(Boolean)
    .filter(club => {
      if (!searchTerm) return true;
      const clubName = language === 'ko' ? club!.name.ko : club!.name.en;
      return clubName.toLowerCase().includes(searchTerm.toLowerCase());
    });

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ColorfulCard className="text-center p-8">
          <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('로그인이 필요합니다', 'Login Required')}
          </h2>
          <p className="text-gray-600 mb-4">
            {t('저장된 동아리를 보려면 로그인하세요', 'Please login to view your saved clubs')}
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
          {t('저장된 동아리', 'Saved Clubs')}
        </h1>
        <p className="text-gray-600">
          {t('관심있는 동아리들을 모아보세요', 'View all your saved clubs in one place')}
        </p>
      </div>

      {/* Search */}
      <ColorfulCard className="mb-6">
        <div className="p-6">
          <ColorfulInput
            placeholder={t('저장된 동아리 검색...', 'Search saved clubs...')}
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
      {!loading && savedClubDetails.length === 0 && (
        <ColorfulCard className="text-center p-12">
          <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {searchTerm 
              ? t('검색 결과가 없습니다', 'No search results')
              : t('저장된 동아리가 없습니다', 'No saved clubs yet')
            }
          </h2>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? t('다른 검색어를 시도해보세요', 'Try a different search term')
              : t('동아리 허브에서 관심있는 동아리를 저장해보세요', 'Start saving clubs from the Club Hub')
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

      {/* Saved Clubs Grid */}
      {!loading && savedClubDetails.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {t(`${savedClubDetails.length}개의 저장된 동아리`, `${savedClubDetails.length} saved clubs`)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedClubDetails.map((club) => {
              if (!club) return null;
              
              const clubName = language === 'ko' ? club.name.ko : club.name.en;
              const clubDescription = language === 'ko' ? club.description.ko : club.description.en;

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

                    {/* Saved Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Bookmark className="h-3 w-3 mr-1 fill-current" />
                        {t('저장됨', 'Saved')}
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
                      <Link to={`/club/${club.id}`}>
                        <ColorfulButton variant="outline" size="sm">
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

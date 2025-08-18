import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Globe,
  Instagram,
  Facebook,
  MessageCircle,
  Star,
  Award,
  Target
} from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { ClubInteractionButtons } from '../components/ClubInteractionButtons';
import { useLanguage } from '../contexts/LanguageContext';
import { koreanClubs } from '../data/koreanClubs';

export const ClubDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();

  const club = koreanClubs.find(c => c.id === id);

  if (!club) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ColorfulCard className="text-center p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('동아리를 찾을 수 없습니다', 'Club not found')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('요청하신 동아리가 존재하지 않습니다', 'The requested club does not exist')}
          </p>
          <Link to="/clubs">
            <ColorfulButton>
              {t('동아리 목록으로', 'Back to Clubs')}
            </ColorfulButton>
          </Link>
        </ColorfulCard>
      </div>
    );
  }

  const clubName = language === 'ko' ? club.name.ko : club.name.en;
  const clubDescription = language === 'ko' ? club.description.ko : club.description.en;
  const requirements = language === 'ko' ? club.requirements.ko : club.requirements.en;
  const culturalGuide = language === 'ko' ? club.culturalGuide.ko : club.culturalGuide.en;
  
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation Header */}
      <div className="mb-6">
        <Link to="/clubs">
          <ColorfulButton variant="ghost" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>{t('동아리 목록으로', 'Back to Clubs')}</span>
          </ColorfulButton>
        </Link>
      </div>

      {/* Hero Section */}
      <ColorfulCard className="overflow-hidden mb-8">
        <div className="relative h-80">
          <img
            src={club.image}
            alt={clubName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Recruiting Badge */}
          {club.recruiting && (
            <div className="absolute top-6 left-6">
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse shadow-lg">
                {t('모집중', 'Recruiting')}
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-6 right-6">
            <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {categoryName}
            </span>
          </div>

          {/* Club Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-4">{clubName}</h1>
                <div className="flex flex-wrap items-center gap-6 text-blue-200">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>{t(`${club.established}년 설립`, `Established ${club.established}`)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>{club.memberCount} {t('명', 'members')}</span>
                  </div>
                  {club.country && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>{club.country}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ColorfulCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <ColorfulCard>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t('동아리 소개', 'About the Club')}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {clubDescription}
              </p>
            </div>
          </ColorfulCard>

          {/* Activities */}
          <ColorfulCard>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                {t('주요 활동', 'Main Activities')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {club.activities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-800">
                      {language === 'ko' ? activity.ko : activity.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ColorfulCard>

          {/* Requirements */}
          <ColorfulCard>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="h-6 w-6 mr-2 text-green-600" />
                {t('가입 요건', 'Membership Requirements')}
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-800 leading-relaxed">
                  {requirements}
                </p>
              </div>
            </div>
          </ColorfulCard>

          {/* Cultural Guide */}
          <ColorfulCard>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Star className="h-6 w-6 mr-2 text-purple-600" />
                {t('문화 가이드', 'Cultural Guide')}
              </h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-800 leading-relaxed">
                  {culturalGuide}
                </p>
              </div>
            </div>
          </ColorfulCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Club Actions */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {t('동아리 활동', 'Club Actions')}
              </h3>
              <ClubInteractionButtons
                clubId={club.id}
                clubName={clubName}
                recruiting={club.recruiting}
                showCounts={true}
                size="lg"
              />
            </div>
          </ColorfulCard>

          {/* Officers */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {t('임원진', 'Officers')}
              </h3>
              <div className="space-y-4">
                {club.officers.map((officer, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">
                        {language === 'ko' ? officer.name.ko : officer.name.en}
                      </h4>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {language === 'ko' ? officer.role.ko : officer.role.en}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <a 
                        href={`mailto:${officer.contact}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {officer.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ColorfulCard>

          {/* Social Media & Contact */}
          {club.socialMedia && (
            <ColorfulCard>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {t('소셜 미디어', 'Social Media')}
                </h3>
                <div className="space-y-3">
                  {club.socialMedia.website && (
                    <a
                      href={club.socialMedia.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Globe className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-800">{t('웹사이트', 'Website')}</span>
                    </a>
                  )}
                  {club.socialMedia.facebook && (
                    <a
                      href={`https://facebook.com/${club.socialMedia.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-800">Facebook</span>
                    </a>
                  )}
                  {club.socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${club.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                    >
                      <Instagram className="h-5 w-5 text-pink-600" />
                      <span className="text-gray-800">Instagram</span>
                    </a>
                  )}
                  {club.socialMedia.kakao && (
                    <a
                      href={`https://open.kakao.com/o/${club.socialMedia.kakao}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 text-yellow-600" />
                      <span className="text-gray-800">KakaoTalk</span>
                    </a>
                  )}
                </div>
              </div>
            </ColorfulCard>
          )}

          {/* Embassy Contact (for student associations) */}
          {club.embassy && (
            <ColorfulCard>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {t('대사관 연락처', 'Embassy Contact')}
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-gray-800 text-sm">
                    {club.embassy}
                  </p>
                </div>
              </div>
            </ColorfulCard>
          )}
        </div>
      </div>
    </div>
  );
};

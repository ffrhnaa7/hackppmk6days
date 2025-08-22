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
  Target,
  Clock,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Heart
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
        <ColorfulCard className="text-center p-16 border-0 shadow-xl">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center shadow-inner">
            <Users className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t('동아리를 찾을 수 없습니다', 'Club not found')}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {t('요청하신 동아리가 존재하지 않습니다', 'The requested club does not exist')}
          </p>
          <Link to="/clubs">
            <ColorfulButton size="lg" className="shadow-lg hover:shadow-xl">
              <ArrowLeft className="h-5 w-5 mr-2" />
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

  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '학술':
        return '📚';
      case '문화':
        return '🎭';
      case '취미':
        return '🎨';
      case '봉사':
        return '🤝';
      case '종교':
        return '🙏';
      case '체육':
        return '⚽';
      case '학생회':
        return '🏛️';
      default:
        return '🌟';
    }
  };

  const categoryName = getCategoryName(club.category);
  const categoryIcon = getCategoryIcon(club.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Navigation Header */}
      <div className="mb-8 flex items-center justify-between bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <Link to="/clubs">
          <ColorfulButton variant="ghost" className="flex items-center space-x-3 hover:bg-mint-50 transition-colors px-6 py-3 rounded-xl">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">{t('동아리 목록으로', 'Back to Clubs')}</span>
          </ColorfulButton>
        </Link>
        
        {/* Enhanced Breadcrumb */}
        <div className="hidden md:flex items-center space-x-3 text-sm">
          <Link to="/" className="text-gray-500 hover:text-mint-600 transition-colors font-medium">{t('홈', 'Home')}</Link>
          <span className="text-gray-300">•</span>
          <Link to="/clubs" className="text-gray-500 hover:text-mint-600 transition-colors font-medium">{t('동아리', 'Clubs')}</Link>
          <span className="text-gray-300">•</span>
          <span className="text-gray-800 font-bold">{clubName}</span>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <ColorfulCard className="overflow-hidden mb-8 border-0 shadow-2xl">
        <div className="relative h-[500px]">
          <img
            src={club.image}
            alt={clubName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Enhanced Status Badges */}
          <div className="absolute top-8 left-8 flex flex-col space-y-3">
            {club.recruiting && (
              <div className="flex items-center space-x-3 bg-green-500 text-white px-6 py-3 rounded-full text-base font-bold shadow-2xl animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                <Clock className="h-5 w-5" />
                <span>{t('모집중', 'Recruiting Now')}</span>
              </div>
            )}
            {club.established < 2010 && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-base font-bold shadow-2xl">
                <Award className="h-5 w-5 inline mr-2" />
                {t('전통 동아리', 'Legacy Club')}
              </div>
            )}
          </div>

          {/* Enhanced Category Badge */}
          <div className="absolute top-8 right-8">
            <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full text-base font-bold shadow-2xl border border-white/20">
              <span className="mr-3 text-lg">{categoryIcon}</span>
              {categoryName}
            </div>
          </div>

          {/* Enhanced Club Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <div className="max-w-5xl">
              <h1 className="text-6xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">{clubName}</h1>
              <div className="flex flex-wrap items-center gap-6 text-blue-200">
                <div className="flex items-center space-x-3 bg-white/25 backdrop-blur-md rounded-full px-6 py-3 shadow-xl">
                  <Calendar className="h-6 w-6" />
                  <span className="font-bold text-lg">{t(`${club.established}년 설립`, `Established ${club.established}`)}</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/25 backdrop-blur-md rounded-full px-6 py-3 shadow-xl">
                  <Users className="h-6 w-6" />
                  <span className="font-bold text-lg">{club.memberCount.toLocaleString()} {t('명', 'members')}</span>
                </div>
                {club.country && (
                  <div className="flex items-center space-x-3 bg-white/25 backdrop-blur-md rounded-full px-6 py-3 shadow-xl">
                    <MapPin className="h-6 w-6" />
                    <span className="font-bold text-lg">{club.country}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ColorfulCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Enhanced Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Enhanced Description */}
          <ColorfulCard variant="gradient" className="border-0 shadow-2xl">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-primary rounded-full p-4 mr-6 shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {t('동아리 소개', 'About the Club')}
                </h2>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-mint-200 shadow-inner">
                <p className="text-gray-800 leading-relaxed text-xl font-medium">
                  {clubDescription}
                </p>
              </div>
            </div>
          </ColorfulCard>

          {/* Enhanced Activities */}
          <ColorfulCard variant="glass" className="border-0 shadow-2xl">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-mint-500 rounded-full p-4 mr-6 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800">
                  {t('주요 활동', 'Main Activities')}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {club.activities.map((activity, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-mint-200 hover:border-mint-300 hover:scale-105">
                      <div className="w-4 h-4 bg-gradient-primary rounded-full group-hover:scale-125 transition-transform shadow-md"></div>
                      <span className="text-gray-800 font-semibold text-lg group-hover:text-mint-700 transition-colors">
                        {language === 'ko' ? activity.ko : activity.en}
                      </span>
                      <CheckCircle className="h-6 w-6 text-green-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ColorfulCard>

          {/* Enhanced Requirements */}
          <ColorfulCard variant="glass" className="border-0 shadow-2xl">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 mr-6 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800">
                  {t('가입 요건', 'Membership Requirements')}
                </h2>
              </div>
              <div className="bg-white/95 backdrop-blur-sm border-3 border-green-200 rounded-3xl p-8 shadow-inner">
                <div className="flex items-start space-x-6">
                  <div className="bg-green-100 rounded-full p-3 mt-2 shadow-md">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-gray-800 leading-relaxed text-xl font-medium">
                    {requirements}
                  </p>
                </div>
              </div>
            </div>
          </ColorfulCard>

          {/* Enhanced Cultural Guide */}
          <ColorfulCard variant="glass" className="border-0 shadow-2xl">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 mr-6 shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800">
                  {t('문화 가이드', 'Cultural Guide')}
                </h2>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border-3 border-purple-200 rounded-3xl p-8 shadow-inner">
                <div className="flex items-start space-x-6">
                  <div className="bg-purple-100 rounded-full p-3 mt-2 shadow-md">
                    <MessageCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-gray-800 leading-relaxed text-xl font-medium">
                    {culturalGuide}
                  </p>
                </div>
              </div>
            </div>
          </ColorfulCard>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-8">
          {/* Enhanced Quick Actions */}
          <ColorfulCard className="border-0 shadow-2xl">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Heart className="h-6 w-6 mr-3 text-red-500" />
                {t('동아리 액션', 'Club Actions')}
              </h3>
              
              <div className="space-y-6">
                {/* Enhanced Interaction Buttons */}
                <ClubInteractionButtons
                  clubId={club.id}
                  clubName={clubName}
                  recruiting={club.recruiting}
                  showCounts={true}
                  layout="vertical"
                  className="space-y-3"
                />
              </div>
            </div>
          </ColorfulCard>

          {/* Enhanced Officers */}
          <ColorfulCard className="border-0 shadow-2xl">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Star className="h-6 w-6 mr-3 text-yellow-500" />
                {t('임원진', 'Officers')}
              </h3>
              <div className="space-y-4">
                {club.officers.map((officer, index) => (
                  <div key={index} className="group">
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-mint-50 rounded-2xl border-2 border-gray-100 hover:border-mint-300 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-800 text-lg">
                          {language === 'ko' ? officer.name.ko : officer.name.en}
                        </h4>
                        <span className="text-blue-600 font-bold text-sm bg-blue-100 px-4 py-2 rounded-full border border-blue-200">
                          {language === 'ko' ? officer.role.ko : officer.role.en}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm font-medium">{officer.contact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ColorfulCard>

          {/* Enhanced Social Media */}
          {club.socialMedia && (
            <ColorfulCard className="border-0 shadow-2xl">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Globe className="h-6 w-6 mr-3 text-blue-500" />
                  {t('소셜 미디어', 'Social Media')}
                </h3>
                <div className="space-y-4">
                  {club.socialMedia.website && (
                    <a
                      href={club.socialMedia.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-mint-50 rounded-xl hover:shadow-lg transition-all border border-blue-200 hover:border-blue-300 group"
                    >
                      <ExternalLink className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-gray-800">{t('웹사이트', 'Website')}</span>
                    </a>
                  )}
                  {club.socialMedia.facebook && (
                    <a
                      href={`https://facebook.com/${club.socialMedia.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-mint-50 rounded-xl hover:shadow-lg transition-all border border-blue-200 hover:border-blue-300 group"
                    >
                      <Facebook className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-gray-800">Facebook</span>
                    </a>
                  )}
                  {club.socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${club.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:shadow-lg transition-all border border-pink-200 hover:border-pink-300 group"
                    >
                      <Instagram className="h-6 w-6 text-pink-600 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-gray-800">Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            </ColorfulCard>
          )}
        </div>
      </div>

      {/* Enhanced Back to Clubs Button */}
      <div className="text-center mt-16">
        <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 max-w-lg mx-auto">
          <div className="mb-8">
            <div className="bg-gradient-primary rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {t('더 많은 동아리 탐색', 'Explore More Clubs')}
            </h3>
            <p className="text-gray-600">
              {t('다른 흥미로운 동아리들도 확인해보세요', 'Check out other interesting clubs too')}
            </p>
          </div>
          <Link to="/clubs">
            <ColorfulButton size="lg" className="shadow-lg hover:shadow-xl font-bold px-8 py-4">
              <ArrowLeft className="h-5 w-5 mr-3" />
              {t('동아리 목록으로', 'Back to Clubs')}
            </ColorfulButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

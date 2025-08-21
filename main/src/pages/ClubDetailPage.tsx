import React, { useState, useMemo, useCallback, Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  MapPin, 
  Mail, 
  Globe,
  Instagram,
  Facebook,
  Star,
  Award,
  Target,
  Clock,
  CheckCircle,
  ExternalLink,
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  ChevronRight,
  Building,
  UserCheck,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { koreanClubs } from '../data/koreanClubs';
import { useClubInteractions } from '../hooks/useClubInteractions';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Types
interface TabType {
  id: 'about' | 'activities' | 'requirements' | 'culture';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ClubHeroProps {
  club: typeof koreanClubs[0];
  clubName: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
}

interface ClubTabsProps {
  activeTab: TabType['id'];
  onTabChange: (tab: TabType['id']) => void;
  tabs: TabType[];
}

interface ClubTabContentProps {
  activeTab: TabType['id'];
  club: typeof koreanClubs[0];
  language: 'ko' | 'en';
}

interface QuickActionsBarProps {
  clubId: string;
  clubName: string;
  recruiting: boolean;
  onApply: () => void;
  onContact: () => void;
}

// Memoized Sub-components
const ClubHero = React.memo<ClubHeroProps>(({ 
  club, 
  clubName, 
  categoryName, 
  categoryIcon, 
  categoryColor 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative h-64 md:h-80">
      <img
        src={club.image}
        alt={clubName}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
      {/* Badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        <span className={`px-4 py-2 rounded-full text-white text-sm font-bold bg-gradient-to-r ${categoryColor} shadow-lg`}>
          {categoryIcon} {categoryName}
        </span>
        {club.recruiting && (
          <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
            {t('모집중', 'Recruiting')}
          </span>
        )}
        {club.established < 2010 && (
          <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-bold shadow-lg">
            <Award className="inline h-4 w-4 mr-1" />
            {t('전통', 'Legacy')}
          </span>
        )}
      </div>

      {/* Club Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{clubName}</h1>
        <div className="flex flex-wrap items-center gap-4 text-white/90">
          <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <Users className="h-4 w-4" />
            {club.memberCount} {t('명', 'members')}
          </span>
          <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <Calendar className="h-4 w-4" />
            {t(`${club.established}년 설립`, `Est. ${club.established}`)}
          </span>
          {club.country && (
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4" />
              {club.country}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

ClubHero.displayName = 'ClubHero';

const QuickActionsBar = React.memo<QuickActionsBarProps>(({ 
  clubId, 
  clubName, 
  recruiting, 
  onApply, 
  onContact 
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { interactions, toggleHeart, toggleSaved, shareClub } = useClubInteractions(clubId);
  
  const handleShare = useCallback(() => {
    shareClub('link');
    // Copy to clipboard
    navigator.clipboard.writeText(window.location.href);
  }, [shareClub]);

  return (
    <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
      <div className="flex gap-2">
        <button
          onClick={toggleHeart}
          disabled={!user}
          className={`p-2 rounded-xl transition-all ${
            interactions.isHearted 
              ? 'bg-red-100 text-red-600' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={t('좋아요', 'Like')}
        >
          <Heart className={`h-5 w-5 ${interactions.isHearted ? 'fill-current' : ''}`} />
        </button>
        <button
          onClick={toggleSaved}
          disabled={!user}
          className={`p-2 rounded-xl transition-all ${
            interactions.isSaved 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={t('저장', 'Save')}
        >
          <Bookmark className={`h-5 w-5 ${interactions.isSaved ? 'fill-current' : ''}`} />
        </button>
        <button 
          onClick={handleShare}
          className="p-2 bg-white text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
          aria-label={t('공유', 'Share')}
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>
      <div className="flex gap-2">
        {recruiting ? (
          <button 
            onClick={onApply}
            disabled={!user || interactions.hasApplied}
            className={`px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-medium flex items-center gap-2 ${
              (!user || interactions.hasApplied) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <UserCheck className="h-5 w-5" />
            {interactions.hasApplied ? t('신청 완료', 'Applied') : t('가입 신청', 'Apply Now')}
          </button>
        ) : (
          <button 
            onClick={onContact}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            {t('문의하기', 'Contact')}
          </button>
        )}
      </div>
    </div>
  );
});

QuickActionsBar.displayName = 'QuickActionsBar';

const ClubTabs = React.memo<ClubTabsProps>(({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-2">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            <tab.icon className="h-4 w-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
});

ClubTabs.displayName = 'ClubTabs';

const ClubTabContent = React.memo<ClubTabContentProps>(({ activeTab, club, language }) => {
  const { t } = useLanguage();
  
  const content = useMemo(() => {
    switch (activeTab) {
      case 'about':
        return {
          title: t('동아리 소개', 'About the Club'),
          icon: Building,
          iconColor: 'text-blue-600',
          body: (
            <p className="text-gray-700 leading-relaxed text-lg">
              {language === 'ko' ? club.description.ko : club.description.en}
            </p>
          )
        };
      
      case 'activities':
        return {
          title: t('주요 활동', 'Main Activities'),
          icon: Target,
          iconColor: 'text-green-600',
          body: (
            <div className="space-y-4">
              {club.activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {language === 'ko' ? activity.ko : activity.en}
                  </p>
                </div>
              ))}
            </div>
          )
        };
      
      case 'requirements':
        return {
          title: t('가입 요건', 'Requirements'),
          icon: CheckCircle,
          iconColor: 'text-purple-600',
          body: (
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed">
                {language === 'ko' ? club.requirements.ko : club.requirements.en}
              </p>
            </div>
          )
        };
      
      case 'culture':
        return {
          title: t('문화 가이드', 'Cultural Guide'),
          icon: Globe,
          iconColor: 'text-orange-600',
          body: (
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed">
                {language === 'ko' ? club.culturalGuide.ko : club.culturalGuide.en}
              </p>
            </div>
          )
        };
      
      default:
        return null;
    }
  }, [activeTab, club, language, t]);

  if (!content) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <content.icon className={`h-6 w-6 ${content.iconColor}`} />
        {content.title}
      </h2>
      {content.body}
    </div>
  );
});

ClubTabContent.displayName = 'ClubTabContent';

// Custom Hooks
const useClubData = (clubId: string | undefined) => {
  const club = useMemo(() => {
    if (!clubId) return null;
    return koreanClubs.find(c => c.id === clubId);
  }, [clubId]);

  return club;
};

const useClubMetadata = (club: typeof koreanClubs[0] | null, language: 'ko' | 'en') => {
  return useMemo(() => {
    if (!club) return null;

    const getCategoryName = (category: string) => {
      if (language === 'ko') return category;
      
      const categoryMap: Record<string, string> = {
        '학술': 'Academic',
        '문화': 'Cultural',
        '취미': 'Hobby',
        '봉사': 'Volunteer',
        '종교': 'Religious',
        '체육': 'Sports',
        '학생회': 'Student Association'
      };
      
      return categoryMap[category] || category;
    };

    const getCategoryIcon = (category: string) => {
      const iconMap: Record<string, string> = {
        '학술': '📚',
        '문화': '🎭',
        '취미': '🎨',
        '봉사': '🤝',
        '종교': '🙏',
        '체육': '⚽',
        '학생회': '🏛️'
      };
      
      return iconMap[category] || '🌟';
    };

    const getCategoryColor = (category: string) => {
      const colorMap: Record<string, string> = {
        '학술': 'from-blue-400 to-blue-600',
        '문화': 'from-purple-400 to-purple-600',
        '취미': 'from-pink-400 to-pink-600',
        '봉사': 'from-green-400 to-green-600',
        '종교': 'from-yellow-400 to-yellow-600',
        '체육': 'from-orange-400 to-orange-600',
        '학생회': 'from-indigo-400 to-indigo-600'
      };
      
      return colorMap[category] || 'from-gray-400 to-gray-600';
    };

    return {
      clubName: language === 'ko' ? club.name.ko : club.name.en,
      clubDescription: language === 'ko' ? club.description.ko : club.description.en,
      requirements: language === 'ko' ? club.requirements.ko : club.requirements.en,
      culturalGuide: language === 'ko' ? club.culturalGuide.ko : club.culturalGuide.en,
      categoryName: getCategoryName(club.category),
      categoryIcon: getCategoryIcon(club.category),
      categoryColor: getCategoryColor(club.category)
    };
  }, [club, language]);
};

// Loading Component
const LoadingState = React.memo(() => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">{t('로딩 중...', 'Loading...')}</p>
      </div>
    </div>
  );
});

LoadingState.displayName = 'LoadingState';

// Error Component
const ErrorState = React.memo(() => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t('동아리를 찾을 수 없습니다', 'Club not found')}
        </h2>
        <p className="text-gray-600 mb-6">
          {t('요청하신 동아리가 존재하지 않습니다', 'The requested club does not exist')}
        </p>
        <Link to="/clubs">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <ArrowLeft className="inline h-5 w-5 mr-2" />
            {t('동아리 목록으로', 'Back to Clubs')}
          </button>
        </Link>
      </div>
    </div>
  );
});

ErrorState.displayName = 'ErrorState';

// Sidebar Component
const ClubSidebar = React.memo<{ club: typeof koreanClubs[0]; language: 'ko' | 'en' }>(({ club, language }) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <ColorfulCard
        title={t('연락처', 'Contact')}
        icon={<Mail className="h-5 w-5" />}
        gradient="from-blue-400 to-blue-600"
      >
        <div className="space-y-3">
          {club.contact?.email && (
            <a 
              href={`mailto:${club.contact.email}`}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm">{club.contact.email}</span>
            </a>
          )}
          {club.socialMedia?.website && (
            <a 
              href={club.socialMedia.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{t('웹사이트', 'Website')}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {club.socialMedia?.instagram && (
            <a 
              href={`https://instagram.com/${club.socialMedia.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span className="text-sm">@{club.socialMedia.instagram}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {club.socialMedia?.facebook && (
            <a 
              href={club.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Facebook className="h-4 w-4" />
              <span className="text-sm">{t('페이스북', 'Facebook')}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </ColorfulCard>

      {/* Meeting Schedule */}
      {club.meetingSchedule && (
        <ColorfulCard
          title={t('모임 일정', 'Meeting Schedule')}
          icon={<Clock className="h-5 w-5" />}
          gradient="from-purple-400 to-purple-600"
        >
          <p className="text-gray-700">
            {language === 'ko' ? club.meetingSchedule.ko : club.meetingSchedule.en}
          </p>
        </ColorfulCard>
      )}

      {/* Stats */}
      <ColorfulCard
        title={t('통계', 'Statistics')}
        icon={<Star className="h-5 w-5" />}
        gradient="from-yellow-400 to-orange-500"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{club.memberCount}</div>
            <div className="text-sm text-gray-600">{t('회원', 'Members')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {new Date().getFullYear() - club.established}
            </div>
            <div className="text-sm text-gray-600">{t('년 역사', 'Years')}</div>
          </div>
        </div>
      </ColorfulCard>

      {/* Similar Clubs */}
      <ColorfulCard
        title={t('비슷한 동아리', 'Similar Clubs')}
        icon={<Users className="h-5 w-5" />}
        gradient="from-green-400 to-green-600"
      >
        <div className="space-y-2">
          {koreanClubs
            .filter(c => c.category === club.category && c.id !== club.id)
            .slice(0, 3)
            .map(similarClub => (
              <Link
                key={similarClub.id}
                to={`/clubs/${similarClub.id}`}
                className="block p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ko' ? similarClub.name.ko : similarClub.name.en}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
            ))}
        </div>
      </ColorfulCard>
    </div>
  );
});

ClubSidebar.displayName = 'ClubSidebar';

/**
 * ClubDetailPage Component
 * 
 * Displays detailed information about a specific club including description,
 * activities, requirements, and cultural guide. Supports user interactions
 * like saving, liking, and applying to clubs.
 */
export const ClubDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const club = useClubData(id);
  const metadata = useClubMetadata(club, language);
  const { applyToClub } = useClubInteractions(id || '');
  
  const [activeTab, setActiveTab] = useState<TabType['id']>('about');
  const [isApplying, setIsApplying] = useState(false);

  // Tab configuration
  const tabs = useMemo<TabType[]>(() => [
    { id: 'about', label: t('소개', 'About'), icon: Building },
    { id: 'activities', label: t('활동', 'Activities'), icon: Target },
    { id: 'requirements', label: t('가입 요건', 'Requirements'), icon: CheckCircle },
    { id: 'culture', label: t('문화', 'Culture'), icon: Globe }
  ], [t]);

  // Handlers
  const handleTabChange = useCallback((tab: TabType['id']) => {
    setActiveTab(tab);
  }, []);

  const handleApply = useCallback(async () => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }
    
    setIsApplying(true);
    try {
      await applyToClub();
      // Show success message
    } catch (error) {
      console.error('Failed to apply:', error);
      // Show error message
    } finally {
      setIsApplying(false);
    }
  }, [user, applyToClub]);

  const handleContact = useCallback(() => {
    if (club?.contact?.email) {
      window.location.href = `mailto:${club.contact.email}`;
    }
  }, [club]);

  // Loading state
  if (!club || !metadata) {
    return <ErrorState />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Navigation */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <Link to="/clubs">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">{t('동아리 목록', 'Back to Clubs')}</span>
              </button>
            </Link>
          </nav>

          {/* Hero Section */}
          <section className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
            <ClubHero
              club={club}
              clubName={metadata.clubName}
              categoryName={metadata.categoryName}
              categoryIcon={metadata.categoryIcon}
              categoryColor={metadata.categoryColor}
            />
            <QuickActionsBar
              clubId={club.id}
              clubName={metadata.clubName}
              recruiting={club.recruiting}
              onApply={handleApply}
              onContact={handleContact}
            />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <main className="lg:col-span-2 space-y-6">
              <ClubTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                tabs={tabs}
              />
              
              <ClubTabContent
                activeTab={activeTab}
                club={club}
                language={language}
              />
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <ClubSidebar club={club} language={language} />
            </aside>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ClubDetailPage;

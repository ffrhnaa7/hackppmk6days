import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Globe, 
  Clock, 
  Heart, 
  Shield, 
  Award, 
  Star,
  Edit3,
  Camera,
  MapPin,
  GraduationCap,
  Languages,
  Users,
  Eye,
  EyeOff,
  Sparkles,
  Trophy,
  Gift,
  Target,
  Calendar
} from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';
import { gamificationFeatures, sampleBadges } from '../data/gamificationFeatures';
import { StudentProfile, AIRecommendation } from '../types/profile';

export const ProfilePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'ai' | 'gamification'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Sample profile data
  const [profile, setProfile] = useState<Partial<StudentProfile>>({
    name: 'Sarah Kim',
    email: 'sarah.kim@university.ac.kr',
    university: '서울대학교 (Seoul National University)',
    preferredLanguage: 'en',
    languageLevel: {
      korean: 'intermediate',
      english: 'native'
    },
    interests: ['Technology', 'K-Pop', 'Cooking', 'Photography'],
    academicMajor: 'Computer Science',
    year: 'junior',
    nationality: 'Korean-American',
    culturalBackground: 'mixed',
    lookingForCulturalExchange: true,
    points: 2450,
    level: 7,
    badges: sampleBadges,
    streaks: {
      eventAttendance: 12,
      languageExchange: 8,
      culturalEvents: 5
    },
    privacy: {
      profileVisibility: 'university-only',
      showRealName: true,
      showUniversity: true,
      showInterests: true,
      showAvailability: false,
      showLanguageLevel: true,
      allowEventRecommendations: true,
      allowDirectMessages: true
    },
    aiRecommendations: {
      enabled: true,
      culturalDiversityPreference: 'high',
      eventTypes: ['cultural', 'academic', 'social'],
      maxDistance: 10,
      notificationFrequency: 'weekly'
    }
  });

  const sampleRecommendations: AIRecommendation[] = [
    {
      eventId: '1',
      score: 95,
      reasons: [
        {
          ko: '기술 관심사와 완벽히 일치',
          en: 'Perfect match with technology interests',
          type: 'interest-match'
        },
        {
          ko: '영어-한국어 이중언어 환경',
          en: 'Bilingual English-Korean environment',
          type: 'language-practice'
        }
      ],
      culturalInsight: {
        ko: '한국의 IT 스타트업 문화를 체험할 수 있는 좋은 기회입니다',
        en: 'Great opportunity to experience Korean IT startup culture'
      }
    },
    {
      eventId: '3',
      score: 88,
      reasons: [
        {
          ko: '문화교류 선호도와 일치',
          en: 'Matches cultural exchange preference',
          type: 'cultural-diversity'
        },
        {
          ko: '한국 대학 문화 체험 기회',
          en: 'Opportunity to experience Korean university culture',
          type: 'social-opportunity'
        }
      ],
      culturalInsight: {
        ko: 'MT는 한국 대학생들의 중요한 사교 활동입니다',
        en: 'MT is an important social activity for Korean university students'
      }
    }
  ];

  const universities = [
    '서울대학교 (Seoul National University)',
    '연세대학교 (Yonsei University)', 
    '고려대학교 (Korea University)',
    '카이스트 (KAIST)',
    '포스텍 (POSTECH)',
    '성균관대학교 (Sungkyunkwan University)',
    '한양대학교 (Hanyang University)',
    '중앙대학교 (Chung-Ang University)',
    '경희대학교 (Kyung Hee University)',
    '이화여자대학교 (Ewha Womans University)'
  ];

  const TabButton: React.FC<{ 
    tab: typeof activeTab, 
    icon: React.ReactNode, 
    label: string 
  }> = ({ tab, icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
        activeTab === tab
          ? 'bg-gradient-primary text-white shadow-lg'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          {t('학생 프로필', 'Student Profile')}
        </h1>
        <p className="text-gray-600">
          {t('프로필을 설정하고 맞춤형 이벤트 추천을 받아보세요', 'Set up your profile and receive personalized event recommendations')}
        </p>
      </div>

      {/* Profile Header Card */}
      <ColorfulCard className="mb-8 bg-gradient-to-r from-blue-50 to-mint-50">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profile.name?.charAt(0) || 'U'}
                </div>
                <button className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-lg hover:shadow-xl transition-all">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                <p className="text-blue-600 font-semibold">{profile.university}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {profile.academicMajor} • {profile.year}
                  </span>
                  <span className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {profile.nationality}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-xl font-bold text-gray-800">Level {profile.level}</span>
              </div>
              <p className="text-sm text-gray-600">{profile.points?.toLocaleString()} {t('포인트', 'points')}</p>
              <div className="flex space-x-1 mt-2">
                {profile.badges?.slice(0, 3).map((badge) => (
                  <span key={badge.id} className="text-lg" title={language === 'ko' ? badge.name.ko : badge.name.en}>
                    {badge.icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ColorfulCard>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        <TabButton 
          tab="profile" 
          icon={<User className="h-4 w-4" />} 
          label={t('기본 정보', 'Profile')} 
        />
        <TabButton 
          tab="privacy" 
          icon={<Shield className="h-4 w-4" />} 
          label={t('프라이버시', 'Privacy')} 
        />
        <TabButton 
          tab="ai" 
          icon={<Sparkles className="h-4 w-4" />} 
          label={t('AI 추천', 'AI Recommendations')} 
        />
        <TabButton 
          tab="gamification" 
          icon={<Trophy className="h-4 w-4" />} 
          label={t('게임화', 'Gamification')} 
        />
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <ColorfulCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  {t('기본 정보', 'Basic Information')}
                </h3>
                <ColorfulButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  {isEditing ? t('저장', 'Save') : t('편집', 'Edit')}
                </ColorfulButton>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('대학교', 'University')}
                  </label>
                  {isEditing ? (
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-800">{profile.university}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('전공', 'Major')}
                  </label>
                  <p className="text-gray-800">{profile.academicMajor}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('학년', 'Year')}
                  </label>
                  <p className="text-gray-800 capitalize">{profile.year}</p>
                </div>
              </div>
            </div>
          </ColorfulCard>

          {/* Language & Cultural Background */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Languages className="h-5 w-5 mr-2 text-mint-600" />
                {t('언어 & 문화', 'Language & Culture')}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('선호 언어', 'Preferred Language')}
                  </label>
                  <div className="flex space-x-2">
                    <button className={`px-4 py-2 rounded-lg font-semibold ${
                      profile.preferredLanguage === 'ko' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      한국어
                    </button>
                    <button className={`px-4 py-2 rounded-lg font-semibold ${
                      profile.preferredLanguage === 'en' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      English
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('언어 수준', 'Language Level')}
                  </label>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>{t('한국어', 'Korean')}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize">
                        {profile.languageLevel?.korean}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('영어', 'English')}</span>
                      <span className="px-3 py-1 bg-mint-100 text-mint-800 rounded-full text-sm font-semibold capitalize">
                        {profile.languageLevel?.english}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('문화교류 관심', 'Cultural Exchange Interest')}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={profile.lookingForCulturalExchange}
                      className="rounded"
                    />
                    <span className="text-gray-800">
                      {t('문화교류 활동에 관심이 있습니다', 'Interested in cultural exchange activities')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ColorfulCard>

          {/* Interests */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                {t('관심사', 'Interests')}
              </h3>

              <div className="flex flex-wrap gap-2">
                {profile.interests?.map((interest, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gradient-accent text-white rounded-full text-sm font-semibold shadow-md"
                  >
                    {interest}
                  </span>
                ))}
                {isEditing && (
                  <button className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-blue-500 hover:text-blue-500">
                    + {t('추가', 'Add')}
                  </button>
                )}
              </div>
            </div>
          </ColorfulCard>

          {/* Availability */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-purple-600" />
                {t('활동 가능 시간', 'Availability')}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('선호 시간대', 'Preferred Time Slots')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['morning', 'afternoon', 'evening'].map((slot) => (
                      <button
                        key={slot}
                        className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-semibold"
                      >
                        {t(
                          slot === 'morning' ? '오전' : slot === 'afternoon' ? '오후' : '저녁',
                          slot === 'morning' ? 'Morning' : slot === 'afternoon' ? 'Afternoon' : 'Evening'
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ColorfulCard>
        </div>
      )}

      {activeTab === 'privacy' && (
        <ColorfulCard>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-600" />
              {t('프라이버시 설정', 'Privacy Settings')}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('프로필 공개 범위', 'Profile Visibility')}
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'public', label: t('전체 공개', 'Public'), icon: <Globe className="h-4 w-4" /> },
                    { value: 'university-only', label: t('같은 대학교만', 'University Only'), icon: <GraduationCap className="h-4 w-4" /> },
                    { value: 'friends-only', label: t('친구만', 'Friends Only'), icon: <Users className="h-4 w-4" /> },
                    { value: 'private', label: t('비공개', 'Private'), icon: <EyeOff className="h-4 w-4" /> }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input 
                        type="radio" 
                        name="visibility" 
                        value={option.value}
                        checked={profile.privacy?.profileVisibility === option.value}
                        className="text-blue-600"
                      />
                      {option.icon}
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('공개할 정보 선택', 'Information to Share')}
                </label>
                <div className="space-y-3">
                  {[
                    { key: 'showRealName', label: t('실명', 'Real Name') },
                    { key: 'showUniversity', label: t('대학교', 'University') },
                    { key: 'showInterests', label: t('관심사', 'Interests') },
                    { key: 'showAvailability', label: t('활동 시간', 'Availability') },
                    { key: 'showLanguageLevel', label: t('언어 수준', 'Language Level') },
                    { key: 'allowEventRecommendations', label: t('이벤트 추천 허용', 'Allow Event Recommendations') },
                    { key: 'allowDirectMessages', label: t('직접 메시지 허용', 'Allow Direct Messages') }
                  ].map((setting) => (
                    <label key={setting.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>{setting.label}</span>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={profile.privacy?.[setting.key as keyof typeof profile.privacy] as boolean}
                          className="rounded text-blue-600"
                        />
                        {profile.privacy?.[setting.key as keyof typeof profile.privacy] ? 
                          <Eye className="h-4 w-4 text-green-600" /> : 
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        }
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ColorfulCard>
      )}

      {activeTab === 'ai' && (
        <div className="space-y-8">
          {/* AI Settings */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                {t('AI 추천 설정', 'AI Recommendation Settings')}
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {t('문화 다양성 선호도', 'Cultural Diversity Preference')}
                  </label>
                  <div className="flex space-x-2">
                    {[
                      { value: 'high', label: t('높음', 'High'), color: 'bg-green-500' },
                      { value: 'medium', label: t('보통', 'Medium'), color: 'bg-yellow-500' },
                      { value: 'low', label: t('낮음', 'Low'), color: 'bg-red-500' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        className={`px-4 py-2 rounded-lg font-semibold text-white ${option.color} ${
                          profile.aiRecommendations?.culturalDiversityPreference === option.value 
                            ? 'ring-2 ring-offset-2 ring-blue-500' 
                            : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {t('알림 빈도', 'Notification Frequency')}
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                    <option value="daily">{t('매일', 'Daily')}</option>
                    <option value="weekly">{t('주간', 'Weekly')}</option>
                    <option value="monthly">{t('월간', 'Monthly')}</option>
                  </select>
                </div>
              </div>
            </div>
          </ColorfulCard>

          {/* AI Recommendations */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                {t('맞춤 이벤트 추천', 'Personalized Event Recommendations')}
              </h3>

              <div className="space-y-4">
                {sampleRecommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {rec.score}
                        </div>
                        <span className="font-semibold text-gray-800">
                          {t('매치 점수', 'Match Score')}: {rec.score}%
                        </span>
                      </div>
                      <ColorfulButton size="sm" variant="primary">
                        {t('자세히 보기', 'View Details')}
                      </ColorfulButton>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">
                        {t('추천 이유:', 'Why recommended:')}
                      </h4>
                      <ul className="space-y-1">
                        {rec.reasons.map((reason, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            {language === 'ko' ? reason.ko : reason.en}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm text-amber-800">
                        <strong>{t('문화 인사이트:', 'Cultural Insight:')}</strong>{' '}
                        {language === 'ko' ? rec.culturalInsight.ko : rec.culturalInsight.en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ColorfulCard>
        </div>
      )}

      {activeTab === 'gamification' && (
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ColorfulCard className="bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800">{profile.streaks?.eventAttendance}</h3>
                <p className="text-blue-600 font-semibold">{t('이벤트 연속 참석', 'Event Attendance Streak')}</p>
              </div>
            </ColorfulCard>

            <ColorfulCard className="bg-gradient-to-br from-mint-50 to-mint-100">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-mint-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Languages className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-mint-800">{profile.streaks?.languageExchange}</h3>
                <p className="text-mint-600 font-semibold">{t('언어교환 연속', 'Language Exchange Streak')}</p>
              </div>
            </ColorfulCard>

            <ColorfulCard className="bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-800">{profile.streaks?.culturalEvents}</h3>
                <p className="text-purple-600 font-semibold">{t('문화행사 연속', 'Cultural Events Streak')}</p>
              </div>
            </ColorfulCard>
          </div>

          {/* Badges */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                {t('획득한 배지', 'Earned Badges')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.badges?.map((badge) => (
                  <div key={badge.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h4 className="font-bold text-gray-800">
                        {language === 'ko' ? badge.name.ko : badge.name.en}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {language === 'ko' ? badge.description.ko : badge.description.en}
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                        badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                        badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                        badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {badge.rarity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ColorfulCard>

          {/* Gamification Features */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Gift className="h-5 w-5 mr-2 text-red-600" />
                {t('게임화 기능 & 리워드', 'Gamification Features & Rewards')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gamificationFeatures.map((feature) => (
                  <div key={feature.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-gray-800 mb-2">
                      {language === 'ko' ? feature.title.ko : feature.title.en}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {language === 'ko' ? feature.description.ko : feature.description.en}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        feature.category === 'cultural' ? 'bg-blue-100 text-blue-800' :
                        feature.category === 'language' ? 'bg-mint-100 text-mint-800' :
                        feature.category === 'volunteer' ? 'bg-green-100 text-green-800' :
                        feature.category === 'social' ? 'bg-purple-100 text-purple-800' :
                        feature.category === 'academic' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {feature.category}
                      </span>
                      <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                        🎁 {feature.reward}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ColorfulCard>
        </div>
      )}
    </div>
  );
};

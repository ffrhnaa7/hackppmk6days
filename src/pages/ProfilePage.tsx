import React, { useState, useEffect } from 'react';
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
  Calendar,
  Save,
  X,
  Plus,
  Check,
  AlertCircle,
  TrendingUp,
  Zap
} from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { ProgressBar } from '../components/ProgressBar';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useGamificationProgress } from '../hooks/useGamificationProgress';
import { supabase } from '../lib/supabase';
import { gamificationFeatures, sampleBadges } from '../data/gamificationFeatures';
import { StudentProfile, AIRecommendation } from '../types/profile';

export const ProfilePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { 
    progress, 
    achievements, 
    loading: progressLoading, 
    getProgressForReward, 
    isRewardAchieved,
    claimAchievement 
  } = useGamificationProgress();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'ai' | 'gamification'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [saveError, setSaveError] = useState<string>('');
  const [newInterest, setNewInterest] = useState('');

  // Profile state
  const [profile, setProfile] = useState<Partial<StudentProfile>>({
    name: '',
    email: '',
    university: '',
    preferredLanguage: 'en',
    languageLevel: {
      korean: 'intermediate',
      english: 'native'
    },
    interests: [],
    academicMajor: '',
    year: 'junior',
    nationality: '',
    culturalBackground: 'mixed',
    lookingForCulturalExchange: true,
    points: 0,
    level: 1,
    badges: sampleBadges,
    streaks: {
      eventAttendance: 0,
      languageExchange: 0,
      culturalEvents: 0
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

  // Load profile data on component mount
  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      console.log('Loading profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        setSaveError(`Error loading profile: ${error.message}`);
        return;
      }

      console.log('Profile data loaded:', data);

      if (data) {
        setProfile(prev => ({
          ...prev,
          name: data.name || '',
          email: data.email || user.email || '',
          university: data.university || '',
          academicMajor: data.academic_major || '',
          year: data.year || 'junior',
          nationality: data.nationality || '',
          culturalBackground: data.cultural_background || 'mixed',
          lookingForCulturalExchange: data.looking_for_cultural_exchange ?? true,
          preferredLanguage: data.preferred_language || 'en',
          languageLevel: data.language_level || {
            korean: 'intermediate',
            english: 'native'
          },
          interests: data.interests || [],
          points: data.points || 0,
          level: data.level || 1,
          streaks: data.streaks || {
            eventAttendance: 0,
            languageExchange: 0,
            culturalEvents: 0
          },
          privacy: data.privacy || {
            profileVisibility: 'university-only',
            showRealName: true,
            showUniversity: true,
            showInterests: true,
            showAvailability: false,
            showLanguageLevel: true,
            allowEventRecommendations: true,
            allowDirectMessages: true
          },
          aiRecommendations: data.ai_recommendations || {
            enabled: true,
            culturalDiversityPreference: 'high',
            eventTypes: ['cultural', 'academic', 'social'],
            maxDistance: 10,
            notificationFrequency: 'weekly'
          }
        }));
      } else {
        // No profile exists, set email from auth user
        setProfile(prev => ({
          ...prev,
          email: user.email || ''
        }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setSaveError(`Unexpected error loading profile: ${error}`);
    }
  };

  const saveProfile = async () => {
    if (!user) {
      setSaveError('No user logged in');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');
    setSaveError('');

    try {
      console.log('Saving profile for user:', user.id);
      console.log('Profile data to save:', profile);

      // Prepare the profile data with proper field mapping
      const profileData = {
        id: user.id,
        name: profile.name?.trim() || null,
        email: profile.email?.trim() || user.email || null,
        university: profile.university?.trim() || null,
        academic_major: profile.academicMajor?.trim() || null,
        year: profile.year || 'junior',
        nationality: profile.nationality?.trim() || null,
        cultural_background: profile.culturalBackground || 'mixed',
        looking_for_cultural_exchange: profile.lookingForCulturalExchange ?? true,
        preferred_language: profile.preferredLanguage || 'en',
        language_level: profile.languageLevel || {
          korean: 'intermediate',
          english: 'native'
        },
        interests: profile.interests || [],
        points: profile.points || 0,
        level: profile.level || 1,
        streaks: profile.streaks || {
          eventAttendance: 0,
          languageExchange: 0,
          culturalEvents: 0
        },
        privacy: profile.privacy || {
          profileVisibility: 'university-only',
          showRealName: true,
          showUniversity: true,
          showInterests: true,
          showAvailability: false,
          showLanguageLevel: true,
          allowEventRecommendations: true,
          allowDirectMessages: true
        },
        ai_recommendations: profile.aiRecommendations || {
          enabled: true,
          culturalDiversityPreference: 'high',
          eventTypes: ['cultural', 'academic', 'social'],
          maxDistance: 10,
          notificationFrequency: 'weekly'
        }
      };

      console.log('Formatted profile data:', profileData);

      // First, check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      let result;
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', user.id)
          .select();
      } else {
        // Insert new profile
        result = await supabase
          .from('profiles')
          .insert([profileData])
          .select();
      }

      const { data, error } = result;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Profile saved successfully:', data);
      setSaveMessage(t('프로필이 저장되었습니다!', 'Profile saved successfully!'));
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      let errorMessage = 'Unknown error occurred';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.details) {
        errorMessage = error.details;
      } else if (error.hint) {
        errorMessage = error.hint;
      }
      
      setSaveError(`Error saving profile: ${errorMessage}`);
      
      // Clear error message after 5 seconds
      setTimeout(() => setSaveError(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const updateProfile = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedProfile = (parent: string, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !profile.interests?.includes(newInterest.trim())) {
      setProfile(prev => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests?.filter(i => i !== interest) || []
    }));
  };

  const handleClaimAchievement = async (achievementId: string) => {
    const result = await claimAchievement(achievementId);
    if (result.error) {
      setSaveError(`Error claiming achievement: ${result.error}`);
    } else {
      setSaveMessage(t('리워드가 성공적으로 수령되었습니다!', 'Reward claimed successfully!'));
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Get reward target counts based on gamification features
  const getRewardTargets = () => {
    const targets: { [key: number]: number } = {};
    gamificationFeatures.forEach(feature => {
      // Extract target numbers from descriptions
      if (feature.id === 1) targets[1] = 10; // 10 international exchange events
      if (feature.id === 2) targets[2] = 7;  // 7 day streak
      if (feature.id === 3) targets[3] = 100; // Monthly leaderboard (assume 100 hours)
      if (feature.id === 4) targets[4] = 5;  // 5 traditional culture events
      if (feature.id === 5) targets[5] = 5;  // 5 countries
      if (feature.id === 6) targets[6] = 3;  // 3 academic events monthly
      if (feature.id === 7) targets[7] = 3;  // 3 MT events
      if (feature.id === 8) targets[8] = 5;  // 5 hoesik events
      if (feature.id === 9) targets[9] = 1;  // 1 speech contest
      if (feature.id === 10) targets[10] = 3; // Food festival events
    });
    return targets;
  };

  const rewardTargets = getRewardTargets();

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

  const majors = [
    'Computer Science', 'Business Administration', 'Engineering', 'Medicine',
    'Law', 'Psychology', 'Economics', 'International Relations',
    'Korean Language & Literature', 'English Literature', 'Art & Design',
    'Music', 'Mathematics', 'Physics', 'Chemistry', 'Biology'
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
        
        {/* Save Message */}
        {saveMessage && (
          <div className="mt-4 p-3 rounded-lg bg-mint-100 text-mint-800 flex items-center">
            <Check className="h-5 w-5 mr-2" />
            {saveMessage}
          </div>
        )}

        {/* Error Message */}
        {saveError && (
          <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-800 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {saveError}
          </div>
        )}
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
                <h2 className="text-2xl font-bold text-gray-800">{profile.name || t('이름 없음', 'No Name')}</h2>
                <p className="text-blue-600 font-semibold">{profile.university || t('대학교 미설정', 'University not set')}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {profile.academicMajor || t('전공 미설정', 'Major not set')} • {profile.year}
                  </span>
                  <span className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {profile.nationality || t('국적 미설정', 'Nationality not set')}
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
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <ColorfulButton 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                      >
                        <X className="h-4 w-4 mr-1" />
                        {t('취소', 'Cancel')}
                      </ColorfulButton>
                      <ColorfulButton 
                        variant="primary" 
                        size="sm"
                        onClick={saveProfile}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"></div>
                        ) : (
                          <Save className="h-4 w-4 mr-1" />
                        )}
                        {isSaving ? t('저장 중...', 'Saving...') : t('저장', 'Save')}
                      </ColorfulButton>
                    </>
                  ) : (
                    <ColorfulButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      {t('편집', 'Edit')}
                    </ColorfulButton>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('이름', 'Name')}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name || ''}
                      onChange={(e) => updateProfile('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder={t('이름을 입력하세요', 'Enter your name')}
                    />
                  ) : (
                    <p className="text-gray-800">{profile.name || t('이름 미설정', 'Name not set')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('대학교', 'University')}
                  </label>
                  {isEditing ? (
                    <select 
                      value={profile.university || ''}
                      onChange={(e) => updateProfile('university', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t('대학교를 선택하세요', 'Select your university')}</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-800">{profile.university || t('대학교 미설정', 'University not set')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('전공', 'Major')}
                  </label>
                  {isEditing ? (
                    <select
                      value={profile.academicMajor || ''}
                      onChange={(e) => updateProfile('academicMajor', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t('전공을 선택하세요', 'Select your major')}</option>
                      {majors.map((major) => (
                        <option key={major} value={major}>{major}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-800">{profile.academicMajor || t('전공 미설정', 'Major not set')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('학년', 'Year')}
                  </label>
                  {isEditing ? (
                    <select
                      value={profile.year || 'junior'}
                      onChange={(e) => updateProfile('year', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="freshman">{t('1학년', 'Freshman')}</option>
                      <option value="sophomore">{t('2학년', 'Sophomore')}</option>
                      <option value="junior">{t('3학년', 'Junior')}</option>
                      <option value="senior">{t('4학년', 'Senior')}</option>
                      <option value="graduate">{t('대학원생', 'Graduate')}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 capitalize">{profile.year}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('국적', 'Nationality')}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.nationality || ''}
                      onChange={(e) => updateProfile('nationality', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder={t('국적을 입력하세요', 'Enter your nationality')}
                    />
                  ) : (
                    <p className="text-gray-800">{profile.nationality || t('국적 미설정', 'Nationality not set')}</p>
                  )}
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
                    <button 
                      onClick={() => isEditing && updateProfile('preferredLanguage', 'ko')}
                      disabled={!isEditing}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        profile.preferredLanguage === 'ko' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } ${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      한국어
                    </button>
                    <button 
                      onClick={() => isEditing && updateProfile('preferredLanguage', 'en')}
                      disabled={!isEditing}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        profile.preferredLanguage === 'en' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } ${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('언어 수준', 'Language Level')}
                  </label>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>{t('한국어', 'Korean')}</span>
                        {isEditing && (
                          <select
                            value={profile.languageLevel?.korean || 'intermediate'}
                            onChange={(e) => updateNestedProfile('languageLevel', 'korean', e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="beginner">{t('초급', 'Beginner')}</option>
                            <option value="intermediate">{t('중급', 'Intermediate')}</option>
                            <option value="advanced">{t('고급', 'Advanced')}</option>
                            <option value="native">{t('원어민', 'Native')}</option>
                          </select>
                        )}
                      </div>
                      {!isEditing && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize">
                          {profile.languageLevel?.korean}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>{t('영어', 'English')}</span>
                        {isEditing && (
                          <select
                            value={profile.languageLevel?.english || 'native'}
                            onChange={(e) => updateNestedProfile('languageLevel', 'english', e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="beginner">{t('초급', 'Beginner')}</option>
                            <option value="intermediate">{t('중급', 'Intermediate')}</option>
                            <option value="advanced">{t('고급', 'Advanced')}</option>
                            <option value="native">{t('원어민', 'Native')}</option>
                          </select>
                        )}
                      </div>
                      {!isEditing && (
                        <span className="px-3 py-1 bg-mint-100 text-mint-800 rounded-full text-sm font-semibold capitalize">
                          {profile.languageLevel?.english}
                        </span>
                      )}
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
                      onChange={(e) => isEditing && updateProfile('lookingForCulturalExchange', e.target.checked)}
                      disabled={!isEditing}
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

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profile.interests?.map((interest, index) => (
                    <div key={index} className="flex items-center">
                      <span className="px-4 py-2 bg-gradient-accent text-white rounded-full text-sm font-semibold shadow-md">
                        {interest}
                      </span>
                      {isEditing && (
                        <button
                          onClick={() => removeInterest(interest)}
                          className="ml-1 p-1 text-red-500 hover:bg-red-100 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                      placeholder={t('새 관심사 추가', 'Add new interest')}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <ColorfulButton
                      variant="outline"
                      size="sm"
                      onClick={addInterest}
                    >
                      <Plus className="h-4 w-4" />
                    </ColorfulButton>
                  </div>
                )}
              </div>
            </div>
          </ColorfulCard>

          {/* Cultural Background */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-purple-600" />
                {t('문화적 배경', 'Cultural Background')}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('문화적 배경', 'Cultural Background')}
                  </label>
                  {isEditing ? (
                    <select
                      value={profile.culturalBackground || 'mixed'}
                      onChange={(e) => updateProfile('culturalBackground', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="korean">{t('한국', 'Korean')}</option>
                      <option value="international">{t('국제', 'International')}</option>
                      <option value="mixed">{t('혼합', 'Mixed')}</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 capitalize">{profile.culturalBackground}</p>
                  )}
                </div>
              </div>
            </div>
          </ColorfulCard>
        </div>
      )}

      {activeTab === 'privacy' && (
        <ColorfulCard>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                {t('프라이버시 설정', 'Privacy Settings')}
              </h3>
              {isEditing && (
                <ColorfulButton 
                  variant="primary" 
                  size="sm"
                  onClick={saveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"></div>
                  ) : (
                    <Save className="h-4 w-4 mr-1" />
                  )}
                  {isSaving ? t('저장 중...', 'Saving...') : t('저장', 'Save')}
                </ColorfulButton>
              )}
            </div>

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
                        onChange={(e) => updateNestedProfile('privacy', 'profileVisibility', e.target.value)}
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
                          onChange={(e) => updateNestedProfile('privacy', setting.key, e.target.checked)}
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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                  {t('AI 추천 설정', 'AI Recommendation Settings')}
                </h3>
                {isEditing && (
                  <ColorfulButton 
                    variant="primary" 
                    size="sm"
                    onClick={saveProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"></div>
                    ) : (
                      <Save className="h-4 w-4 mr-1" />
                    )}
                    {isSaving ? t('저장 중...', 'Saving...') : t('저장', 'Save')}
                  </ColorfulButton>
                )}
              </div>

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
                        onClick={() => updateNestedProfile('aiRecommendations', 'culturalDiversityPreference', option.value)}
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
                  <select 
                    value={profile.aiRecommendations?.notificationFrequency || 'weekly'}
                    onChange={(e) => updateNestedProfile('aiRecommendations', 'notificationFrequency', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
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

          {/* Progress Tracking */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                {t('리워드 진행 상황', 'Reward Progress')}
              </h3>

              {progressLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  <span className="ml-2 text-gray-600">{t('진행 상황 로딩 중...', 'Loading progress...')}</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {gamificationFeatures.map((feature) => {
                    const userProgress = getProgressForReward(feature.id);
                    const isAchieved = isRewardAchieved(feature.id);
                    const targetCount = rewardTargets[feature.id] || 10;
                    const currentCount = userProgress?.currentCount || 0;
                    
                    const colorMap: { [key: string]: 'blue' | 'mint' | 'purple' | 'green' | 'orange' } = {
                      cultural: 'blue',
                      language: 'mint',
                      volunteer: 'green',
                      social: 'purple',
                      academic: 'orange',
                      special: 'purple'
                    };

                    return (
                      <div key={feature.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 mb-2">
                              {language === 'ko' ? feature.title.ko : feature.title.en}
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                              {language === 'ko' ? feature.description.ko : feature.description.en}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
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
                            {isAchieved && (
                              <div className="flex items-center space-x-1">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                <span className="text-xs font-semibold text-yellow-600">
                                  {t('완료', 'Completed')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <ProgressBar
                          current={currentCount}
                          target={targetCount}
                          color={colorMap[feature.category] || 'blue'}
                          size="lg"
                          reward={feature.reward}
                          isCompleted={isAchieved}
                          className="mb-3"
                        />

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {t('진행률', 'Progress')}: {Math.min(100, Math.round((currentCount / targetCount) * 100))}%
                          </span>
                          <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                            🎁 {feature.reward}
                          </span>
                        </div>

                        {isAchieved && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Check className="h-5 w-5 text-green-600" />
                                <span className="text-green-800 font-semibold">
                                  {t('목표 달성! 리워드를 받을 수 있습니다.', 'Goal achieved! You can claim your reward.')}
                                </span>
                              </div>
                              <ColorfulButton
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                  // In a real app, this would claim the reward
                                  setSaveMessage(t('리워드가 수령되었습니다!', 'Reward claimed!'));
                                  setTimeout(() => setSaveMessage(''), 3000);
                                }}
                              >
                                <Gift className="h-4 w-4 mr-1" />
                                {t('수령', 'Claim')}
                              </ColorfulButton>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </ColorfulCard>

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

          {/* Completed Achievements */}
          {achievements.length > 0 && (
            <ColorfulCard>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-gold-600" />
                  {t('완료된 성취', 'Completed Achievements')}
                </h3>

                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="border border-green-200 rounded-xl p-4 bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-green-800">
                            {language === 'ko' ? achievement.rewardTitle.ko : achievement.rewardTitle.en}
                          </h4>
                          <p className="text-sm text-green-600 mt-1">
                            {language === 'ko' ? achievement.rewardDescription.ko : achievement.rewardDescription.en}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-green-600">
                              {t('완료일', 'Completed')}: {new Date(achievement.completedAt).toLocaleDateString()}
                            </span>
                            <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                              🎁 {achievement.rewardPrize}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          {achievement.claimed ? (
                            <div className="flex items-center space-x-1 text-green-600">
                              <Check className="h-4 w-4" />
                              <span className="text-sm font-semibold">{t('수령완료', 'Claimed')}</span>
                            </div>
                          ) : (
                            <ColorfulButton
                              variant="primary"
                              size="sm"
                              onClick={() => handleClaimAchievement(achievement.id)}
                            >
                              <Gift className="h-4 w-4 mr-1" />
                              {t('수령', 'Claim')}
                            </ColorfulButton>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ColorfulCard>
          )}
        </div>
      )}
    </div>
  );
};

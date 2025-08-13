export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  university: string;
  studentId?: string;
  profileImage?: string;
  
  // Language & Cultural Preferences
  preferredLanguage: 'ko' | 'en';
  languageLevel: {
    korean: 'beginner' | 'intermediate' | 'advanced' | 'native';
    english: 'beginner' | 'intermediate' | 'advanced' | 'native';
  };
  
  // Interests & Activities
  interests: string[];
  clubMemberships: string[];
  academicMajor: string;
  year: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';
  
  // Availability
  availableTimes: {
    weekdays: string[];
    weekends: string[];
    preferredTimeSlots: ('morning' | 'afternoon' | 'evening')[];
  };
  
  // Cultural Background
  nationality: string;
  culturalBackground: 'korean' | 'international' | 'mixed';
  lookingForCulturalExchange: boolean;
  
  // Privacy Settings
  privacy: {
    profileVisibility: 'public' | 'university-only' | 'friends-only' | 'private';
    showRealName: boolean;
    showUniversity: boolean;
    showInterests: boolean;
    showAvailability: boolean;
    showLanguageLevel: boolean;
    allowEventRecommendations: boolean;
    allowDirectMessages: boolean;
  };
  
  // Gamification
  points: number;
  level: number;
  badges: Badge[];
  streaks: {
    eventAttendance: number;
    languageExchange: number;
    culturalEvents: number;
  };
  achievements: Achievement[];
  
  // AI Preferences
  aiRecommendations: {
    enabled: boolean;
    culturalDiversityPreference: 'high' | 'medium' | 'low';
    eventTypes: string[];
    maxDistance: number;
    notificationFrequency: 'daily' | 'weekly' | 'monthly';
  };
}

export interface Badge {
  id: string;
  name: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
  category: 'cultural' | 'academic' | 'social' | 'language' | 'volunteer' | 'special';
}

export interface Achievement {
  id: string;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  progress: number;
  maxProgress: number;
  reward: {
    points: number;
    badge?: Badge;
    gifticon?: string;
  };
}

export interface AIRecommendation {
  eventId: string;
  score: number;
  reasons: Array<{
    ko: string;
    en: string;
    type: 'cultural-diversity' | 'language-practice' | 'interest-match' | 'time-match' | 'social-opportunity';
  }>;
  culturalInsight: {
    ko: string;
    en: string;
  };
}

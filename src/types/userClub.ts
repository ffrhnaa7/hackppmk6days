export interface UserClub {
  id: string;
  name: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  category: '학술' | '문화' | '취미' | '봉사' | '종교' | '체육' | '학생회';
  creator_id: string;
  member_count: number;
  established: number;
  recruiting: boolean;
  requirements?: {
    ko: string;
    en: string;
  };
  activities: Array<{
    ko: string;
    en: string;
  }>;
  cultural_guide?: {
    ko: string;
    en: string;
  };
  image?: string;
  location: string;
  contact_email?: string;
  social_media?: {
    facebook?: string;
    instagram?: string;
    kakao?: string;
    website?: string;
  };
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at: string;
}

export interface ClubApplication {
  id: string;
  club_id: string;
  applicant_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  application_message?: string;
  admin_notes?: string;
  applied_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  // Joined data
  applicant_name?: string;
  applicant_email?: string;
  club_name?: {
    ko: string;
    en: string;
  };
}

export interface ClubMember {
  id: string;
  club_id: string;
  user_id: string;
  role: 'creator' | 'admin' | 'member';
  joined_at: string;
  // Joined data
  user_name?: string;
  user_email?: string;
}

export interface CreateClubData {
  name: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  category: '학술' | '문화' | '취미' | '봉사' | '종교' | '체육' | '학생회';
  requirements?: {
    ko: string;
    en: string;
  };
  activities: Array<{
    ko: string;
    en: string;
  }>;
  cultural_guide?: {
    ko: string;
    en: string;
  };
  image?: string;
  contact_email?: string;
  social_media?: {
    facebook?: string;
    instagram?: string;
    kakao?: string;
    website?: string;
  };
}

export interface ManagedClubSummary {
  club_id: string;
  club_name: {
    ko: string;
    en: string;
  };
  member_count: number;
  pending_applications: number;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
}

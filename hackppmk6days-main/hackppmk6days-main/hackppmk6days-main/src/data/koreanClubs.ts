export interface KoreanClub {
  id: string;
  name: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  category: '학술' | '문화' | '취미' | '봉사' | '종교' | '체육';
  officers: Array<{
    name: {
      ko: string;
      en: string;
    };
    role: {
      ko: string;
      en: string;
    };
    contact: string;
  }>;
  memberCount: number;
  established: number;
  recruiting: boolean;
  requirements: {
    ko: string;
    en: string;
  };
  activities: Array<{
    ko: string;
    en: string;
  }>;
  culturalGuide: {
    ko: string;
    en: string;
  };
  image: string;
  pastEvents: string[];
}

export const koreanClubs: KoreanClub[] = [
  {
    id: '1',
    name: {
      ko: '컴퓨터공학과 학회',
      en: 'Computer Science Society'
    },
    description: {
      ko: '컴퓨터공학과 학생들의 학술 활동과 친목을 도모하는 학회입니다. 프로그래밍 스터디, 해커톤, 기술 세미나 등을 진행합니다.',
      en: 'A society promoting academic activities and fellowship among Computer Science students. We organize programming studies, hackathons, and tech seminars.'
    },
    category: '학술',
    officers: [
      {
        name: { ko: '김민수', en: 'Kim Minsu' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@cs-society.ac.kr'
      },
      {
        name: { ko: '이지영', en: 'Lee Jiyoung' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@cs-society.ac.kr'
      },
      {
        name: { ko: 'Sarah Johnson', en: 'Sarah Johnson' },
        role: { ko: '국제교류부장', en: 'International Affairs Director' },
        contact: 'international@cs-society.ac.kr'
      }
    ],
    memberCount: 120,
    established: 1995,
    recruiting: true,
    requirements: {
      ko: '컴퓨터공학과 재학생 또는 관련 분야에 관심이 있는 학생',
      en: 'Computer Science students or those interested in related fields'
    },
    activities: [
      { ko: '주간 프로그래밍 스터디', en: 'Weekly programming study sessions' },
      { ko: '월간 해커톤', en: 'Monthly hackathons' },
      { ko: '기업 견학', en: 'Company visits' },
      { ko: '졸업생 멘토링', en: 'Alumni mentoring' }
    ],
    culturalGuide: {
      ko: '한국 대학의 학회는 선후배 관계가 중요합니다. 신입생은 보통 "새내기"라고 불리며, 선배들이 멘토 역할을 합니다.',
      en: 'Korean university societies emphasize senior-junior relationships. New students are called "saenaegi" and seniors act as mentors.'
    },
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    pastEvents: ['1', '3']
  },
  {
    id: '2',
    name: {
      ko: '국제교류 동아리',
      en: 'International Exchange Club'
    },
    description: {
      ko: '한국 학생과 외국인 학생 간의 문화 교류를 촉진하는 동아리입니다. 언어 교환, 문화 체험, 국제 행사 등을 주최합니다.',
      en: 'A club promoting cultural exchange between Korean and international students. We host language exchanges, cultural experiences, and international events.'
    },
    category: '문화',
    officers: [
      {
        name: { ko: '박서연', en: 'Park Seoyeon' },
        role: { ko: '동아리장', en: 'Club President' },
        contact: 'president@international-club.ac.kr'
      },
      {
        name: { ko: 'Michael Chen', en: 'Michael Chen' },
        role: { ko: '부동아리장', en: 'Vice President' },
        contact: 'vp@international-club.ac.kr'
      }
    ],
    memberCount: 85,
    established: 2010,
    recruiting: true,
    requirements: {
      ko: '문화 교류에 관심이 있는 모든 학생 (국적 무관)',
      en: 'All students interested in cultural exchange (any nationality)'
    },
    activities: [
      { ko: '주간 언어 교환', en: 'Weekly language exchange' },
      { ko: '문화 체험 워크샵', en: 'Cultural experience workshops' },
      { ko: '국제 음식 축제', en: 'International food festival' },
      { ko: '여행 프로그램', en: 'Travel programs' }
    ],
    culturalGuide: {
      ko: '이 동아리는 위계질서보다는 평등한 관계를 중시합니다. 모든 구성원이 서로 배우고 가르치는 관계입니다.',
      en: 'This club emphasizes equality over hierarchy. All members learn from and teach each other.'
    },
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    pastEvents: ['4']
  }
];

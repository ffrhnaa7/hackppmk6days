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
  category: '학술' | '문화' | '취미' | '봉사' | '종교' | '체육' | '학생회';
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
  country?: string; // For student associations
  embassy?: string; // Embassy contact for student associations
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    kakao?: string;
    website?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    kakao?: string;
  };
  meetingSchedule?: {
    ko: string;
    en: string;
  };
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
    pastEvents: ['1', '3'],
    contact: {
      email: 'contact@cs-society.ac.kr',
      phone: '+82-2-1234-5678'
    },
    meetingSchedule: {
      ko: '매주 화요일 오후 6시',
      en: 'Every Tuesday at 6 PM'
    }
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
    pastEvents: ['4'],
    contact: {
      email: 'contact@international-club.ac.kr'
    },
    meetingSchedule: {
      ko: '매주 금요일 오후 7시',
      en: 'Every Friday at 7 PM'
    }
  },
  // International Student Associations
  {
    id: 'sa-1',
    name: {
      ko: '한국 중국학생회',
      en: 'Chinese Students Association in Korea'
    },
    description: {
      ko: '한국에 거주하는 중국 학생들의 학업, 생활, 문화 교류를 지원하는 학생회입니다. 중국 전통 문화 행사와 한중 교류 프로그램을 운영합니다.',
      en: 'Supporting Chinese students in Korea with academics, daily life, and cultural exchange. We organize traditional Chinese cultural events and Korea-China exchange programs.'
    },
    category: '학생회',
    country: 'China',
    embassy: 'Embassy of China in Korea',
    officers: [
      {
        name: { ko: '왕웨이', en: 'Wang Wei' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@csa-korea.org'
      },
      {
        name: { ko: '리샤오밍', en: 'Li Xiaoming' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@csa-korea.org'
      },
      {
        name: { ko: '장메이', en: 'Zhang Mei' },
        role: { ko: '문화부장', en: 'Cultural Director' },
        contact: 'culture@csa-korea.org'
      }
    ],
    memberCount: 450,
    established: 2005,
    recruiting: true,
    requirements: {
      ko: '한국에 거주하는 중국 국적 학생 또는 중국 문화에 관심이 있는 학생',
      en: 'Chinese students in Korea or those interested in Chinese culture'
    },
    activities: [
      { ko: '중국 전통 명절 행사', en: 'Traditional Chinese festival celebrations' },
      { ko: '중국어 스터디 그룹', en: 'Chinese language study groups' },
      { ko: '취업 정보 공유', en: 'Job information sharing' },
      { ko: '한중 문화 교류', en: 'Korea-China cultural exchange' },
      { ko: '신입생 오리엔테이션', en: 'New student orientation' }
    ],
    culturalGuide: {
      ko: '중국학생회는 관시(关系) 문화를 바탕으로 선후배 간의 네트워킹을 중시합니다. 춘절, 중추절 등 전통 명절을 함께 기념하며 고향의 정을 나눕니다.',
      en: 'The Chinese Students Association values networking based on Guanxi culture. We celebrate traditional festivals like Spring Festival and Mid-Autumn Festival together, sharing hometown connections.'
    },
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop',
    pastEvents: ['1', '4'],
    socialMedia: {
      facebook: 'CSAKorea',
      instagram: '@csa_korea',
      kakao: 'CSAKorea',
      website: 'https://csa-korea.org'
    },
    contact: {
      email: 'info@csa-korea.org'
    },
    meetingSchedule: {
      ko: '매월 첫째 주 토요일 오후 2시',
      en: 'First Saturday of every month at 2 PM'
    }
  },
  {
    id: 'sa-2',
    name: {
      ko: '한국 베트남학생회',
      en: 'Vietnamese Students Association in Korea'
    },
    description: {
      ko: '한국에서 공부하는 베트남 학생들의 학업과 생활을 지원하고, 베트남 문화를 한국에 알리는 학생회입니다.',
      en: 'Supporting Vietnamese students studying in Korea and promoting Vietnamese culture. We provide academic and life support for our community.'
    },
    category: '학생회',
    country: 'Vietnam',
    embassy: 'Embassy of Vietnam in Korea',
    officers: [
      {
        name: { ko: '응우옌 반 안', en: 'Nguyen Van An' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@vsa-korea.org'
      },
      {
        name: { ko: '쩐 티 란', en: 'Tran Thi Lan' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@vsa-korea.org'
      }
    ],
    memberCount: 280,
    established: 2008,
    recruiting: true,
    requirements: {
      ko: '한국에 거주하는 베트남 국적 학생 또는 베트남 문화에 관심이 있는 학생',
      en: 'Vietnamese students in Korea or those interested in Vietnamese culture'
    },
    activities: [
      { ko: '베트남 전통 음식 축제', en: 'Vietnamese traditional food festival' },
      { ko: '베트남어 교육', en: 'Vietnamese language classes' },
      { ko: '테트 신년 행사', en: 'Tet New Year celebration' },
      { ko: '학업 멘토링', en: 'Academic mentoring' },
      { ko: '취업 준비 세미나', en: 'Job preparation seminars' }
    ],
    culturalGuide: {
      ko: '베트남학생회는 가족 같은 분위기를 중시하며, 선배들이 후배들의 한국 적응을 적극적으로 도와줍니다. 테트(구정) 기간에는 전통 음식을 함께 만들어 먹습니다.',
      en: 'The Vietnamese Students Association emphasizes a family-like atmosphere where seniors actively help juniors adapt to Korea. During Tet (Lunar New Year), we cook and share traditional foods together.'
    },
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    pastEvents: ['2'],
    socialMedia: {
      facebook: 'VSAKorea',
      instagram: '@vsa_korea',
      kakao: 'VSAKorea'
    },
    contact: {
      email: 'info@vsa-korea.org'
    },
    meetingSchedule: {
      ko: '매주 일요일 오후 3시',
      en: 'Every Sunday at 3 PM'
    }
  },
  {
    id: 'sa-3',
    name: {
      ko: '한국 인도네시아학생회',
      en: 'Indonesian Students Association in Korea'
    },
    description: {
      ko: '한국의 인도네시아 학생들을 위한 학생회로, 학업 지원과 인도네시아 문화 보존 및 전파를 목표로 합니다.',
      en: 'Student association for Indonesian students in Korea, focusing on academic support and preserving and promoting Indonesian culture.'
    },
    category: '학생회',
    country: 'Indonesia',
    embassy: 'Embassy of Indonesia in Korea',
    officers: [
      {
        name: { ko: '아디 프라타마', en: 'Adi Pratama' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@isa-korea.org'
      },
      {
        name: { ko: '시티 누르할리자', en: 'Siti Nurhaliza' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@isa-korea.org'
      }
    ],
    memberCount: 195,
    established: 2010,
    recruiting: true,
    requirements: {
      ko: '한국에 거주하는 인도네시아 국적 학생 또는 인도네시아 문화에 관심이 있는 학생',
      en: 'Indonesian students in Korea or those interested in Indonesian culture'
    },
    activities: [
      { ko: '인도네시아 독립기념일 행사', en: 'Indonesian Independence Day celebration' },
      { ko: '바틱 워크샵', en: 'Batik workshops' },
      { ko: '인도네시아어 교실', en: 'Indonesian language classes' },
      { ko: '할랄 음식 축제', en: 'Halal food festival' },
      { ko: '이슬람 문화 소개', en: 'Islamic culture introduction' }
    ],
    culturalGuide: {
      ko: '인도네시아학생회는 고통 로용(Gotong Royong, 상호부조) 정신을 바탕으로 운영됩니다. 라마단 기간에는 함께 이프타르(금식 해제 식사)를 하며 공동체 의식을 다집니다.',
      en: 'The Indonesian Students Association operates based on Gotong Royong (mutual assistance) spirit. During Ramadan, we share Iftar meals together, strengthening our community bonds.'
    },
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
    pastEvents: ['3'],
    socialMedia: {
      facebook: 'ISAKorea',
      instagram: '@isa_korea',
      website: 'https://isa-korea.org'
    },
    contact: {
      email: 'info@isa-korea.org'
    }
  },
  {
    id: 'sa-4',
    name: {
      ko: '한국 인도학생회',
      en: 'Indian Students Association in Korea'
    },
    description: {
      ko: '한국의 인도 학생들을 위한 학생회로, 학업 지원, 문화 교류, 그리고 인도 전통 문화 보존을 목표로 합니다.',
      en: 'Student association for Indian students in Korea, focusing on academic support, cultural exchange, and preserving Indian traditions.'
    },
    category: '학생회',
    country: 'India',
    embassy: 'Embassy of India in Korea',
    officers: [
      {
        name: { ko: '라지 쿠마르', en: 'Raj Kumar' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@isa-korea.in'
      },
      {
        name: { ko: '프리야 샤르마', en: 'Priya Sharma' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@isa-korea.in'
      }
    ],
    memberCount: 320,
    established: 2007,
    recruiting: true,
    requirements: {
      ko: '한국에 거주하는 인도 국적 학생 또는 인도 문화에 관심이 있는 학생',
      en: 'Indian students in Korea or those interested in Indian culture'
    },
    activities: [
      { ko: '디왈리 축제', en: 'Diwali festival celebration' },
      { ko: '인도 고전 무용 공연', en: 'Indian classical dance performances' },
      { ko: '힌디어/타밀어 교실', en: 'Hindi/Tamil language classes' },
      { ko: '인도 요리 워크샵', en: 'Indian cooking workshops' },
      { ko: '크리켓 토너먼트', en: 'Cricket tournaments' }
    ],
    culturalGuide: {
      ko: '인도학생회는 "바수데바 쿠툼바캄(세계는 하나의 가족)"이라는 철학을 바탕으로 운영됩니다. 다양한 지역과 언어 출신의 인도 학생들이 하나가 되어 활동합니다.',
      en: 'The Indian Students Association operates on the philosophy of "Vasudhaiva Kutumbakam" (the world is one family). Students from diverse regions and languages of India unite in our activities.'
    },
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop',
    pastEvents: ['1', '2'],
    socialMedia: {
      facebook: 'IndianStudentsKorea',
      instagram: '@indian_students_korea',
      website: 'https://isa-korea.in'
    },
    contact: {
      email: 'info@isa-korea.in'
    },
    meetingSchedule: {
      ko: '매월 둘째 주 토요일 오후 4시',
      en: 'Second Saturday of every month at 4 PM'
    }
  },
  {
    id: 'sa-5',
    name: {
      ko: '한국 태국학생회',
      en: 'Thai Students Association in Korea'
    },
    description: {
      ko: '한국에서 공부하는 태국 학생들의 학업과 생활을 지원하고, 태국 문화를 한국에 소개하는 학생회입니다.',
      en: 'Supporting Thai students studying in Korea and introducing Thai culture to Korea. We provide comprehensive support for our community.'
    },
    category: '학생회',
    country: 'Thailand',
    embassy: 'Embassy of Thailand in Korea',
    officers: [
      {
        name: { ko: '소피야 탄차이', en: 'Sophia Tanchai' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@tsa-korea.org'
      },
      {
        name: { ko: '아난 위라왓', en: 'Anan Wirawat' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@tsa-korea.org'
      }
    ],
    memberCount: 150,
    established: 2012,
    recruiting: true,
    requirements: {
      ko: '한국에 거주하는 태국 국적 학생 또는 태국 문화에 관심이 있는 학생',
      en: 'Thai students in Korea or those interested in Thai culture'
    },
    activities: [
      { ko: '송크란 물축제', en: 'Songkran water festival' },
      { ko: '태국 전통 무용', en: 'Traditional Thai dance' },
      { ko: '태국어 교실', en: 'Thai language classes' },
      { ko: '태국 요리 클래스', en: 'Thai cooking classes' },
      { ko: '불교 문화 체험', en: 'Buddhist culture experience' }
    ],
    culturalGuide: {
      ko: '태국학생회는 "사누크(즐거움)"와 "크렝자이(배려)" 문화를 중시합니다. 모든 활동은 즐겁고 화목한 분위기에서 진행되며, 서로를 배려하는 마음을 가집니다.',
      en: 'The Thai Students Association values "Sanuk" (fun) and "Kreng Jai" (consideration) culture. All activities are conducted in a joyful and harmonious atmosphere with mutual consideration.'
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    pastEvents: ['4'],
    socialMedia: {
      facebook: 'TSAKorea',
      instagram: '@tsa_korea'
    },
    contact: {
      email: 'info@tsa-korea.org'
    }
  },
  {
    id: 'sa-6',
    name: {
      ko: '한국 필리핀학생회',
      en: 'Filipino Students Association in Korea'
    },
    description: {
      ko: '한국의 필리핀 학생들을 위한 학생회로, 학업 지원과 필리핀 문화 보존 및 전파를 목표로 합니다.',
      en: 'Student association for Filipino students in Korea, focusing on academic support and preserving and promoting Filipino culture.'
    },
    category: '학생회',
    country: 'Philippines',
    embassy: 'Embassy of Philippines in Korea',
    officers: [
      {
        name: { ko: '마리아 산토스', en: 'Maria Santos' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@fsa-korea.org'
      },
      {
        name: { ko: '호세 리살', en: 'Jose Rizal' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@fsa-korea.org'
      }
    ],
    memberCount: 180,
    established: 2011,
    recruiting: true,
    requirements: {
      ko: '한국에 거주하는 필리핀 국적 학생 또는 필리핀 문화에 관심이 있는 학생',
      en: 'Filipino students in Korea or those interested in Filipino culture'
    },
    activities: [
      { ko: '필리핀 독립기념일 행사', en: 'Philippine Independence Day celebration' },
      { ko: '바롱 타갈로그 패션쇼', en: 'Barong Tagalog fashion show' },
      { ko: '타갈로그어 교실', en: 'Tagalog language classes' },
      { ko: '필리핀 요리 축제', en: 'Filipino food festival' },
      { ko: '전통 춤 공연', en: 'Traditional dance performances' }
    ],
    culturalGuide: {
      ko: '필리핀학생회는 "카푸나한(가족애)"과 "바야니한(공동체 정신)" 문화를 바탕으로 운영됩니다. 모든 구성원을 가족처럼 여기며 서로 도우며 살아갑니다.',
      en: 'The Filipino Students Association operates based on "Kapamilihan" (family love) and "Bayanihan" (community spirit) culture. We treat all members like family and help each other.'
    },
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop',
    pastEvents: ['2', '3'],
    socialMedia: {
      facebook: 'FSAKorea',
      instagram: '@fsa_korea'
    },
    contact: {
      email: 'info@fsa-korea.org'
    },
    meetingSchedule: {
      ko: '매월 셋째 주 일요일 오후 2시',
      en: 'Third Sunday of every month at 2 PM'
    }
  },
  {
    id: 'sa-7',
    name: {
      ko: '한국 말레이시아학생회',
      en: 'Malaysian Students Association in Korea'
    },
    description: {
      ko: '한국에서 공부하는 말레이시아 학생들의 학업과 생활을 지원하고, 말레이시아의 다문화를 한국에 소개합니다.',
      en: 'Supporting Malaysian students studying in Korea and introducing Malaysia\'s multicultural heritage to Korea.'
    },
    category: '학생회',
    country: 'Malaysia',
    embassy: 'Embassy of Malaysia in Korea',
    officers: [
      {
        name: { ko: '아흐마드 이브라힘', en: 'Ahmad Ibrahim' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@msa-korea.org'
      },
      {
        name: { ko: '리 메이 링', en: 'Lee Mei Ling' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@msa-korea.org'
      }
    ],
    memberCount: 120,
    established: 2013,
    recruiting: true,
    requirements: {
      ko: '한국에 거주하는 말레이시아 국적 학생 또는 말레이시아 문화에 관심이 있는 학생',
      en: 'Malaysian students in Korea or those interested in Malaysian culture'
    },
    activities: [
      { ko: '말레이시아 독립기념일 행사', en: 'Malaysia Independence Day celebration' },
      { ko: '다문화 음식 축제', en: 'Multicultural food festival' },
      { ko: '말레이어/중국어 교실', en: 'Malay/Chinese language classes' },
      { ko: '전통 의상 체험', en: 'Traditional costume experience' },
      { ko: '할랄 요리 워크샵', en: 'Halal cooking workshops' }
    ],
    culturalGuide: {
      ko: '말레이시아학생회는 "1말레이시아" 정신으로 말레이, 중국, 인도계 등 다양한 민족이 화합하여 활동합니다. 서로의 문화를 존중하고 배우는 것을 중시합니다.',
      en: 'The Malaysian Students Association embodies the "1Malaysia" spirit where Malay, Chinese, Indian and other ethnicities unite. We emphasize respecting and learning from each other\'s cultures.'
    },
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop',
    pastEvents: ['1'],
    socialMedia: {
      facebook: 'MSAKorea',
      instagram: '@msa_korea'
    },
    contact: {
      email: 'info@msa-korea.org'
    }
  },
  {
    id: 'sa-8',
    name: {
      ko: '한국 일본학생회',
      en: 'Japanese Students Association in Korea'
    },
    description: {
      ko: '한국에서 공부하는 일본 학생들의 학업과 생활을 지원하고, 한일 문화 교류를 촉진하는 학생회입니다.',
      en: 'Supporting Japanese students studying in Korea and promoting Korea-Japan cultural exchange.'
    },
    category: '학생회',
    country: 'Japan',
    embassy: 'Embassy of Japan in Korea',
    officers: [
      {
        name: { ko: '다나카 히로시', en: 'Tanaka Hiroshi' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@jsa-korea.org'
      },
      {
        name: { ko: '사토 유키', en: 'Sato Yuki' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@jsa-korea.org'
      }
    ],
    memberCount: 95,
    established: 2009,
    recruiting: true,
    requirements: {
      ko: '한국에 거주하는 일본 국적 학생 또는 일본 문화에 관심이 있는 학생',
      en: 'Japanese students in Korea or those interested in Japanese culture'
    },
    activities: [
      { ko: '한일 문화 교류회', en: 'Korea-Japan cultural exchange' },
      { ko: '일본어 회화 모임', en: 'Japanese conversation meetings' },
      { ko: '전통 차 문화 체험', en: 'Traditional tea culture experience' },
      { ko: '벚꽃 축제', en: 'Cherry blossom festival' },
      { ko: '취업 정보 세미나', en: 'Job information seminars' }
    ],
    culturalGuide: {
      ko: '일본학생회는 "와(和, 화합)"의 정신을 바탕으로 운영됩니다. 서로를 배려하고 조화를 이루며, 한국과 일본의 우정을 다지는 것을 목표로 합니다.',
      en: 'The Japanese Students Association operates based on the spirit of "Wa" (harmony). We aim to be considerate of each other, achieve harmony, and strengthen Korea-Japan friendship.'
    },
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop',
    pastEvents: ['4'],
    socialMedia: {
      facebook: 'JSAKorea',
      instagram: '@jsa_korea'
    },
    contact: {
      email: 'info@jsa-korea.org'
    },
    meetingSchedule: {
      ko: '매주 수요일 오후 5시',
      en: 'Every Wednesday at 5 PM'
    }
  },
  {
    id: 'sa-9',
    name: {
      ko: '한국 몽골학생회',
      en: 'Mongolian Students Association in Korea'
    },
    description: {
      ko: '한국의 몽골 학생들을 위한 학생회로, 학업 지원과 몽골 전통 문화 보존을 목표로 합니다.',
      en: 'Student association for Mongolian students in Korea, focusing on academic support and preserving Mongolian traditional culture.'
    },
    category: '학생회',
    country: 'Mongolia',
    embassy: 'Embassy of Mongolia in Korea',
    officers: [
      {
        name: { ko: '바트바야르', en: 'Batbayar' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@msa-korea.mn'
      },
      {
        name: { ko: '오윤', en: 'Oyun' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@msa-korea.mn'
      }
    ],
    memberCount: 85,
    established: 2014,
    recruiting: true,
    requirements: {
      ko: '한국에 거주하는 몽골 국적 학생 또는 몽골 문화에 관심이 있는 학생',
      en: 'Mongolian students in Korea or those interested in Mongolian culture'
    },
    activities: [
      { ko: '나담 축제', en: 'Naadam festival celebration' },
      { ko: '몽골 전통 음악 공연', en: 'Traditional Mongolian music performances' },
      { ko: '몽골어 교실', en: 'Mongolian language classes' },
      { ko: '유목 문화 체험', en: 'Nomadic culture experience' },
      { ko: '몽골 요리 워크샵', en: 'Mongolian cooking workshops' }
    ],
    culturalGuide: {
      ko: '몽골학생회는 유목민의 전통인 "아시드(상호부조)"와 "니슬렐(단결)" 정신을 바탕으로 운영됩니다. 넓은 초원처럼 열린 마음으로 모든 구성원을 환영합니다.',
      en: 'The Mongolian Students Association operates based on nomadic traditions of "Ashid" (mutual assistance) and "Nislel" (unity). Like the vast steppes, we welcome all members with open hearts.'
    },
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    pastEvents: ['3'],
    socialMedia: {
      facebook: 'MongolianStudentsKorea',
      instagram: '@mongolian_students_korea'
    },
    contact: {
      email: 'info@msa-korea.mn'
    }
  },
  {
    id: 'sa-10',
    name: {
      ko: '한국 미국학생회',
      en: 'American Students Association in Korea'
    },
    description: {
      ko: '한국에서 공부하는 미국 학생들의 학업과 생활을 지원하고, 미국 문화를 한국에 소개하는 학생회입니다.',
      en: 'Supporting American students studying in Korea and introducing American culture to Korea. We provide comprehensive support for our community.'
    },
    category: '학생회',
    country: 'United States',
    embassy: 'Embassy of United States in Korea',
    officers: [
      {
        name: { ko: '제이크 존슨', en: 'Jake Johnson' },
        role: { ko: '회장', en: 'President' },
        contact: 'president@asa-korea.org'
      },
      {
        name: { ko: '에밀리 데이비스', en: 'Emily Davis' },
        role: { ko: '부회장', en: 'Vice President' },
        contact: 'vp@asa-korea.org'
      }
    ],
    memberCount: 220,
    established: 2006,
    recruiting: true,
    requirements: {
      ko: '한국에 거주하는 미국 국적 학생 또는 미국 문화에 관심이 있는 학생',
      en: 'American students in Korea or those interested in American culture'
    },
    activities: [
      { ko: '추수감사절 행사', en: 'Thanksgiving celebration' },
      { ko: '영어 회화 클럽', en: 'English conversation club' },
      { ko: '미국 독립기념일 파티', en: '4th of July celebration' },
      { ko: '문화 교류 프로그램', en: 'Cultural exchange programs' },
      { ko: '취업 네트워킹', en: 'Career networking events' }
    ],
    culturalGuide: {
      ko: '미국학생회는 개인의 자유와 다양성을 존중하는 미국 문화를 바탕으로 운영됩니다. 모든 구성원의 의견을 소중히 여기며 민주적으로 의사결정을 합니다.',
      en: 'The American Students Association operates based on American values of individual freedom and diversity. We value all members\' opinions and make decisions democratically.'
    },
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    pastEvents: ['1', '2'],
    socialMedia: {
      facebook: 'ASAKorea',
      instagram: '@asa_korea',
      website: 'https://asa-korea.org'
    },
    contact: {
      email: 'info@asa-korea.org'
    },
    meetingSchedule: {
      ko: '매월 마지막 금요일 오후 6시',
      en: 'Last Friday of every month at 6 PM'
    }
  }
];

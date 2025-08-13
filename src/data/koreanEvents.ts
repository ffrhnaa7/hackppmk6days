export interface KoreanEvent {
  id: string;
  title: {
    ko: string;
    en: string;
  };
  club: {
    ko: string;
    en: string;
  };
  date: string;
  time: string;
  location: {
    ko: string;
    en: string;
    campus: '서울' | '경기' | '지방';
    mapLinks: {
      naver: string;
      kakao: string;
    };
  };
  attendees: number;
  image: string;
  description: {
    ko: string;
    en: string;
  };
  tags: Array<{
    ko: string;
    en: string;
    category: '학술' | '문화' | '취미' | '봉사' | 'MT' | '회식';
  }>;
  fee: {
    amount: number;
    currency: 'KRW';
    description: {
      ko: string;
      en: string;
    };
  } | null;
  culturalNotes: {
    ko: string;
    en: string;
  } | null;
  crossCultural: boolean;
  openToAll: boolean;
  language: 'korean' | 'english' | 'bilingual';
  dressCode?: {
    ko: string;
    en: string;
  };
  transportation: {
    subway: string[];
    bus: string[];
  };
}

export const koreanEvents: KoreanEvent[] = [
  {
    id: '1',
    title: {
      ko: 'AI 머신러닝 워크샵',
      en: 'AI & Machine Learning Workshop'
    },
    club: {
      ko: '컴퓨터공학과 학회',
      en: 'Computer Science Society'
    },
    date: 'March 15, 2024',
    time: '2:00 PM',
    location: {
      ko: '공학관 201호',
      en: 'Engineering Building, Room 201',
      campus: '서울',
      mapLinks: {
        naver: 'https://map.naver.com/v5/search/서울대학교%20공학관',
        kakao: 'https://map.kakao.com/link/search/서울대학교%20공학관'
      }
    },
    attendees: 45,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    description: {
      ko: '최신 AI와 머신러닝 기술을 배우는 실습 워크샵입니다. 초보자부터 전문가까지 모두 환영합니다!',
      en: 'Join us for an interactive workshop on the latest AI and ML technologies. Perfect for beginners and experts alike!'
    },
    tags: [
      { ko: '기술', en: 'Technology', category: '학술' },
      { ko: '워크샵', en: 'Workshop', category: '학술' },
      { ko: '인공지능', en: 'AI', category: '학술' }
    ],
    fee: null,
    culturalNotes: null,
    crossCultural: true,
    openToAll: true,
    language: 'bilingual',
    transportation: {
      subway: ['2호선 서울대입구역', '4호선 서울대학교역'],
      bus: ['5511', '5513', '151']
    }
  },
  {
    id: '2',
    title: {
      ko: '봄 음악 페스티벌',
      en: 'Spring Music Festival'
    },
    club: {
      ko: '음악동아리 연합회',
      en: 'Music Club Federation'
    },
    date: 'March 20, 2024',
    time: '6:00 PM',
    location: {
      ko: '캠퍼스 야외무대',
      en: 'Campus Amphitheater',
      campus: '서울',
      mapLinks: {
        naver: 'https://map.naver.com/v5/search/서울대학교%20야외무대',
        kakao: 'https://map.kakao.com/link/search/서울대학교%20야외무대'
      }
    },
    attendees: 120,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    description: {
      ko: '지역 밴드와 학생 공연자들의 라이브 음악을 즐기는 저녁입니다. 푸드트럭도 운영됩니다!',
      en: 'Experience an evening of live music featuring local bands and student performers. Food trucks will be available!'
    },
    tags: [
      { ko: '음악', en: 'Music', category: '문화' },
      { ko: '페스티벌', en: 'Festival', category: '문화' },
      { ko: '엔터테인먼트', en: 'Entertainment', category: '문화' }
    ],
    fee: {
      amount: 5000,
      currency: 'KRW',
      description: {
        ko: '입장료 (음료 1잔 포함)',
        en: 'Entrance fee (includes 1 drink)'
      }
    },
    culturalNotes: null,
    crossCultural: true,
    openToAll: true,
    language: 'bilingual',
    transportation: {
      subway: ['2호선 서울대입구역'],
      bus: ['5511', '5513']
    }
  },
  {
    id: '3',
    title: {
      ko: '경영학과 MT (멤버십 트레이닝)',
      en: 'Business School MT (Membership Training)'
    },
    club: {
      ko: '경영학과 학생회',
      en: 'Business School Student Council'
    },
    date: 'March 22, 2024',
    time: '9:00 AM',
    location: {
      ko: '가평 펜션',
      en: 'Gapyeong Pension',
      campus: '경기',
      mapLinks: {
        naver: 'https://map.naver.com/v5/search/가평%20펜션',
        kakao: 'https://map.kakao.com/link/search/가평%20펜션'
      }
    },
    attendees: 80,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    description: {
      ko: '1박 2일 MT로 팀워크를 기르고 새로운 친구들을 만나보세요. 다양한 게임과 활동이 준비되어 있습니다.',
      en: '2-day, 1-night retreat to build teamwork and make new friends. Various games and activities are prepared.'
    },
    tags: [
      { ko: 'MT', en: 'MT', category: 'MT' },
      { ko: '팀워크', en: 'Teamwork', category: '문화' },
      { ko: '친목', en: 'Bonding', category: '문화' }
    ],
    fee: {
      amount: 80000,
      currency: 'KRW',
      description: {
        ko: '숙박비, 식비, 활동비 포함',
        en: 'Includes accommodation, meals, and activities'
      }
    },
    culturalNotes: {
      ko: 'MT는 한국 대학 문화의 중요한 부분으로, 선후배 간의 유대감을 형성하는 시간입니다.',
      en: 'MT (Membership Training) is an important part of Korean university culture, designed to build bonds between seniors and juniors.'
    },
    crossCultural: true,
    openToAll: false,
    language: 'bilingual',
    dressCode: {
      ko: '편한 복장, 운동화 착용',
      en: 'Comfortable clothes, sneakers recommended'
    },
    transportation: {
      subway: ['경춘선 가평역'],
      bus: ['1330-1', '1330-2']
    }
  },
  {
    id: '4',
    title: {
      ko: '국제학생 한국문화 체험',
      en: 'Korean Culture Experience for International Students'
    },
    club: {
      ko: '국제교류 동아리',
      en: 'International Exchange Club'
    },
    date: 'March 18, 2024',
    time: '10:00 AM',
    location: {
      ko: '학생회관 문화실',
      en: 'Student Union Cultural Room',
      campus: '서울',
      mapLinks: {
        naver: 'https://map.naver.com/v5/search/서울대학교%20학생회관',
        kakao: 'https://map.kakao.com/link/search/서울대학교%20학생회관'
      }
    },
    attendees: 25,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    description: {
      ko: '한복 체험, 전통 차 마시기, 한국 예절 배우기 등 다양한 한국 문화를 체험해보세요.',
      en: 'Experience various aspects of Korean culture including hanbok wearing, traditional tea ceremony, and Korean etiquette.'
    },
    tags: [
      { ko: '문화체험', en: 'Cultural Experience', category: '문화' },
      { ko: '국제교류', en: 'International Exchange', category: '문화' },
      { ko: '한국문화', en: 'Korean Culture', category: '문화' }
    ],
    fee: {
      amount: 15000,
      currency: 'KRW',
      description: {
        ko: '재료비 및 다과비',
        en: 'Materials and refreshments'
      }
    },
    culturalNotes: {
      ko: '한국 전통 예절과 현대 대학 문화를 함께 배울 수 있는 좋은 기회입니다.',
      en: 'A great opportunity to learn both traditional Korean etiquette and modern university culture.'
    },
    crossCultural: true,
    openToAll: true,
    language: 'bilingual',
    transportation: {
      subway: ['2호선 서울대입구역'],
      bus: ['5511', '5513', '151']
    }
  },
  {
    id: '5',
    title: {
      ko: '토론대회 결승전',
      en: 'Debate Tournament Finals'
    },
    club: {
      ko: '토론학회',
      en: 'Debate Society'
    },
    date: 'March 25, 2024',
    time: '7:00 PM',
    location: {
      ko: '대강당',
      en: 'Main Auditorium',
      campus: '서울',
      mapLinks: {
        naver: 'https://map.naver.com/v5/search/서울대학교%20대강당',
        kakao: 'https://map.kakao.com/link/search/서울대학교%20대강당'
      }
    },
    attendees: 150,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    description: {
      ko: '연례 토론대회의 결승전을 관람하세요. 정치부터 철학까지 다양한 주제를 다룹니다.',
      en: 'Witness the final round of our annual debate tournament. Topics range from politics to philosophy.'
    },
    tags: [
      { ko: '토론', en: 'Debate', category: '학술' },
      { ko: '학술', en: 'Academic', category: '학술' },
      { ko: '경쟁', en: 'Competition', category: '학술' }
    ],
    fee: null,
    culturalNotes: null,
    crossCultural: false,
    openToAll: true,
    language: 'korean',
    transportation: {
      subway: ['2호선 서울대입구역'],
      bus: ['5511', '5513']
    }
  },
  {
    id: '6',
    title: {
      ko: '요리 마스터클래스 & 회식',
      en: 'Cooking Masterclass & Hoesik'
    },
    club: {
      ko: '요리동아리',
      en: 'Culinary Club'
    },
    date: 'March 28, 2024',
    time: '5:00 PM',
    location: {
      ko: '학생회관 요리실',
      en: 'Student Center Kitchen',
      campus: '서울',
      mapLinks: {
        naver: 'https://map.naver.com/v5/search/서울대학교%20학생회관',
        kakao: 'https://map.kakao.com/link/search/서울대학교%20학생회관'
      }
    },
    attendees: 30,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    description: {
      ko: '게스트 셰프와 함께 정통 이탈리아 파스타를 만들어보세요. 요리 후에는 함께 회식을 즐깁니다!',
      en: 'Learn to cook authentic Italian pasta with our guest chef, followed by a traditional Korean-style dinner gathering!'
    },
    tags: [
      { ko: '요리', en: 'Cooking', category: '취미' },
      { ko: '음식', en: 'Food', category: '취미' },
      { ko: '회식', en: 'Hoesik', category: '회식' }
    ],
    fee: {
      amount: 25000,
      currency: 'KRW',
      description: {
        ko: '재료비 및 회식비',
        en: 'Ingredients and dinner costs'
      }
    },
    culturalNotes: {
      ko: '회식은 한국의 중요한 사교 문화로, 함께 식사하며 친목을 도모하는 시간입니다.',
      en: 'Hoesik is an important Korean social culture - a time to bond over shared meals and drinks.'
    },
    crossCultural: true,
    openToAll: true,
    language: 'bilingual',
    transportation: {
      subway: ['2호선 서울대입구역'],
      bus: ['5511', '5513']
    }
  }
];

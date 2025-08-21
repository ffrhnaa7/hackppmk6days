import { Badge, Achievement } from '../types/profile';

export const gamificationFeatures = [
  {
    id: 1,
    title: {
      ko: '문화교류 마스터 배지',
      en: 'Cultural Exchange Master Badge'
    },
    description: {
      ko: '국제교류 이벤트 10회 참석 시 획득. CU 편의점 3,000원 기프티콘 증정!',
      en: 'Earned after attending 10 international exchange events. Includes 3,000 KRW CU convenience store gifticon!'
    },
    category: 'cultural',
    reward: 'CU 3,000원 기프티콘'
  },
  {
    id: 2,
    title: {
      ko: '언어교환 연속 출석',
      en: 'Language Exchange Streak'
    },
    description: {
      ko: '언어교환 활동 7일 연속 참여 시 네이버페이 포인트 1,000P 적립',
      en: '7-day consecutive language exchange participation earns 1,000 Naver Pay points'
    },
    category: 'language',
    reward: '네이버페이 1,000P'
  },
  {
    id: 3,
    title: {
      ko: '봉사활동 리더보드',
      en: 'Volunteer Hours Leaderboard'
    },
    description: {
      ko: '월간 봉사시간 상위 10명에게 스타벅스 아메리카노 기프티콘 증정',
      en: 'Top 10 monthly volunteers receive Starbucks Americano gifticons'
    },
    category: 'volunteer',
    reward: '스타벅스 기프티콘'
  },
  {
    id: 4,
    title: {
      ko: 'K-Culture 전문가',
      en: 'K-Culture Expert'
    },
    description: {
      ko: '한국 전통문화 이벤트 5회 참석 시 한국문화재단 굿즈 증정',
      en: 'Attend 5 traditional Korean culture events to receive Korea Cultural Heritage Foundation merchandise'
    },
    category: 'cultural',
    reward: '문화재단 굿즈'
  },
  {
    id: 5,
    title: {
      ko: '글로벌 네트워커',
      en: 'Global Networker'
    },
    description: {
      ko: '5개국 이상 친구 만들기 달성 시 올리브영 10,000원 기프티콘',
      en: 'Make friends from 5+ countries to earn 10,000 KRW Olive Young gifticon'
    },
    category: 'social',
    reward: '올리브영 10,000원'
  },
  {
    id: 6,
    title: {
      ko: '학술대회 참가왕',
      en: 'Academic Conference Champion'
    },
    description: {
      ko: '학술 이벤트 월 3회 이상 참석 시 교보문고 도서 쿠폰 15,000원',
      en: 'Attend 3+ academic events monthly for 15,000 KRW Kyobo Bookstore coupon'
    },
    category: 'academic',
    reward: '교보문고 15,000원'
  },
  {
    id: 7,
    title: {
      ko: 'MT 마스터',
      en: 'MT Master'
    },
    description: {
      ko: 'MT 이벤트 3회 참가 시 "MT 베테랑" 특별 배지와 치킨 기프티콘',
      en: 'Join 3 MT events to earn "MT Veteran" special badge and chicken gifticon'
    },
    category: 'social',
    reward: '치킨 기프티콘'
  },
  {
    id: 8,
    title: {
      ko: '회식 문화 체험가',
      en: 'Hoesik Culture Explorer'
    },
    description: {
      ko: '회식 이벤트 5회 참가로 한국 직장문화 이해도 배지 획득',
      en: 'Attend 5 hoesik events to earn Korean workplace culture understanding badge'
    },
    category: 'cultural',
    reward: '특별 배지'
  },
  {
    id: 9,
    title: {
      ko: '외국인 한국어 말하기 대회 도전자',
      en: 'Korean Speech Contest Challenger'
    },
    description: {
      ko: '외국인 대상 한국어 대회 참가 시 CGV 영화 관람권 2매',
      en: 'Participate in Korean speech contest for foreigners to receive 2 CGV movie tickets'
    },
    category: 'language',
    reward: 'CGV 영화표 2매'
  },
  {
    id: 10,
    title: {
      ko: '국제음식축제 탐험가',
      en: 'International Food Festival Explorer'
    },
    description: {
      ko: '국제음식 이벤트 참가로 배달의민족 쿠폰 8,000원 획득',
      en: 'Join international food events to earn 8,000 KRW Baedal Minjok coupon'
    },
    category: 'cultural',
    reward: '배민 8,000원'
  },
  {
    id: 11,
    title: {
      ko: '선후배 관계 마스터',
      en: 'Seonhubae Relationship Master'
    },
    description: {
      ko: '선후배 멘토링 프로그램 완주 시 카카오톡 이모티콘 패키지',
      en: 'Complete senior-junior mentoring program for KakaoTalk emoticon package'
    },
    category: 'social',
    reward: '카톡 이모티콘'
  },
  {
    id: 12,
    title: {
      ko: '캠퍼스 인플루언서',
      en: 'Campus Influencer'
    },
    description: {
      ko: '이벤트 후기 10개 작성 시 인스타그램 스토리 광고 크레딧',
      en: 'Write 10 event reviews to earn Instagram story ad credits'
    },
    category: 'social',
    reward: 'SNS 광고 크레딧'
  },
  {
    id: 13,
    title: {
      ko: '한국 대학생활 가이드',
      en: 'Korean University Life Guide'
    },
    description: {
      ko: '신입생 도우미 활동 5회로 멘토 배지와 GS25 상품권 5,000원',
      en: '5 freshman helper activities earn mentor badge and 5,000 KRW GS25 voucher'
    },
    category: 'volunteer',
    reward: 'GS25 5,000원'
  },
  {
    id: 14,
    title: {
      ko: '계절별 이벤트 컬렉터',
      en: 'Seasonal Event Collector'
    },
    description: {
      ko: '봄/여름/가을/겨울 각 계절 이벤트 참가로 연간 패스 배지',
      en: 'Attend events in all four seasons to earn annual pass badge'
    },
    category: 'special',
    reward: '연간 특별 혜택'
  },
  {
    id: 15,
    title: {
      ko: '대학교 간 교류 대사',
      en: 'Inter-University Exchange Ambassador'
    },
    description: {
      ko: '타 대학 교류 이벤트 3회 참가로 KTX 할인 쿠폰과 특별 배지',
      en: 'Join 3 inter-university events for KTX discount coupon and special badge'
    },
    category: 'special',
    reward: 'KTX 할인쿠폰'
  }
];

export const sampleBadges: Badge[] = [
  {
    id: 'cultural-bridge',
    name: {
      ko: '문화의 다리',
      en: 'Cultural Bridge'
    },
    description: {
      ko: '한국과 외국 문화를 연결하는 이벤트에 적극 참여',
      en: 'Actively participated in events connecting Korean and foreign cultures'
    },
    icon: '🌉',
    rarity: 'epic',
    earnedAt: new Date(),
    category: 'cultural'
  },
  {
    id: 'language-master',
    name: {
      ko: '언어 마스터',
      en: 'Language Master'
    },
    description: {
      ko: '언어교환 활동 30일 연속 참여',
      en: '30-day consecutive language exchange participation'
    },
    icon: '🗣️',
    rarity: 'rare',
    earnedAt: new Date(),
    category: 'language'
  },
  {
    id: 'volunteer-hero',
    name: {
      ko: '봉사 영웅',
      en: 'Volunteer Hero'
    },
    description: {
      ko: '100시간 이상 봉사활동 완료',
      en: 'Completed 100+ hours of volunteer work'
    },
    icon: '🦸',
    rarity: 'legendary',
    earnedAt: new Date(),
    category: 'volunteer'
  }
];

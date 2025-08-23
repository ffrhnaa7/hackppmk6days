import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Gift, Star, ShoppingBag, Coffee, Film, Smartphone } from 'lucide-react';

interface Reward {
  id: string;
  name: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  cost: number;
  category: 'food' | 'shopping' | 'entertainment' | 'convenience' | 'digital';
  icon: React.ReactNode;
  brand: string;
  available: boolean;
}

const RewardSystem: React.FC = () => {
  const { t } = useLanguage();
  const [userPoints] = useState(2450);

  const rewards: Reward[] = [
    {
      id: 'starbucks-americano',
      name: {
        ko: '스타벅스 아메리카노',
        en: 'Starbucks Americano'
      },
      description: {
        ko: '스타벅스 아메리카노 기프티콘',
        en: 'Starbucks Americano gifticon'
      },
      cost: 500,
      category: 'food',
      icon: <Coffee className="h-6 w-6" />,
      brand: 'Starbucks',
      available: true
    },
    {
      id: 'cu-3000',
      name: {
        ko: 'CU 편의점 3,000원',
        en: 'CU Convenience Store 3,000 KRW'
      },
      description: {
        ko: 'CU 편의점에서 사용 가능한 3,000원 상품권',
        en: '3,000 KRW voucher for CU convenience store'
      },
      cost: 300,
      category: 'convenience',
      icon: <ShoppingBag className="h-6 w-6" />,
      brand: 'CU',
      available: true
    },
    {
      id: 'cgv-movie',
      name: {
        ko: 'CGV 영화 관람권',
        en: 'CGV Movie Ticket'
      },
      description: {
        ko: 'CGV 영화관 일반 관람권 1매',
        en: 'CGV cinema general admission ticket'
      },
      cost: 1200,
      category: 'entertainment',
      icon: <Film className="h-6 w-6" />,
      brand: 'CGV',
      available: true
    },
    {
      id: 'olive-young-10000',
      name: {
        ko: '올리브영 10,000원',
        en: 'Olive Young 10,000 KRW'
      },
      description: {
        ko: '올리브영에서 사용 가능한 10,000원 쿠폰',
        en: '10,000 KRW coupon for Olive Young'
      },
      cost: 1000,
      category: 'shopping',
      icon: <ShoppingBag className="h-6 w-6" />,
      brand: 'Olive Young',
      available: true
    },
    {
      id: 'naver-pay-1000',
      name: {
        ko: '네이버페이 1,000P',
        en: 'Naver Pay 1,000 Points'
      },
      description: {
        ko: '네이버페이 포인트 1,000P 적립',
        en: '1,000 Naver Pay points credit'
      },
      cost: 100,
      category: 'digital',
      icon: <Smartphone className="h-6 w-6" />,
      brand: 'Naver Pay',
      available: true
    },
    {
      id: 'baedal-minjok-8000',
      name: {
        ko: '배달의민족 8,000원',
        en: 'Baedal Minjok 8,000 KRW'
      },
      description: {
        ko: '배달의민족 할인 쿠폰 8,000원',
        en: '8,000 KRW discount coupon for Baedal Minjok'
      },
      cost: 800,
      category: 'food',
      icon: <ShoppingBag className="h-6 w-6" />,
      brand: 'Baedal Minjok',
      available: true
    }
  ];

  const categoryColors = {
    food: 'bg-orange-100 text-orange-800',
    shopping: 'bg-pink-100 text-pink-800',
    entertainment: 'bg-purple-100 text-purple-800',
    convenience: 'bg-green-100 text-green-800',
    digital: 'bg-blue-100 text-blue-800'
  };

  const handleRedeem = (reward: Reward) => {
    if (userPoints >= reward.cost) {
      alert(t(
        `${reward.name.ko}을(를) 교환하시겠습니까?`,
        `Would you like to redeem ${reward.name.en}?`
      ));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('보상 상점', 'Reward Store')}
        </h1>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-500 mr-2" />
          <p className="text-lg text-gray-600">
            {t(`보유 포인트: ${userPoints.toLocaleString()}P`, `Your Points: ${userPoints.toLocaleString()}P`)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg mr-3">
                  {reward.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {t(reward.name.ko, reward.name.en)}
                  </h3>
                  <p className="text-sm text-gray-500">{reward.brand}</p>
                </div>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                categoryColors[reward.category]
              }`}>
                {t(
                  reward.category === 'food' ? '음식' :
                  reward.category === 'shopping' ? '쇼핑' :
                  reward.category === 'entertainment' ? '엔터테인먼트' :
                  reward.category === 'convenience' ? '편의점' : '디지털',
                  reward.category.charAt(0).toUpperCase() + reward.category.slice(1)
                )}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              {t(reward.description.ko, reward.description.en)}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-bold text-lg text-gray-900">
                  {reward.cost.toLocaleString()}P
                </span>
              </div>
              <button
                onClick={() => handleRedeem(reward)}
                disabled={userPoints < reward.cost}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  userPoints >= reward.cost
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {t('교환하기', 'Redeem')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Special Offers Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <div className="flex items-center mb-4">
          <Gift className="h-8 w-8 mr-3" />
          <h2 className="text-2xl font-bold">
            {t('특별 혜택', 'Special Offers')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">
              {t('신규 회원 보너스', 'New Member Bonus')}
            </h3>
            <p className="text-sm opacity-90">
              {t('첫 이벤트 참가 시 500P 추가 지급!', 'Get 500 bonus points for your first event!')}
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">
              {t('친구 추천 보상', 'Referral Reward')}
            </h3>
            <p className="text-sm opacity-90">
              {t('친구 추천 시 양쪽 모두 1,000P 지급!', 'Both you and your friend get 1,000P when they join!')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardSystem;

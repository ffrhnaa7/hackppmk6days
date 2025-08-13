import React from 'react';
import { Calendar, Users, BookOpen, Heart, Settings } from 'lucide-react';
import { ColorfulCard } from './ColorfulCard';
import { ColorfulButton } from './ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';

export const Sidebar: React.FC = () => {
  const { t } = useLanguage();

  const menuItems = [
    { icon: Calendar, label: { ko: '내 일정', en: 'My Schedule' } },
    { icon: Users, label: { ko: '내 동아리', en: 'My Clubs' } },
    { icon: BookOpen, label: { ko: '관심 분야', en: 'Interests' } },
    { icon: Heart, label: { ko: '즐겨찾기', en: 'Favorites' } },
    { icon: Settings, label: { ko: '설정', en: 'Settings' } }
  ];

  return (
    <div className="w-64 space-y-6">
      <ColorfulCard variant="glass">
        <div className="p-6">
          <h3 className="font-bold text-gray-800 mb-4">
            {t('빠른 메뉴', 'Quick Menu')}
          </h3>
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <ColorfulButton
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
              >
                <item.icon className="h-4 w-4 mr-3" />
                {t(item.label.ko, item.label.en)}
              </ColorfulButton>
            ))}
          </div>
        </div>
      </ColorfulCard>
    </div>
  );
};

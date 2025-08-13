import React from 'react';
import { Plus, Calendar, Users, Bell } from 'lucide-react';
import { ColorfulCard } from './ColorfulCard';
import { ColorfulButton } from './ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';

export const QuickActions: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ColorfulCard variant="gradient">
      <div className="p-6">
        <h3 className="font-bold text-gray-800 mb-4">
          {t('빠른 작업', 'Quick Actions')}
        </h3>
        <div className="space-y-3">
          <ColorfulButton size="sm" className="w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            {t('이벤트 만들기', 'Create Event')}
          </ColorfulButton>
          <ColorfulButton variant="outline" size="sm" className="w-full justify-start">
            <Calendar className="h-4 w-4 mr-2" />
            {t('일정 추가', 'Add to Calendar')}
          </ColorfulButton>
          <ColorfulButton variant="outline" size="sm" className="w-full justify-start">
            <Users className="h-4 w-4 mr-2" />
            {t('동아리 가입', 'Join Club')}
          </ColorfulButton>
          <ColorfulButton variant="outline" size="sm" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            {t('알림 설정', 'Notifications')}
          </ColorfulButton>
        </div>
      </div>
    </ColorfulCard>
  );
};

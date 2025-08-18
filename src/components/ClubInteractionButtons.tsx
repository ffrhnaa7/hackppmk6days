import React from 'react';
import { Heart, Bookmark, UserPlus, MessageCircle } from 'lucide-react';
import { ColorfulButton } from './ColorfulButton';
import { ClubShareButton } from './ClubShareButton';
import { useLanguage } from '../contexts/LanguageContext';
import { useClubInteractions } from '../hooks/useClubInteractions';

interface ClubInteractionButtonsProps {
  clubId: string;
  clubName: string;
  recruiting?: boolean;
  showCounts?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'grid';
}

export const ClubInteractionButtons: React.FC<ClubInteractionButtonsProps> = ({
  clubId,
  clubName,
  recruiting = false,
  showCounts = false,
  size = 'md',
  className = '',
  layout = 'horizontal'
}) => {
  const { language, t } = useLanguage();
  const {
    interactions,
    loading,
    toggleSaved,
    toggleHeart,
    applyToClub
  } = useClubInteractions(clubId);

  const buttonSize = size === 'lg' ? 'md' : size;
  const iconSize = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

  const layoutClasses = {
    horizontal: 'flex items-center space-x-2',
    vertical: 'flex flex-col space-y-2',
    grid: 'grid grid-cols-2 gap-2'
  };

  const buttons = [
    {
      key: 'like',
      icon: Heart,
      label: t('좋아요', 'Like'),
      count: interactions.heartsCount,
      active: interactions.isHearted,
      onClick: toggleHeart,
      activeColor: 'text-red-600 bg-red-50 border-red-200',
      hoverColor: 'hover:bg-red-50 hover:text-red-600',
      variant: interactions.isHearted ? 'outline' as const : 'ghost' as const
    },
    {
      key: 'save',
      icon: Bookmark,
      label: t('저장', 'Save'),
      count: interactions.savedCount,
      active: interactions.isSaved,
      onClick: toggleSaved,
      activeColor: 'text-blue-600 bg-blue-50 border-blue-200',
      hoverColor: 'hover:bg-blue-50 hover:text-blue-600',
      variant: interactions.isSaved ? 'outline' as const : 'ghost' as const
    },
    {
      key: 'join',
      icon: recruiting ? UserPlus : MessageCircle,
      label: recruiting ? t('가입하기', 'Join') : t('문의하기', 'Contact'),
      count: interactions.applicationsCount,
      active: interactions.hasApplied,
      onClick: () => applyToClub(),
      activeColor: recruiting ? 'text-green-600 bg-green-50 border-green-200' : 'text-purple-600 bg-purple-50 border-purple-200',
      hoverColor: recruiting ? 'hover:bg-green-50 hover:text-green-600' : 'hover:bg-purple-50 hover:text-purple-600',
      variant: interactions.hasApplied ? 'outline' as const : 'ghost' as const
    },
    {
      key: 'share',
      component: (
        <ClubShareButton
          clubId={clubId}
          clubName={clubName}
          size={buttonSize}
          variant="ghost"
          showLabel={size !== 'sm'}
          className="flex-1 min-w-0"
        />
      )
    }
  ];

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      {buttons.map((button) => {
        if (button.component) {
          return <div key={button.key}>{button.component}</div>;
        }

        return (
          <ColorfulButton
            key={button.key}
            variant={button.variant}
            size={buttonSize}
            onClick={button.onClick}
            disabled={loading}
            className={`
              transition-all duration-200 flex-1 min-w-0
              ${button.active ? button.activeColor : `text-gray-600 ${button.hoverColor}`}
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            title={`${button.label} ${clubName}`}
          >
            <button.icon className={`${iconSize} ${size === 'sm' ? '' : 'mr-1'} ${button.active ? 'fill-current' : ''}`} />
            {size !== 'sm' && (
              <span className="truncate">
                {button.label}
                {showCounts && button.count > 0 && (
                  <span className="ml-1 text-xs opacity-75">
                    ({button.count.toLocaleString()})
                  </span>
                )}
              </span>
            )}
          </ColorfulButton>
        );
      })}
    </div>
  );
};

import React, { useState } from 'react';
import { Heart, Bookmark, Share2, Copy, Mail, MessageSquare, Check, Loader2 } from 'lucide-react';
import { ColorfulButton } from './ColorfulButton';
import { useClubInteractions } from '../hooks/useClubInteractions';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface ClubInteractionButtonsProps {
  clubId: string;
  clubName: string;
  size?: 'sm' | 'md' | 'lg';
  showCounts?: boolean;
  className?: string;
}

export const ClubInteractionButtons: React.FC<ClubInteractionButtonsProps> = ({
  clubId,
  clubName,
  size = 'md',
  showCounts = true,
  className = ''
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { interactions, loading, toggleSaved, toggleHeart, shareClub } = useClubInteractions(clubId);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleSave = async () => {
    if (!user) {
      alert(t('로그인이 필요합니다', 'Please log in to save clubs'));
      return;
    }
    
    setActionLoading('save');
    await toggleSaved();
    setActionLoading(null);
  };

  const handleHeart = async () => {
    if (!user) {
      alert(t('로그인이 필요합니다', 'Please log in to like clubs'));
      return;
    }
    
    setActionLoading('heart');
    await toggleHeart();
    setActionLoading(null);
  };

  const handleShare = async (type: 'link' | 'email' | 'social') => {
    const clubUrl = `${window.location.origin}/club/${clubId}`;
    
    switch (type) {
      case 'link':
        try {
          await navigator.clipboard.writeText(clubUrl);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
          if (user) {
            await shareClub('link');
          }
        } catch (error) {
          console.error('Failed to copy link:', error);
        }
        break;
        
      case 'email':
        const emailSubject = encodeURIComponent(`Check out ${clubName} club!`);
        const emailBody = encodeURIComponent(
          `Hi! I thought you might be interested in this club: ${clubName}\n\nCheck it out here: ${clubUrl}\n\nBest regards!`
        );
        window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`);
        if (user) {
          await shareClub('email');
        }
        break;
        
      case 'social':
        const shareText = encodeURIComponent(`Check out ${clubName} club! ${clubUrl}`);
        if (navigator.share) {
          try {
            await navigator.share({
              title: `${clubName} Club`,
              text: `Check out ${clubName} club!`,
              url: clubUrl
            });
            if (user) {
              await shareClub('social');
            }
          } catch (error) {
            window.open(`https://twitter.com/intent/tweet?text=${shareText}`);
            if (user) {
              await shareClub('social');
            }
          }
        } else {
          window.open(`https://twitter.com/intent/tweet?text=${shareText}`);
          if (user) {
            await shareClub('social');
          }
        }
        break;
    }
    
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-16"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-16"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-16"></div>
      </div>
    );
  }

  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Save Button */}
      <ColorfulButton
        variant={interactions.isSaved ? 'primary' : 'outline'}
        size={buttonSize}
        onClick={handleSave}
        disabled={actionLoading === 'save'}
        className={`transition-all duration-300 ${
          interactions.isSaved
            ? 'bg-blue-500 text-white shadow-lg'
            : 'hover:bg-blue-50 hover:border-blue-300'
        }`}
        title={interactions.isSaved ? t('저장됨', 'Saved') : t('저장하기', 'Save')}
      >
        {actionLoading === 'save' ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Bookmark
            className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'} ${
              interactions.isSaved ? 'fill-current' : ''
            }`}
          />
        )}
        {size !== 'sm' &&
          (interactions.isSaved ? t('저장됨', 'Saved') : t('저장하기', 'Save'))}
      </ColorfulButton>

      {/* Heart Button */}
<ColorfulButton
  variant={interactions.isHearted ? 'primary' : 'outline'} // ✅ no "danger"
  size={buttonSize}
  onClick={handleHeart}
  disabled={actionLoading === 'heart'}
  className={`transition-all duration-300 ${
    interactions.isHearted
      ? 'bg-red-500 text-white shadow-lg'   // ✅ custom red style
      : 'hover:bg-red-50 hover:border-red-300'
  }`}
  title={interactions.isHearted ? t('좋아요됨', 'Liked') : t('좋아요', 'Like')}
>
  {actionLoading === 'heart' ? (
    <Loader2 className="h-4 w-4 animate-spin mr-2" />
  ) : (
    <Heart
      className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'} ${
        interactions.isHearted ? 'fill-current' : ''
      }`}
    />
  )}
  {size !== 'sm' &&
    (interactions.isHearted ? t('좋아요됨', 'Liked') : t('좋아요', 'Like'))}
</ColorfulButton>


      {/* Share Button */}
      <div className="relative">
        <ColorfulButton
          variant="outline"
          size={buttonSize}
          onClick={() => setShowShareMenu(!showShareMenu)}
          title={t('공유하기', 'Share')}
        >
          <Share2 className={`h-4 w-4 ${size === 'sm' ? '' : 'mr-2'}`} />
          {size !== 'sm' && t('공유하기', 'Share')}
        </ColorfulButton>

        {showShareMenu && (
          <div className="absolute top-full mt-2 flex flex-col bg-white shadow-lg rounded-lg p-2 space-y-1">
            <button
              onClick={() => handleShare('link')}
              className="flex items-center px-2 py-1 hover:bg-gray-100 rounded"
            >
              {copySuccess ? (
                <Check className="h-4 w-4 mr-2 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copySuccess ? t('복사됨', 'Copied!') : t('링크 복사', 'Copy link')}
            </button>
            <button
              onClick={() => handleShare('email')}
              className="flex items-center px-2 py-1 hover:bg-gray-100 rounded"
            >
              <Mail className="h-4 w-4 mr-2" />
              {t('이메일', 'Email')}
            </button>
            <button
              onClick={() => handleShare('social')}
              className="flex items-center px-2 py-1 hover:bg-gray-100 rounded"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              {t('소셜 공유', 'Share socially')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

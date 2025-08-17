import React, { useState } from 'react';
import { Heart, Bookmark, Share2, Copy, Mail, MessageSquare, Check } from 'lucide-react';
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
  const { language, t } = useLanguage();
  const { interactions, loading, toggleSaved, toggleHeart, shareClub } = useClubInteractions(clubId);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = async (type: 'link' | 'email' | 'social') => {
    const clubUrl = `${window.location.origin}/club/${clubId}`;
    
    switch (type) {
      case 'link':
        try {
          await navigator.clipboard.writeText(clubUrl);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
          await shareClub('link');
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
        await shareClub('email');
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
            await shareClub('social');
          } catch (error) {
            // Fallback to Twitter
            window.open(`https://twitter.com/intent/tweet?text=${shareText}`);
            await shareClub('social');
          }
        } else {
          // Fallback to Twitter
          window.open(`https://twitter.com/intent/tweet?text=${shareText}`);
          await shareClub('social');
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
        onClick={toggleSaved}
        disabled={!user}
        className={`transition-all duration-300 ${
          interactions.isSaved 
            ? 'bg-blue-500 text-white shadow-lg' 
            : 'hover:bg-blue-50 hover:border-blue-300'
        }`}
        title={user ? (interactions.isSaved ? t('저장됨', 'Saved') : t('저장하기', 'Save')) : t('로그인 필요', 'Login required')}
      >
        <Bookmark className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'} ${
          interactions.isSaved ? 'fill-current' : ''
        }`} />
        {size !== 'sm' && (
          <span>
            {interactions.isSaved ? t('저장됨', 'Saved') : t('저장', 'Save')}
            {showCounts && interactions.savedCount > 0 && ` (${interactions.savedCount})`}
          </span>
        )}
      </ColorfulButton>

      {/* Heart Button */}
      <ColorfulButton
        variant={interactions.isHearted ? 'secondary' : 'outline'}
        size={buttonSize}
        onClick={toggleHeart}
        disabled={!user}
        className={`transition-all duration-300 ${
          interactions.isHearted 
            ? 'bg-red-500 text-white shadow-lg animate-pulse' 
            : 'hover:bg-red-50 hover:border-red-300'
        }`}
        title={user ? (interactions.isHearted ? t('관심있음', 'Interested') : t('관심표시', 'Show Interest')) : t('로그인 필요', 'Login required')}
      >
        <Heart className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'} ${
          interactions.isHearted ? 'fill-current' : ''
        }`} />
        {size !== 'sm' && (
          <span>
            {interactions.isHearted ? t('관심있음', 'Interested') : t('관심', 'Interest')}
            {showCounts && interactions.heartsCount > 0 && ` (${interactions.heartsCount})`}
          </span>
        )}
      </ColorfulButton>

      {/* Share Button */}
      <div className="relative">
        <ColorfulButton
          variant="outline"
          size={buttonSize}
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="hover:bg-green-50 hover:border-green-300 transition-all duration-300"
          title={t('공유하기', 'Share')}
        >
          <Share2 className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'}`} />
          {size !== 'sm' && (
            <span>
              {t('공유', 'Share')}
              {showCounts && interactions.sharesCount > 0 && ` (${interactions.sharesCount})`}
            </span>
          )}
        </ColorfulButton>

        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 min-w-48">
            <button
              onClick={() => handleShare('link')}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
            >
              {copySuccess ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
              <span className={copySuccess ? 'text-green-600' : 'text-gray-700'}>
                {copySuccess ? t('링크 복사됨!', 'Link copied!') : t('링크 복사', 'Copy link')}
              </span>
            </button>
            
            <button
              onClick={() => handleShare('email')}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
            >
              <Mail className="h-4 w-4 text-gray-600" />
              <span className="text-gray-700">{t('이메일로 공유', 'Share via email')}</span>
            </button>
            
            <button
              onClick={() => handleShare('social')}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
            >
              <MessageSquare className="h-4 w-4 text-gray-600" />
              <span className="text-gray-700">{t('소셜 미디어', 'Social media')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

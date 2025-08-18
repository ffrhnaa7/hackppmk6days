import React, { useState } from 'react';
import { Heart, Bookmark, Share2, Copy, Mail, MessageSquare, Check, Loader2, UserPlus, UserMinus } from 'lucide-react';
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
  recruiting?: boolean;
}

export const ClubInteractionButtons: React.FC<ClubInteractionButtonsProps> = ({
  clubId,
  clubName,
  size = 'md',
  showCounts = true,
  className = '',
  recruiting = true
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { 
    interactions, 
    loading, 
    applyToClub, 
    withdrawApplication, 
    toggleSaved, 
    toggleHeart, 
    shareClub 
  } = useClubInteractions(clubId);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleApply = async () => {
    if (!user) {
      alert(t('로그인이 필요합니다', 'Please log in to apply to clubs'));
      return;
    }
    
    if (!recruiting) {
      alert(t('현재 모집하지 않는 동아리입니다', 'This club is not currently recruiting'));
      return;
    }

    setShowApplicationModal(true);
  };

  const submitApplication = async () => {
    setActionLoading('apply');
    await applyToClub(applicationMessage.trim() || undefined);
    setActionLoading(null);
    setShowApplicationModal(false);
    setApplicationMessage('');
  };

  const handleWithdraw = async () => {
    if (!user) return;
    
    const confirmed = window.confirm(
      t('정말로 지원을 철회하시겠습니까?', 'Are you sure you want to withdraw your application?')
    );
    
    if (confirmed) {
      setActionLoading('withdraw');
      await withdrawApplication();
      setActionLoading(null);
    }
  };

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

  const getApplicationButtonContent = () => {
    if (actionLoading === 'apply' || actionLoading === 'withdraw') {
      return <Loader2 className="h-4 w-4 animate-spin mr-2" />;
    }

    if (interactions.hasApplied) {
      switch (interactions.applicationStatus) {
        case 'pending':
          return (
            <>
              <UserMinus className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'}`} />
              {size !== 'sm' && t('지원 철회', 'Withdraw')}
            </>
          );
        case 'approved':
          return (
            <>
              <Check className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'}`} />
              {size !== 'sm' && t('승인됨', 'Approved')}
            </>
          );
        case 'rejected':
          return (
            <>
              <UserPlus className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'}`} />
              {size !== 'sm' && t('재지원', 'Reapply')}
            </>
          );
        case 'withdrawn':
          return (
            <>
              <UserPlus className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'}`} />
              {size !== 'sm' && t('재지원', 'Reapply')}
            </>
          );
        default:
          return (
            <>
              <UserPlus className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'}`} />
              {size !== 'sm' && t('지원하기', 'Apply')}
            </>
          );
      }
    }

    return (
      <>
        <UserPlus className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'}`} />
        {size !== 'sm' && t('지원하기', 'Apply')}
      </>
    );
  };

  const getApplicationButtonVariant = () => {
    if (interactions.applicationStatus === 'approved') return 'success';
    if (interactions.applicationStatus === 'rejected') return 'outline';
    if (interactions.applicationStatus === 'pending') return 'ghost';
    return 'primary';
  };

  if (loading) {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-16"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-16"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-16"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-16"></div>
      </div>
    );
  }

  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';

  return (
    <>
      <div className={`flex items-center space-x-2 ${className}`}>
        {/* Apply Button */}
        <ColorfulButton
          variant={getApplicationButtonVariant()}
          size={buttonSize}
          onClick={
            interactions.hasApplied && interactions.applicationStatus === 'pending'
              ? handleWithdraw
              : handleApply
          }
          disabled={
            !recruiting || 
            actionLoading === 'apply' || 
            actionLoading === 'withdraw' ||
            interactions.applicationStatus === 'approved'
          }
          className={`transition-all duration-300 ${
            interactions.applicationStatus === 'approved' 
              ? 'bg-green-500 text-white cursor-not-allowed' 
              : interactions.applicationStatus === 'pending'
              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
              : recruiting
              ? 'hover:shadow-lg'
              : 'opacity-50 cursor-not-allowed'
          }`}
          title={
            interactions.applicationStatus === 'approved' 
              ? t('승인된 지원', 'Application approved')
              : interactions.applicationStatus === 'pending'
              ? t('지원 철회', 'Withdraw application')
              : recruiting
              ? t('동아리 지원', 'Apply to club')
              : t('모집 마감', 'Recruitment closed')
          }
        >
          {getApplicationButtonContent()}
        </ColorfulButton>

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
            <Bookmark className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'} ${
              interactions.isSaved ? 'fill-current' : ''
            }`} />
          )}
          {size !== 'sm' && (
            <span>
              {interactions.isSaved ? t('저장됨', 'Saved') : t('저장', 'Save')}
              {showCounts && interactions.savedCount > 0 && ` (${interactions.savedCount})`}
            </span>
          )}
        </ColorfulButton>

        {/* Heart Button */}
        <ColorfulButton
          variant={interactions.isHearted ? 'accent' : 'outline'}
          size={buttonSize}
          onClick={handleHeart}
          disabled={actionLoading === 'heart'}
          className={`transition-all duration-300 ${
            interactions.isHearted 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'hover:bg-red-50 hover:border-red-300'
          }`}
          title={interactions.isHearted ? t('좋아요 취소', 'Unlike') : t('좋아요', 'Like')}
        >
          {actionLoading === 'heart' ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Heart className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'} ${
              interactions.isHearted ? 'fill-current' : ''
            }`} />
          )}
          {size !== 'sm' && (
            <span>
              {interactions.isHearted ? t('좋아요됨', 'Liked') : t('좋아요', 'Like')}
              {showCounts && interactions.heartsCount > 0 && ` (${interactions.heartsCount})`}
            </span>
          )}
        </ColorfulButton>

        {/* Share Button */}
        <div className="relative">
          <ColorfulButton
            variant="ghost"
            size={buttonSize}
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="hover:bg-mint-50 hover:text-mint-600"
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
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-48">
              <button
                onClick={() => handleShare('link')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
              >
                {copySuccess ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
                <span className="text-sm">
                  {copySuccess ? t('링크 복사됨!', 'Link copied!') : t('링크 복사', 'Copy link')}
                </span>
              </button>
              
              <button
                onClick={() => handleShare('email')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
              >
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{t('이메일로 공유', 'Share via email')}</span>
              </button>
              
              <button
                onClick={() => handleShare('social')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
              >
                <MessageSquare className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{t('소셜 미디어', 'Social media')}</span>
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

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t('동아리 지원', 'Apply to Club')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('지원 메시지를 작성해주세요 (선택사항)', 'Write an application message (optional)')}
            </p>
            <textarea
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
              placeholder={t('지원 동기나 자기소개를 간단히 작성해주세요...', 'Briefly describe your motivation or introduce yourself...')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mb-4">
              {applicationMessage.length}/500
            </div>
            <div className="flex space-x-3">
              <ColorfulButton
                variant="outline"
                onClick={() => {
                  setShowApplicationModal(false);
                  setApplicationMessage('');
                }}
                className="flex-1"
              >
                {t('취소', 'Cancel')}
              </ColorfulButton>
              <ColorfulButton
                variant="primary"
                onClick={submitApplication}
                disabled={actionLoading === 'apply'}
                className="flex-1"
              >
                {actionLoading === 'apply' ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                {actionLoading === 'apply' ? t('지원 중...', 'Applying...') : t('지원하기', 'Apply')}
              </ColorfulButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

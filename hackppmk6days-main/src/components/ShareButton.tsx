import React, { useState } from 'react';
import { Share2, Copy, Mail, MessageSquare, Check, ExternalLink } from 'lucide-react';
import { ColorfulButton } from './ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';

interface ShareButtonProps {
  title: string;
  url?: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  onShare?: (type: string) => void;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  url,
  text,
  size = 'md',
  variant = 'ghost',
  className = '',
  onShare
}) => {
  const { language, t } = useLanguage();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const generateShareUrl = () => {
    return url || window.location.href;
  };

  const generateShareText = () => {
    const shareUrl = generateShareUrl();
    const shareText = text || (language === 'ko' 
      ? `${title}을(를) 확인해보세요! 6DAYS에서 새로운 경험을 시작하세요.`
      : `Check out ${title}! Start new experiences on 6DAYS.`);
    
    return {
      text: shareText,
      url: shareUrl,
      fullText: `${shareText} ${shareUrl}`
    };
  };

  const handleShare = async (type: 'link' | 'email' | 'social' | 'native') => {
    const shareData = generateShareText();
    
    try {
      switch (type) {
        case 'link':
          await navigator.clipboard.writeText(shareData.url);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 3000);
          
          // Show success notification
          const successMessage = language === 'ko' 
            ? '링크가 클립보드에 복사되었습니다!' 
            : 'Link copied to clipboard!';
          
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse';
          notification.textContent = successMessage;
          document.body.appendChild(notification);
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 3000);
          break;
          
        case 'email':
          const emailSubject = language === 'ko' 
            ? encodeURIComponent(`${title}을(를) 확인해보세요!`)
            : encodeURIComponent(`Check out ${title}!`);
          
          const emailBody = language === 'ko'
            ? encodeURIComponent(`안녕하세요!\n\n${title}에 관심이 있으실 것 같아서 공유드립니다.\n\n6DAYS에서 확인해보세요: ${shareData.url}\n\n감사합니다!`)
            : encodeURIComponent(`Hi!\n\nI thought you might be interested in ${title}.\n\nCheck it out on 6DAYS: ${shareData.url}\n\nBest regards!`);
          
          window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`);
          break;
          
        case 'social':
          const twitterText = encodeURIComponent(shareData.fullText + ' #6DAYS');
          window.open(`https://twitter.com/intent/tweet?text=${twitterText}`);
          break;
          
        case 'native':
          if (navigator.share) {
            await navigator.share({
              title: `${title} - 6DAYS`,
              text: shareData.text,
              url: shareData.url
            });
          } else {
            // Fallback to copy link
            await handleShare('link');
          }
          break;
      }
      
      // Call onShare callback if provided
      if (onShare) {
        onShare(type);
      }
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback to copy link on any error
      if (type !== 'link') {
        await handleShare('link');
      }
    }
    
    setShowShareMenu(false);
  };

  return (
    <div className={`relative ${className}`}>
      <ColorfulButton
        variant={variant}
        size={size}
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="hover:bg-mint-50 hover:text-mint-600 transition-all duration-300"
        title={t('공유하기', 'Share')}
      >
        <Share2 className={`h-4 w-4 ${size === 'sm' ? 'mr-1' : 'mr-2'}`} />
        {size !== 'sm' && t('공유', 'Share')}
      </ColorfulButton>

      {/* Share Menu */}
      {showShareMenu && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-50 min-w-56 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <h4 className="font-semibold text-gray-800 text-sm">
              {t('공유하기', 'Share')}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {t('친구들과 함께 공유해보세요', 'Share with your friends')}
            </p>
          </div>
          
          {/* Native Share (Mobile) */}
          {navigator.share && (
            <button
              onClick={() => handleShare('native')}
              className="w-full px-4 py-3 text-left hover:bg-mint-50 flex items-center space-x-3 transition-colors"
            >
              <div className="w-8 h-8 bg-mint-100 rounded-lg flex items-center justify-center">
                <ExternalLink className="h-4 w-4 text-mint-600" />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-800">
                  {t('시스템 공유', 'System share')}
                </span>
                <p className="text-xs text-gray-500">
                  {t('디바이스 공유 메뉴 사용', 'Use your device share menu')}
                </p>
              </div>
            </button>
          )}
          
          {/* Copy Link */}
          <button
            onClick={() => handleShare('link')}
            className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center space-x-3 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              {copySuccess ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-blue-600" />
              )}
            </div>
            <div>
              <span className="text-sm font-medium text-gray-800">
                {copySuccess ? t('링크 복사됨!', 'Link copied!') : t('링크 복사', 'Copy link')}
              </span>
              <p className="text-xs text-gray-500">
                {t('클립보드에 링크 복사', 'Copy link to clipboard')}
              </p>
            </div>
          </button>
          
          {/* Email Share */}
          <button
            onClick={() => handleShare('email')}
            className="w-full px-4 py-3 text-left hover:bg-green-50 flex items-center space-x-3 transition-colors"
          >
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-800">
                {t('이메일로 공유', 'Share via email')}
              </span>
              <p className="text-xs text-gray-500">
                {t('이메일 앱으로 공유', 'Share through email app')}
              </p>
            </div>
          </button>
          
          {/* Social Media Share */}
          <button
            onClick={() => handleShare('social')}
            className="w-full px-4 py-3 text-left hover:bg-purple-50 flex items-center space-x-3 transition-colors"
          >
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-800">
                {t('트위터 공유', 'Share on Twitter')}
              </span>
              <p className="text-xs text-gray-500">
                {t('트위터에 게시', 'Post to Twitter')}
              </p>
            </div>
          </button>
        </div>
      )}

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

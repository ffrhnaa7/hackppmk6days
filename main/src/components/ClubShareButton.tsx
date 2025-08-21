import React, { useState } from 'react';
import { Share2, Copy, Mail, MessageSquare, Check, ExternalLink, X } from 'lucide-react';
import { ColorfulButton } from './ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';

interface ClubShareButtonProps {
  clubId: string;
  clubName: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  showLabel?: boolean;
}

export const ClubShareButton: React.FC<ClubShareButtonProps> = ({
  clubId,
  clubName,
  size = 'md',
  variant = 'ghost',
  className = '',
  showLabel = true
}) => {
  const { language, t } = useLanguage();
  const [showLightbox, setShowLightbox] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const generateClubShareData = () => {
    const clubUrl = `${window.location.origin}/club/${clubId}`;
    
    const shareText = language === 'ko' 
      ? `${clubName} 동아리를 확인해보세요! 6DAYS에서 한국 대학 생활을 경험하세요.`
      : `Check out ${clubName} club! Experience Korean university life on 6DAYS.`;
    
    return {
      title: language === 'ko' ? `${clubName} - 6DAYS` : `${clubName} - 6DAYS`,
      text: shareText,
      url: clubUrl,
      fullText: `${shareText} ${clubUrl}`
    };
  };

  const handleShare = async (type: 'link' | 'email' | 'social' | 'native') => {
    const shareData = generateClubShareData();
    
    try {
      switch (type) {
        case 'link':
          await navigator.clipboard.writeText(shareData.url);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
          
          // Show success notification
          const successMessage = language === 'ko' 
            ? '동아리 링크가 복사되었습니다!' 
            : 'Club link copied to clipboard!';
          
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[9999] animate-pulse';
          notification.textContent = successMessage;
          document.body.appendChild(notification);
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 2000);
          break;
          
        case 'email':
          const emailSubject = language === 'ko' 
            ? encodeURIComponent(`${clubName} 동아리 추천`)
            : encodeURIComponent(`${clubName} Club Recommendation`);
          
          const emailBody = language === 'ko'
            ? encodeURIComponent(`안녕하세요!\n\n${clubName} 동아리를 추천드리고 싶어서 연락드립니다.\n\n이 동아리는 한국 대학 생활에서 정말 좋은 경험을 제공할 것 같습니다.\n\n자세한 정보: ${shareData.url}\n\n6DAYS에서 더 많은 동아리를 탐색해보세요!\n\n감사합니다.`)
            : encodeURIComponent(`Hi!\n\nI wanted to recommend ${clubName} club to you.\n\nThis club offers great experiences in Korean university life.\n\nMore details: ${shareData.url}\n\nExplore more clubs on 6DAYS!\n\nBest regards.`);
          
          window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`);
          break;
          
        case 'social':
          const hashtags = language === 'ko' 
            ? '#6DAYS #한국동아리 #대학생활 #' + clubName.replace(/\s+/g, '')
            : '#6DAYS #KoreanClubs #UniversityLife #' + clubName.replace(/\s+/g, '');
          
          const twitterText = encodeURIComponent(shareData.fullText + ' ' + hashtags);
          window.open(`https://twitter.com/intent/tweet?text=${twitterText}`);
          break;
          
        case 'native':
          if (navigator.share) {
            await navigator.share({
              title: shareData.title,
              text: shareData.text,
              url: shareData.url
            });
          } else {
            // Fallback to copy link
            await handleShare('link');
          }
          break;
      }
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback to copy link on any error
      if (type !== 'link') {
        await handleShare('link');
      }
    }
    
    // Close lightbox after sharing
    setTimeout(() => setShowLightbox(false), 500);
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <ColorfulButton
          variant={variant}
          size={size}
          onClick={() => setShowLightbox(true)}
          className="hover:bg-mint-50 hover:text-mint-600 transition-all duration-200"
          title={language === 'ko' ? `${clubName} 동아리 공유` : `Share ${clubName} club`}
        >
          <Share2 className={`h-4 w-4 ${showLabel && size !== 'sm' ? 'mr-2' : ''}`} />
          {showLabel && size !== 'sm' && (
            <span>{t('공유', 'Share')}</span>
          )}
        </ColorfulButton>
      </div>

      {/* Lightbox Popup */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {language === 'ko' ? `${clubName} 공유하기` : `Share ${clubName}`}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {t('친구들에게 이 동아리를 추천해보세요', 'Recommend this club to your friends')}
                </p>
              </div>
              <button
                onClick={() => setShowLightbox(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Share Options */}
            <div className="p-6 space-y-3">
              {/* Native Share (Mobile) */}
              {navigator.share && (
                <button
                  onClick={() => handleShare('native')}
                  className="w-full p-4 text-left hover:bg-mint-50 flex items-center space-x-4 rounded-xl transition-colors group"
                >
                  <div className="w-12 h-12 bg-mint-100 rounded-xl flex items-center justify-center group-hover:bg-mint-200 transition-colors">
                    <ExternalLink className="h-6 w-6 text-mint-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {t('시스템 공유', 'System Share')}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {t('기본 공유 메뉴 사용', 'Use default share menu')}
                    </p>
                  </div>
                </button>
              )}
              
              {/* Copy Club Link */}
              <button
                onClick={() => handleShare('link')}
                className="w-full p-4 text-left hover:bg-blue-50 flex items-center space-x-4 rounded-xl transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  {copySuccess ? (
                    <Check className="h-6 w-6 text-green-600" />
                  ) : (
                    <Copy className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {copySuccess 
                      ? t('링크 복사됨!', 'Link copied!') 
                      : t('링크 복사', 'Copy Link')
                    }
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t('동아리 페이지 링크 복사', 'Copy club page link')}
                  </p>
                </div>
              </button>
              
              {/* Email Share */}
              <button
                onClick={() => handleShare('email')}
                className="w-full p-4 text-left hover:bg-green-50 flex items-center space-x-4 rounded-xl transition-colors group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {t('이메일 추천', 'Email Recommendation')}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t('이메일로 동아리 추천하기', 'Recommend club via email')}
                  </p>
                </div>
              </button>
              
              {/* Social Media Share */}
              <button
                onClick={() => handleShare('social')}
                className="w-full p-4 text-left hover:bg-purple-50 flex items-center space-x-4 rounded-xl transition-colors group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {t('소셜 미디어', 'Social Media')}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t('트위터에서 동아리 홍보', 'Promote club on Twitter')}
                  </p>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">
                  {t('6DAYS에서 한국 대학 생활을 경험하세요', 'Experience Korean university life on 6DAYS')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

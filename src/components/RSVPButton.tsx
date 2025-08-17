import React, { useState } from 'react';
import { Check, Clock, X, Users, Loader2 } from 'lucide-react';
import { useRSVP } from '../hooks/useRSVP';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface RSVPButtonProps {
  eventId: string;
  className?: string;
  showCounts?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RSVPButton: React.FC<RSVPButtonProps> = ({
  eventId,
  className = '',
  showCounts = true,
  size = 'md'
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { status, attendingCount, maybeCount, totalCount, isLoading, updateRSVP, removeRSVP } = useRSVP(eventId);
  const [actionLoading, setActionLoading] = useState(false);

  const handleRSVP = async (e: React.MouseEvent, newStatus: 'attending' | 'maybe' | 'not_attending') => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('RSVP button clicked:', newStatus, 'user:', user?.id);
    
    if (!user) {
      alert(t('로그인이 필요합니다', 'Please log in to RSVP'));
      return;
    }

    setActionLoading(true);
    
    try {
      if (status === newStatus) {
        // If clicking the same status, remove RSVP
        await removeRSVP();
        console.log('RSVP removed');
      } else {
        // Update to new status
        await updateRSVP(newStatus);
        console.log('RSVP updated to:', newStatus);
      }
    } catch (error) {
      console.error('Error in handleRSVP:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusIcon = (statusType: 'attending' | 'maybe' | 'not_attending') => {
    const icons = {
      attending: <Check className="h-4 w-4" />,
      maybe: <Clock className="h-4 w-4" />,
      not_attending: <X className="h-4 w-4" />
    };
    return icons[statusType];
  };

  const getStatusText = (statusType: 'attending' | 'maybe' | 'not_attending') => {
    const texts = {
      attending: { ko: '참석', en: 'Attending' },
      maybe: { ko: '미정', en: 'Maybe' },
      not_attending: { ko: '불참', en: 'Not Going' }
    };
    return t(texts[statusType].ko, texts[statusType].en);
  };

  const getButtonClass = (statusType: 'attending' | 'maybe' | 'not_attending') => {
    const isActive = status === statusType;
    const baseClass = "inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer";
    
    if (isActive) {
      return `${baseClass} ${
        statusType === 'attending' ? 'bg-mint-500 text-white shadow-lg hover:bg-mint-600' :
        statusType === 'maybe' ? 'bg-ocean-500 text-white shadow-lg hover:bg-ocean-600' :
        'bg-gray-500 text-white shadow-lg hover:bg-gray-600'
      }`;
    }
    
    return `${baseClass} bg-white border border-gray-300 text-gray-700 hover:bg-gray-50`;
  };

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Loader2 className="h-5 w-5 animate-spin text-mint-500" />
        <span className="text-sm text-gray-500">
          {t('로딩 중...', 'Loading...')}
        </span>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* RSVP Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={(e) => handleRSVP(e, 'attending')}
          disabled={actionLoading}
          className={`${getButtonClass('attending')} ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {actionLoading && status !== 'attending' ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            getStatusIcon('attending')
          )}
          <span className="ml-2">{getStatusText('attending')}</span>
        </button>

        <button
          onClick={(e) => handleRSVP(e, 'maybe')}
          disabled={actionLoading}
          className={`${getButtonClass('maybe')} ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {actionLoading && status !== 'maybe' ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            getStatusIcon('maybe')
          )}
          <span className="ml-2">{getStatusText('maybe')}</span>
        </button>

        <button
          onClick={(e) => handleRSVP(e, 'not_attending')}
          disabled={actionLoading}
          className={`${getButtonClass('not_attending')} ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {actionLoading && status !== 'not_attending' ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            getStatusIcon('not_attending')
          )}
          <span className="ml-2">{getStatusText('not_attending')}</span>
        </button>
      </div>

      {/* RSVP Counts */}
      {showCounts && (
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-mint-500" />
            <span className="font-medium text-mint-600">{attendingCount}</span>
            <span>{t('참석', 'attending')}</span>
          </div>
          {maybeCount > 0 && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-ocean-500" />
              <span className="font-medium text-ocean-600">{maybeCount}</span>
              <span>{t('미정', 'maybe')}</span>
            </div>
          )}
          <div className="text-gray-500">
            {t(`총 ${totalCount}명 응답`, `${totalCount} total responses`)}
          </div>
        </div>
      )}

      {/* Current Status Indicator */}
      {status && (
        <div className="text-sm">
          <span className="text-gray-500">{t('내 상태:', 'Your status:')}</span>
          <span className={`ml-2 font-medium ${
            status === 'attending' ? 'text-mint-600' :
            status === 'maybe' ? 'text-ocean-600' : 'text-gray-600'
          }`}>
            {getStatusText(status)}
          </span>
        </div>
      )}
    </div>
  );
};

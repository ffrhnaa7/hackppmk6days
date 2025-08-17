import React, { useState } from 'react';
import { Check, Clock, X, Users, Loader2 } from 'lucide-react';
import { ColorfulButton } from './ColorfulButton';
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

  const handleRSVP = async (newStatus: 'attending' | 'maybe' | 'not_attending') => {
    if (!user) {
      // TODO: Show login modal or redirect to login
      alert(t('로그인이 필요합니다', 'Please log in to RSVP'));
      return;
    }

    setActionLoading(true);
    
    if (status === newStatus) {
      // If clicking the same status, remove RSVP
      await removeRSVP();
    } else {
      // Update to new status
      await updateRSVP(newStatus);
    }
    
    setActionLoading(false);
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

  const getStatusVariant = (statusType: 'attending' | 'maybe' | 'not_attending') => {
    if (status === statusType) {
      return statusType === 'attending' ? 'success' : 
             statusType === 'maybe' ? 'secondary' : 'outline';
    }
    return 'outline';
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
        <ColorfulButton
          variant={getStatusVariant('attending')}
          size={size}
          onClick={() => handleRSVP('attending')}
          disabled={actionLoading}
          className="flex items-center space-x-2"
        >
          {actionLoading && status !== 'attending' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            getStatusIcon('attending')
          )}
          <span>{getStatusText('attending')}</span>
        </ColorfulButton>

        <ColorfulButton
          variant={getStatusVariant('maybe')}
          size={size}
          onClick={() => handleRSVP('maybe')}
          disabled={actionLoading}
          className="flex items-center space-x-2"
        >
          {actionLoading && status !== 'maybe' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            getStatusIcon('maybe')
          )}
          <span>{getStatusText('maybe')}</span>
        </ColorfulButton>

        <ColorfulButton
          variant={getStatusVariant('not_attending')}
          size={size}
          onClick={() => handleRSVP('not_attending')}
          disabled={actionLoading}
          className="flex items-center space-x-2"
        >
          {actionLoading && status !== 'not_attending' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            getStatusIcon('not_attending')
          )}
          <span>{getStatusText('not_attending')}</span>
        </ColorfulButton>
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

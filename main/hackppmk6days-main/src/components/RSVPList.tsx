import React, { useState, useEffect } from 'react';
import { Users, Crown, Clock, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ColorfulCard } from './ColorfulCard';
import { useLanguage } from '../contexts/LanguageContext';

interface RSVPListProps {
  eventId: string;
  className?: string;
}

interface ProfileData {
  name: string;
  email: string;
  avatar_url?: string;
}

interface RSVPResponse {
  id: string;
  status: 'attending' | 'maybe' | 'not_attending';
  created_at: string;
  profiles: ProfileData | ProfileData[] | null;
}

interface RSVPUser {
  id: string;
  status: 'attending' | 'maybe' | 'not_attending';
  user: {
    name: string;
    email: string;
    avatar_url?: string;
  };
  created_at: string;
}

export const RSVPList: React.FC<RSVPListProps> = ({ eventId, className = '' }) => {
  const { t } = useLanguage();
  const [rsvps, setRSVPs] = useState<RSVPUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRSVPs();
  }, [eventId]);

  const fetchRSVPs = async () => {
    try {
      const { data, error } = await supabase
        .from('event_rsvps')
        .select(`
          id,
          status,
          created_at,
          profiles!inner (
            name,
            email,
            avatar_url
          )
        `)
        .eq('event_id', eventId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedRSVPs = (data as RSVPResponse[])?.map(rsvp => {
        // Handle both array and single object responses from Supabase
        let profileData: ProfileData;
        
        if (Array.isArray(rsvp.profiles)) {
          profileData = rsvp.profiles[0] || { name: 'Anonymous', email: '', avatar_url: undefined };
        } else if (rsvp.profiles) {
          profileData = rsvp.profiles;
        } else {
          profileData = { name: 'Anonymous', email: '', avatar_url: undefined };
        }

        return {
          id: rsvp.id,
          status: rsvp.status,
          created_at: rsvp.created_at,
          user: {
            name: profileData.name || 'Anonymous',
            email: profileData.email || '',
            avatar_url: profileData.avatar_url
          }
        };
      }) || [];

      setRSVPs(formattedRSVPs);
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'attending':
        return <Users className="h-4 w-4 text-mint-500" />;
      case 'maybe':
        return <Clock className="h-4 w-4 text-ocean-500" />;
      case 'not_attending':
        return <X className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { ko: string; en: string }> = {
      attending: { ko: '참석', en: 'Attending' },
      maybe: { ko: '미정', en: 'Maybe' },
      not_attending: { ko: '불참', en: 'Not Going' }
    };
    return t(statusMap[status]?.ko || '', statusMap[status]?.en || '');
  };

  const groupedRSVPs = {
    attending: rsvps.filter(rsvp => rsvp.status === 'attending'),
    maybe: rsvps.filter(rsvp => rsvp.status === 'maybe'),
    not_attending: rsvps.filter(rsvp => rsvp.status === 'not_attending')
  };

  if (loading) {
    return (
      <ColorfulCard className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </ColorfulCard>
    );
  }

  return (
    <ColorfulCard className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Users className="h-5 w-5 mr-2 text-mint-500" />
        {t('참가자 목록', 'Participant List')}
      </h3>

      <div className="space-y-6">
        {/* Attending */}
        {groupedRSVPs.attending.length > 0 && (
          <div>
            <h4 className="font-medium text-mint-600 mb-3 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {t('참석', 'Attending')} ({groupedRSVPs.attending.length})
            </h4>
            <div className="space-y-2">
              {groupedRSVPs.attending.map((rsvp, index) => (
                <div key={rsvp.id} className="flex items-center space-x-3 p-2 rounded-lg bg-mint-50">
                  {index === 0 && (
                    <Crown className="h-4 w-4 text-yellow-500" />
                  )}
                  <div className="h-8 w-8 bg-mint-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-mint-700">
                      {rsvp.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{rsvp.user.name}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(rsvp.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {getStatusIcon(rsvp.status)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Maybe */}
        {groupedRSVPs.maybe.length > 0 && (
          <div>
            <h4 className="font-medium text-ocean-600 mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {t('미정', 'Maybe')} ({groupedRSVPs.maybe.length})
            </h4>
            <div className="space-y-2">
              {groupedRSVPs.maybe.map((rsvp) => (
                <div key={rsvp.id} className="flex items-center space-x-3 p-2 rounded-lg bg-ocean-50">
                  <div className="h-8 w-8 bg-ocean-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-ocean-700">
                      {rsvp.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{rsvp.user.name}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(rsvp.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {getStatusIcon(rsvp.status)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not Attending */}
        {groupedRSVPs.not_attending.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-600 mb-3 flex items-center">
              <X className="h-4 w-4 mr-1" />
              {t('불참', 'Not Going')} ({groupedRSVPs.not_attending.length})
            </h4>
            <div className="space-y-2">
              {groupedRSVPs.not_attending.map((rsvp) => (
                <div key={rsvp.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                  <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {rsvp.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{rsvp.user.name}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(rsvp.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {getStatusIcon(rsvp.status)}
                </div>
              ))}
            </div>
          </div>
        )}

        {rsvps.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>{t('아직 참가자가 없습니다', 'No participants yet')}</p>
            <p className="text-sm">{t('첫 번째 참가자가 되어보세요!', 'Be the first to join!')}</p>
          </div>
        )}
      </div>
    </ColorfulCard>
  );
};

import React from 'react';
import { Calendar, MapPin, Users, Heart, Share2, Bookmark, Info, DollarSign, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ColorfulCard } from './ColorfulCard';
import { ColorfulButton } from './ColorfulButton';
import { KoreanEvent } from '../data/koreanEvents';
import { useLanguage } from '../contexts/LanguageContext';

interface KoreanEventCardProps {
  event: KoreanEvent;
  compact?: boolean;
}

export const KoreanEventCard: React.FC<KoreanEventCardProps> = ({ event, compact = false }) => {
  const { language, t } = useLanguage();

  const title = language === 'ko' ? event.title.ko : event.title.en;
  const club = language === 'ko' ? event.club.ko : event.club.en;
  const location = language === 'ko' ? event.location.ko : event.location.en;
  const description = language === 'ko' ? event.description.ko : event.description.en;

  return (
    <ColorfulCard className="overflow-hidden p-0 hover:shadow-2xl transition-all duration-300">
      {/* Event Image */}
      <div className={`relative ${compact ? 'h-32' : 'h-48'} overflow-hidden`}>
        <img
          src={event.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {event.crossCultural && (
            <span className="bg-mint-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              {t('국제교류', 'Cross-Cultural')}
            </span>
          )}
          {event.language === 'bilingual' && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {t('한/영', 'KO/EN')}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <ColorfulButton variant="ghost" size="sm" className="p-2 bg-white/90 text-gray-700 hover:bg-white">
            <Bookmark className="h-4 w-4" />
          </ColorfulButton>
        </div>
      </div>

      {/* Event Details */}
      <div className={`${compact ? 'p-4 space-y-2' : 'p-6 space-y-4'}`}>
        <div>
          <h3 className={`${compact ? 'text-base' : 'text-lg'} font-bold text-gray-800 mb-1`}>
            {title}
          </h3>
          <p className="text-sm text-blue-600 font-semibold">{club}</p>
        </div>

        {!compact && (
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        )}

        {/* Cultural Notes */}
        {event.culturalNotes && !compact && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-amber-800 text-xs leading-relaxed">
                <strong>{t('문화 팁:', 'Cultural Tip:')}</strong>{' '}
                {language === 'ko' ? event.culturalNotes.ko : event.culturalNotes.en}
              </p>
            </div>
          </div>
        )}

        {/* Event Info */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 text-sm">
            <div className="bg-blue-100 rounded-lg p-1 mr-3">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <span>{event.date} {t('at', 'at')} {event.time}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <div className="bg-mint-100 rounded-lg p-1 mr-3">
              <MapPin className="h-4 w-4 text-mint-600" />
            </div>
            <span>{location} ({event.location.campus})</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <div className="bg-purple-100 rounded-lg p-1 mr-3">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <span>{event.attendees} {t('참석', 'attending')}</span>
          </div>
          {event.fee && (
            <div className="flex items-center text-gray-600 text-sm">
              <div className="bg-orange-100 rounded-lg p-1 mr-3">
                <DollarSign className="h-4 w-4 text-orange-600" />
              </div>
              <span>
                ₩{event.fee.amount.toLocaleString()} - {language === 'ko' ? event.fee.description.ko : event.fee.description.en}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {!compact && (
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-accent text-white rounded-full text-xs font-semibold shadow-md"
              >
                {language === 'ko' ? tag.ko : tag.en}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <ColorfulButton variant="ghost" size="sm" className="p-2 text-red-500 hover:bg-red-50">
              <Heart className="h-4 w-4" />
            </ColorfulButton>
            <ColorfulButton variant="ghost" size="sm" className="p-2 text-blue-500 hover:bg-blue-50">
              <Share2 className="h-4 w-4" />
            </ColorfulButton>
          </div>
          <div className="flex space-x-2">
            <Link to={`/event/${event.id}`}>
              <ColorfulButton size="sm" variant="secondary">
                {t('자세히', 'Details')}
              </ColorfulButton>
            </Link>
            <ColorfulButton size="sm" variant="primary">
              {t('참석', 'RSVP')}
            </ColorfulButton>
          </div>
        </div>
      </div>
    </ColorfulCard>
  );
};

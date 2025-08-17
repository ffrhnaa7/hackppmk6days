import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Heart } from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { RSVPButton } from '../components/RSVPButton';
import { RSVPList } from '../components/RSVPList';
import { koreanEvents } from '../data/koreanEvents';
import { useLanguage } from '../contexts/LanguageContext';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();

  const event = koreanEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ColorfulCard className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t('이벤트를 찾을 수 없습니다', 'Event not found')}
          </h2>
          <Link to="/explore">
            <ColorfulButton>
              {t('이벤트 탐색하기', 'Explore Events')}
            </ColorfulButton>
          </Link>
        </ColorfulCard>
      </div>
    );
  }

  const eventTitle = language === 'ko' ? event.title.ko : event.title.en;
  const eventDescription = language === 'ko' ? event.description.ko : event.description.en;
  const eventLocation = language === 'ko' ? event.location.ko : event.location.en;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/explore">
          <ColorfulButton variant="outline" size="sm" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('이벤트 목록으로', 'Back to Events')}
          </ColorfulButton>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Header */}
          <ColorfulCard className="overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src={event.image}
                alt={eventTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{eventTitle}</h1>
                    <div className="flex items-center space-x-4 text-white/90">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <ColorfulButton variant="ghost" size="sm" className="p-2 text-white hover:bg-white/20">
                      <Share2 className="h-5 w-5" />
                    </ColorfulButton>
                    <ColorfulButton variant="ghost" size="sm" className="p-2 text-white hover:bg-white/20">
                      <Heart className="h-5 w-5" />
                    </ColorfulButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Event Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-mint-500" />
                  <div>
                    <div className="font-medium text-gray-800">{t('장소', 'Location')}</div>
                    <div className="text-gray-600">{eventLocation}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-mint-500" />
                  <div>
                    <div className="font-medium text-gray-800">{t('참가비', 'Fee')}</div>
                    <div className="text-gray-600">
                      {event.fee === null || event.fee.amount === 0 ? t('무료', 'Free') : `₩${event.fee.amount.toLocaleString()}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t('이벤트 소개', 'About This Event')}
                </h3>
                <p className="text-gray-700 leading-relaxed">{eventDescription}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-mint-100 text-mint-800 rounded-full text-sm font-medium"
                  >
                    #{language === 'ko' ? tag.ko : tag.en}
                  </span>
                ))}
              </div>
            </div>
          </ColorfulCard>

          {/* RSVP Section */}
          <ColorfulCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('참가 신청', 'RSVP')}
            </h3>
            <RSVPButton eventId={event.id} showCounts={true} size="md" />
          </ColorfulCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <ColorfulCard variant="mint" className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              {t('이벤트 정보', 'Event Info')}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('날짜', 'Date')}</span>
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('시간', 'Time')}</span>
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('장소', 'Location')}</span>
                <span className="font-medium">{eventLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('참가비', 'Fee')}</span>
                <span className="font-medium">
                  {event.fee === null || event.fee.amount === 0 ? t('무료', 'Free') : `₩${event.fee.amount.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('카테고리', 'Category')}</span>
                <span className="font-medium">{event.tags[0] ? (language === 'ko' ? event.tags[0].ko : event.tags[0].en) : 'General'}</span>
              </div>
            </div>
          </ColorfulCard>

          {/* Participant List */}
          <RSVPList eventId={event.id} />

          {/* Related Events */}
          <ColorfulCard className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              {t('관련 이벤트', 'Related Events')}
            </h3>
            <div className="space-y-3">
              {koreanEvents
                .filter(e => e.id !== event.id && e.tags.some(tag => event.tags.some(eventTag => eventTag.category === tag.category)))
                .slice(0, 3)
                .map((relatedEvent) => (
                  <Link
                    key={relatedEvent.id}
                    to={`/event/${relatedEvent.id}`}
                    className="block p-3 rounded-lg hover:bg-mint-50 transition-colors"
                  >
                    <div className="font-medium text-gray-800 text-sm mb-1">
                      {language === 'ko' ? relatedEvent.title.ko : relatedEvent.title.en}
                    </div>
                    <div className="text-xs text-gray-500">
                      {relatedEvent.date} • {relatedEvent.time}
                    </div>
                  </Link>
                ))}
            </div>
          </ColorfulCard>
        </div>
      </div>
    </div>
  );
};

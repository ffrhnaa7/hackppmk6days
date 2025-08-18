import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, DollarSign, Info, ArrowLeft, Heart, Share2, MessageCircle, ExternalLink, Navigation } from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { koreanEvents } from '../data/koreanEvents';
import { useLanguage } from '../contexts/LanguageContext';

export const EventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  
  const event = koreanEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ColorfulCard>
          <div className="p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t('이벤트를 찾을 수 없습니다', 'Event not found')}
            </h2>
            <Link to="/explore">
              <ColorfulButton variant="primary">
                {t('이벤트 탐색으로 돌아가기', 'Back to Explore')}
              </ColorfulButton>
            </Link>
          </div>
        </ColorfulCard>
      </div>
    );
  }

  const title = language === 'ko' ? event.title.ko : event.title.en;
  const club = language === 'ko' ? event.club.ko : event.club.en;
  const location = language === 'ko' ? event.location.ko : event.location.en;
  const description = language === 'ko' ? event.description.ko : event.description.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/explore" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('이벤트 탐색으로 돌아가기', 'Back to Explore')}
        </Link>
      </div>

      {/* Event Header */}
      <ColorfulCard className="mb-6 overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img
            src={event.image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Event Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {event.crossCultural && (
              <span className="bg-mint-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {t('국제교류', 'Cross-Cultural')}
              </span>
            )}
            {event.language === 'bilingual' && (
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {t('한/영', 'KO/EN')}
              </span>
            )}
            {!event.openToAll && (
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {t('회원 전용', 'Members Only')}
              </span>
            )}
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
            <p className="text-xl text-blue-200 font-semibold">{club}</p>
          </div>
        </div>
      </ColorfulCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <ColorfulCard>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {t('이벤트 소개', 'Event Description')}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
            </div>
          </ColorfulCard>

          {/* Cultural Notes */}
          {event.culturalNotes && (
            <ColorfulCard className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
              <div className="p-6">
                <div className="flex items-start space-x-3">
                  <Info className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-amber-800 mb-2">
                      {t('🎯 문화 가이드', '🎯 Cultural Guide')}
                    </h3>
                    <p className="text-amber-800 leading-relaxed">
                      {language === 'ko' ? event.culturalNotes.ko : event.culturalNotes.en}
                    </p>
                  </div>
                </div>
              </div>
            </ColorfulCard>
          )}

          {/* Dress Code */}
          {event.dressCode && (
            <ColorfulCard>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-3">
                  {t('👔 복장 안내', '👔 Dress Code')}
                </h3>
                <p className="text-gray-700">
                  {language === 'ko' ? event.dressCode.ko : event.dressCode.en}
                </p>
              </div>
            </ColorfulCard>
          )}

          {/* AI Translation Notice */}
          <ColorfulCard className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="p-6">
              <h3 className="font-bold text-purple-800 mb-2">
                {t('🤖 AI 번역 서비스', '🤖 AI Translation Service')}
              </h3>
              <p className="text-purple-700 text-sm">
                {t(
                  '이 이벤트 정보는 AI가 자동 번역했습니다. 더 정확한 정보는 주최자에게 문의하세요.',
                  'This event information has been automatically translated by AI. Contact the organizer for more accurate details.'
                )}
              </p>
            </div>
          </ColorfulCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Details */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">
                {t('이벤트 정보', 'Event Details')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">{event.date}</p>
                    <p className="text-gray-600 text-sm">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-mint-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">{location}</p>
                    <p className="text-gray-600 text-sm">{event.location.campus} 캠퍼스</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">
                    {event.attendees} {t('명 참석', 'attending')}
                  </span>
                </div>

                {event.fee && (
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-orange-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        ₩{event.fee.amount.toLocaleString()}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {language === 'ko' ? event.fee.description.ko : event.fee.description.en}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ColorfulCard>

          {/* Map Links */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Navigation className="h-5 w-5 mr-2" />
                {t('길찾기', 'Directions')}
              </h3>
              <div className="space-y-3">
                <a
                  href={event.location.mapLinks.naver}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <span className="font-medium text-green-800">
                    {t('네이버 지도', 'Naver Map')}
                  </span>
                  <ExternalLink className="h-4 w-4 text-green-600" />
                </a>
                <a
                  href={event.location.mapLinks.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <span className="font-medium text-yellow-800">
                    {t('카카오맵', 'KakaoMap')}
                  </span>
                  <ExternalLink className="h-4 w-4 text-yellow-600" />
                </a>
              </div>
            </div>
          </ColorfulCard>

          {/* Transportation */}
          <ColorfulCard>
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">
                {t('🚇 교통정보', '🚇 Transportation')}
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-blue-600 mb-1">
                    {t('지하철', 'Subway')}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {event.transportation.subway.map((line, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-green-600 mb-1">
                    {t('버스', 'Bus')}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {event.transportation.bus.map((bus, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                      >
                        {bus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ColorfulCard>

          {/* Actions */}
          <div className="space-y-3">
            <ColorfulButton size="lg" className="w-full">
              {t('참석 신청', 'RSVP Now')}
            </ColorfulButton>
            <div className="flex space-x-2">
              <ColorfulButton variant="outline" size="sm" className="flex-1">
                <Heart className="h-4 w-4 mr-1" />
                {t('좋아요', 'Like')}
              </ColorfulButton>
              <ColorfulButton variant="outline" size="sm" className="flex-1">
                <Share2 className="h-4 w-4 mr-1" />
                {t('공유', 'Share')}
              </ColorfulButton>
              <ColorfulButton variant="outline" size="sm" className="flex-1">
                <MessageCircle className="h-4 w-4 mr-1" />
                {t('문의', 'Contact')}
              </ColorfulButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

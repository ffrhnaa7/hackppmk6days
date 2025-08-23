import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Heart, Share2, Bookmark, Star, ChevronRight, DollarSign, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ColorfulCard } from '../ColorfulCard';
import { ColorfulButton } from '../ColorfulButton';
import { useLanguage } from '../../contexts/LanguageContext';
import { KoreanEvent } from '../../data/koreanEvents';

interface EventCardProps {
  event: KoreanEvent;
  isEventSoon: (date: string) => boolean;
  formatDate: (date: string) => string;
  formatTime: (time: string) => string;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  isEventSoon, 
  formatDate, 
  formatTime 
}) => {
  const { language, t } = useLanguage();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const eventTitle = language === 'ko' ? event.title.ko : event.title.en;
  const eventDescription = language === 'ko' ? event.description.ko : event.description.en;
  const eventLocation = language === 'ko' ? event.location.ko : event.location.en;
  const clubName = language === 'ko' ? event.club.ko : event.club.en;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventTitle,
        text: eventDescription,
        url: window.location.href
      });
    }
  };

  const getCampusColor = (campus: string) => {
    switch(campus) {
      case '서울': return 'bg-blue-100 text-blue-700';
      case '경기': return 'bg-green-100 text-green-700';
      case '지방': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <ColorfulCard className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
        <img
          src={event.image}
          alt={eventTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col space-y-1.5 sm:space-y-2">
          {isEventSoon(event.date) && (
            <div className="flex items-center space-x-1.5 sm:space-x-2 bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl animate-pulse">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-ping"></div>
              <span>{t('곧 시작', 'Soon')}</span>
            </div>
          )}
          {/* Campus Badge */}
          <div className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl ${getCampusColor(event.location.campus)}`}>
            <Navigation className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
            {event.location.campus}
          </div>
        </div>

        {/* Bookmark Button */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
          >
            <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${isBookmarked ? 'fill-blue-600 text-blue-600' : 'text-gray-700'}`} />
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-mint-200 transition-colors mb-2 sm:mb-3">
            {eventTitle}
          </h3>
          <p className="text-blue-200 font-semibold text-sm sm:text-base bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
            {clubName}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Description */}
        <p className="text-gray-700 leading-relaxed line-clamp-2 text-xs sm:text-sm">
          {eventDescription}
        </p>

        {/* Event Details */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center text-gray-600 text-xs sm:text-sm">
            <div className="bg-blue-100 rounded-lg p-1.5 sm:p-2 mr-2 sm:mr-3">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </div>
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-xs sm:text-sm">
            <div className="bg-purple-100 rounded-lg p-1.5 sm:p-2 mr-2 sm:mr-3">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </div>
            <span className="font-medium">{formatTime(event.time)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-xs sm:text-sm">
            <div className="bg-mint-100 rounded-lg p-1.5 sm:p-2 mr-2 sm:mr-3">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-mint-600" />
            </div>
            <span className="font-medium">{eventLocation}</span>
          </div>
          <div className="flex items-center text-gray-600 text-xs sm:text-sm">
            <div className="bg-orange-100 rounded-lg p-1.5 sm:p-2 mr-2 sm:mr-3">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
            </div>
            <span className="font-medium">{event.attendees} {t('참가자', 'attending')}</span>
          </div>
          {event.fee && (
            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
              <div className="bg-green-100 rounded-lg p-1.5 sm:p-2 mr-2 sm:mr-3">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </div>
              <span className="font-medium">
                {event.fee.amount === 0 
                  ? t('무료', 'Free') 
                  : `₩${event.fee.amount.toLocaleString()}`}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-mint-100 to-blue-100 text-mint-800 rounded-full text-xs font-bold border border-mint-200 hover:shadow-md hover:scale-105 transition-all cursor-default"
            >
              {language === 'ko' ? tag.ko : tag.en}
            </span>
          ))}
        </div>

        {/* Language Badge */}
        {event.language && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 font-medium">
              {t('진행 언어:', 'Language:')}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold">
              {event.language === 'korean' ? '한국어' : 
               event.language === 'english' ? 'English' : 
               '한국어/English'}
            </span>
          </div>
        )}

        {/* Action Section */}
        <div className="border-t pt-4 sm:pt-6 space-y-3 sm:space-y-4">
          {/* Social Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg transition-colors ${isLiked ? 'bg-red-50 text-red-500' : 'text-gray-500 hover:bg-red-50 hover:text-red-500'}`}
              >
                <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              {event.openToAll ? t('모두 참여 가능', 'Open to all') : t('회원 전용', 'Members only')}
            </span>
          </div>

          {/* RSVP Button */}
          <Link to={`/event/${event.id}`}>
            <ColorfulButton className="w-full group-hover:shadow-lg transition-shadow font-bold text-xs sm:text-sm">
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              {t('참가 신청', 'RSVP Now')}
            </ColorfulButton>
          </Link>
        </div>
      </div>
    </ColorfulCard>
  );
};

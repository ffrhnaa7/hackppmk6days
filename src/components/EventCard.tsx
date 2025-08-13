import React from 'react';
import { Calendar, MapPin, Users, Heart, Share2, Bookmark } from 'lucide-react';
import { ColorfulCard } from './ColorfulCard';
import { ColorfulButton } from './ColorfulButton';

interface EventCardProps {
  title: string;
  club: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  description: string;
  tags: string[];
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  club,
  date,
  time,
  location,
  attendees,
  image,
  description,
  tags
}) => {
  return (
    <ColorfulCard className="overflow-hidden p-0">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <ColorfulButton variant="ghost" size="sm" className="p-2 bg-white/90 text-gray-700 hover:bg-white">
            <Bookmark className="h-4 w-4" />
          </ColorfulButton>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-blue-600 font-semibold">{club}</p>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

        {/* Event Info */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 text-sm">
            <div className="bg-blue-100 rounded-lg p-1 mr-3">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <span>{date} at {time}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <div className="bg-mint-100 rounded-lg p-1 mr-3">
              <MapPin className="h-4 w-4 text-mint-600" />
            </div>
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <div className="bg-purple-100 rounded-lg p-1 mr-3">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <span>{attendees} attending</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-accent text-white rounded-full text-xs font-semibold shadow-md"
            >
              {tag}
            </span>
          ))}
        </div>

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
          <ColorfulButton size="sm" variant="primary">
            RSVP
          </ColorfulButton>
        </div>
      </div>
    </ColorfulCard>
  );
};

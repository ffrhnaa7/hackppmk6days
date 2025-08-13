export interface Event {
  id: string;
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

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Workshop',
    club: 'Tech Society',
    date: 'March 15, 2024',
    time: '2:00 PM',
    location: 'Engineering Building, Room 201',
    attendees: 45,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    description: 'Join us for an interactive workshop on the latest AI and ML technologies. Perfect for beginners and experts alike!',
    tags: ['Technology', 'Workshop', 'AI']
  },
  {
    id: '2',
    title: 'Spring Music Festival',
    club: 'Music Club',
    date: 'March 20, 2024',
    time: '6:00 PM',
    location: 'Campus Amphitheater',
    attendees: 120,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    description: 'Experience an evening of live music featuring local bands and student performers. Food trucks will be available!',
    tags: ['Music', 'Festival', 'Entertainment']
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    club: 'Entrepreneurship Club',
    date: 'March 22, 2024',
    time: '4:00 PM',
    location: 'Business School Auditorium',
    attendees: 80,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    description: 'Watch student entrepreneurs pitch their innovative ideas to a panel of industry experts. Prizes worth $10,000!',
    tags: ['Business', 'Competition', 'Innovation']
  },
  {
    id: '4',
    title: 'Photography Walk',
    club: 'Photography Society',
    date: 'March 18, 2024',
    time: '10:00 AM',
    location: 'Campus Gardens',
    attendees: 25,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    description: 'Explore campus through your lens! Bring your camera and join fellow photography enthusiasts for a morning walk.',
    tags: ['Photography', 'Outdoor', 'Creative']
  },
  {
    id: '5',
    title: 'Debate Tournament Finals',
    club: 'Debate Society',
    date: 'March 25, 2024',
    time: '7:00 PM',
    location: 'Main Auditorium',
    attendees: 150,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    description: 'Witness the final round of our annual debate tournament. Topics range from politics to philosophy.',
    tags: ['Debate', 'Academic', 'Competition']
  },
  {
    id: '6',
    title: 'Cooking Masterclass',
    club: 'Culinary Club',
    date: 'March 28, 2024',
    time: '5:00 PM',
    location: 'Student Center Kitchen',
    attendees: 30,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    description: 'Learn to cook authentic Italian pasta from scratch with our guest chef. All ingredients provided!',
    tags: ['Cooking', 'Food', 'Learning']
  }
];

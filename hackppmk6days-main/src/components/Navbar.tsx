import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, Users, User, Globe } from 'lucide-react';
import { ColorfulButton } from './ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('홈', 'Home') },
    { path: '/explore', icon: Search, label: t('탐색', 'Explore') },
    { path: '/event/1', icon: Calendar, label: t('이벤트', 'Events') },
    { path: '/clubs', icon: Users, label: t('동아리', 'Clubs') },
    { path: '/profile', icon: User, label: t('프로필', 'Profile') }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KC</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('캠퍼스 커넥트', 'Campus Connect')}
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Language Toggle */}
          <div className="flex items-center space-x-3">
            <ColorfulButton
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'ko' ? '한국어' : 'English'}</span>
            </ColorfulButton>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around py-2 border-t border-gray-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

import React from 'react';
import { Search, Bell, User, Calendar, Globe, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ColorfulButton } from './ColorfulButton';
import { ColorfulInput } from './ColorfulInput';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/', label: { ko: '홈', en: 'Home' } },
    { path: '/explore', label: { ko: '탐색', en: 'Explore' } },
    { path: '/clubs', label: { ko: '동아리', en: 'Clubs' } }
  ];

  return (
    <header className="bg-gradient-hero shadow-xl sticky top-0 z-50 backdrop-blur-sm border-b border-mint-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white/20 rounded-xl p-2 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 mint-glow">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white tracking-tight">
                6DAYS
              </h1>
              <span className="text-xs text-white/80 font-medium">
                {t('6일 활동, 1일 휴식', '6 Active, 1 Rest')}
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-white/20 text-white shadow-lg mint-glow'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {language === 'ko' ? item.label.ko : item.label.en}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <ColorfulInput
              placeholder={t('이벤트, 동아리 검색...', 'Search events, clubs...')}
              icon={<Search className="h-5 w-5 text-mint-500" />}
              className="glass-effect"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ColorfulButton
              variant="ghost"
              size="sm"
              className="p-2 text-white hover:bg-white/20 rounded-xl"
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            >
              <Globe className="h-5 w-5" />
              <span className="ml-1 text-sm font-medium">
                {language === 'ko' ? 'EN' : '한'}
              </span>
            </ColorfulButton>
            <ColorfulButton variant="ghost" size="sm" className="p-2 text-white hover:bg-white/20 rounded-xl">
              <Bell className="h-5 w-5" />
            </ColorfulButton>
            <ColorfulButton variant="ghost" size="sm" className="p-2 text-white hover:bg-white/20 rounded-xl">
              <User className="h-5 w-5" />
            </ColorfulButton>
          </div>
        </div>
      </div>
    </header>
  );
};

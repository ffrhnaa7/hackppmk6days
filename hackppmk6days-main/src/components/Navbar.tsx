import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Calendar, 
  User, 
  LogOut, 
  Globe,
  UserPlus,
  Bookmark,
  Heart,
  ChevronDown,
  LucideIcon,
  Zap
} from 'lucide-react';
import { ColorfulButton } from './ColorfulButton';
import { ModernButton } from './ModernButton';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  path: string;
  icon: LucideIcon;
  label: string;
}

interface ProfileMenuItem {
  path?: string;
  icon?: LucideIcon;
  label: string;
  type?: 'divider';
}

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const languageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems: NavItem[] = [
    { path: '/', icon: Home, label: t('홈', 'Home') },
    { path: '/clubs', icon: Users, label: t('동아리', 'Clubs') },
    { path: '/events', icon: Calendar, label: t('이벤트', 'Events') },
  ];

  const profileMenuItems: ProfileMenuItem[] = user ? [
    { path: '/profile', icon: User, label: t('내 프로필', 'My Profile') },
    { path: '/my-applications', icon: UserPlus, label: t('내 지원 현황', 'My Applications') },
    { 
      type: 'divider',
      label: t('저장된 항목', 'Saved Items')
    },
    { path: '/saved-clubs', icon: Bookmark, label: t('저장된 동아리', 'Saved Clubs') },
    { path: '/liked-clubs', icon: Heart, label: t('좋아요한 동아리', 'Liked Clubs') },
  ] : [];

  const languageOptions = [
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-modern sticky top-0 z-50 border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-modern group-hover:shadow-modern-lg transition-all duration-300 hover-scale">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-modern-gradient heading-modern">
                  6DAYS
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {t('더 나은 일상을 위해', 'For Better Living')}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 hover-lift ${
                  isActive(path)
                    ? 'bg-gradient-primary text-white shadow-modern transform scale-105'
                    : 'text-gray-700 hover:text-mint-600 hover:bg-mint-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop User Menu & Language Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-2xl text-sm font-medium text-gray-700 hover:text-mint-600 hover:bg-mint-50 transition-all duration-300 border-modern hover-scale"
              >
                <Globe className="h-4 w-4" />
                <span className="flex items-center space-x-1">
                  <span>{currentLanguage?.flag}</span>
                  <span>{currentLanguage?.label}</span>
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-modern-lg border border-gray-200/60 py-2 z-50">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (lang.code !== language) {
                          toggleLanguage();
                        }
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-mint-50 transition-colors duration-200 ${
                        lang.code === language ? 'bg-mint-50 text-mint-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.label}</span>
                      {lang.code === language && (
                        <div className="ml-auto w-2 h-2 bg-mint-600 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-2xl text-sm font-medium text-gray-700 hover:text-mint-600 hover:bg-mint-50 transition-all duration-300 border-modern hover-scale"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">{user.email?.split('@')[0]}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-modern-lg border border-gray-200/60 py-2 z-50">
                    {profileMenuItems.map((item, index) => {
                      if (item.type === 'divider') {
                        return (
                          <div key={index} className="px-4 py-2">
                            <div className="border-t border-gray-200 mb-2"></div>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              {item.label}
                            </span>
                          </div>
                        );
                      }

                      if (!item.path || !item.icon) return null;

                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsProfileOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-mint-50 transition-colors duration-200 ${
                            isActive(item.path) ? 'bg-mint-50 text-mint-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                          {isActive(item.path) && (
                            <div className="ml-auto w-2 h-2 bg-mint-600 rounded-full"></div>
                          )}
                        </Link>
                      );
                    })}
                    
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('로그아웃', 'Sign Out')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth">
                <ModernButton size="sm" className="shadow-modern hover:shadow-modern-lg">
                  {t('로그인', 'Sign In')}
                </ModernButton>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-mint-600 focus:outline-none focus:text-mint-600 transition-colors duration-200 p-2 rounded-xl hover:bg-mint-50 hover-scale"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/60 shadow-modern">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {/* Main Navigation */}
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                  isActive(path)
                    ? 'bg-gradient-primary text-white shadow-modern'
                    : 'text-gray-700 hover:text-mint-600 hover:bg-mint-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}

            {/* User Menu Items for Mobile */}
            {user && (
              <>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="px-2 mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t('내 계정', 'My Account')}
                  </span>
                </div>
                
                {profileMenuItems.map((item, index) => {
                  if (item.type === 'divider') {
                    return (
                      <div key={index} className="px-2 py-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {item.label}
                        </span>
                      </div>
                    );
                  }

                  if (!item.path || !item.icon) return null;

                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                        isActive(item.path) 
                          ? 'bg-gradient-primary text-white shadow-modern'
                          : 'text-gray-700 hover:text-mint-600 hover:bg-mint-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </>
            )}

            <div className="border-t border-gray-200 my-4"></div>
            
            {/* Language Selection for Mobile */}
            <div className="px-2 mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {t('언어 설정', 'Language')}
              </span>
            </div>
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  if (lang.code !== language) {
                    toggleLanguage();
                  }
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 w-full ${
                  lang.code === language
                    ? 'bg-mint-50 text-mint-600 border-2 border-mint-200'
                    : 'text-gray-700 hover:text-mint-600 hover:bg-mint-50'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
                {lang.code === language && (
                  <div className="ml-auto w-2 h-2 bg-mint-600 rounded-full"></div>
                )}
              </button>
            ))}

            {user ? (
              <>
                <div className="border-t border-gray-200 my-4"></div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t('로그아웃', 'Sign Out')}</span>
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 my-4"></div>
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2"
                >
                  <ModernButton size="sm" className="w-full shadow-modern">
                    {t('로그인', 'Sign In')}
                  </ModernButton>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

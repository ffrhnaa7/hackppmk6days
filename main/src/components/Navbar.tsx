import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Users, Calendar, User, Globe, LogOut, Settings, Bell, Search, Sparkles, Zap, Heart, Bookmark, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: t('홈', 'Home'), icon: <Home className="h-4 w-4" /> },
    { path: '/clubs', label: t('동아리', 'Clubs'), icon: <Users className="h-4 w-4" /> },
    { path: '/events', label: t('이벤트', 'Events'), icon: <Calendar className="h-4 w-4" /> },
  ];

  const userMenuItems = [
    { path: '/profile', label: t('프로필', 'Profile'), icon: <User className="h-4 w-4" /> },
    { path: '/my-applications', label: t('내 신청', 'My Applications'), icon: <FileText className="h-4 w-4" /> },
    { path: '/saved-clubs', label: t('저장한 동아리', 'Saved Clubs'), icon: <Bookmark className="h-4 w-4" /> },
    { path: '/liked-clubs', label: t('좋아한 동아리', 'Liked Clubs'), icon: <Heart className="h-4 w-4" /> },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const notifications = [
    { id: 1, text: t('새로운 이벤트가 등록되었습니다', 'New event has been registered'), time: '5분 전' },
    { id: 2, text: t('동아리 신청이 승인되었습니다', 'Your club application was approved'), time: '1시간 전' },
    { id: 3, text: t('내일 이벤트가 있습니다', 'You have an event tomorrow'), time: '3시간 전' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-2xl shadow-2xl border-b border-white/50' 
        : 'bg-gradient-to-r from-mint-500/95 via-ocean-500/95 to-sage-500/95 backdrop-blur-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`relative p-3 rounded-2xl transition-all duration-300 ${
              scrolled 
                ? 'bg-gradient-to-br from-mint-500 to-ocean-500 shadow-lg group-hover:shadow-xl' 
                : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'
            }`}>
              <Zap className={`h-7 w-7 ${scrolled ? 'text-white' : 'text-white'}`} />
              <div className="absolute -top-1 -right-1">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-mint-500"></span>
                </span>
              </div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold tracking-tight ${
                scrolled ? 'text-gradient' : 'text-white'
              }`}>
                6DAYS
              </h1>
              <p className={`text-xs font-medium ${
                scrolled ? 'text-gray-500' : 'text-white/80'
              }`}>
                {t('라이프스타일 플랫폼', 'Lifestyle Platform')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? scrolled 
                      ? 'nav-link-active' 
                      : 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : scrolled
                      ? 'text-gray-600 hover:text-mint-600 hover:bg-mint-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${
                scrolled ? 'text-gray-400' : 'text-white/60'
              }`} />
              <input
                type="text"
                placeholder={t('검색...', 'Search...')}
                className={`w-full pl-12 pr-4 py-3 rounded-2xl transition-all duration-300 ${
                  scrolled
                    ? 'bg-gray-50 border-2 border-gray-200 focus:border-mint-400 focus:ring-4 focus:ring-mint-100'
                    : 'bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/60 focus:bg-white/30 focus:border-white/50'
                }`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Sparkles className={`h-5 w-5 ${scrolled ? 'text-mint-500' : 'text-white/80'} animate-pulse`} />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-medium transition-all duration-300 ${
                scrolled
                  ? 'bg-gray-50 text-gray-600 hover:bg-mint-50 hover:text-mint-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{language === 'ko' ? 'EN' : '한'}</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2.5 rounded-2xl transition-all duration-300 ${
                  scrolled
                    ? 'bg-gray-50 text-gray-600 hover:bg-mint-50 hover:text-mint-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white">
                    <h3 className="font-semibold">{t('알림', 'Notifications')}</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <p className="text-sm text-gray-700">{notif.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className={`flex items-center space-x-3 px-4 py-2.5 rounded-2xl transition-all duration-300 ${
                  scrolled
                    ? 'bg-gradient-to-r from-mint-500 to-ocean-500 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}>
                  <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="font-medium hidden sm:block">{user.email?.split('@')[0]}</span>
                </button>

                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">{user.email?.split('@')[0]}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="py-2">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-mint-50 hover:text-mint-600 transition-colors"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('로그아웃', 'Sign Out')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className={`px-6 py-2.5 rounded-2xl font-medium transition-all duration-300 ${
                  scrolled
                    ? 'bg-gradient-to-r from-mint-500 to-ocean-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-white text-mint-600 hover:bg-white/90 shadow-lg'
                }`}
              >
                {t('로그인', 'Sign In')}
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2.5 rounded-2xl transition-all duration-300 ${
                scrolled
                  ? 'bg-gray-50 text-gray-600 hover:bg-mint-50'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-mint-500 to-ocean-500 text-white shadow-lg'
                      : scrolled
                        ? 'text-gray-600 hover:bg-mint-50 hover:text-mint-600'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              {user && userMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    scrolled
                      ? 'text-gray-600 hover:bg-mint-50 hover:text-mint-600'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

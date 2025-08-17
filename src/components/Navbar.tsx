import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Calendar, 
  Compass, 
  Users, 
  Bookmark,
  Menu, 
  X, 
  LogOut, 
  Settings,
  Globe
} from 'lucide-react';
import { ColorfulButton } from './ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const navItems = [
    { path: '/', icon: Home, label: t('홈', 'Home') },
    { path: '/explore', icon: Compass, label: t('탐색', 'Explore') },
    { path: '/clubs', icon: Users, label: t('동아리', 'Clubs') },
    ...(user ? [{ path: '/saved-clubs', icon: Bookmark, label: t('저장된 동아리', 'Saved Clubs') }] : []),
    ...(user ? [{ path: '/profile', icon: User, label: t('프로필', 'Profile') }] : [])
  ];

  const NavLink: React.FC<{ item: typeof navItems[0] }> = ({ item }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;
    
    return (
      <Link
        to={item.path}
        className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
          isActive
            ? 'bg-gradient-primary text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <Icon className="h-5 w-5" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                6DAYS
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                {t('6일 활동, 1일 휴식', '6 Days Active, 1 Day Rest')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <ColorfulButton
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === 'ko' ? 'EN' : '한국어'}
            </ColorfulButton>

            {/* User Menu or Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.email?.split('@')[0]}
                  </span>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">{t('프로필', 'Profile')}</span>
                    </Link>
                    <Link
                      to="/saved-clubs"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Bookmark className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">{t('저장된 동아리', 'Saved Clubs')}</span>
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">{t('로그아웃', 'Sign Out')}</span>
                    </button>
                  </div>
                )}

                {/* Click outside to close */}
                {showUserMenu && (
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                  />
                )}
              </div>
            ) : (
              <Link to="/auth">
                <ColorfulButton size="sm">
                  {t('로그인', 'Login')}
                </ColorfulButton>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
              
              {/* Mobile Language Toggle */}
              <ColorfulButton
                variant="outline"
                size="sm"
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="self-start"
              >
                <Globe className="h-4 w-4 mr-1" />
                {language === 'ko' ? 'EN' : '한국어'}
              </ColorfulButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

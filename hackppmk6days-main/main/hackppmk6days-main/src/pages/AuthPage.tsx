import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Calendar } from 'lucide-react';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { ColorfulInput } from '../components/ColorfulInput';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const AuthPage: React.FC = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const { t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp && password !== confirmPassword) {
      setError(t('비밀번호가 일치하지 않습니다', 'Passwords do not match'));
      return;
    }

    if (password.length < 6) {
      setError(t('비밀번호는 최소 6자 이상이어야 합니다', 'Password must be at least 6 characters'));
      return;
    }

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message || t('오류가 발생했습니다', 'An error occurred'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            6DAYS
          </h1>
          <p className="text-gray-600 mt-2">
            {t('6일 활동, 1일 휴식', '6 Days Active, 1 Day Rest')}
          </p>
        </div>

        <ColorfulCard>
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isSignUp ? t('회원가입', 'Sign Up') : t('로그인', 'Sign In')}
              </h2>
              <p className="text-gray-600">
                {isSignUp 
                  ? t('새 계정을 만들어 6DAYS를 시작하세요', 'Create a new account to get started with 6DAYS')
                  : t('계정에 로그인하여 6DAYS를 이용하세요', 'Sign in to your account to access 6DAYS')
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('이메일', 'Email')}
                </label>
                <ColorfulInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('이메일을 입력하세요', 'Enter your email')}
                  icon={<Mail className="h-5 w-5" />}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('비밀번호', 'Password')}
                </label>
                <div className="relative">
                  <ColorfulInput
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('비밀번호를 입력하세요', 'Enter your password')}
                    icon={<Lock className="h-5 w-5" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Sign Up only) */}
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('비밀번호 확인', 'Confirm Password')}
                  </label>
                  <ColorfulInput
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('비밀번호를 다시 입력하세요', 'Confirm your password')}
                    icon={<Lock className="h-5 w-5" />}
                    required
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <ColorfulButton
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading 
                  ? t('처리중...', 'Processing...')
                  : isSignUp 
                    ? t('회원가입', 'Sign Up')
                    : t('로그인', 'Sign In')
                }
              </ColorfulButton>
            </form>

            {/* Toggle Sign Up/Sign In */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isSignUp 
                  ? t('이미 계정이 있으신가요?', 'Already have an account?')
                  : t('계정이 없으신가요?', "Don't have an account?")
                }{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  className="text-mint-600 hover:text-mint-700 font-semibold"
                >
                  {isSignUp ? t('로그인', 'Sign In') : t('회원가입', 'Sign Up')}
                </button>
              </p>
            </div>

            {/* Features Preview */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                {t('6DAYS 기능', '6DAYS Features')}
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-mint-500 rounded-full"></div>
                  <span>{t('동아리 저장 및 관심표시', 'Save clubs and show interest')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{t('이벤트 RSVP 및 참여', 'RSVP and join events')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>{t('개인 프로필 관리', 'Manage personal profile')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{t('친구들과 공유', 'Share with friends')}</span>
                </div>
              </div>
            </div>
          </div>
        </ColorfulCard>
      </div>
    </div>
  );
};

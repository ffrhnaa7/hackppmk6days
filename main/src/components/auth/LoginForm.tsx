import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { ColorfulButton } from '../ColorfulButton';
import { ColorfulInput } from '../ColorfulInput';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onClose: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onClose }) => {
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    } else {
      onClose();
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {t('로그인', 'Sign In')}
        </h2>
        <p className="text-gray-600 mt-2">
          {t('캠퍼스커넥트에 오신 것을 환영합니다', 'Welcome back to CampusConnect')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
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

        <ColorfulButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? t('로그인 중...', 'Signing in...') : t('로그인', 'Sign In')}
        </ColorfulButton>

        <div className="text-center">
          <p className="text-gray-600">
            {t('계정이 없으신가요?', "Don't have an account?")}{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {t('회원가입', 'Sign up')}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

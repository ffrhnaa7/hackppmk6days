import React, { useState } from 'react';
import { Mail, Lock, User, GraduationCap, Eye, EyeOff, UserPlus } from 'lucide-react';
import { ColorfulButton } from '../ColorfulButton';
import { ColorfulInput } from '../ColorfulInput';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, onClose }) => {
  const { signUp } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const universities = [
    '서울대학교 (Seoul National University)',
    '연세대학교 (Yonsei University)', 
    '고려대학교 (Korea University)',
    '카이스트 (KAIST)',
    '포스텍 (POSTECH)',
    '성균관대학교 (Sungkyunkwan University)',
    '한양대학교 (Hanyang University)',
    '중앙대학교 (Chung-Ang University)',
    '경희대학교 (Kyung Hee University)',
    '이화여자대학교 (Ewha Womans University)'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('비밀번호가 일치하지 않습니다', 'Passwords do not match'));
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(t('비밀번호는 최소 6자 이상이어야 합니다', 'Password must be at least 6 characters'));
      setLoading(false);
      return;
    }

    const { error } = await signUp(formData.email, formData.password, {
      name: formData.name,
      university: formData.university
    });

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
        <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {t('회원가입', 'Sign Up')}
        </h2>
        <p className="text-gray-600 mt-2">
          {t('캠퍼스커넥트에서 새로운 경험을 시작하세요', 'Start your journey with CampusConnect')}
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
            {t('이름', 'Name')}
          </label>
          <ColorfulInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('이름을 입력하세요', 'Enter your name')}
            icon={<User className="h-5 w-5" />}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('대학교', 'University')}
          </label>
          <div className="relative">
            <select
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              required
            >
              <option value="">{t('대학교를 선택하세요', 'Select your university')}</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('이메일', 'Email')}
          </label>
          <ColorfulInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('비밀번호 확인', 'Confirm Password')}
          </label>
          <ColorfulInput
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={t('비밀번호를 다시 입력하세요', 'Confirm your password')}
            icon={<Lock className="h-5 w-5" />}
            required
          />
        </div>

        <ColorfulButton
          type="submit"
          variant="accent"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? t('가입 중...', 'Creating account...') : t('회원가입', 'Sign Up')}
        </ColorfulButton>

        <div className="text-center">
          <p className="text-gray-600">
            {t('이미 계정이 있으신가요?', 'Already have an account?')}{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {t('로그인', 'Sign in')}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

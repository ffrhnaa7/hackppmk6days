import React, { useState } from 'react';
import { X, Plus, Trash2, Save, AlertCircle, Check } from 'lucide-react';
import { ColorfulButton } from './ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';
import { useUserClubs } from '../hooks/useUserClubs';
import { CreateClubData } from '../types/userClub';

interface CreateClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateClubModal: React.FC<CreateClubModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { language, t } = useLanguage();
  const { createClub, loading } = useUserClubs();
  
  const [formData, setFormData] = useState<CreateClubData>({
    name: { ko: '', en: '' },
    description: { ko: '', en: '' },
    category: '문화',
    requirements: { ko: '', en: '' },
    activities: [{ ko: '', en: '' }],
    cultural_guide: { ko: '', en: '' },
    image: '',
    contact_email: '',
    social_media: {
      facebook: '',
      instagram: '',
      kakao: '',
      website: ''
    }
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const categories = [
    { value: '학술', label: { ko: '학술', en: 'Academic' } },
    { value: '문화', label: { ko: '문화', en: 'Cultural' } },
    { value: '취미', label: { ko: '취미', en: 'Hobby' } },
    { value: '봉사', label: { ko: '봉사', en: 'Volunteer' } },
    { value: '종교', label: { ko: '종교', en: 'Religious' } },
    { value: '체육', label: { ko: '체육', en: 'Sports' } },
    { value: '학생회', label: { ko: '학생회', en: 'Student Council' } }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, { ko: '', en: '' }]
    }));
  };

  const removeActivity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const updateActivity = (index: number, lang: 'ko' | 'en', value: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.map((activity, i) => 
        i === index ? { ...activity, [lang]: value } : activity
      )
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.ko.trim() || !formData.name.en.trim()) {
      setError(t('클럽 이름을 한국어와 영어로 모두 입력해주세요.', 'Please enter club name in both Korean and English.'));
      return false;
    }

    if (!formData.description.ko.trim() || !formData.description.en.trim()) {
      setError(t('클럽 설명을 한국어와 영어로 모두 입력해주세요.', 'Please enter club description in both Korean and English.'));
      return false;
    }

    if (formData.activities.length === 0 || !formData.activities[0].ko.trim()) {
      setError(t('최소 하나의 활동을 입력해주세요.', 'Please enter at least one activity.'));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    // Filter out empty activities
    const filteredActivities = formData.activities.filter(
      activity => activity.ko.trim() || activity.en.trim()
    );

    const clubData: CreateClubData = {
      ...formData,
      activities: filteredActivities,
      // Remove empty optional fields
      requirements: formData.requirements?.ko.trim() || formData.requirements?.en.trim() 
        ? formData.requirements 
        : undefined,
      cultural_guide: formData.cultural_guide?.ko.trim() || formData.cultural_guide?.en.trim() 
        ? formData.cultural_guide 
        : undefined,
      image: formData.image?.trim() || undefined,
      contact_email: formData.contact_email?.trim() || undefined,
      social_media: Object.values(formData.social_media || {}).some(v => v?.trim()) 
        ? formData.social_media 
        : undefined
    };

    const { data, error } = await createClub(clubData);

    if (error) {
      setError(error);
    } else if (data) {
      setSuccess(t('클럽이 성공적으로 생성되었습니다!', 'Club created successfully!'));
      setTimeout(() => {
        onSuccess();
        onClose();
        resetForm();
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormData({
      name: { ko: '', en: '' },
      description: { ko: '', en: '' },
      category: '문화',
      requirements: { ko: '', en: '' },
      activities: [{ ko: '', en: '' }],
      cultural_guide: { ko: '', en: '' },
      image: '',
      contact_email: '',
      social_media: {
        facebook: '',
        instagram: '',
        kakao: '',
        website: ''
      }
    });
    setError('');
    setSuccess('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('새 클럽 만들기', 'Create New Club')}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-800 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 rounded-lg bg-green-100 text-green-800 flex items-center">
              <Check className="h-5 w-5 mr-2" />
              {success}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {t('기본 정보', 'Basic Information')}
            </h3>

            {/* Club Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('클럽 이름 (한국어)', 'Club Name (Korean)')} *
                </label>
                <input
                  type="text"
                  value={formData.name.ko}
                  onChange={(e) => handleNestedInputChange('name', 'ko', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder={t('한국어 클럽 이름', 'Korean club name')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('클럽 이름 (영어)', 'Club Name (English)')} *
                </label>
                <input
                  type="text"
                  value={formData.name.en}
                  onChange={(e) => handleNestedInputChange('name', 'en', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder={t('영어 클럽 이름', 'English club name')}
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('카테고리', 'Category')} *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {language === 'ko' ? cat.label.ko : cat.label.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('클럽 설명 (한국어)', 'Club Description (Korean)')} *
                </label>
                <textarea
                  value={formData.description.ko}
                  onChange={(e) => handleNestedInputChange('description', 'ko', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder={t('클럽에 대한 한국어 설명', 'Korean description of the club')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('클럽 설명 (영어)', 'Club Description (English)')} *
                </label>
                <textarea
                  value={formData.description.en}
                  onChange={(e) => handleNestedInputChange('description', 'en', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder={t('영어 클럽 설명', 'English description of the club')}
                  required
                />
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {t('활동 내용', 'Activities')} *
              </h3>
              <ColorfulButton
                type="button"
                variant="outline"
                size="sm"
                onClick={addActivity}
              >
                <Plus className="h-4 w-4 mr-1" />
                {t('활동 추가', 'Add Activity')}
              </ColorfulButton>
            </div>

            {formData.activities.map((activity, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">
                    {t('활동', 'Activity')} {index + 1}
                  </span>
                  {formData.activities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeActivity(index)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={activity.ko}
                    onChange={(e) => updateActivity(index, 'ko', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder={t('한국어 활동 설명', 'Korean activity description')}
                  />
                  <input
                    type="text"
                    value={activity.en}
                    onChange={(e) => updateActivity(index, 'en', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder={t('영어 활동 설명', 'English activity description')}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Optional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {t('추가 정보 (선택사항)', 'Additional Information (Optional)')}
            </h3>

            {/* Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('가입 요건 (한국어)', 'Requirements (Korean)')}
                </label>
                <textarea
                  value={formData.requirements?.ko || ''}
                  onChange={(e) => handleNestedInputChange('requirements', 'ko', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder={t('가입 요건 설명', 'Requirements description')}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('가입 요건 (영어)', 'Requirements (English)')}
                </label>
                <textarea
                  value={formData.requirements?.en || ''}
                  onChange={(e) => handleNestedInputChange('requirements', 'en', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder={t('영어 요건 설명', 'English requirements description')}
                />
              </div>
            </div>

            {/* Cultural Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('문화 가이드 (한국어)', 'Cultural Guide (Korean)')}
                </label>
                <textarea
                  value={formData.cultural_guide?.ko || ''}
                  onChange={(e) => handleNestedInputChange('cultural_guide', 'ko', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder={t('클럽 문화에 대한 설명', 'Description of club culture')}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('문화 가이드 (영어)', 'Cultural Guide (English)')}
                </label>
                <textarea
                  value={formData.cultural_guide?.en || ''}
                  onChange={(e) => handleNestedInputChange('cultural_guide', 'en', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder={t('영어 문화 가이드', 'English cultural guide')}
                />
              </div>
            </div>

            {/* Contact & Social Media */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('연락처 이메일', 'Contact Email')}
                </label>
                <input
                  type="email"
                  value={formData.contact_email || ''}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder={t('클럽 연락처 이메일', 'Club contact email')}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('클럽 이미지 URL', 'Club Image URL')}
                </label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook</label>
                <input
                  type="text"
                  value={formData.social_media?.facebook || ''}
                  onChange={(e) => handleNestedInputChange('social_media', 'facebook', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="@clubname"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram</label>
                <input
                  type="text"
                  value={formData.social_media?.instagram || ''}
                  onChange={(e) => handleNestedInputChange('social_media', 'instagram', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="@clubname"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">KakaoTalk</label>
                <input
                  type="text"
                  value={formData.social_media?.kakao || ''}
                  onChange={(e) => handleNestedInputChange('social_media', 'kakao', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Open Chat Link"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.social_media?.website || ''}
                  onChange={(e) => handleNestedInputChange('social_media', 'website', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="https://clubwebsite.com"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <ColorfulButton
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              {t('취소', 'Cancel')}
            </ColorfulButton>
            <ColorfulButton
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {loading ? t('생성 중...', 'Creating...') : t('클럽 생성', 'Create Club')}
            </ColorfulButton>
          </div>
        </form>
      </div>
    </div>
  );
};

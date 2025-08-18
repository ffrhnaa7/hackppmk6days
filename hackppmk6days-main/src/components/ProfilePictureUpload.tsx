import React, { useRef, useState } from 'react';
import { Camera, Upload, X, Loader2, User, Trash2 } from 'lucide-react';
import { ColorfulButton } from './ColorfulButton';
import { useProfilePicture } from '../hooks/useProfilePicture';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfilePictureUploadProps {
  currentImageUrl?: string | null;
  currentImagePath?: string | null;
  onImageUpdate: (url: string | null, path: string | null) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  currentImageUrl,
  currentImagePath,
  onImageUpdate,
  size = 'lg',
  className = ''
}) => {
  const { t } = useLanguage();
  const { uploading, uploadProfilePicture, deleteProfilePicture } = useProfilePicture();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const handleFileSelect = (file: File) => {
    setError('');
    setSuccess('');
    uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    const result = await uploadProfilePicture(file);
    
    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      setSuccess(t('프로필 사진이 업로드되었습니다!', 'Profile picture uploaded successfully!'));
      onImageUpdate(result.url, `${file.name}`);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleDelete = async () => {
    if (!currentImagePath) return;
    
    setError('');
    setSuccess('');
    
    const result = await deleteProfilePicture(currentImagePath);
    
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(t('프로필 사진이 삭제되었습니다!', 'Profile picture deleted successfully!'));
      onImageUpdate(null, null);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Profile Picture Display */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 overflow-hidden bg-gradient-primary flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-blue-400 ${
            dragOver ? 'border-blue-500 scale-105' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          {uploading ? (
            <Loader2 className={`${iconSizes[size]} text-white animate-spin`} />
          ) : currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className={`${iconSizes[size]} text-white`} />
          )}
        </div>

        {/* Upload Overlay */}
        {!uploading && (
          <button
            onClick={triggerFileInput}
            className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
            title={t('프로필 사진 변경', 'Change profile picture')}
          >
            <Camera className="h-4 w-4" />
          </button>
        )}

        {/* Delete Button */}
        {currentImageUrl && !uploading && (
          <button
            onClick={handleDelete}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
            title={t('프로필 사진 삭제', 'Delete profile picture')}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Upload Instructions */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">
          {t('프로필 사진을 클릭하거나 드래그하여 업로드하세요', 'Click or drag to upload profile picture')}
        </p>
        <p className="text-xs text-gray-500">
          {t('JPEG, PNG, WebP 형식, 최대 5MB', 'JPEG, PNG, WebP formats, max 5MB')}
        </p>
      </div>

      {/* Upload Button */}
      <div className="flex space-x-2">
        <ColorfulButton
          variant="outline"
          size="sm"
          onClick={triggerFileInput}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          {uploading ? t('업로드 중...', 'Uploading...') : t('사진 선택', 'Choose Photo')}
        </ColorfulButton>

        {currentImageUrl && (
          <ColorfulButton
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={uploading}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            {t('삭제', 'Remove')}
          </ColorfulButton>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Success Message */}
      {success && (
        <div className="p-3 rounded-lg bg-green-100 text-green-800 text-sm text-center max-w-xs">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-100 text-red-800 text-sm text-center max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
};

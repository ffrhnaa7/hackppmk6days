import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface UseProfilePictureReturn {
  uploading: boolean;
  uploadProfilePicture: (file: File) => Promise<{ url: string | null; error: string | null }>;
  deleteProfilePicture: (path: string) => Promise<{ error: string | null }>;
  getProfilePictureUrl: (path: string) => string;
}

export const useProfilePicture = (): UseProfilePictureReturn => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);

  const uploadProfilePicture = useCallback(async (file: File) => {
    if (!user) {
      return { url: null, error: 'User not authenticated' };
    }

    setUploading(true);

    try {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return { url: null, error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.' };
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return { url: null, error: 'File size too large. Please upload images smaller than 5MB.' };
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Delete existing profile picture if it exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('profile_picture_path')
        .eq('id', user.id)
        .single();

      if (existingProfile?.profile_picture_path) {
        await supabase.storage
          .from('profile-pictures')
          .remove([existingProfile.profile_picture_path]);
      }

      // Upload new file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return { url: null, error: uploadError.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(uploadData.path);

      const publicUrl = urlData.publicUrl;

      // Update profile with new picture URL and path
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          profile_picture_url: publicUrl,
          profile_picture_path: uploadData.path,
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        console.error('Profile update error:', updateError);
        return { url: null, error: updateError.message };
      }

      return { url: publicUrl, error: null };
    } catch (error: any) {
      console.error('Unexpected error:', error);
      return { url: null, error: error.message || 'An unexpected error occurred' };
    } finally {
      setUploading(false);
    }
  }, [user]);

  const deleteProfilePicture = useCallback(async (path: string) => {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    try {
      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from('profile-pictures')
        .remove([path]);

      if (deleteError) {
        console.error('Delete error:', deleteError);
        return { error: deleteError.message };
      }

      // Update profile to remove picture URL and path
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          profile_picture_url: null,
          profile_picture_path: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        return { error: updateError.message };
      }

      return { error: null };
    } catch (error: any) {
      console.error('Unexpected error:', error);
      return { error: error.message || 'An unexpected error occurred' };
    }
  }, [user]);

  const getProfilePictureUrl = useCallback((path: string) => {
    const { data } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(path);
    
    return data.publicUrl;
  }, []);

  return {
    uploading,
    uploadProfilePicture,
    deleteProfilePicture,
    getProfilePictureUrl
  };
};

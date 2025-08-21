import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface ClubInteractions {
  isSaved: boolean;
  isHearted: boolean;
  hasApplied: boolean;
  applicationStatus: string;
  savedCount: number;
  heartsCount: number;
  sharesCount: number;
  applicationsCount: number;
}

export const useClubInteractions = (clubId: string) => {
  const { user } = useAuth();
  const [interactions, setInteractions] = useState<ClubInteractions>({
    isSaved: false,
    isHearted: false,
    hasApplied: false,
    applicationStatus: 'none',
    savedCount: 0,
    heartsCount: 0,
    sharesCount: 0,
    applicationsCount: 0
  });
  const [loading, setLoading] = useState(true);

  const loadInteractions = useCallback(async () => {
    if (!clubId) return;
    
    try {
      setLoading(true);
      console.log('Loading interactions for club:', clubId, 'user:', user?.id);

      // Get interaction counts - this should work for everyone
      const { data: counts, error: countsError } = await supabase
        .rpc('get_club_interaction_counts', { club_uuid: clubId });

      if (countsError) {
        console.error('Error loading counts:', countsError);
      }

      const countsData = counts?.[0] || { 
        applications_count: 0, 
        saved_count: 0, 
        hearts_count: 0, 
        shares_count: 0 
      };
      console.log('Counts data:', countsData);

      let userInteractions = { 
        has_applied: false, 
        application_status: 'none', 
        is_saved: false, 
        is_hearted: false 
      };

      // Get user-specific interactions if logged in
      if (user) {
        const { data: userData, error: userError } = await supabase
          .rpc('get_user_club_interactions', { 
            user_uuid: user.id, 
            club_uuid: clubId 
          });

        if (userError) {
          console.error('Error loading user interactions:', userError);
        } else {
          userInteractions = userData?.[0] || { 
            has_applied: false, 
            application_status: 'none', 
            is_saved: false, 
            is_hearted: false 
          };
          console.log('User interactions:', userInteractions);
        }
      }

      setInteractions({
        isSaved: userInteractions.is_saved,
        isHearted: userInteractions.is_hearted,
        hasApplied: userInteractions.has_applied,
        applicationStatus: userInteractions.application_status,
        savedCount: Number(countsData.saved_count) || 0,
        heartsCount: Number(countsData.hearts_count) || 0,
        sharesCount: Number(countsData.shares_count) || 0,
        applicationsCount: Number(countsData.applications_count) || 0
      });
    } catch (error) {
      console.error('Error loading club interactions:', error);
    } finally {
      setLoading(false);
    }
  }, [clubId, user]);

  useEffect(() => {
    loadInteractions();
  }, [loadInteractions]);

  const applyToClub = useCallback(async (applicationMessage?: string) => {
    if (!user || !clubId) {
      console.log('User not authenticated or no club ID');
      return;
    }

    console.log('Applying to club:', clubId, 'with message:', applicationMessage);

    try {
      const { error } = await supabase
        .from('club_applications')
        .insert({
          user_id: user.id,
          club_id: clubId,
          application_message: applicationMessage || null,
          status: 'pending'
        });

      if (error) {
        console.error('Error applying to club:', error);
        return;
      }

      console.log('Successfully applied to club');
      setInteractions(prev => ({
        ...prev,
        hasApplied: true,
        applicationStatus: 'pending',
        applicationsCount: prev.applicationsCount + 1
      }));
    } catch (error) {
      console.error('Error applying to club:', error);
    }
  }, [user, clubId]);

  const withdrawApplication = useCallback(async () => {
    if (!user || !clubId) {
      console.log('User not authenticated or no club ID');
      return;
    }

    console.log('Withdrawing application for club:', clubId);

    try {
      const { error } = await supabase
        .from('club_applications')
        .update({ status: 'withdrawn' })
        .eq('user_id', user.id)
        .eq('club_id', clubId);

      if (error) {
        console.error('Error withdrawing application:', error);
        return;
      }

      console.log('Successfully withdrew application');
      setInteractions(prev => ({
        ...prev,
        applicationStatus: 'withdrawn'
      }));
    } catch (error) {
      console.error('Error withdrawing application:', error);
    }
  }, [user, clubId]);

  const toggleSaved = useCallback(async () => {
    if (!user || !clubId) {
      console.log('User not authenticated or no club ID');
      return;
    }

    console.log('Toggling saved for club:', clubId, 'current state:', interactions.isSaved);

    try {
      if (interactions.isSaved) {
        // Remove from saved
        const { error } = await supabase
          .from('saved_clubs')
          .delete()
          .eq('user_id', user.id)
          .eq('club_id', clubId);

        if (error) {
          console.error('Error removing saved club:', error);
          return;
        }

        console.log('Successfully removed from saved');
        setInteractions(prev => ({
          ...prev,
          isSaved: false,
          savedCount: Math.max(0, prev.savedCount - 1)
        }));
      } else {
        // Add to saved
        const { error } = await supabase
          .from('saved_clubs')
          .insert({
            user_id: user.id,
            club_id: clubId
          });

        if (error) {
          console.error('Error adding saved club:', error);
          return;
        }

        console.log('Successfully added to saved');
        setInteractions(prev => ({
          ...prev,
          isSaved: true,
          savedCount: prev.savedCount + 1
        }));
      }
    } catch (error) {
      console.error('Error toggling saved club:', error);
    }
  }, [user, clubId, interactions.isSaved]);

  const toggleHeart = useCallback(async () => {
    if (!user || !clubId) {
      console.log('User not authenticated or no club ID');
      return;
    }

    console.log('Toggling heart for club:', clubId, 'current state:', interactions.isHearted);

    try {
      if (interactions.isHearted) {
        // Remove heart
        const { error } = await supabase
          .from('club_hearts')
          .delete()
          .eq('user_id', user.id)
          .eq('club_id', clubId);

        if (error) {
          console.error('Error removing club heart:', error);
          return;
        }

        console.log('Successfully removed heart');
        setInteractions(prev => ({
          ...prev,
          isHearted: false,
          heartsCount: Math.max(0, prev.heartsCount - 1)
        }));
      } else {
        // Add heart
        const { error } = await supabase
          .from('club_hearts')
          .insert({
            user_id: user.id,
            club_id: clubId
          });

        if (error) {
          console.error('Error adding club heart:', error);
          return;
        }

        console.log('Successfully added heart');
        setInteractions(prev => ({
          ...prev,
          isHearted: true,
          heartsCount: prev.heartsCount + 1
        }));
      }
    } catch (error) {
      console.error('Error toggling club heart:', error);
    }
  }, [user, clubId, interactions.isHearted]);

  const shareClub = useCallback(async (shareType: 'link' | 'email' | 'social' = 'link') => {
    if (!user || !clubId) {
      console.log('User not authenticated or no club ID');
      return;
    }

    try {
      const { error } = await supabase
        .from('club_shares')
        .insert({
          user_id: user.id,
          club_id: clubId,
          share_type: shareType
        });

      if (error) {
        console.error('Error sharing club:', error);
        return;
      }

      setInteractions(prev => ({
        ...prev,
        sharesCount: prev.sharesCount + 1
      }));
    } catch (error) {
      console.error('Error sharing club:', error);
    }
  }, [user, clubId]);

  return {
    interactions,
    loading,
    applyToClub,
    withdrawApplication,
    toggleSaved,
    toggleHeart,
    shareClub
  };
};

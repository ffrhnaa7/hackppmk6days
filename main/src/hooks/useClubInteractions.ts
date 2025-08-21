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

/**
 * Custom hook for managing club interactions
 * 
 * Handles all user interactions with a club including saving, liking,
 * applying, and sharing. Provides optimistic updates and error handling.
 * 
 * @param clubId - The ID of the club to interact with
 * @returns Object containing interaction states and methods
 */
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
  const [error, setError] = useState<string | null>(null);

  /**
   * Load interaction data from the database
   */
  const loadInteractions = useCallback(async () => {
    if (!clubId) return;
    
    try {
      setLoading(true);
      setError(null);

      // Get interaction counts - this should work for everyone
      const { data: counts, error: countsError } = await supabase
        .rpc('get_club_interaction_counts', { club_uuid: clubId });

      if (countsError) {
        console.error('Error loading counts:', countsError);
        setError(countsError.message);
      }

      const countsData = counts?.[0] || { 
        applications_count: 0, 
        saved_count: 0, 
        hearts_count: 0, 
        shares_count: 0 
      };

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
          userInteractions = userData?.[0] || userInteractions;
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
      setError(error instanceof Error ? error.message : 'Failed to load interactions');
    } finally {
      setLoading(false);
    }
  }, [clubId, user]);

  useEffect(() => {
    loadInteractions();
  }, [loadInteractions]);

  /**
   * Apply to join the club
   */
  const applyToClub = useCallback(async (applicationMessage?: string) => {
    if (!user || !clubId) {
      setError('User not authenticated or no club ID');
      return;
    }

    try {
      setError(null);
      
      // Optimistic update
      setInteractions(prev => ({
        ...prev,
        hasApplied: true,
        applicationStatus: 'pending',
        applicationsCount: prev.applicationsCount + 1
      }));

      const { error } = await supabase
        .from('club_applications')
        .insert({
          user_id: user.id,
          club_id: clubId,
          application_message: applicationMessage || null,
          status: 'pending'
        });

      if (error) {
        // Revert optimistic update
        setInteractions(prev => ({
          ...prev,
          hasApplied: false,
          applicationStatus: 'none',
          applicationsCount: Math.max(0, prev.applicationsCount - 1)
        }));
        throw error;
      }
    } catch (error) {
      console.error('Error applying to club:', error);
      setError(error instanceof Error ? error.message : 'Failed to apply');
      throw error;
    }
  }, [user, clubId]);

  /**
   * Withdraw application from the club
   */
  const withdrawApplication = useCallback(async () => {
    if (!user || !clubId) {
      setError('User not authenticated or no club ID');
      return;
    }

    try {
      setError(null);
      
      const { error } = await supabase
        .from('club_applications')
        .update({ status: 'withdrawn' })
        .eq('user_id', user.id)
        .eq('club_id', clubId);

      if (error) throw error;

      setInteractions(prev => ({
        ...prev,
        applicationStatus: 'withdrawn'
      }));
    } catch (error) {
      console.error('Error withdrawing application:', error);
      setError(error instanceof Error ? error.message : 'Failed to withdraw');
      throw error;
    }
  }, [user, clubId]);

  /**
   * Toggle saved status for the club
   */
  const toggleSaved = useCallback(async () => {
    if (!user || !clubId) {
      setError('User not authenticated or no club ID');
      return;
    }

    try {
      setError(null);
      const newSavedState = !interactions.isSaved;
      
      // Optimistic update
      setInteractions(prev => ({
        ...prev,
        isSaved: newSavedState,
        savedCount: newSavedState 
          ? prev.savedCount + 1 
          : Math.max(0, prev.savedCount - 1)
      }));

      if (newSavedState) {
        const { error } = await supabase
          .from('saved_clubs')
          .insert({
            user_id: user.id,
            club_id: clubId
          });

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('saved_clubs')
          .delete()
          .eq('user_id', user.id)
          .eq('club_id', clubId);

        if (error) throw error;
      }
    } catch (error) {
      // Revert optimistic update
      setInteractions(prev => ({
        ...prev,
        isSaved: !prev.isSaved,
        savedCount: prev.isSaved 
          ? Math.max(0, prev.savedCount - 1)
          : prev.savedCount + 1
      }));
      console.error('Error toggling saved club:', error);
      setError(error instanceof Error ? error.message : 'Failed to save');
    }
  }, [user, clubId, interactions.isSaved]);

  /**
   * Toggle heart/like status for the club
   */
  const toggleHeart = useCallback(async () => {
    if (!user || !clubId) {
      setError('User not authenticated or no club ID');
      return;
    }

    try {
      setError(null);
      const newHeartState = !interactions.isHearted;
      
      // Optimistic update
      setInteractions(prev => ({
        ...prev,
        isHearted: newHeartState,
        heartsCount: newHeartState 
          ? prev.heartsCount + 1 
          : Math.max(0, prev.heartsCount - 1)
      }));

      if (newHeartState) {
        const { error } = await supabase
          .from('club_hearts')
          .insert({
            user_id: user.id,
            club_id: clubId
          });

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('club_hearts')
          .delete()
          .eq('user_id', user.id)
          .eq('club_id', clubId);

        if (error) throw error;
      }
    } catch (error) {
      // Revert optimistic update
      setInteractions(prev => ({
        ...prev,
        isHearted: !prev.isHearted,
        heartsCount: prev.isHearted 
          ? Math.max(0, prev.heartsCount - 1)
          : prev.heartsCount + 1
      }));
      console.error('Error toggling club heart:', error);
      setError(error instanceof Error ? error.message : 'Failed to like');
    }
  }, [user, clubId, interactions.isHearted]);

  /**
   * Share the club
   */
  const shareClub = useCallback(async (shareType: 'link' | 'email' | 'social' = 'link') => {
    if (!clubId) return;

    try {
      setError(null);
      
      // Track share even for non-authenticated users
      if (user) {
        const { error } = await supabase
          .from('club_shares')
          .insert({
            user_id: user.id,
            club_id: clubId,
            share_type: shareType
          });

        if (error) {
          console.error('Error tracking share:', error);
        }
      }

      setInteractions(prev => ({
        ...prev,
        sharesCount: prev.sharesCount + 1
      }));

      // Handle actual sharing
      if (shareType === 'link' && navigator.share) {
        await navigator.share({
          title: 'Check out this club!',
          url: window.location.href
        });
      }
    } catch (error) {
      console.error('Error sharing club:', error);
      setError(error instanceof Error ? error.message : 'Failed to share');
    }
  }, [clubId, user]);

  // ✅ Return all values and functions
  return {
    interactions,
    loading,
    error,
    applyToClub,
    withdrawApplication,
    toggleSaved,
    toggleHeart,
    shareClub,
    reload: loadInteractions
  };
};

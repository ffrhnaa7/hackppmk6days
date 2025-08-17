import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface ClubInteractions {
  isSaved: boolean;
  isHearted: boolean;
  savedCount: number;
  heartsCount: number;
  sharesCount: number;
}

export const useClubInteractions = (clubId: string) => {
  const { user } = useAuth();
  const [interactions, setInteractions] = useState<ClubInteractions>({
    isSaved: false,
    isHearted: false,
    savedCount: 0,
    heartsCount: 0,
    sharesCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clubId) {
      loadInteractions();
    }
  }, [clubId, user]);

  const loadInteractions = async () => {
    try {
      setLoading(true);

      // Get interaction counts
      const { data: counts } = await supabase
        .rpc('get_club_interaction_counts', { club_uuid: clubId });

      const countsData = counts?.[0] || { saved_count: 0, hearts_count: 0, shares_count: 0 };

      let userInteractions = { is_saved: false, is_hearted: false };

      // Get user-specific interactions if logged in
      if (user) {
        const { data: userData } = await supabase
          .rpc('get_user_club_interactions', { 
            user_uuid: user.id, 
            club_uuid: clubId 
          });

        userInteractions = userData?.[0] || { is_saved: false, is_hearted: false };
      }

      setInteractions({
        isSaved: userInteractions.is_saved,
        isHearted: userInteractions.is_hearted,
        savedCount: Number(countsData.saved_count),
        heartsCount: Number(countsData.hearts_count),
        sharesCount: Number(countsData.shares_count)
      });
    } catch (error) {
      console.error('Error loading club interactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaved = async () => {
    if (!user) return;

    try {
      if (interactions.isSaved) {
        // Remove from saved
        await supabase
          .from('saved_clubs')
          .delete()
          .eq('user_id', user.id)
          .eq('club_id', clubId);

        setInteractions(prev => ({
          ...prev,
          isSaved: false,
          savedCount: Math.max(0, prev.savedCount - 1)
        }));
      } else {
        // Add to saved
        await supabase
          .from('saved_clubs')
          .insert({
            user_id: user.id,
            club_id: clubId
          });

        setInteractions(prev => ({
          ...prev,
          isSaved: true,
          savedCount: prev.savedCount + 1
        }));
      }
    } catch (error) {
      console.error('Error toggling saved club:', error);
    }
  };

  const toggleHeart = async () => {
    if (!user) return;

    try {
      if (interactions.isHearted) {
        // Remove heart
        await supabase
          .from('club_hearts')
          .delete()
          .eq('user_id', user.id)
          .eq('club_id', clubId);

        setInteractions(prev => ({
          ...prev,
          isHearted: false,
          heartsCount: Math.max(0, prev.heartsCount - 1)
        }));
      } else {
        // Add heart
        await supabase
          .from('club_hearts')
          .insert({
            user_id: user.id,
            club_id: clubId
          });

        setInteractions(prev => ({
          ...prev,
          isHearted: true,
          heartsCount: prev.heartsCount + 1
        }));
      }
    } catch (error) {
      console.error('Error toggling club heart:', error);
    }
  };

  const shareClub = async (shareType: 'link' | 'email' | 'social' = 'link') => {
    if (!user) return;

    try {
      await supabase
        .from('club_shares')
        .insert({
          user_id: user.id,
          club_id: clubId,
          share_type: shareType
        });

      setInteractions(prev => ({
        ...prev,
        sharesCount: prev.sharesCount + 1
      }));
    } catch (error) {
      console.error('Error sharing club:', error);
    }
  };

  return {
    interactions,
    loading,
    toggleSaved,
    toggleHeart,
    shareClub
  };
};

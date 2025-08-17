import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface RSVPStatus {
  status: 'attending' | 'maybe' | 'not_attending' | null;
  attendingCount: number;
  maybeCount: number;
  totalCount: number;
  isLoading: boolean;
}

export const useRSVP = (eventId: string) => {
  const { user } = useAuth();
  const [rsvpData, setRSVPData] = useState<RSVPStatus>({
    status: null,
    attendingCount: 0,
    maybeCount: 0,
    totalCount: 0,
    isLoading: true
  });

  // Fetch RSVP status and counts
  const fetchRSVPData = useCallback(async () => {
    if (!eventId) return;

    try {
      setRSVPData(prev => ({ ...prev, isLoading: true }));
      console.log('Fetching RSVP data for event:', eventId, 'user:', user?.id);

      // Get user's RSVP status if logged in
      let userStatus = null;
      if (user) {
        const { data: userRSVP, error: userError } = await supabase
          .from('event_rsvps')
          .select('status')
          .eq('event_id', eventId)
          .eq('user_id', user.id)
          .single();
        
        if (userError && userError.code !== 'PGRST116') {
          console.error('Error fetching user RSVP:', userError);
        }
        
        userStatus = userRSVP?.status || null;
        console.log('User RSVP status:', userStatus);
      }

      // Get RSVP counts using the function
      const { data: counts, error: countsError } = await supabase
        .rpc('get_event_rsvp_counts', { event_uuid: eventId });

      if (countsError) {
        console.error('Error fetching RSVP counts:', countsError);
      }

      const countsData = counts?.[0] || { attending_count: 0, maybe_count: 0, total_count: 0 };
      console.log('RSVP counts:', countsData);

      setRSVPData({
        status: userStatus,
        attendingCount: Number(countsData.attending_count) || 0,
        maybeCount: Number(countsData.maybe_count) || 0,
        totalCount: Number(countsData.total_count) || 0,
        isLoading: false
      });
    } catch (error) {
      console.error('Error fetching RSVP data:', error);
      setRSVPData(prev => ({ ...prev, isLoading: false }));
    }
  }, [eventId, user]);

  // Update RSVP status
  const updateRSVP = useCallback(async (status: 'attending' | 'maybe' | 'not_attending') => {
    if (!user || !eventId) {
      console.log('User not authenticated or no event ID');
      return { error: 'User not authenticated' };
    }

    console.log('Updating RSVP to:', status, 'for event:', eventId);

    try {
      const { error } = await supabase
        .from('event_rsvps')
        .upsert({
          event_id: eventId,
          user_id: user.id,
          status: status,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,event_id'
        });

      if (error) {
        console.error('Error updating RSVP:', error);
        return { error: error.message };
      }

      console.log('Successfully updated RSVP');
      // Refresh data after update
      await fetchRSVPData();
      return { error: null };
    } catch (error) {
      console.error('Error updating RSVP:', error);
      return { error: error.message };
    }
  }, [user, eventId, fetchRSVPData]);

  // Remove RSVP
  const removeRSVP = useCallback(async () => {
    if (!user || !eventId) {
      console.log('User not authenticated or no event ID');
      return { error: 'User not authenticated' };
    }

    console.log('Removing RSVP for event:', eventId);

    try {
      const { error } = await supabase
        .from('event_rsvps')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error removing RSVP:', error);
        return { error: error.message };
      }

      console.log('Successfully removed RSVP');
      // Refresh data after removal
      await fetchRSVPData();
      return { error: null };
    } catch (error) {
      console.error('Error removing RSVP:', error);
      return { error: error.message };
    }
  }, [user, eventId, fetchRSVPData]);

  useEffect(() => {
    fetchRSVPData();
  }, [fetchRSVPData]);

  return {
    ...rsvpData,
    updateRSVP,
    removeRSVP,
    refreshData: fetchRSVPData
  };
};

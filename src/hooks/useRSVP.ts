import { useState, useEffect } from 'react';
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
  const fetchRSVPData = async () => {
    if (!eventId) return;

    try {
      setRSVPData(prev => ({ ...prev, isLoading: true }));

      // Get user's RSVP status if logged in
      let userStatus = null;
      if (user) {
        const { data: userRSVP } = await supabase
          .from('event_rsvps')
          .select('status')
          .eq('event_id', eventId)
          .eq('user_id', user.id)
          .single();
        
        userStatus = userRSVP?.status || null;
      }

      // Get RSVP counts using the function
      const { data: counts } = await supabase
        .rpc('get_event_rsvp_counts', { event_uuid: eventId });

      const countsData = counts?.[0] || { attending_count: 0, maybe_count: 0, total_count: 0 };

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
  };

  // Update RSVP status
  const updateRSVP = async (status: 'attending' | 'maybe' | 'not_attending') => {
    if (!user || !eventId) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('event_rsvps')
        .upsert({
          event_id: eventId,
          user_id: user.id,
          status: status,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'event_id,user_id'
        });

      if (error) throw error;

      // Refresh data after update
      await fetchRSVPData();
      return { error: null };
    } catch (error) {
      console.error('Error updating RSVP:', error);
      return { error: error.message };
    }
  };

  // Remove RSVP
  const removeRSVP = async () => {
    if (!user || !eventId) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('event_rsvps')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Refresh data after removal
      await fetchRSVPData();
      return { error: null };
    } catch (error) {
      console.error('Error removing RSVP:', error);
      return { error: error.message };
    }
  };

  useEffect(() => {
    fetchRSVPData();
  }, [eventId, user]);

  return {
    ...rsvpData,
    updateRSVP,
    removeRSVP,
    refreshData: fetchRSVPData
  };
};

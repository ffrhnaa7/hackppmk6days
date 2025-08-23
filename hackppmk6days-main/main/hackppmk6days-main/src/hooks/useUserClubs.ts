import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { UserClub, ClubApplication, ClubMember, CreateClubData, ManagedClubSummary } from '../types/userClub';

export const useUserClubs = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createClub = async (clubData: CreateClubData): Promise<{ data: UserClub | null; error: string | null }> => {
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('user_clubs')
        .insert([{
          ...clubData,
          creator_id: user.id,
          contact_email: clubData.contact_email || user.email
        }])
        .select()
        .single();

      if (error) throw error;

      setLoading(false);
      return { data, error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create club';
      setError(errorMessage);
      setLoading(false);
      return { data: null, error: errorMessage };
    }
  };

  const updateClub = async (clubId: string, updates: Partial<UserClub>): Promise<{ error: string | null }> => {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('user_clubs')
        .update(updates)
        .eq('id', clubId)
        .eq('creator_id', user.id);

      if (error) throw error;

      setLoading(false);
      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update club';
      setError(errorMessage);
      setLoading(false);
      return { error: errorMessage };
    }
  };

  const getManagedClubs = async (): Promise<{ data: ManagedClubSummary[] | null; error: string | null }> => {
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.rpc('get_user_managed_clubs', {
        user_uuid: user.id
      });

      if (error) throw error;

      setLoading(false);
      return { data: data || [], error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch managed clubs';
      setError(errorMessage);
      setLoading(false);
      return { data: null, error: errorMessage };
    }
  };

  const getClubApplications = async (clubId: string): Promise<{ data: ClubApplication[] | null; error: string | null }> => {
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('club_applications')
        .select(`
          *,
          profiles!club_applications_applicant_id_fkey (
            name,
            email
          )
        `)
        .eq('club_id', clubId)
        .order('applied_at', { ascending: false });

      if (error) throw error;

      const applications = data?.map(app => ({
        ...app,
        applicant_name: app.profiles?.name || 'Unknown',
        applicant_email: app.profiles?.email || 'Unknown'
      })) || [];

      setLoading(false);
      return { data: applications, error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch applications';
      setError(errorMessage);
      setLoading(false);
      return { data: null, error: errorMessage };
    }
  };

  const updateApplicationStatus = async (
    applicationId: string, 
    status: 'accepted' | 'rejected',
    adminNotes?: string
  ): Promise<{ error: string | null }> => {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('club_applications')
        .update({
          status,
          admin_notes: adminNotes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id
        })
        .eq('id', applicationId);

      if (error) throw error;

      setLoading(false);
      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update application';
      setError(errorMessage);
      setLoading(false);
      return { error: errorMessage };
    }
  };

  const getClubMembers = async (clubId: string): Promise<{ data: ClubMember[] | null; error: string | null }> => {
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('club_members')
        .select(`
          *,
          profiles!club_members_user_id_fkey (
            name,
            email
          )
        `)
        .eq('club_id', clubId)
        .order('joined_at', { ascending: false });

      if (error) throw error;

      const members = data?.map(member => ({
        ...member,
        user_name: member.profiles?.name || 'Unknown',
        user_email: member.profiles?.email || 'Unknown'
      })) || [];

      setLoading(false);
      return { data: members, error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch members';
      setError(errorMessage);
      setLoading(false);
      return { data: null, error: errorMessage };
    }
  };

  const applyToClub = async (clubId: string, message?: string): Promise<{ error: string | null }> => {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('club_applications')
        .insert([{
          club_id: clubId,
          applicant_id: user.id,
          application_message: message
        }]);

      if (error) throw error;

      setLoading(false);
      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to apply to club';
      setError(errorMessage);
      setLoading(false);
      return { error: errorMessage };
    }
  };

  const getUserApplicationStatus = async (clubId: string): Promise<{ status: string | null; error: string | null }> => {
    if (!user) {
      return { status: null, error: 'User not authenticated' };
    }

    try {
      const { data, error } = await supabase
        .from('club_applications')
        .select('status')
        .eq('club_id', clubId)
        .eq('applicant_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return { status: data?.status || null, error: null };
    } catch (err: any) {
      return { status: null, error: err.message };
    }
  };

  return {
    loading,
    error,
    createClub,
    updateClub,
    getManagedClubs,
    getClubApplications,
    updateApplicationStatus,
    getClubMembers,
    applyToClub,
    getUserApplicationStatus
  };
};

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface UserProgress {
  id: string;
  rewardId: number;
  activityType: string;
  currentCount: number;
  targetCount: number;
  progressPercentage: number;
  isCompleted: boolean;
  lastUpdated: string;
}

export interface UserAchievement {
  id: string;
  rewardId: number;
  rewardTitle: { ko: string; en: string };
  rewardDescription: { ko: string; en: string };
  rewardCategory: string;
  rewardPrize: string;
  completedAt: string;
  claimed: boolean;
  claimedAt?: string;
}

export const useGamificationProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user progress and achievements
  const loadProgressData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Load progress data
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('reward_id');

      if (progressError) throw progressError;

      // Load achievements data
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (achievementsError) throw achievementsError;

      // Transform progress data
      const transformedProgress: UserProgress[] = (progressData || []).map(item => ({
        id: item.id,
        rewardId: item.reward_id,
        activityType: item.activity_type,
        currentCount: item.current_count,
        targetCount: item.target_count,
        progressPercentage: Math.min(100, Math.round((item.current_count / item.target_count) * 100)),
        isCompleted: item.current_count >= item.target_count,
        lastUpdated: item.last_updated
      }));

      // Transform achievements data
      const transformedAchievements: UserAchievement[] = (achievementsData || []).map(item => ({
        id: item.id,
        rewardId: item.reward_id,
        rewardTitle: item.reward_title,
        rewardDescription: item.reward_description,
        rewardCategory: item.reward_category,
        rewardPrize: item.reward_prize,
        completedAt: item.completed_at,
        claimed: item.claimed,
        claimedAt: item.claimed_at
      }));

      setProgress(transformedProgress);
      setAchievements(transformedAchievements);
    } catch (err: any) {
      console.error('Error loading progress data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update progress for a specific reward
  const updateProgress = async (
    rewardId: number,
    activityType: string,
    increment: number = 1,
    targetCount: number = 10
  ) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase.rpc('update_user_progress', {
        p_user_id: user.id,
        p_reward_id: rewardId,
        p_activity_type: activityType,
        p_increment: increment,
        p_target_count: targetCount
      });

      if (error) throw error;

      // Reload progress data
      await loadProgressData();

      return { data, error: null };
    } catch (err: any) {
      console.error('Error updating progress:', err);
      return { error: err.message };
    }
  };

  // Claim an achievement
  const claimAchievement = async (achievementId: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('user_achievements')
        .update({
          claimed: true,
          claimed_at: new Date().toISOString()
        })
        .eq('id', achievementId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Reload achievements data
      await loadProgressData();

      return { error: null };
    } catch (err: any) {
      console.error('Error claiming achievement:', err);
      return { error: err.message };
    }
  };

  // Get progress for a specific reward
  const getProgressForReward = (rewardId: number): UserProgress | null => {
    return progress.find(p => p.rewardId === rewardId) || null;
  };

  // Check if reward is achieved
  const isRewardAchieved = (rewardId: number): boolean => {
    return achievements.some(a => a.rewardId === rewardId);
  };

  useEffect(() => {
    loadProgressData();
  }, [user]);

  return {
    progress,
    achievements,
    loading,
    error,
    updateProgress,
    claimAchievement,
    getProgressForReward,
    isRewardAchieved,
    refreshData: loadProgressData
  };
};

import React, { useState, useEffect } from 'react';
import { UserPlus, Clock, Check, X, AlertCircle, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ColorfulCard } from '../components/ColorfulCard';
import { ColorfulButton } from '../components/ColorfulButton';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { koreanClubs } from '../data/koreanClubs';

interface Application {
  id: string;
  club_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
  application_message: string | null;
  applied_at: string;
  updated_at: string;
}

export const MyApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadApplications();
    }
  }, [user]);

  const loadApplications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('club_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async (applicationId: string) => {
    const confirmed = window.confirm(
      t('정말로 지원을 철회하시겠습니까?', 'Are you sure you want to withdraw your application?')
    );

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('club_applications')
        .update({ status: 'withdrawn' })
        .eq('id', applicationId);

      if (error) throw error;
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: 'withdrawn' as const, updated_at: new Date().toISOString() }
            : app
        )
      );
    } catch (error) {
      console.error('Error withdrawing application:', error);
      alert(t('지원 철회 중 오류가 발생했습니다', 'Error occurred while withdrawing application'));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-500" />;
      case 'withdrawn':
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t('검토 중', 'Pending');
      case 'approved':
        return t('승인됨', 'Approved');
      case 'rejected':
        return t('거절됨', 'Rejected');
      case 'withdrawn':
        return t('철회됨', 'Withdrawn');
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ColorfulCard className="text-center p-8">
          <UserPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('로그인이 필요합니다', 'Login Required')}
          </h2>
          <p className="text-gray-600 mb-4">
            {t('지원 현황을 보려면 로그인하세요', 'Please login to view your applications')}
          </p>
          <Link to="/auth">
            <ColorfulButton>
              {t('로그인', 'Login')}
            </ColorfulButton>
          </Link>
        </ColorfulCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          {t('내 지원 현황', 'My Applications')}
        </h1>
        <p className="text-gray-600">
          {t('동아리 지원 현황을 확인하고 관리하세요', 'Track and manage your club applications')}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <ColorfulCard key={i} className="animate-pulse">
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </ColorfulCard>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && applications.length === 0 && (
        <ColorfulCard className="text-center p-12">
          <UserPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('아직 지원한 동아리가 없습니다', 'No applications yet')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('동아리 허브에서 관심있는 동아리에 지원해보세요', 'Start applying to clubs from the Club Hub')}
          </p>
          <Link to="/clubs">
            <ColorfulButton>
              {t('동아리 탐색하기', 'Explore Clubs')}
            </ColorfulButton>
          </Link>
        </ColorfulCard>
      )}

      {/* Applications List */}
      {!loading && applications.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {t(`총 ${applications.length}개의 지원`, `${applications.length} total applications`)}
            </p>
            <div className="flex space-x-2 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span>{applications.filter(app => app.status === 'pending').length} {t('검토 중', 'pending')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>{applications.filter(app => app.status === 'approved').length} {t('승인', 'approved')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((application) => {
              const club = koreanClubs.find(c => c.id === application.club_id);
              if (!club) return null;

              const clubName = language === 'ko' ? club.name.ko : club.name.en;
              const clubDescription = language === 'ko' ? club.description.ko : club.description.en;

              return (
                <ColorfulCard key={application.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-32">
                    <img
                      src={club.image}
                      alt={clubName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span>{getStatusText(application.status)}</span>
                      </span>
                    </div>

                    {/* Club Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white">{clubName}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Application Details */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {t('지원일', 'Applied')}: {new Date(application.applied_at).toLocaleDateString()}
                      </div>
                      {application.updated_at !== application.applied_at && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {t('업데이트', 'Updated')}: {new Date(application.updated_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {/* Application Message */}
                    {application.application_message && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm font-semibold text-gray-700">
                            {t('지원 메시지', 'Application Message')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {application.application_message}
                        </p>
                      </div>
                    )}

                    {/* Club Description */}
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                      {clubDescription}
                    </p>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Link to={`/club/${club.id}`} className="flex-1">
                        <ColorfulButton variant="outline" size="sm" className="w-full">
                          {t('동아리 보기', 'View Club')}
                        </ColorfulButton>
                      </Link>
                      
                      {application.status === 'pending' && (
                        <ColorfulButton
                          variant="ghost"
                          size="sm"
                          onClick={() => withdrawApplication(application.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {t('철회', 'Withdraw')}
                        </ColorfulButton>
                      )}

                      {application.status === 'approved' && (
                        <ColorfulButton
                          variant="success"
                          size="sm"
                          className="cursor-default"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          {t('가입 완료', 'Joined')}
                        </ColorfulButton>
                      )}
                    </div>
                  </div>
                </ColorfulCard>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

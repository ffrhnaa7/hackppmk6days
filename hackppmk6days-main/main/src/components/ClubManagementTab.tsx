import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Users, 
  Clock, 
  Check, 
  X, 
  Eye, 
  Settings,
  AlertCircle,
  Calendar,
  Mail,
  MessageSquare,
  UserCheck,
  UserX,
  Crown,
  Shield
} from 'lucide-react';
import { ColorfulCard } from './ColorfulCard';
import { ColorfulButton } from './ColorfulButton';
import { CreateClubModal } from './CreateClubModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useUserClubs } from '../hooks/useUserClubs';
import { ManagedClubSummary, ClubApplication, ClubMember } from '../types/userClub';

export const ClubManagementTab: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { 
    getManagedClubs, 
    getClubApplications, 
    updateApplicationStatus, 
    getClubMembers,
    loading 
  } = useUserClubs();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [managedClubs, setManagedClubs] = useState<ManagedClubSummary[]>([]);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [applications, setApplications] = useState<ClubApplication[]>([]);
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'members'>('overview');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    loadManagedClubs();
  }, [user]);

  useEffect(() => {
    if (selectedClub) {
      if (activeTab === 'applications') {
        loadApplications(selectedClub);
      } else if (activeTab === 'members') {
        loadMembers(selectedClub);
      }
    }
  }, [selectedClub, activeTab]);

  const loadManagedClubs = async () => {
    const { data, error } = await getManagedClubs();
    if (error) {
      setError(error);
    } else if (data) {
      setManagedClubs(data);
    }
  };

  const loadApplications = async (clubId: string) => {
    const { data, error } = await getClubApplications(clubId);
    if (error) {
      setError(error);
    } else if (data) {
      setApplications(data);
    }
  };

  const loadMembers = async (clubId: string) => {
    const { data, error } = await getClubMembers(clubId);
    if (error) {
      setError(error);
    } else if (data) {
      setMembers(data);
    }
  };

  const handleApplicationAction = async (applicationId: string, action: 'accepted' | 'rejected') => {
    setError('');
    setSuccess('');

    const { error } = await updateApplicationStatus(applicationId, action);
    
    if (error) {
      setError(error);
    } else {
      setSuccess(
        action === 'accepted' 
          ? t('지원자가 승인되었습니다.', 'Applicant has been accepted.')
          : t('지원자가 거절되었습니다.', 'Applicant has been rejected.')
      );
      
      // Reload applications and managed clubs
      if (selectedClub) {
        loadApplications(selectedClub);
      }
      loadManagedClubs();
      
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleCreateSuccess = () => {
    loadManagedClubs();
    setSuccess(t('클럽이 성공적으로 생성되었습니다!', 'Club created successfully!'));
    setTimeout(() => setSuccess(''), 3000);
  };

  const selectedClubData = managedClubs.find(club => club.club_id === selectedClub);

  const TabButton: React.FC<{ 
    tab: typeof activeTab, 
    icon: React.ReactNode, 
    label: string,
    count?: number
  }> = ({ tab, icon, label, count }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
        activeTab === tab
          ? 'bg-gradient-primary text-white shadow-lg'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
      {count !== undefined && count > 0 && (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          activeTab === tab ? 'bg-white text-blue-600' : 'bg-red-500 text-white'
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('클럽 관리', 'Club Management')}
          </h2>
          <p className="text-gray-600 mt-1">
            {t('내가 만든 클럽을 관리하고 지원자를 검토하세요', 'Manage your clubs and review applicants')}
          </p>
        </div>
        <ColorfulButton
          variant="primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('새 클럽 만들기', 'Create New Club')}
        </ColorfulButton>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-3 rounded-lg bg-red-100 text-red-800 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 rounded-lg bg-green-100 text-green-800 flex items-center">
          <Check className="h-5 w-5 mr-2" />
          {success}
        </div>
      )}

      {/* Club List */}
      {managedClubs.length === 0 ? (
        <ColorfulCard>
          <div className="p-8 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t('아직 만든 클럽이 없습니다', 'No clubs created yet')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('첫 번째 클럽을 만들어 한국에서 새로운 커뮤니티를 시작해보세요!', 'Create your first club and start a new community in Korea!')}
            </p>
            <ColorfulButton
              variant="primary"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('클럽 만들기', 'Create Club')}
            </ColorfulButton>
          </div>
        </ColorfulCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Club List */}
          <div className="lg:col-span-1">
            <ColorfulCard>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {t('내 클럽', 'My Clubs')} ({managedClubs.length})
                </h3>
                <div className="space-y-3">
                  {managedClubs.map((club) => (
                    <div
                      key={club.club_id}
                      onClick={() => setSelectedClub(club.club_id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedClub === club.club_id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {language === 'ko' ? club.club_name.ko : club.club_name.en}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          club.status === 'active' ? 'bg-green-100 text-green-800' :
                          club.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {club.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {club.member_count} {t('명', 'members')}
                        </span>
                        {club.pending_applications > 0 && (
                          <span className="flex items-center text-red-600 font-semibold">
                            <Clock className="h-4 w-4 mr-1" />
                            {club.pending_applications} {t('대기', 'pending')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ColorfulCard>
          </div>

          {/* Club Details */}
          <div className="lg:col-span-2">
            {selectedClub && selectedClubData ? (
              <ColorfulCard>
                <div className="p-6">
                  {/* Club Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {language === 'ko' ? selectedClubData.club_name.ko : selectedClubData.club_name.en}
                      </h3>
                      <p className="text-gray-600">
                        {t('생성일', 'Created')}: {new Date(selectedClubData.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        {selectedClubData.member_count}
                      </span>
                      <ColorfulButton variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        {t('설정', 'Settings')}
                      </ColorfulButton>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <TabButton 
                      tab="overview" 
                      icon={<Eye className="h-4 w-4" />} 
                      label={t('개요', 'Overview')} 
                    />
                    <TabButton 
                      tab="applications" 
                      icon={<Clock className="h-4 w-4" />} 
                      label={t('지원자', 'Applications')}
                      count={selectedClubData.pending_applications}
                    />
                    <TabButton 
                      tab="members" 
                      icon={<Users className="h-4 w-4" />} 
                      label={t('멤버', 'Members')}
                      count={selectedClubData.member_count}
                    />
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-blue-600 font-semibold">{t('총 멤버', 'Total Members')}</p>
                              <p className="text-2xl font-bold text-blue-800">{selectedClubData.member_count}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-500" />
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-yellow-600 font-semibold">{t('대기 중', 'Pending')}</p>
                              <p className="text-2xl font-bold text-yellow-800">{selectedClubData.pending_applications}</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-500" />
                          </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-green-600 font-semibold">{t('상태', 'Status')}</p>
                              <p className="text-lg font-bold text-green-800 capitalize">{selectedClubData.status}</p>
                            </div>
                            <Check className="h-8 w-8 text-green-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'applications' && (
                    <div className="space-y-4">
                      {loading ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        </div>
                      ) : applications.length === 0 ? (
                        <div className="text-center py-8">
                          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">{t('아직 지원자가 없습니다', 'No applications yet')}</p>
                        </div>
                      ) : (
                        applications.map((application) => (
                          <div key={application.id} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-semibold text-gray-800">
                                    {application.applicant_name}
                                  </h4>
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {application.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  <Mail className="h-4 w-4 inline mr-1" />
                                  {application.applicant_email}
                                </p>
                                <p className="text-sm text-gray-600 mb-3">
                                  <Calendar className="h-4 w-4 inline mr-1" />
                                  {t('지원일', 'Applied')}: {new Date(application.applied_at).toLocaleDateString()}
                                </p>
                                {application.application_message && (
                                  <div className="bg-gray-50 p-3 rounded-lg mb-3">
                                    <p className="text-sm text-gray-700">{application.application_message}</p>
                                  </div>
                                )}
                              </div>
                              {application.status === 'pending' && (
                                <div className="flex space-x-2 ml-4">
                                  <ColorfulButton
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleApplicationAction(application.id, 'accepted')}
                                    disabled={loading}
                                  >
                                    <UserCheck className="h-4 w-4 mr-1" />
                                    {t('승인', 'Accept')}
                                  </ColorfulButton>
                                  <ColorfulButton
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleApplicationAction(application.id, 'rejected')}
                                    disabled={loading}
                                  >
                                    <UserX className="h-4 w-4 mr-1" />
                                    {t('거절', 'Reject')}
                                  </ColorfulButton>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {activeTab === 'members' && (
                    <div className="space-y-4">
                      {loading ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        </div>
                      ) : members.length === 0 ? (
                        <div className="text-center py-8">
                          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">{t('멤버가 없습니다', 'No members yet')}</p>
                        </div>
                      ) : (
                        members.map((member) => (
                          <div key={member.id} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  member.role === 'creator' ? 'bg-yellow-100' :
                                  member.role === 'admin' ? 'bg-blue-100' :
                                  'bg-gray-100'
                                }`}>
                                  {member.role === 'creator' ? (
                                    <Crown className="h-5 w-5 text-yellow-600" />
                                  ) : member.role === 'admin' ? (
                                    <Shield className="h-5 w-5 text-blue-600" />
                                  ) : (
                                    <Users className="h-5 w-5 text-gray-600" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">{member.user_name}</h4>
                                  <p className="text-sm text-gray-600">{member.user_email}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  member.role === 'creator' ? 'bg-yellow-100 text-yellow-800' :
                                  member.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {member.role === 'creator' ? t('창설자', 'Creator') :
                                   member.role === 'admin' ? t('관리자', 'Admin') :
                                   t('멤버', 'Member')}
                                </span>
                                <p className="text-xs text-gray-500 mt-1">
                                  {t('가입일', 'Joined')}: {new Date(member.joined_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </ColorfulCard>
            ) : (
              <ColorfulCard>
                <div className="p-8 text-center">
                  <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('클럽을 선택하세요', 'Select a club')}
                  </h3>
                  <p className="text-gray-600">
                    {t('왼쪽에서 관리할 클럽을 선택하세요', 'Choose a club from the left to manage')}
                  </p>
                </div>
              </ColorfulCard>
            )}
          </div>
        </div>
      )}

      {/* Create Club Modal */}
      <CreateClubModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

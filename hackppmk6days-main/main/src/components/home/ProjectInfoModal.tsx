import React from 'react';
import { X, Award, Target, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectInfoModalProps {
  onClose: () => void;
}

export const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="relative h-48 bg-gradient-to-br from-mint-500 via-ocean-500 to-sage-500 p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-2xl transition-all duration-300"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Award className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {t('프로젝트 소개', 'About This Project')}
              </h2>
              <p className="text-white/90 font-semibold text-lg">PPMK Hackathon 2024</p>
            </div>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {/* Creator Info */}
          <div className="bg-gradient-to-r from-mint-50 to-ocean-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-mint-500 to-ocean-500 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-3xl font-bold text-white">F</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Farhana</h3>
                <p className="text-gray-600 font-medium">
                  {t('개발자 & 디자이너', 'Developer & Designer')}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Code className="h-5 w-5 text-mint-600" />
                  <span className="text-sm text-mint-600 font-semibold">PPMK Hackathon Participant</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t(
                '안녕하세요! 저는 Farhana입니다. 이 프로젝트는 PPMK 해커톤을 위해 개발된 6DAYS 라이프스타일 플랫폼입니다. 현대인들의 번아웃을 해결하고 지속가능한 생산성을 제공하는 것이 목표입니다.',
                'Hello! I\'m Farhana. This project is the 6DAYS lifestyle platform developed for the PPMK Hackathon. The goal is to solve modern burnout and provide sustainable productivity.'
              )}
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Target className="h-6 w-6 text-mint-600 mr-3" />
                {t('프로젝트 목표', 'Project Goals')}
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-mint-500 mr-2">•</span>
                  {t('주 6일 활동, 1일 완전 휴식의 새로운 라이프스타일', 'New lifestyle of 6 days active, 1 day rest')}
                </li>
                <li className="flex items-start">
                  <span className="text-mint-500 mr-2">•</span>
                  {t('번아웃 방지와 지속가능한 생산성', 'Prevent burnout and sustainable productivity')}
                </li>
                <li className="flex items-start">
                  <span className="text-mint-500 mr-2">•</span>
                  {t('커뮤니티 기반 동기부여', 'Community-based motivation')}
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Code className="h-6 w-6 text-ocean-600 mr-3" />
                {t('기술 스택', 'Tech Stack')}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="font-semibold text-gray-800">Frontend</p>
                  <p className="text-sm text-gray-600">React, TypeScript</p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="font-semibold text-gray-800">Styling</p>
                  <p className="text-sm text-gray-600">Tailwind CSS</p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="font-semibold text-gray-800">Backend</p>
                  <p className="text-sm text-gray-600">Supabase</p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="font-semibold text-gray-800">Build</p>
                  <p className="text-sm text-gray-600">Vite</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                onClose();
                navigate('/auth');
              }}
              className="flex-1 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {t('6DAYS 시작하기', 'Start 6DAYS')}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-8 rounded-2xl hover:bg-gray-200 transition-all duration-300"
            >
              {t('닫기', 'Close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

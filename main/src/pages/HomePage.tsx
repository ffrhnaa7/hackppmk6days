import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CTASection } from '../components/home/CTASection';
import { ProjectInfoModal } from '../components/home/ProjectInfoModal';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showProjectInfo, setShowProjectInfo] = useState(false);

  const handleStartNow = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroSection 
        onStartNow={handleStartNow}
        onShowProjectInfo={() => setShowProjectInfo(true)}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection onStartNow={handleStartNow} />

      {/* Project Info Modal */}
      {showProjectInfo && (
        <ProjectInfoModal onClose={() => setShowProjectInfo(false)} />
      )}
    </div>
  );
};

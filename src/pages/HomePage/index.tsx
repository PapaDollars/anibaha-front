// src/pages/HomePage/HomePage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

import HeroSection from '@/pages/HomePage/sections/HeroSection';
import BodySection from '@/pages/HomePage/sections/BodySection';
import FooterSection from '@/pages/HomePage/sections/FooterSection';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgColorFont via-white to-blue-50">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Body Section avec toutes les sections principales */}
      <BodySection />
      
      {/* Footer Section avec CTA */}
      <FooterSection />
    </div>
  );
};

export default HomePage;
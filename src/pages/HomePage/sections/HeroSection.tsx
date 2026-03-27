// src/components/HomePage/HeroSection.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPlay,
  faRocket,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import { ROUTES } from '@/utils/url/url_frontend';

import IMAGE_Mode_africa from '@/assets/images/mode_africa.avif'
import IMAGE_Tech_africa from '@/assets/images/tech_africa.png'
import IMAGE_Shopping_africa from '@/assets/images/shopping_ia.png'


interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
  textColor: string;
}

export const HeroSection: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners: Banner[] = [
    {
      id: '1',
      title: 'Révolutionnez Votre Shopping',
      subtitle: 'Avec l\'IA AfriCommerce',
      description: 'Découvrez une expérience d\'achat personnalisée grâce à notre intelligence artificielle',
      image: IMAGE_Shopping_africa,
      ctaText: 'Explorer Maintenant',
      ctaLink: ROUTES.PUBLIC.CATALOG.PRODUCTS,
      backgroundColor: 'from-purple-600 to-blue-600',
      textColor: 'text-white'
    },
    {
      id: '2',
      title: 'Mode Africaine Authentique',
      subtitle: 'Créations Uniques & Modernes',
      description: 'Exprimez votre style avec nos designs africains contemporains',
      image: IMAGE_Mode_africa,
      ctaText: 'Voir la Collection',
      ctaLink: ROUTES.PUBLIC.CATALOG.CATEGORIES,
      backgroundColor: 'from-orange-600 to-red-500',
      textColor: 'text-white'
    },
    {
      id: '3',
      title: 'Tech Innovation Africa',
      subtitle: 'Dernières Technologies',
      description: 'iPhone 15, MacBook Pro M3, et toutes les innovations tech',
      image: IMAGE_Tech_africa,
      ctaText: 'Découvrir',
      ctaLink: ROUTES.PUBLIC.CATALOG.BRANDS,
      backgroundColor: 'from-teal-500 to-green-500',
      textColor: 'text-white'
    }
  ];

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentBanner ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.backgroundColor} opacity-80 z-20`}></div>
            
            <div className="absolute inset-0 z-30 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faRocket} className="text-white text-xl" />
                      </div>
                      <span className="text-white/90 font-medium tracking-wider uppercase text-sm">
                        ANIBAHA 2025
                      </span>
                    </div>
                    
                    <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                      {banner.title}
                      <span className="block text-3xl lg:text-4xl font-light text-white/90 mt-2">
                        {banner.subtitle}
                      </span>
                    </h1>
                    
                    <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                      {banner.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link
                        to={banner.ctaLink}
                        className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                      >
                        <span>{banner.ctaText}</span>
                        <FontAwesomeIcon 
                          icon={faArrowRight} 
                          className="ml-3 transition-transform group-hover:translate-x-1" 
                        />
                      </Link>
                      
                      <button className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                        <FontAwesomeIcon icon={faPlay} className="mr-3" />
                        <span>Voir Démo</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBanner 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Banner Controls */}
      <button
        onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      
      <button
        onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </section>
  );
};

export default HeroSection;
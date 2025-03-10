import React from 'react';
import HeroSection from './components/hero/HeroSectionAnimated';
import { AboutUs } from './components/about/AboutUs';
import './App.css';
import { ServicesSection } from './components/services_section/ServiceSection';
import { Portfolio } from './components/portfolio/Portfolio';
import { ScrollToTop } from './utils/scrolling/ScrollTop';
import { CookieConsent } from './components/cookies/CookieBanner';
import { ContactUs } from './components/contact/ContactUs';
import { NavBar } from './components/navbar/NavBar';

export const App = () => {

  return (
    <>
      <div style={{ width: '100%', minHeight: '100vh' }} className="bg-gray-50">
        <ScrollToTop />
        <NavBar />
        {/* Cookie Consent Banner */}
        <CookieConsent />
        {/* Hero Section */}
        <HeroSection />
        {/* About Us Section */}
        <AboutUs />
        {/* Portfolio Section */}
        <Portfolio />
        {/* Services Section */}
        <ServicesSection />
        {/* ContactUs Section */}
        <ContactUs />
      </div>


    </>
  );
};
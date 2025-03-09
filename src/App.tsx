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
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from React Icons
import { useLanguageSelector } from './hooks/useLanguageSelector';

export const App = () => {

  // Language and dropdown state
  const { languageSelected } = useLanguageSelector()
  // Replace with your actual WhatsApp number (include country code)
  const whatsappNumber = "+15142964595";

  // Define WhatsApp links and messages for each language
  const whatsappLinks: any = {
    "🇨🇦 EN": `https://wa.me/${whatsappNumber}?text=Hello!%20I%20have%20a%20question%20about%20your%20services.`,
    "⚜️ FR": `https://wa.me/${whatsappNumber}?text=Bonjour!%20J'ai%20une%20question%20sur%20vos%20services.`,
    "🇨🇱 ES": `https://wa.me/${whatsappNumber}?text=¡Hola!%20Tengo%20una%20pregunta%20sobre%20sus%20servicios.`,
  };

  // Get the WhatsApp link based on the selected language
  const whatsappLink: any = whatsappLinks[languageSelected] || whatsappLinks["🇨🇦 EN"]; // Fallback to English

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
      </div>

      {/* ContactUs Section */}
      <ContactUs />

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors animate-bounce"
      >
        <FaWhatsapp className="text-3xl" /> {/* WhatsApp icon */}
      </a>
    </>
  );
};
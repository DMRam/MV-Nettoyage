import HeroSection from './components/hero/HeroSectionAnimated';
import { AboutUs } from './components/about/AboutUs';
import './App.css';
import { ServicesSection } from './components/services_section/ServiceSection';
import { ScrollToTop } from './utils/scrolling/ScrollTop';
import { CookieConsent } from './components/cookies/CookieBanner';
import { ContactUs } from './components/contact/ContactUs';
import { NavBar } from './components/navbar/NavBar';
import { EcoBanner } from './components/banners/EcoBanner';
import { PromoBanner } from './components/banners/PromoBanner';

export const App = () => {
  return (
    <>
      <div style={{ width: '100%', minHeight: '100vh' }} className="bg-gray-50">
        <ScrollToTop />
        <NavBar />
        {/* Eco Banner */}
        <EcoBanner />
        {/* Promo Banner */}
        <PromoBanner />
        {/* Cookie Consent Banner */}
        <CookieConsent />
        {/* Hero Section */}
        <HeroSection />
        {/* About Us Section */}
        <section id="about">
          <AboutUs />
        </section>
        {/* Services Section */}
        <section id="services">
          <ServicesSection />
        </section>
        {/* ContactUs Section */}
        <section id="contact">
          <ContactUs />
        </section>
      </div>
    </>
  );
};
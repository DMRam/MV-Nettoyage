import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { services_translations } from "./ServicesTranslations";

export const ServicesSection = () => {
  // Language and dropdown state
  const { languageSelected } = useLanguageSelector()
  const navigate = useNavigate();

  // Get the current translations based on the selected language
  const currentTranslations = services_translations[languageSelected];

  const handleCardClick = (service: any) => {
    navigate(`/service/${service.title}`, { state: { service } }); 
  };

  return (
    <section
      style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      className="py-20 px-6 text-center bg-gray-200 rounded-t-3xl shadow-lg border border-gray-200 relative -mt-10"
      id="services"
    >
      <h2 className="text-5xl font-serif font-bold mb-16 leading-tight tracking-wide text-gray-900">
        {currentTranslations.sectionTitle}
      </h2>
      <div
        style={{ margin: 10 }} // Reduced margin around the grid container
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-4" // Reduced gap between grid items
      >
        {currentTranslations.services.map((service: any, index: number) => (
          <motion.div
            key={service.title}
            className="group relative bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 ease-out hover:shadow-xl cursor-pointer border border-gray-200"
            onClick={() => handleCardClick(service)} // Use handleCardClick
            whileHover={{ scale: 1.02 }} // Hover effect for the entire card
            initial={{ opacity: 0, y: 50 }} // Fade-in animation
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }} // Staggered animation
          >
            {/* Image with overlay */}
            <div className="relative w-full h-80">
              <img
                src={service.image[0]}
                alt={service.title}
                className="object-cover w-full h-full transition-transform rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-lg"></div>
            </div>

            {/* Title and Description */}
            <div className="p-6">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-lg text-gray-600 mb-6">{service.description}</p>
              <p className="text-sm text-gray-500 italic">{languageSelected === '🇨🇦 EN' ? 'Learn more' : languageSelected === '🇨🇱 ES' ? "Saber mas" : "Savoir plus"} →</p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
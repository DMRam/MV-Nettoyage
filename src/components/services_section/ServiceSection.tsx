import React, { useState } from "react";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations

// Dummy translation data for each language
const translations: any = {
  '🇨🇦 EN': {
    sectionTitle: "Transform Your Commercial Spaces",
    services: [
      {
        title: "Commercial Cleaning Services",
        description:
          "Professional cleaning solutions tailored for businesses, ensuring a pristine and hygienic environment for your employees and customers.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/commercial-cleaning.jpg?alt=media&token=3d8b42be-8e02-4510-b38f-e8b19012946a",
      },
      {
        title: "Handyman Services",
        description:
          "Expert maintenance and repair services for commercial properties, ensuring your facilities are always in top condition.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/handyman-services.jpg?alt=media&token=817cc277-6bcb-402d-a334-5c63fb6a7d31",
      },
      {
        title: "Patio Design & Planning",
        description:
          "Custom patio designs tailored to your commercial space, enhancing outdoor areas for employee breaks or customer relaxation.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/patio-design.jpg?alt=media&token=a308766b-8239-4aa8-93f1-50171cafdf92",
      },
      {
        title: "Outdoor Lighting",
        description:
          "Enhance your commercial outdoor spaces with elegant and functional lighting solutions, perfect for safety and ambiance.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/outdoor-lighting.jpg?alt=media&token=9dacce00-04fa-45be-b3ad-70da3d688bfa",
      },
    ],
  },
  '⚜️ FR': {
    sectionTitle: "Transformez vos espaces commerciaux",
    services: [
      {
        title: "Services de nettoyage commercial",
        description:
          "Solutions de nettoyage professionnelles adaptées aux entreprises, garantissant un environnement propre et hygiénique pour vos employés et clients.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/commercial-cleaning.jpg?alt=media&token=3d8b42be-8e02-4510-b38f-e8b19012946a",
      },
      {
        title: "Services de bricolage",
        description:
          "Services experts de maintenance et de réparation pour les propriétés commerciales, assurant que vos installations sont toujours en parfait état.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/handyman-services.jpg?alt=media&token=817cc277-6bcb-402d-a334-5c63fb6a7d31",
      },
      {
        title: "Conception et planification de patio",
        description:
          "Conceptions de patio sur mesure adaptées à votre espace commercial, améliorant les zones extérieures pour les pauses des employés ou la détente des clients.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/patio-design.jpg?alt=media&token=a308766b-8239-4aa8-93f1-50171cafdf92",
      },
      {
        title: "Éclairage extérieur",
        description:
          "Améliorez vos espaces extérieurs commerciaux avec des solutions d'éclairage élégantes et fonctionnelles, parfaites pour la sécurité et l'ambiance.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/outdoor-lighting.jpg?alt=media&token=9dacce00-04fa-45be-b3ad-70da3d688bfa",
      },
    ],
  },
  '🇨🇱 ES': {
    sectionTitle: "Transforme tus espacios comerciales",
    services: [
      {
        title: "Servicios de limpieza comercial",
        description:
          "Soluciones de limpieza profesional adaptadas a empresas, garantizando un entorno limpio e higiénico para sus empleados y clientes.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/commercial-cleaning.jpg?alt=media&token=3d8b42be-8e02-4510-b38f-e8b19012946a",
      },
      {
        title: "Servicios de mantenimiento",
        description:
          "Servicios expertos de mantenimiento y reparación para propiedades comerciales, asegurando que sus instalaciones estén siempre en perfecto estado.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/handyman-services.jpg?alt=media&token=817cc277-6bcb-402d-a334-5c63fb6a7d31",
      },
      {
        title: "Diseño y planificación de patios",
        description:
          "Diseños de patio personalizados adaptados a su espacio comercial, mejorando las áreas exteriores para descansos de empleados o relajación de clientes.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/patio-design.jpg?alt=media&token=a308766b-8239-4aa8-93f1-50171cafdf92",
      },
      {
        title: "Iluminación exterior",
        description:
          "Mejore sus espacios exteriores comerciales con soluciones de iluminación elegantes y funcionales, perfectas para la seguridad y el ambiente.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/ecoserv-c2203.firebasestorage.app/o/outdoor-lighting.jpg?alt=media&token=9dacce00-04fa-45be-b3ad-70da3d688bfa",
      },
    ],
  },
};

export const ServicesSection = ({ language = '⚜️ FR' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const navigate = useNavigate();

  // Get the current translations based on the selected language
  const currentTranslations = translations[language];

  const openModal = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleCardClick = (service: any) => {
    navigate(`/service/${service.title}`, { state: { service } }); // Pass service data via state
  };

  return (
    <section
      style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      className="py-20 px-6 text-center bg-gray-50 rounded-t-3xl shadow-lg border border-gray-200 relative -mt-10"
      id="services"
    >
      <h2 className="text-5xl font-serif font-bold mb-16 leading-tight tracking-wide text-gray-900">
        {currentTranslations.sectionTitle}
      </h2>
      <div
        style={{ margin: 20 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12"
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
                src={service.image}
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
              <p className="text-sm text-gray-500 italic">Learn more →</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for displaying service details */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedService?.title}
        description={selectedService?.description}
        image={selectedService?.image}
      />
    </section>
  );
};
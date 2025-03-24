import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { currentIndividualServices, services_translations, new_sections_translations } from "./ServicesTranslations";

export const ServicesSection = () => {
  // Language and dropdown state
  const { languageSelected } = useLanguageSelector();
  const navigate = useNavigate();

  // Get the current translations based on the selected language
  const currentTranslations = services_translations[languageSelected];
  const newTranslations = new_sections_translations[languageSelected];

  // Extract the individual services for the selected language
  const individualServices = currentIndividualServices[0][languageSelected].individualServices;

  const handleCardClick = (service: any) => {
    navigate(`/service/${service.title}`, { state: { service } });
  };

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        event.preventDefault();
        const href = target.getAttribute("href");
        const targetElement = document.querySelector(href!);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <section
      style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      className="py-20 px-6 text-center bg-gradient-to-b from-white to-white rounded-t-3xl shadow-lg border border-gray-100 relative -mt-10"
      id="services"
    >
      <h2 className="text-5xl font-serif font-bold mb-16 leading-tight tracking-wide text-gray-900">
        {currentTranslations.sectionTitle}
      </h2>

      {/* Service Cards */}
      <div
        style={{ margin: -10 }} // Reduced margin around the grid container
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-4"
      >
        {currentTranslations.services.map((service: any, index: number) => (
          <motion.div
            key={service.title}
            className="group relative bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 ease-out hover:shadow-xl cursor-pointer border border-gray-100"
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
              <p className="text-sm text-gray-500 italic">
                {languageSelected === "en"
                  ? "Learn more"
                  : languageSelected === "ES"
                    ? "Saber más"
                    : "Savoir plus"}{" "}
                →
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Individual Services List */}
      <div className="mt-20">
        <h3 className="text-3xl font-serif font-bold mb-8 text-gray-900">
          {newTranslations.individualServicesTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {individualServices.map((service: any, index: any) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <p className="text-lg text-gray-700">{service}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <h3 className="text-3xl font-serif font-bold mb-8 text-gray-900">
          {newTranslations.faqTitle}
        </h3>
        <div className="space-y-4">
          {newTranslations.faqs.map((faq: any, index: any) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-900">{faq.question}</p>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-20">
        <h3 className="text-3xl font-serif font-bold mb-8 text-gray-900">
          {newTranslations.testimonialsTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {newTranslations.testimonials.map((testimonial: any, index: any) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-yellow-500">{"⭐".repeat(testimonial.rating)}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.review}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-blue-600 text-white py-10 px-6 mt-20 rounded-lg">
        <h3 className="text-3xl font-serif font-bold mb-4">
          {newTranslations.ctaTitle}
        </h3>
        <p className="text-lg mb-6">
          {newTranslations.ctaDescription}
        </p>
        <a
          href="#contact" // Link to the contact section
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300"
        >
          {newTranslations.ctaButton}
        </a>
      </div>
    </section>
  );
};
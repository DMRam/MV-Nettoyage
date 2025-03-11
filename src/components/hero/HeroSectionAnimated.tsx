import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CleaningEstimateModal } from "../modals/EstimateModal";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { hero_images, hero_translations } from "./HeroTranslations";

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 3.5, ease: "easeOut" } },
  exit: { opacity: 0, scale: 1.05, transition: { duration: 3.5, ease: "easeInOut" } }
};

export default function HeroSection() {
  const { languageSelected } = useLanguageSelector();
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Preload images
  useEffect(() => {
    hero_images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  // Handle image transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % hero_images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Memoize the current image to avoid recalculations
  const currentImage = hero_images[index];

  // Memoize the modal toggle function
  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden" id="home">
      {/* Background Image Transition */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0 w-full h-full"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin: "center" }}
          >
            <motion.img
              src={currentImage}
              alt="Background"
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 10, ease: "linear" }}
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl bg-gray-400/30 p-6 md:p-8 rounded-lg shadow-xl w-11/12 sm:w-4/5 lg:w-2/3 backdrop-blur-sm">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl">
          {hero_translations[languageSelected].title}
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-100 drop-shadow-md">
          {hero_translations[languageSelected].description}
        </p>

        <button
          onClick={toggleModal}
          className="mt-6 sm:mt-8 px-6 sm:px-10 py-3 sm:py-4 bg-yellow-500 text-blue-700 font-bold rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
          aria-label="Open estimate modal"
        >
          {hero_translations[languageSelected].button}
        </button>
      </div>

      {/* Estimate Modal */}
      <CleaningEstimateModal isOpen={isModalOpen} onClose={toggleModal} />
    </section>
  );
}
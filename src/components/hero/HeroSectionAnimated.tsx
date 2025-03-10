import { useState, useEffect } from "react";
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
  // Language and dropdown state
  const { languageSelected } = useLanguageSelector()
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % hero_images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-blue-700 text-center px-4 overflow-hidden" id="home">
      {/* Background Image Transition */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          {hero_images.map((image, i) => (
            i === index && (
              <motion.div
                key={image}
                className="absolute inset-0 w-full h-full"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ transformOrigin: "center" }}
              >
                <motion.img
                  src={image}
                  alt="Background"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 10, ease: "linear" }}
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl bg-gray-400 opacity-70 p-6 md:p-8 rounded-lg shadow-xl w-11/12 sm:w-4/5 lg:w-2/3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl">
          {hero_translations[languageSelected].title}
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 drop-shadow-md">
          {hero_translations[languageSelected].description}
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 sm:mt-8 px-6 sm:px-10 py-3 sm:py-4 bg-yellow-500 text-blue-700 font-bold rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
        >
          {hero_translations[languageSelected].button}
        </button>
      </div>

      {/* Estimate Modal */}
      <CleaningEstimateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

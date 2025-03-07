import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CleaningEstimateModal } from "../modals/EstimateModal";

const images = [
  "https://koala.sh/api/image/v2-5r9ff-1pquq.jpg?width=1344&height=768&dream",
  "https://thepinkwand.com/wp-content/uploads/2023/09/airbnb-3399753_1920.jpg",
  "https://fastmaidservice.com/wp-content/uploads/2022/12/No-Need-to-Buy-Expensive-Cleaning-Supplies.png",
  "https://xtremecleancostarica.com/wp-content/uploads/2020/10/lavadoapresion-scaled.jpg"
];

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 2.5, ease: "easeOut" } },
  exit: { opacity: 0, scale: 1.05, transition: { duration: 2.5, ease: "easeInOut" } }
};

const translations: any = {
  fr: {
    title: "Services de Nettoyage Professionnels à Sherbrooke",
    description:
      "Offrez à votre maison ou entreprise un environnement propre et sain grâce à nos services de nettoyage professionnels à Sherbrooke. Nous utilisons des produits écologiques et des techniques efficaces pour garantir des résultats impeccables.",
    button: "Obtenez une Estimation Immédiate"
  },
  en: {
    title: "Professional Cleaning Services in Sherbrooke",
    description:
      "Give your home or business a clean and healthy environment with our professional cleaning services in Sherbrooke. We use eco-friendly products and effective techniques to ensure spotless results.",
    button: "Get an Instant Estimate"
  },
  es: {
    title: "Servicios de Limpieza Profesional en Sherbrooke",
    description:
      "Brinde a su hogar o negocio un ambiente limpio y saludable con nuestros servicios de limpieza profesional en Sherbrooke. Utilizamos productos ecológicos y técnicas efectivas para garantizar resultados impecables.",
    button: "Obtén una Cotización Instantánea"
  }
};

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-blue-700 text-center px-4 overflow-hidden" id="home">
      {/* Background Image Transition */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          {images.map((image, i) => (
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

      {/* Language Selector */}
      <div className="absolute top-6 right-6 flex space-x-3">
        <button onClick={() => setLanguage("en")} className="p-1 bg-white rounded-full shadow-md">🇬🇧</button>
        <button onClick={() => setLanguage("fr")} className="p-1 bg-white rounded-full shadow-md">🇫🇷</button>
        <button onClick={() => setLanguage("es")} className="p-1 bg-white rounded-full shadow-md">🇪🇸</button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl bg-gray-400 opacity-70 p-6 md:p-8 rounded-lg shadow-xl w-11/12 sm:w-4/5 lg:w-2/3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl">
          {translations[language].title}
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 drop-shadow-md">
          {translations[language].description}
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 sm:mt-8 px-6 sm:px-10 py-3 sm:py-4 bg-yellow-500 text-blue-700 font-bold rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
        >
          {translations[language].button}
        </button>
      </div>

      {/* Estimate Modal */}
      <CleaningEstimateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

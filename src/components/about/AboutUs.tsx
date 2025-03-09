import { motion } from "framer-motion";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { about_translations } from "./Transcriptions";



export const AboutUs = () => {
  // Get the current translations based on the selected language
  // Language and dropdown state
  const { languageSelected } = useLanguageSelector()
  const currentTranslations = about_translations[languageSelected];

  return (
    <section
      id="about"
      className="py-20 px-6 text-center bg-gray-50 rounded-t-3xl shadow-lg border border-gray-200 relative -mt-10"
    >
      <motion.h2
        className="text-4xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {currentTranslations.about}
      </motion.h2>

      <motion.p
        className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {currentTranslations.description}
      </motion.p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentTranslations.images.map((image: any, index: number) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="w-58 h-58 rounded-full overflow-hidden shadow-lg">
              <img
                src={image.src}
                alt="Our Team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 bg-white shadow-md p-3 rounded-xl text-sm text-gray-700 w-40 text-center -mb-4">
              {image.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
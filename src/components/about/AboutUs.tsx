import { motion } from "framer-motion";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { about_translations } from "./Transcriptions";

export const AboutUs = () => {
  const { languageSelected } = useLanguageSelector();
  const currentTranslations = about_translations[languageSelected];

  return (
    <section
      id="about"
      className="py-24 px-6 text-center bg-gradient-to-b from-green-50 to-white rounded-t-3xl shadow-lg border border-gray-100 relative -mt-10"
    >
      {/* Main Heading */}
      <motion.h2
        className="text-5xl font-bold text-gray-900 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {currentTranslations.about}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="mt-6 text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {currentTranslations.description}
      </motion.p>

      {/* Mission and Vision Grid */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Mission Section */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            {currentTranslations.missionTitle}
          </h3>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed font-light">
            {currentTranslations.mission}
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            {currentTranslations.visionTitle}
          </h3>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed font-light">
            {currentTranslations.vision}
          </p>
        </motion.div>
      </div>

      {/* Team Images Section */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {currentTranslations.images.map((image: any, index: number) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img
                src={image.src}
                alt="Our Team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 bg-white shadow-lg p-4 rounded-xl text-sm text-gray-700 w-48 text-center -mb-6">
              {image.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
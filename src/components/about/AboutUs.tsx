import { motion } from "framer-motion";

// Dummy translation data for each language
const translations: any = {
  '🇨🇦 EN': {
    about: 'About Us',
    description: 'We are a professional cleaning company dedicated to delivering top-quality commercial cleaning services. With years of expertise, we help businesses maintain pristine environments, ensuring customer satisfaction and operational efficiency.',
    images: [
      {
        src: "https://www.stathakis.com/hs-fs/hubfs/team%20cleaning.jpg?width=667&name=team%20cleaning.jpg",
        description: 'Our team delivering commercial-grade cleaning solutions.'
      },
      {
        src: "https://proteam.emerson.com/resource/image/194432/portrait_ratio1x1/555/555/c9b306a5087a6212e758938cc6789e1e/85B58F527B0F78C31CE6B359A82ACE53/teamcleaning.jpg",
        description: 'Professional cleaners ensuring business environments shine.'
      },
      {
        src: "https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/08/9MHW-scaled.jpeg",
        description: 'Efficient cleaning services tailored for commercial spaces.'
      },
      {
        src: "https://diamondcontractors.com/wp-content/uploads/2023/12/Tiler-working-on-renovation-of-apartment-1.jpg",
        description: 'Transforming commercial spaces with precision and care.'
      }
    ]
  },
  '⚜️ FR': {
    about: 'À propos de nous',
    description: 'Nous sommes une entreprise de nettoyage professionnelle dédiée à fournir des services de nettoyage commercial de haute qualité. Avec des années d\'expertise, nous aidons les entreprises à maintenir des environnements impeccables, garantissant la satisfaction des clients et l\'efficacité opérationnelle.',
    images: [
      {
        src: "https://www.stathakis.com/hs-fs/hubfs/team%20cleaning.jpg?width=667&name=team%20cleaning.jpg",
        description: 'Notre équipe fournissant des solutions de nettoyage de qualité commerciale.'
      },
      {
        src: "https://proteam.emerson.com/resource/image/194432/portrait_ratio1x1/555/555/c9b306a5087a6212e758938cc6789e1e/85B58F527B0F78C31CE6B359A82ACE53/teamcleaning.jpg",
        description: 'Nettoyeurs professionnels assurant des environnements d\'affaires impeccables.'
      },
      {
        src: "https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/08/9MHW-scaled.jpeg",
        description: 'Services de nettoyage efficaces adaptés aux espaces commerciaux.'
      },
      {
        src: "https://diamondcontractors.com/wp-content/uploads/2023/12/Tiler-working-on-renovation-of-apartment-1.jpg",
        description: 'Transformer les espaces commerciaux avec précision et soin.'
      }
    ]
  },
  '🇨🇱 ES': {
    about: 'Sobre nosotros',
    description: 'Somos una empresa de limpieza profesional dedicada a ofrecer servicios de limpieza comercial de alta calidad. Con años de experiencia, ayudamos a las empresas a mantener entornos impecables, garantizando la satisfacción del cliente y la eficiencia operativa.',
    images: [
      {
        src: "https://www.stathakis.com/hs-fs/hubfs/team%20cleaning.jpg?width=667&name=team%20cleaning.jpg",
        description: 'Nuestro equipo ofreciendo soluciones de limpieza de grado comercial.'
      },
      {
        src: "https://proteam.emerson.com/resource/image/194432/portrait_ratio1x1/555/555/c9b306a5087a6212e758938cc6789e1e/85B58F527B0F78C31CE6B359A82ACE53/teamcleaning.jpg",
        description: 'Limpieza profesional asegurando entornos comerciales impecables.'
      },
      {
        src: "https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/08/9MHW-scaled.jpeg",
        description: 'Servicios de limpieza eficientes adaptados a espacios comerciales.'
      },
      {
        src: "https://diamondcontractors.com/wp-content/uploads/2023/12/Tiler-working-on-renovation-of-apartment-1.jpg",
        description: 'Transformando espacios comerciales con precisión y cuidado.'
      }
    ]
  }
};

export const AboutUs = ({ language = '⚜️ FR' }) => {
  // Get the current translations based on the selected language
  const currentTranslations = translations[language];

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
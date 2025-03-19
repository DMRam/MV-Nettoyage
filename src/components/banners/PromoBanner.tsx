import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion
import { useLanguageSelector } from '../../hooks/useLanguageSelector';
import { messages } from './PromoBannerTranslations';
import { ContactFormModal } from '../modals/ContactFormModal';
import { ContactFromBanner } from '../contact/ContactFromBanner';

export const PromoBanner = () => {
    const [isVisible, setIsVisible] = useState(true); // Banner visibility
    const [isCollapsed, setIsCollapsed] = useState(false); // Collapsed state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
    const { languageSelected } = useLanguageSelector(); // Get the selected language

    // Check localStorage to see if the user has already collapsed the banner
    useEffect(() => {
        const isBannerCollapsed = localStorage.getItem('isPromoBannerCollapsed');
        if (isBannerCollapsed === 'true') {
            setIsCollapsed(true);
        }
    }, []);

    // Auto-collapse after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isCollapsed) {
                handleClose(); // Collapse the banner after 5 seconds
            }
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }, [isCollapsed]);

    // Handle closing the banner (collapse it)
    const handleClose = () => {
        setIsVisible(!isVisible);
        localStorage.setItem('isPromoBannerCollapsed', 'true'); // Store in localStorage
    };

    // Handle expanding the banner
    const handleExpand = () => {
        setIsVisible(!isVisible);
        localStorage.removeItem('isPromoBannerCollapsed'); // Remove from localStorage
    };

    // Get the message based on the selected language
    const { heading, description, cta, collapsed } = messages[languageSelected] || messages['EN'];

    return (
        <>
            {/* Promo Banner */}
            <AnimatePresence>
                {!isVisible ? (
                    // Collapsed Banner (Small Square)
                    <motion.div
                        className="fixed bottom-4 left-4 flex items-center gap-2 cursor-pointer z-50"
                        onClick={handleExpand}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05 }} // Slight scale-up on hover
                    >

                        {/* Promo Label */}
                        <motion.div
                            className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }} // Delayed animation
                        >
                            {collapsed}
                        </motion.div>
                    </motion.div>
                ) : (
                    // Expanded Banner
                    <motion.div
                        key="expanded"
                        className={`fixed bottom-0 left-0 w-full py-4 text-center bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg z-50`}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <div className="max-w-4xl mx-auto px-4 relative">
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-2 right-4 text-white hover:text-blue-200 transition-colors duration-300"
                                aria-label="Close banner"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Banner content */}
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {heading}
                            </h2>
                            <p className="text-lg text-white opacity-90 mb-4">
                                {description.split('**').map((text: any, index: any) => (
                                    <span key={index} className={index % 2 === 1 ? 'font-bold underline' : ''}>
                                        {text}
                                    </span>
                                ))}
                            </p>
                            <button
                                className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors duration-300 shadow-md"
                                onClick={() => setIsModalOpen(true)}
                            >
                                {cta}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal with Contact Form */}
            <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ContactFromBanner />
            </ContactFormModal>
        </>
    );
};
import { useState, useEffect } from 'react';
import { useLanguageSelector } from '../../hooks/useLanguageSelector';
import { messages } from './EcoBannerTranslations';

export const EcoBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const { languageSelected } = useLanguageSelector(); // Get the selected language

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;
            const footerHeight = document.querySelector('footer')?.offsetHeight || 0;

            if (scrollPosition >= pageHeight - footerHeight - 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get the message based on the selected language
    const { heading, description, cta } = messages[languageSelected] || messages['EN-US'];

    return (
        <div
            className={`fixed bottom-0 left-0 w-full py-4 text-center bg-gradient-to-r from-green-600 to-green-800 shadow-lg transition-opacity duration-500 z-50 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {heading}
                </h2>
                <p className="text-lg text-white opacity-90 mb-4">
                    {description}
                </p>
                {/* <button
                    className="bg-white text-green-800 font-semibold py-2 px-6 rounded-lg hover:bg-green-50 transition-colors duration-300"
                    onClick={() => alert('Redirect to sign-up page')}
                >
                    {cta}
                </button> */}
            </div>
        </div>
    );
};
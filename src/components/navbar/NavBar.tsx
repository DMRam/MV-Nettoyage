import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageSelector } from '../../hooks/useLanguageSelector';
import { navbar_translations } from './NavBarTranslations';
import logo from '../../assets/logo/logo_ecoserv.png';

export const NavBar = () => {
    // State management
    const { languageSelected, onChangeLanguage } = useLanguageSelector();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    // Language options
    const languageOptions = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
        { code: 'es', name: 'Español' }
    ];

    // Handlers
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsLanguageOpen(false);
    };

    const toggleLanguageMenu = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    const changeLanguage = (lang: string) => {
        onChangeLanguage(lang);
        setIsMenuOpen(false);
        setIsLanguageOpen(false);
    };

    // Effects
    useEffect(() => {
        let lastScrollTop = 0;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setScrolled(currentScroll > 20);

            if (!isMenuOpen && !isLanguageOpen) {
                setVisible(currentScroll <= lastScrollTop || currentScroll < 50);
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMenuOpen, isLanguageOpen]);

    // Current translations
    const t = navbar_translations[languageSelected] || navbar_translations['en'];
    const currentLanguage = languageOptions.find(opt => opt.code === languageSelected)?.name || 'English';

    return (
        <>
            {/* Navigation Bar */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out
                bg-gradient-to-b from-blue-900/95 to-blue-800/95 backdrop-blur-sm
                ${visible ? 'translate-y-0' : '-translate-y-full'}
                ${scrolled ? 'shadow-xl py-3 border-b border-blue-700/30' : 'shadow-lg py-4'}`}>

                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img src={logo} alt="Company Logo" className="h-12 md:h-14 transition-all duration-300 hover:scale-105" />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {['about', 'services', 'contact'].map((item) => (
                            <ScrollLink
                                key={item}
                                to={item}
                                smooth={true}
                                duration={500}
                                className="relative group px-1 py-2 font-medium text-blue-100 hover:text-white cursor-pointer transition-colors"
                                activeClass="text-white font-semibold"
                            >
                                {t[item]}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white/20" />
                            </ScrollLink>
                        ))}

                        {/* Desktop Language Selector */}
                        <div className="relative ml-6">
                            <button
                                onClick={toggleLanguageMenu}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-800/40 hover:bg-blue-700/60 transition-all border border-blue-600/40 group"
                                aria-expanded={isLanguageOpen}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-blue-100 group-hover:text-white transition-colors">{currentLanguage}</span>
                                <motion.svg
                                    animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                                    className="h-4 w-4 text-blue-200 group-hover:text-white transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            </button>

                            <AnimatePresence>
                                {isLanguageOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 bg-blue-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-blue-700/30 overflow-hidden"
                                    >
                                        {languageOptions.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className={`block w-full text-left px-6 py-3 hover:bg-blue-700/60 transition-colors flex items-center space-x-3 text-white
                                                    ${languageSelected === lang.code ? 'bg-blue-700/40 font-medium' : ''}`}
                                            >
                                                <span className={`w-2 h-2 rounded-full ${languageSelected === lang.code ? 'bg-blue-300' : 'bg-blue-500/60'}`}></span>
                                                <span>{lang.name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-3 -mr-2 rounded-lg hover:bg-blue-700/40 transition-all group"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <motion.div
                            animate={isMenuOpen ? "open" : "closed"}
                            variants={{
                                open: { rotate: 180 },
                                closed: { rotate: 0 }
                            }}
                        >
                            <svg className="h-7 w-7 text-blue-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </motion.div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="container mx-auto px-4 py-2">
                                <div className="flex flex-col">
                                    {['about', 'services', 'contact'].map((item) => (
                                        <ScrollLink
                                            key={item}
                                            to={item}
                                            smooth={true}
                                            duration={500}
                                            className="px-5 py-4 rounded-lg active:bg-blue-700/60 transition-colors font-medium text-blue-100 hover:text-white border-b border-blue-800/30 last:border-0"
                                            onClick={() => setIsMenuOpen(false)}
                                            activeClass="bg-blue-800/40 text-white"
                                        >
                                            {t[item]}
                                        </ScrollLink>
                                    ))}

                                    {/* Mobile Language Selector - SIMPLIFIED VERSION */}
                                    <div className="pt-2">
                                        <button
                                            onClick={toggleLanguageMenu}
                                            className="w-full px-5 py-4 flex items-center space-x-3 text-blue-300 hover:text-white active:bg-blue-700/60 border-b border-blue-800/30"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium">Language</span>
                                            <motion.svg
                                                animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                                                className="h-4 w-4 ml-auto"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </motion.svg>
                                        </button>

                                        {/* ALWAYS VISIBLE LANGUAGE OPTIONS ON MOBILE */}
                                        <div className={`${isLanguageOpen ? 'block' : 'hidden'} bg-blue-800/90`}>
                                            <div className="grid grid-cols-1">
                                                {languageOptions.map((lang) => (
                                                    <button
                                                        key={lang.code}
                                                        onClick={() => changeLanguage(lang.code)}
                                                        className={`px-5 py-4 text-left transition-colors flex items-center space-x-4 text-white
                                                            hover:bg-blue-700/60 ${languageSelected === lang.code ? 'bg-blue-700/40 font-medium' : ''}`}
                                                    >
                                                        <span className={`w-2.5 h-2.5 rounded-full ${languageSelected === lang.code ? 'bg-blue-300' : 'bg-blue-500/60'}`}></span>
                                                        <span>{lang.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            {/* Touch target styles */}
            
        </>
    );
};
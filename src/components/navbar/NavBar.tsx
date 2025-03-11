import { useState, useEffect } from 'react';
import logo from '../../assets/logo/logo_ecoserv.png';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageSelector } from '../../hooks/useLanguageSelector';
import { navbar_translations } from './NavBarTranslations';

export const NavBar = () => {
    // Language and dropdown state
    const { languageSelected, onChangeLanguage } = useLanguageSelector()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState(languageSelected || "⚜️ FR"); // Default language
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [visible, setVisible] = useState(true); // Track navbar visibility based on scroll

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsDropdownOpen(false); // Close language dropdown when the menu is opened
    };

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
        onChangeLanguage(lang)
        setIsDropdownOpen(false); // Close dropdown when a language is selected
    };

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    // Close the dropdown if clicked outside of it
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement) {
                if (!e.target.closest('.language-menu') && !e.target.closest('.language-btn')) {
                    setIsDropdownOpen(false);
                }
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    // Scroll effect to show/hide navbar when scrolling down/up
    useEffect(() => {
        let lastScrollTop = 0; // Store the last scroll position
        const handleScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > 50) {
                // Scrolling down and past the top
                setVisible(false); // Hide the navbar
            } else {
                // Scrolling up or at the top of the page
                setVisible(true); // Show the navbar
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close the mobile menu when the navbar disappears
    useEffect(() => {
        if (!visible) {
            setIsMenuOpen(false); // Close the mobile menu when the navbar disappears
        }
    }, [visible]); // Trigger this effect whenever `visible` changes

    // Get the current translations based on the selected language
    const currentTranslations = navbar_translations[language];

    return (
        <div>
            {/* Navbar */}
            <nav className={`bg-blue-600 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-500 
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-100%]"}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex flex-col items-center text-center space-y-2">
                        <img src={logo} alt="Logo" className="h-12" />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4 p-3 mt-3 items-center">
                        <ScrollLink to="about" smooth={true} duration={500} className="hover:text-yellow-500 cursor-pointer whitespace-nowrap">
                            {currentTranslations.about}
                        </ScrollLink>
                        <ScrollLink to="services" smooth={true} duration={500} className="hover:text-yellow-500 cursor-pointer whitespace-nowrap">
                            {currentTranslations.services}
                        </ScrollLink>
                        <ScrollLink to="portfolio" smooth={true} duration={500} className="hover:text-yellow-500 cursor-pointer whitespace-nowrap">
                            {currentTranslations.portfolio}
                        </ScrollLink>
                        {/* <ScrollLink to="testimonials" smooth={true} duration={500} className="hover:text-yellow-500 cursor-pointer whitespace-nowrap">
                            {currentTranslations.testimonials}
                        </ScrollLink> */}
                        <ScrollLink to="contact" smooth={true} duration={500} className="hover:text-yellow-500 cursor-pointer whitespace-nowrap">
                            {currentTranslations.contact}
                        </ScrollLink>

                        {/* Language Menu Button for Desktop */}
                        <div className="relative language-btn">
                            {/* Language Button */}
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300 whitespace-nowrap"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                            >
                                <span>{language}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 transform transition-transform duration-300"
                                    style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-40 bg-blue-200 text-black rounded-md shadow-lg language-menu"
                                    >
                                        <button
                                            onClick={() => { changeLanguage("⚜️ FR"); closeMobileMenu(); }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            ⚜️ FR
                                        </button>
                                        <button
                                            onClick={() => { changeLanguage("🇨🇦 EN"); closeMobileMenu(); }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            🇨🇦 EN
                                        </button>
                                        <button
                                            onClick={() => { changeLanguage("🇨🇱 ES"); closeMobileMenu(); }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            🇨🇱 ES
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Hamburger Menu Button */}
                    <button className="md:hidden text-white" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu (Dropdown) */}
            <AnimatePresence>
                {isMenuOpen && visible && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`md:hidden bg-blue-600 text-white p-4 z-50 fixed top-[80px] left-0 w-full`}
                    >
                        {/* Removed duplicate "About Us" link */}
                        <ScrollLink to="about" smooth={true} duration={500} className="block py-2 hover:text-yellow-500" onClick={closeMobileMenu}>
                            {currentTranslations.about}
                        </ScrollLink>
                        <ScrollLink to="services" smooth={true} duration={500} className="block py-2 hover:text-yellow-500" onClick={closeMobileMenu}>
                            {currentTranslations.services}
                        </ScrollLink>
                        <ScrollLink to="portfolio" smooth={true} duration={500} className="block py-2 hover:text-yellow-500" onClick={closeMobileMenu}>
                            {currentTranslations.portfolio}
                        </ScrollLink>
                        <ScrollLink to="testimonials" smooth={true} duration={500} className="block py-2 hover:text-yellow-500" onClick={closeMobileMenu}>
                            {currentTranslations.testimonials}
                        </ScrollLink>
                        <ScrollLink to="contact" smooth={true} duration={500} className="block py-2 hover:text-yellow-500" onClick={closeMobileMenu}>
                            {currentTranslations.contact}
                        </ScrollLink>

                        {/* Language Options within the Hamburger Menu */}
                        <div className="mt-4">
                            <button onClick={() => { changeLanguage('⚜️ FR'); closeMobileMenu(); }} className="block w-full text-left px-4 py-2 hover:bg-gray-200 whitespace-nowrap">
                                ⚜️ FR
                            </button>
                            <button onClick={() => { changeLanguage('🇨🇦 EN'); closeMobileMenu(); }} className="block w-full text-left px-4 py-2 hover:bg-gray-200 whitespace-nowrap">
                                🇨🇦 EN
                            </button>
                            <button onClick={() => { changeLanguage('🇨🇱 ES'); closeMobileMenu(); }} className="block w-full text-left px-4 py-2 hover:bg-gray-200 whitespace-nowrap">
                                🇨🇱 ES
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
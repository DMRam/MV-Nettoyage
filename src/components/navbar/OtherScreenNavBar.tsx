import { useState, useEffect } from "react";
import logo from '../../assets/logo/logo_ecoserv.png';
import { useNavigate } from "react-router-dom";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { other_screen_navbar_translations } from "./NavBarTranslations";
import { motion } from "framer-motion";

export const OtherScreenNavBar = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const { languageSelected } = useLanguageSelector();

    useEffect(() => {
        let lastScrollTop = 0;

        const handleScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            setScrolled(currentScroll > 20);

            if (currentScroll > lastScrollTop && currentScroll > 50) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { back } = other_screen_navbar_translations[languageSelected] || other_screen_navbar_translations["fr"];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out
            bg-gradient-to-b from-blue-900/95 to-blue-800/95 backdrop-blur-sm
            ${visible ? 'translate-y-0' : '-translate-y-full'}
            ${scrolled ? 'shadow-xl py-3 border-b border-blue-700/30' : 'shadow-lg py-4'}`}>

            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img src={logo} alt="Logo" className="h-12 md:h-14 transition-all duration-300" />
                </motion.div>

                {/* Back Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-800/40 hover:bg-blue-700/60 transition-all border border-blue-600/40 group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-200 group-hover:text-white transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <span className="hidden sm:inline text-blue-100 group-hover:text-white font-medium transition-colors">
                        {back}
                    </span>
                </motion.button>
            </div>
        </nav>
    );
};
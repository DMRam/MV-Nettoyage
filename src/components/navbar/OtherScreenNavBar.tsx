import React, { useState, useEffect } from "react";
import logo from '../../assets/logo/logo_ecoserv.png';
import { useNavigate } from "react-router-dom";
import { useLanguageSelector } from "../../hooks/useLanguageSelector"; // Import your custom hook
import { other_screen_navbar_translations } from "./NavBarTranslations";

export const OtherScreenNavBar = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true); // Initially, the navbar is visible

    // Get the selected language from your custom hook
    const { languageSelected } = useLanguageSelector();

    useEffect(() => {
        let lastScrollTop = 0; // Track the last scroll position

        const handleScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > 50) {
                // Scrolling down and passed the top
                setVisible(false); // Hide navbar
            } else {
                // Scrolling up or at the top of the page
                setVisible(true); // Show navbar
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // Get the translation based on the selected language
    const { back } = other_screen_navbar_translations[languageSelected] || other_screen_navbar_translations["⚜️ FR"]; // Fallback to English

    return (
        <div
            className={`bg-blue-600 text-white p-4 fixed top-0 left-1/2 -translate-x-1/2 w-[100%] z-50 shadow-lg backdrop-blur-sm rounded-b-lg transition-all duration-500 
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"}`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-12" />
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-yellow-400 transition-all duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <span className="hidden sm:inline font-medium">{back}</span>
                </button>
            </div>
        </div>
    );
};
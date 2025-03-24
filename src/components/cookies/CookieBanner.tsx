import { useState, useEffect } from "react";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { cookie_banner_translations } from "./CookiesTranscriptions";

export const CookieConsent = () => {
    // Language and dropdown state
    const { languageSelected } = useLanguageSelector();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already accepted cookies
        const hasAcceptedCookies = localStorage.getItem("cookieConsent") === "accepted";
        if (!hasAcceptedCookies) {
            setIsVisible(true); // Show the banner if the user hasn't accepted cookies
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted"); // Store the user's consent
        setIsVisible(false); // Hide the banner
    };

    // Get the translations based on the selected language
    const { message, learnMore, accept } = cookie_banner_translations[languageSelected] || cookie_banner_translations["fr"]; // Fallback to English

    if (!isVisible) return null; // Don't render the banner if the user has already accepted cookies

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center z-50">
            <p className="text-sm mb-4 sm:mb-0">
                {message}{" "}
                <a href="/cookie-policy" className="underline hover:text-yellow-500">
                    {learnMore}
                </a>
            </p>
            <button
                onClick={handleAccept}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 self-start"
            >
                {accept}
            </button>
        </div>
    );
};
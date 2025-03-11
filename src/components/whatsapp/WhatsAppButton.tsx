import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon
import { useLanguageSelector } from "../../hooks/useLanguageSelector";

export const WhatsAppButton = () => {
    const { languageSelected } = useLanguageSelector();

    // Replace with your actual WhatsApp number (include country code)
    const whatsappNumber = "+15142964595";

    // Define WhatsApp links and messages for each language
    const whatsappLinks: any = {
        "🇨🇦 EN": `https://wa.me/${whatsappNumber}?text=Hello!%20I%20have%20a%20question%20about%20your%20services.`,
        "⚜️ FR": `https://wa.me/${whatsappNumber}?text=Bonjour!%20J'ai%20une%20question%20sur%20vos%20services.`,
        "🇨🇱 ES": `https://wa.me/${whatsappNumber}?text=¡Hola!%20Tengo%20una%20pregunta%20sobre%20sus%20servicios.`,
    };

    // Get the WhatsApp link based on the selected language
    const whatsappLink = whatsappLinks[languageSelected] || whatsappLinks["🇨🇦 EN"]; // Fallback to English

    // State to control button visibility
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollTop = 0; // Track the last scroll position

        const handleScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > 50) {
                // Scrolling down and passed the top
                setIsVisible(false); // Hide button
            } else {
                // Scrolling up or at the top of the page
                setIsVisible(true); // Show button
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-500 animate-bounce z-[1000] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
                }`}
        >
            <FaWhatsapp className="text-3xl" /> {/* WhatsApp icon */}
        </a>
    );
};
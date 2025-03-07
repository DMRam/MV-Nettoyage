import React, { useState, useEffect } from "react";

export const CookieConsent = () => {
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

    if (!isVisible) return null; // Don't render the banner if the user has already accepted cookies

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50">
            <p className="text-sm">
                We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.{" "}
                <a href="/cookie-policy" className="underline hover:text-yellow-500">
                    Learn more
                </a>
            </p>
            <button
                onClick={handleAccept}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
                Accept
            </button>
        </div>
    );
};
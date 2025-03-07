import React from 'react';

// Dummy translation data for each language
const translations: any = {
    '🇨🇦 EN': {
        companyName: "MVO Patio & Reno",
        companyDescription: "Transforming your commercial spaces with expert renovation and cleaning services.",
        quickLinksTitle: "Quick Links",
        quickLinks: [
            { label: "Home", href: "#home" },
            { label: "About Us", href: "#about" },
            { label: "Services", href: "#services" },
            { label: "Portfolio", href: "#portfolio" },
            { label: "Contact", href: "#contact" },
        ],
        followUsTitle: "Follow Us",
        copyright: `© ${new Date().getFullYear()} MVO Patio & Reno. All rights reserved.`,
    },
    '⚜️ FR': {
        companyName: "MVO Patio & Reno",
        companyDescription: "Transformer vos espaces commerciaux avec des services experts de rénovation et de nettoyage.",
        quickLinksTitle: "Liens Rapides",
        quickLinks: [
            { label: "Accueil", href: "#home" },
            { label: "À propos", href: "#about" },
            { label: "Services", href: "#services" },
            { label: "Portfolio", href: "#portfolio" },
            { label: "Contact", href: "#contact" },
        ],
        followUsTitle: "Suivez-nous",
        copyright: `© ${new Date().getFullYear()} MVO Patio & Reno. Tous droits réservés.`,
    },
    '🇨🇱 ES': {
        companyName: "MVO Patio & Reno",
        companyDescription: "Transformando sus espacios comerciales con servicios expertos de renovación y limpieza.",
        quickLinksTitle: "Enlaces Rápidos",
        quickLinks: [
            { label: "Inicio", href: "#home" },
            { label: "Sobre Nosotros", href: "#about" },
            { label: "Servicios", href: "#services" },
            { label: "Portafolio", href: "#portfolio" },
            { label: "Contacto", href: "#contact" },
        ],
        followUsTitle: "Síguenos",
        copyright: `© ${new Date().getFullYear()} MVO Patio & Reno. Todos los derechos reservados.`,
    },
};

export const Footer = ({ language = '⚜️ FR' }) => {
    // Get the current translations based on the selected language
    const currentTranslations = translations[language];

    return (
        <footer className="bg-blue-600 text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-xl font-semibold">{currentTranslations.companyName}</h3>
                    <p className="mt-2 text-gray-200">
                        {currentTranslations.companyDescription}
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold">{currentTranslations.quickLinksTitle}</h3>
                    <ul className="mt-2 space-y-2">
                        {currentTranslations.quickLinks.map((link: any, index: number) => (
                            <li key={index}>
                                <a href={link.href} className="hover:text-yellow-500">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-semibold">{currentTranslations.followUsTitle}</h3>
                    <div className="mt-2 flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/768px-2023_Facebook_icon.svg.png" alt="Facebook" className="h-6 w-6" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Instagram" className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-300 mt-6">
                {currentTranslations.copyright}
            </div>
        </footer>
    );
};
import React from 'react';
import { useLanguageSelector } from '../../hooks/useLanguageSelector';
import { footer_translations } from './FooterTranslations';

export const Footer = () => {
    // Language and dropdown state
    const { languageSelected } = useLanguageSelector()
    // Get the current translations based on the selected language
    const currentTranslations = footer_translations[languageSelected];

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
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { OtherScreenNavBar } from "../navbar/OtherScreenNavBar";
import { motion } from "framer-motion"; // Import Framer Motion
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { service_detail_translations } from "./ServiceDetailTranslations";

export const OurServiceDetail = () => {
    // Language and dropdown state
    const { languageSelected } = useLanguageSelector();

    const location = useLocation();
    const { service } = location.state || {};

    // State for the contact form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    // Handle form input changes
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        alert(`Thank you, ${formData.name}! We will contact you shortly.`);
        // You can replace this with an API call to submit the form data
    };

    if (!service) {
        return <div>No service data found.</div>;
    }

    // Animation variants for the service details
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
    };

    // Get the translations based on the selected language
    const {
        requestInfo,
        nameLabel,
        emailLabel,
        phoneLabel,
        messageLabel,
        submitButton,
    } = service_detail_translations[languageSelected] || service_detail_translations["⚜️ FR"]; // Fallback to English

    return (
        <div style={{ marginTop: 30 }} className="p-8 bg-white"> {/* Ensure white background */}
            {/* Local Navigation Bar */}
            <OtherScreenNavBar />

            {/* Service Details */}
            <motion.div
                className="mt-24 max-w-4xl mx-auto" // Center the content
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Animated Title */}
                <motion.h1
                    className="text-4xl font-serif font-bold text-gray-900 mb-6"
                    variants={containerVariants}
                >
                    {service.title}
                </motion.h1>

                {/* Animated Image */}
                <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-96 object-cover rounded-lg mb-6"
                    variants={containerVariants}
                />

                {/* Animated Description */}
                <motion.p
                    className="text-lg text-gray-700 mb-8"
                    variants={containerVariants}
                >
                    {service.description}
                </motion.p>

                {/* Contact Form for Service Request */}
                <motion.div className="mt-12" variants={containerVariants}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{requestInfo}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                {nameLabel}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                {emailLabel}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                {phoneLabel}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                {messageLabel}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                            >
                                {submitButton}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};
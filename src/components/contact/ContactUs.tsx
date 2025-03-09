import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { contact_translations } from "./ContactTranscription";

export const ContactUs = () => {
    // Language and dropdown state
    const { languageSelected } = useLanguageSelector()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get the current translations based on the selected language
    const currentTranslations = contact_translations[languageSelected];

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear errors when typing
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.name) newErrors.name = currentTranslations.formErrors.name;
        if (!formData.email) newErrors.email = currentTranslations.formErrors.email;
        if (!formData.message) newErrors.message = currentTranslations.formErrors.message;
        return newErrors;
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            alert(currentTranslations.successMessage);
            setIsSubmitting(false);
            setFormData({ name: "", email: "", message: "" });
        }, 2000);
    };

    return (
        <section id="contact" className="py-20 relative">
            {/* Angled Background */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 transform -skew-y-3 origin-top-left shadow-xl border border-gray-300 backdrop-blur-sm"
                style={{
                    zIndex: 2,
                    height: "calc(100% + -8rem)", // Extend the background slightly
                    top: "1.6rem", // Adjust the top position
                }}
            ></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.h2
                    className="text-5xl font-serif font-bold text-center mb-8 text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {currentTranslations.contactTitle}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    {currentTranslations.formLabels.name}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? "border-red-500" : "border-gray-300 focus:ring-blue-500"
                                        }`}
                                    placeholder={currentTranslations.formPlaceholders.name}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    {currentTranslations.formLabels.email}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? "border-red-500" : "border-gray-300 focus:ring-blue-500"
                                        }`}
                                    placeholder={currentTranslations.formPlaceholders.email}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                    {currentTranslations.formLabels.message}
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.message ? "border-red-500" : "border-gray-300 focus:ring-blue-500"
                                        }`}
                                    rows={5}
                                    placeholder={currentTranslations.formPlaceholders.message}
                                />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? currentTranslations.submittingButton : currentTranslations.submitButton}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                            {currentTranslations.getInTouch}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <p className="text-gray-700">{currentTranslations.contactInfo.phone}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <p className="text-gray-700">{currentTranslations.contactInfo.email}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <p className="text-gray-700">{currentTranslations.contactInfo.address}</p>
                            </div>
                        </div>

                        {/* Google Map Embed */}
                        <div className="mt-8">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.5119979972465!2d-71.97406652373061!3d45.37884173912994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb64b49f0245d61%3A0x946218c980ab0dd4!2s739%20Rue%20Roberge%2C%20Sherbrooke%2C%20QC%20J1N%201Y4!5e0!3m2!1sen!2sca!4v1740098287698!5m2!1sen!2sca"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
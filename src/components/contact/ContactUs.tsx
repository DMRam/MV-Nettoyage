import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { contact_translations } from "./ContactTranscription";
import emailjs from "@emailjs/browser";
import { contact_email_credentials } from "./emailjs/EmailJSCredentials";

export const ContactUs = () => {
    // Language and dropdown state
    const { languageSelected } = useLanguageSelector();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get the current translations based on the selected language
    const currentTranslations = contact_translations[languageSelected];

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear errors when typing
    };

    // Validate the form
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const phoneRegex = /^[0-9\s\-\+\(\)]+$/; // Allows numbers, spaces, dashes, parentheses, and plus sign

        if (!formData.name) newErrors.name = currentTranslations.formErrors.name;
        if (!formData.email) newErrors.email = currentTranslations.formErrors.email;
        if (!formData.phone) {
            newErrors.phone = currentTranslations.formErrors.phone;
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Invalid phone number format.";
        }
        if (!formData.message) newErrors.message = currentTranslations.formErrors.message;

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Send the email using EmailJS
            const response = await emailjs.send(
                contact_email_credentials.service_key,
                contact_email_credentials.template_key,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                },
                contact_email_credentials.email_key
            );

            if (response.status === 200) {
                alert(currentTranslations.successMessage);
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                alert("Failed to send email. Please try again.");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                    className="text-5xl font-serif font-bold text-center mb-8 text-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {currentTranslations.contactTitle}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                                    {currentTranslations.formLabels.name}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    }`}
                                    placeholder={currentTranslations.formPlaceholders.name}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                    {currentTranslations.formLabels.email}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.email
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    }`}
                                    placeholder={currentTranslations.formPlaceholders.email}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
                                    {currentTranslations.formLabels.phone}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.phone
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    }`}
                                    placeholder={currentTranslations.formPlaceholders.phone}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="message">
                                    {currentTranslations.formLabels.message}
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.message
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    }`}
                                    rows={5}
                                    placeholder={currentTranslations.formPlaceholders.message}
                                />
                                {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-semibold shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? currentTranslations.submittingButton : currentTranslations.submitButton}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Business Hours and Additional Info */}
                    <motion.div
                        className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                            {currentTranslations.getInTouch}
                        </h3>
                        <p className="text-gray-700 mb-4 flex items-center">
                            📧 <span className="ml-2">{currentTranslations.contactInfo.email}</span>
                        </p>
                        <p className="text-gray-700 mb-4 flex items-center">
                            📞 <span className="ml-2">{currentTranslations.contactInfo.phone}</span>
                        </p>

                        {/* Business Hours */}
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                            {currentTranslations.businessHours.title}
                        </h4>
                        <p className="text-gray-700">{currentTranslations.businessHours.weekdays}</p>
                        <p className="text-gray-700">{currentTranslations.businessHours.saturday}</p>
                        <p className="text-gray-700">{currentTranslations.businessHours.sunday}</p>

                        {/* WhatsApp Support */}
                        <h4 className="text-lg font-bold text-gray-800 mt-6 mb-2">
                            {currentTranslations.whatsappSupport.title}
                        </h4>
                        <p className="text-gray-700">{currentTranslations.whatsappSupport.description}</p>

                        {/* Response Time */}
                        <h4 className="text-lg font-bold text-gray-800 mt-6 mb-2">
                            {currentTranslations.responseTime.title}
                        </h4>
                        <p className="text-gray-700">{currentTranslations.responseTime.description}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
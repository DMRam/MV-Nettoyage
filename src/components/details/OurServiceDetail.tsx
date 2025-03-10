import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { OtherScreenNavBar } from "../navbar/OtherScreenNavBar";
import { motion } from "framer-motion"; // Import Framer Motion
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { service_detail_translations } from "./ServiceDetailTranslations";
import emailjs from "emailjs-com"; // Import EmailJS
import { contact_email_credentials } from "../contact/emailjs/EmailJSCredentials";

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

    // State for form errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // State for submission status
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear errors when the user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    // Validate Canadian phone number
    const validateCanadianPhoneNumber = (phone: string) => {
        const canadianPhoneRegex = /^(\+?1)?[ -]?(\([0-9]{3}\)|[0-9]{3})[ -]?[0-9]{3}[ -]?[0-9]{4}$/;
        return canadianPhoneRegex.test(phone);
    };

    // Form validation function
    const validateForm = () => {
        const validationErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            validationErrors.name = "Name is required.";
        }

        if (!formData.email.trim()) {
            validationErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            validationErrors.email = "Invalid email address.";
        }

        if (!formData.phone.trim()) {
            validationErrors.phone = "Phone number is required.";
        } else if (!validateCanadianPhoneNumber(formData.phone)) {
            validationErrors.phone = "Invalid Canadian phone number.";
        }

        if (!formData.message.trim()) {
            validationErrors.message = "Message is required.";
        }

        return validationErrors;
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
                alert(service_detail_translations[languageSelected].successMessage);
                setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
            } else {
                alert(service_detail_translations[languageSelected].errorMessage);
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert(service_detail_translations[languageSelected].errorMessage);
        } finally {
            setIsSubmitting(false);
        }
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
        phonePlaceholder,
        messageLabel,
        submitButton,
        includedServicesTitle,
        serviceOverviewTitle,
        contactFormTitle,
        personalizationNote,
        successMessage,
        errorMessage,
    } = service_detail_translations[languageSelected] || service_detail_translations["⚜️ FR"]; // Fallback to French

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white"> {/* Gradient background */}
            {/* Local Navigation Bar */}
            <OtherScreenNavBar />

            {/* Service Details */}
            <motion.div
                className="mt-24 max-w-full mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-100" // Elegant container
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Animated Title */}
                <motion.h1
                    className="text-5xl font-serif font-bold text-blue-900 mb-8" // Elegant title
                    variants={containerVariants}
                >
                    {service.title}
                </motion.h1>

                {/* Animated Image */}
                <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg" // Elegant image
                    variants={containerVariants}
                />

                {/* Service Overview Section */}
                <motion.div className="mb-8" variants={containerVariants}>
                    <h2 className="text-3xl font-bold text-blue-900 mb-6"> {/* Elegant heading */}
                        {serviceOverviewTitle}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed"> {/* Relaxed text */}
                        {service.description}
                    </p>
                </motion.div>

                {/* Included Services Section */}
                {service.details && (
                    <motion.div className="mb-8" variants={containerVariants}>
                        <h2 className="text-3xl font-bold text-blue-900 mb-6"> {/* Elegant heading */}
                            {includedServicesTitle}
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg"> {/* Elegant list */}
                            {service.details.map((detail: string, index: number) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* Personalization Note */}
                <motion.div className="mb-8" variants={containerVariants}>
                    <p className="text-lg text-gray-700 italic">
                        {personalizationNote}
                    </p>
                </motion.div>

                {/* Contact Form for Service Request */}
                <motion.div className="mt-12" variants={containerVariants}>
                    <h2 className="text-3xl font-bold text-blue-900 mb-8"> {/* Elegant heading */}
                        {contactFormTitle}
                    </h2>
                    {/* CTA Text */}
                    <p className="text-lg text-gray-700 mb-8">
                        {service.cta} {/* Use the CTA text from the service object */}
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-blue-900 mb-2">
                                {nameLabel}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-2">
                                {emailLabel}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-blue-900 mb-2">
                                {phoneLabel}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder={phonePlaceholder} // Add placeholder
                                required
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-blue-900 mb-2">
                                {messageLabel}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={5}
                                required
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : submitButton}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};
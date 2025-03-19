import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { contact_translations } from "./ContactTranscription";
import emailjs from "@emailjs/browser";
import { contact_email_credentials } from "./emailjs/EmailJSCredentials";

export const ContactFromBanner = () => {
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
                    message: formData.message + " --- ContactFromBanner" ,
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
        <div className="p-6">
            <motion.h2
                className="text-3xl font-serif font-bold text-center mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {currentTranslations.contactTitle}
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.name
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
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.email
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
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.phone
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
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.message
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                            }`}
                        rows={4}
                        placeholder={currentTranslations.formPlaceholders.message}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-semibold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? currentTranslations.submittingButton : currentTranslations.submitButton}
                </motion.button>
            </form>
        </div>
    );
};
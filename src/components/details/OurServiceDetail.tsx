import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { OtherScreenNavBar } from "../navbar/OtherScreenNavBar";
import { motion } from "framer-motion";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { service_detail_translations } from "./ServiceDetailTranslations";
import emailjs from "emailjs-com";
import { contact_email_credentials } from "../contact/emailjs/EmailJSCredentials";

export const OurServiceDetail = () => {
    const { languageSelected } = useLanguageSelector();
    const location = useLocation();
    const { service } = location.state || {};

    console.log("Service Data:", service); // Debugging

    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateCanadianPhoneNumber = (phone: string) => {
        const canadianPhoneRegex = /^(\+?1)?[ -]?(\([0-9]{3}\)|[0-9]{3})[ -]?[0-9]{3}[ -]?[0-9]{4}$/;
        return canadianPhoneRegex.test(phone);
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
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
                setFormData({ name: "", email: "", phone: "", message: "" });
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

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
    };

    const {
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
    } = service_detail_translations[languageSelected] || service_detail_translations["⚜️ FR"];

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Dynamic Lines Background */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                className="absolute inset-0 z-0"
            >
                {/* Gradient Overlay */}
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#6B5B95" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#gradient)" />

                {/* Random Horizontal Lines */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <line
                        key={`h-${i}`}
                        x1="0"
                        y1={`${(i + 1) * 5}%`}
                        x2="100%"
                        y2={`${(i + 1) * 5}%`}
                        stroke="#FF6B6B"
                        strokeWidth="1"
                        strokeOpacity="0.3"
                    />
                ))}

                {/* Random Vertical Lines */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <line
                        key={`v-${i}`}
                        x1={`${(i + 1) * 5}%`}
                        y1="0"
                        x2={`${(i + 1) * 5}%`}
                        y2="100%"
                        stroke="#4ECDC4"
                        strokeWidth="1"
                        strokeOpacity="0.3"
                    />
                ))}

                {/* Random Diagonal Lines */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <line
                        key={`d-${i}`}
                        x1={`${Math.random() * 100}%`}
                        y1={`${Math.random() * 100}%`}
                        x2={`${Math.random() * 100}%`}
                        y2={`${Math.random() * 100}%`}
                        stroke="#6B5B95"
                        strokeWidth="1"
                        strokeOpacity="0.3"
                    />
                ))}
            </svg>

            {/* Content */}
            <div className="relative z-10">
                <OtherScreenNavBar />
                <motion.div
                    className="mt-24 mr-2 ml-2 max-w-full mx-auto p-8 backdrop-blur-lg bg-white/70 rounded-xl shadow-xl border border-gray-100"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-5xl font-serif font-bold text-blue-900 mb-8"
                        variants={containerVariants}
                    >
                        {service.title}
                    </motion.h1>

                    {/* Main Image (First image in the array) */}
                    {service.image && service.image.length > 0 && (
                        <motion.img
                            src={service.image[0]}
                            alt={service.title}
                            className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg"
                            variants={containerVariants}
                        />
                    )}

                    {/* Service Overview Section with Side-by-Side Image */}
                    <motion.div className="mb-8 flex flex-col md:flex-row gap-8" variants={containerVariants}>
                        {/* Service Overview Text */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-blue-900 mb-6">
                                {serviceOverviewTitle}
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        {/* Second Image (Right-hand side) */}
                        {service.image && service.image.length >= 1 && (
                            <motion.img
                                src={service.image[1]}
                                alt={`Additional Image 1`}
                                className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-xl shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            />
                        )}
                    </motion.div>

                    {/* Included Services Section */}
                    {service.details && (
                        <motion.div className="mb-8" variants={containerVariants}>
                            <h2 className="text-3xl font-bold text-blue-900 mb-6">
                                {includedServicesTitle}
                            </h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
                                {service.details.map((detail: string, index: number) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {/* Additional Images Grid (Remaining images in the array) */}
                    {service.image && Array.isArray(service.image) && service.image.length > 2 && (
                        <motion.div className="mb-8" variants={containerVariants}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {service.image.slice(2).map((image: string, index: number) => {
                                    console.log("Rendering image:", image); // Debugging
                                    return (
                                        <motion.img
                                            key={index}
                                            src={image}
                                            alt={`Additional Image ${index + 2}`}
                                            className="w-full h-64 object-cover rounded-xl shadow-lg"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.2 }}
                                        />
                                    );
                                })}
                            </div>
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
                        <h2 className="text-3xl font-bold text-blue-900 mb-8">
                            {contactFormTitle}
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            {service.cta}
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                    placeholder={phonePlaceholder}
                                    required
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                            </div>

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
        </div>
    );
};



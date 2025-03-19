import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { estimate_modal_translations } from "./EstimateModalTranslations";
import emailjs from 'emailjs-com';
import { estimate_email_credentials } from "../contact/emailjs/EmailJSCredentials";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

type AdditionalOptions = {
    deepCleaning: boolean;
    ecoFriendly: boolean;
    windowCleaning: boolean;
};

export const CleaningEstimateModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { languageSelected } = useLanguageSelector();
    const t = estimate_modal_translations[languageSelected];
    const [area, setArea] = useState<number | null>(null);
    const [displayArea, setDisplayArea] = useState("");
    const [isMetric, setIsMetric] = useState(false);
    const [cleaningType, setCleaningType] = useState("basic");
    const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({
        deepCleaning: false,
        ecoFriendly: false,
        windowCleaning: false,
    });
    const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showEstimate, setShowEstimate] = useState(false);
    const [errors, setErrors] = useState<{ area?: string; email?: string; phoneNumber?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [note, setNote] = useState("");

    // Conversion functions
    const convertToSquareMeters = (value: number) => value / 10.764; // Convert square feet to square meters
    const convertToSquareFeet = (value: number) => value * 10.764; // Convert square meters to square feet

    // Update display area when unit changes
    useEffect(() => {
        if (area !== null) {
            const convertedArea = isMetric ? area : convertToSquareFeet(area);
            setDisplayArea(convertedArea.toFixed(2).toString());
        }
    }, [isMetric]);

    // Handle area input change
    const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDisplayArea(value); 

        if (value === "") {
            setArea(null);
            return;
        }

        const numericValue = parseFloat(value); // Usa parseFloat en lugar de parseInt
        if (!isNaN(numericValue)) {
            const internalValue = isMetric ? numericValue : convertToSquareMeters(numericValue);
            setArea(internalValue);
        }
    };


    console.log(" ------> " + displayArea)
    // Validate phone number
    const validatePhoneNumber = (phoneNumber: string): string | undefined => {
        if (!phoneNumber) {
            return t.phoneNumberError || "Phone number is required.";
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            return t.phoneNumberError || "Please enter a valid 10-digit phone number.";
        }
        return undefined;
    };

    // Validate all inputs
    const validateInputs = () => {
        const newErrors: { area?: string; email?: string; phoneNumber?: string } = {};

        if (area === null || area <= 0) {
            newErrors.area = t.areaError;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = t.emailError || "Please enter a valid email address.";
        }

        const phoneNumberError = validatePhoneNumber(phoneNumber);
        if (phoneNumberError) {
            newErrors.phoneNumber = phoneNumberError;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Calculate the estimate
    const calculateEstimate = () => {
        const MINIMUM_PRICE = 120; // Minimum price for any service
        const BASE_RATE_SMALL = 0.9; // Base rate for areas <= 100 m²
        const BASE_RATE_MEDIUM = 0.7; // Base rate for areas > 100 m²
        const BASE_RATE_LARGE = 0.6; // Base rate for areas > 300 m²

        // Adjust pricing based on area size
        let basePricePerSqMeter = BASE_RATE_SMALL; // Default rate
        if (area && area > 100) basePricePerSqMeter = BASE_RATE_MEDIUM;
        if (area && area > 300) basePricePerSqMeter = BASE_RATE_LARGE;

        // Calculate base estimate
        let estimate = (area || 0) * basePricePerSqMeter;

        // Add cost for additional services (flat fees)
        if (additionalOptions.deepCleaning) estimate += 50; // Flat fee for deep cleaning
        if (additionalOptions.ecoFriendly) estimate += 30; // Flat fee for eco-friendly
        if (additionalOptions.windowCleaning) estimate += 70; // Flat fee for window cleaning

        // Ensure the estimate meets the minimum price
        if (estimate < MINIMUM_PRICE) estimate = MINIMUM_PRICE;

        // Round to 2 decimal places
        estimate = parseFloat(estimate.toFixed(2));

        setEstimatedCost(estimate);
        setShowEstimate(true);
    };

    // Send the estimate for validation
    const sendForValidation = async () => {
        if (!validateInputs()) return;

        setIsLoading(true);
        try {
            const emailData = {
                from_name: "Cleaning Estimate",
                from_email: email,
                phoneNumber: phoneNumber,
                area: `${displayArea} ${isMetric ? "m²" : "ft²"}`,
                cleaning_type: cleaningType,
                deepCleaning: additionalOptions.deepCleaning ? "Yes" : "No",
                ecoFriendly: additionalOptions.ecoFriendly ? "Yes" : "No",
                windowCleaning: additionalOptions.windowCleaning ? "Yes" : "No",
                estimated_cost: estimatedCost?.toLocaleString(),
                note: note,
            };

            await emailjs.send(
                estimate_email_credentials.service_key,
                estimate_email_credentials.template_key,
                emailData,
                estimate_email_credentials.email_key
            );

            setIsSent(true);
            alert(t.successMessage || "Your request was sent successfully!");
            onClose();
        } catch (error) {
            console.error("Error sending estimate:", error);
            alert(t.errorMessage || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Reset the modal when closed
    useEffect(() => {
        if (!isOpen) {
            setArea(null);
            setDisplayArea("");
            setIsMetric(false);
            setCleaningType("basic");
            setAdditionalOptions({ deepCleaning: false, ecoFriendly: false, windowCleaning: false });
            setEstimatedCost(null);
            setEmail("");
            setPhoneNumber("");
            setShowEstimate(false);
            setErrors({});
            setIsSent(false);
            setNote("");
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    role="dialog"
                    aria-modal="true"
                >
                    <motion.div
                        className="relative bg-white w-full max-w-[90vw] max-h-[90vh] sm:max-w-lg p-6 rounded-lg shadow-xl overflow-auto"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-2xl font-bold"
                            aria-label="Close modal"
                        >
                            ✖
                        </button>

                        <h2 className="text-xl font-bold text-gray-800">{t.title}</h2>
                        <p className="text-gray-600 mt-2">{t.description}</p>

                        <form className="mt-4 space-y-4">
                            {/* Measurement Unit */}
                            <div className="flex items-center justify-between">
                                <label className="text-gray-950">{t.measurementUnit} {isMetric ? "m²" : "ft²"}</label>
                                <button
                                    type="button"
                                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 transition-all"
                                    onClick={() => setIsMetric(!isMetric)}
                                >
                                    {t.switchUnit} {isMetric ? "ft²" : "m²"}
                                </button>
                            </div>

                            {/* Area Input */}
                            <div>
                                <div className="relative mt-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={displayArea}
                                            onChange={handleAreaChange}
                                            placeholder={t.areaPlaceholder}
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            aria-invalid={!!errors.area}
                                        />
                                    </div>
                                </div>
                                {errors.area && (
                                    <p id="areaError" className="text-red-500 text-sm mt-1">
                                        {errors.area}
                                    </p>
                                )}
                            </div>

                            {/* Additional Services */}
                            <div className="space-y-2">
                                <label className="font-medium text-gray-800">{t.additionalWork}</label>
                                <div className="flex flex-col gap-2">
                                    {Object.entries(additionalOptions).map(([key, value]) => (
                                        <label key={key} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={() =>
                                                    setAdditionalOptions((prev) => ({
                                                        ...prev,
                                                        [key]: !prev[key as keyof AdditionalOptions],
                                                    }))
                                                }
                                            />
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Estimate Review and Confirmation */}
                            {showEstimate && (
                                <motion.div
                                    className="mt-4 p-4 bg-green-50 border border-green-300 text-green-800 rounded-lg shadow-sm"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-lg font-medium">
                                        {t.estimatedCost}:
                                        <span className="font-bold text-green-900 ml-1">
                                            ${estimatedCost?.toLocaleString()}
                                        </span>
                                    </p>
                                    <p className="text-sm text-green-700 mt-1 italic">
                                        {t.message_final_price}
                                    </p>
                                </motion.div>
                            )}

                            {/* Recalculate Button */}
                            <button
                                type="button"
                                className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-500 transition-all"
                                onClick={calculateEstimate}
                            >
                                {t.reviewEstimate}
                            </button>

                            {
                                showEstimate && (
                                    <>
                                        {/* Email Input */}
                                        <div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t.emailPlaceholder}
                                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                aria-invalid={!!errors.email}
                                                aria-describedby="emailError"
                                            />
                                            {errors.email && (
                                                <p id="emailError" className="text-red-500 text-sm mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone Number Input */}
                                        <div>
                                            <input
                                                type="tel"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                placeholder={t.phonePlaceholder || "+1 (555) 555-5555"}
                                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                aria-invalid={!!errors.phoneNumber}
                                                aria-describedby="phoneError"
                                            />
                                            {errors.phoneNumber && (
                                                <p id="phoneError" className="text-red-500 text-sm mt-1">
                                                    {errors.phoneNumber}
                                                </p>
                                            )}
                                        </div>

                                        {/* Note Input */}
                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder={t.addNote}
                                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        />

                                        {/* Send Button */}
                                        <button
                                            type="button"
                                            onClick={sendForValidation}
                                            disabled={isLoading || isSent}
                                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition-all mt-2"
                                        >
                                            {isLoading ? t.sending : isSent ? t.sent : t.sendForValidation}
                                        </button>
                                    </>
                                )
                            }
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
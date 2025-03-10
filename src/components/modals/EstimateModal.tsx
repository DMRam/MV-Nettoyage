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
    const [image, setImage] = useState<File | null>(null);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showEstimate, setShowEstimate] = useState(false);
    const [errors, setErrors] = useState<{ area?: string; email?: string; phoneNumber?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [note, setNote] = useState("");

    const convertToMetric = (value: number) => value * 0.092903;
    const convertToImperial = (value: number) => value / 0.092903;

    useEffect(() => {
        if (area !== null) {
            const convertedArea = isMetric ? convertToMetric(area) : area;
            setDisplayArea(convertedArea.toString());
        }
    }, [isMetric, area]);

    const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setArea(null);
            setDisplayArea("");
            return;
        }
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            const internalValue = isMetric ? convertToImperial(numericValue) : numericValue;
            setArea(internalValue);
            setDisplayArea(value);
        }
    };

    // Separate function to validate the phone number
    const validatePhoneNumber = (phoneNumber: string): string | undefined => {
        if (!phoneNumber) {
            return t.phoneNumberError || "Phone number is required.";
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            return t.phoneNumberError || "Please enter a valid 10-digit phone number.";
        }
        return undefined; // No error
    };

    const validateInputs = () => {
        const newErrors: { area?: string; email?: string; phoneNumber?: string } = {};

        // Validate area
        if (area === null || area <= 0) {
            newErrors.area = t.areaError;
        }

        // Validate email
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = t.emailError || "Please enter a valid email address.";
        }

        // Validate phone number using the separate function
        const phoneNumberError = validatePhoneNumber(phoneNumber);
        if (phoneNumberError) {
            newErrors.phoneNumber = phoneNumberError;
        }

        console.log("Validation Errors:", newErrors); // Debugging
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateEstimate = () => {
        console.log("Calculate Estimate button clicked"); // Debugging

        const basePrice =
            cleaningType === "basic" ? 0.25 : cleaningType === "standard" ? 0.35 : 0.45;

        let estimate = (area || 0) * basePrice;

        if (additionalOptions.deepCleaning) estimate += (area || 0) * 0.05;
        if (additionalOptions.ecoFriendly) estimate += (area || 0) * 0.03;
        if (additionalOptions.windowCleaning) estimate += (area || 0) * 0.07;

        setEstimatedCost(parseFloat(estimate.toFixed(2)));
        setShowEstimate(true);
        console.log("Estimate calculated:", estimate); // Debugging
    };

    const sendForValidation = async () => {
        console.log("Send for Validation button clicked"); // Debugging
        if (!validateInputs()) {
            console.log("Validation failed. Cannot send form."); // Debugging
            return;
        }

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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert(t.uploadImageError);
                return;
            }
            if (!file.type.startsWith("image/")) {
                alert(t.uploadImageTypeError);
                return;
            }
            setImage(file);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setArea(null);
            setDisplayArea("");
            setIsMetric(false);
            setCleaningType("basic");
            setAdditionalOptions({ deepCleaning: false, ecoFriendly: false, windowCleaning: false });
            setEstimatedCost(null);
            setImage(null);
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
                                    <label className="block text-xs text-gray-600 font-medium mb-1">
                                        {t.message_recalculate}
                                    </label>

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

                            {/* Cleaning Type */}
                            <select
                                value={cleaningType}
                                onChange={(e) => setCleaningType(e.target.value)}
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="basic">{t.cleaningType.basic}</option>
                                <option value="standard">{t.cleaningType.standard}</option>
                                <option value="premium">{t.cleaningType.premium}</option>
                            </select>

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

                            {/* Image Upload - this can be done with Firestore */}
                            {/* <div>
                                <label className="font-medium text-gray-800">{t.uploadImage}</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="mt-1"
                                />
                                {image && <p className="text-green-600 mt-1">Image uploaded: {image.name}</p>}
                            </div> */}

                            {/* Estimate Review and Confirmation */}
                            {!showEstimate ? (
                                <button
                                    type="button"
                                    className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-500 transition-all"
                                    onClick={calculateEstimate}
                                >
                                    {t.reviewEstimate}
                                </button>
                            ) : (
                                <>
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
                                    <textarea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder={t.addNote}
                                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    />


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
                                            placeholder={t.phonePlaceholder || "Phone Number"}
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

                                    <button
                                        type="button"
                                        onClick={sendForValidation}
                                        disabled={isLoading || isSent}
                                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition-all mt-2"
                                    >
                                        {isLoading ? t.sending : isSent ? t.sent : t.sendForValidation}
                                    </button>
                                </>
                            )}
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
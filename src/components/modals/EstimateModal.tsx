import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

type AdditionalOptions = {
    deepCleaning: boolean;
    ecoFriendly: boolean;
    windowCleaning: boolean;
};

// Language configuration
const translations = {
    en: {
        title: "Cleaning Services Estimate",
        description: "Fill in the details to get an accurate cleaning estimate.",
        measurementUnit: "Measurement Unit:",
        switchUnit: "Switch to",
        areaPlaceholder: "Enter area",
        cleaningType: {
            basic: "Basic Cleaning ($0.25/sqft)",
            standard: "Standard Cleaning ($0.35/sqft)",
            premium: "Premium Cleaning ($0.45/sqft)",
        },
        additionalWork: "Additional Services:",
        uploadImage: "Upload an image (optional):",
        uploadImageError: "File size must be less than 5 MB.",
        uploadImageTypeError: "Please upload an image file.",
        emailPlaceholder: "Enter email to receive estimate",
        reviewEstimate: "Review Estimate",
        estimatedCost: "Estimated Cost:",
        confirmEstimate: "Confirm Estimate",
        sendForValidation: "Send for Validation",
        sending: "Sending...",
        sent: "Sent!",
        addNote: "Add a note (optional)",
        areaError: "Please enter a valid area.",
        emailError: "Please enter a valid email address.",
        message_recalculate: "➡️ The estimated price updates automatically when quantities change.",
        message_final_price: "➡️ This estimate is for reference only and does not constitute the final price."
    },
    fr: {
        title: "Estimation des Services de Nettoyage",
        description: "Remplissez les détails pour obtenir une estimation précise.",
        measurementUnit: "Unité de mesure :",
        switchUnit: "Changer en",
        areaPlaceholder: "Entrez la surface",
        cleaningType: {
            basic: "Nettoyage de base (0,25$/pi²)",
            standard: "Nettoyage standard (0,35$/pi²)",
            premium: "Nettoyage premium (0,45$/pi²)",
        },
        additionalWork: "Services supplémentaires :",
        uploadImage: "Téléverser une image (optionnel) :",
        uploadImageError: "La taille du fichier doit être inférieure à 5 Mo.",
        uploadImageTypeError: "Veuillez téléverser un fichier image.",
        emailPlaceholder: "Entrez votre email pour recevoir l'estimation",
        reviewEstimate: "Voir l'estimation",
        estimatedCost: "Coût Estimé :",
        confirmEstimate: "Confirmer l'estimation",
        sendForValidation: "Envoyer pour Validation",
        sending: "Envoi en cours...",
        sent: "Envoyé!",
        addNote: "Ajoutez une note (optionnel)",
        areaError: "Veuillez entrer une surface valide.",
        emailError: "Veuillez entrer une adresse email valide.",
        message_recalculate: "➡️ Le prix estimé est recalculé automatiquement lorsque les quantités changent.",
        message_final_price: "➡️ Cette estimation est fournie à titre indicatif et ne constitue pas un prix final."
    },
    es: {
        title: "Estimación de Servicios de Limpieza",
        description: "Complete los detalles para obtener una estimación precisa.",
        measurementUnit: "Unidad de medida:",
        switchUnit: "Cambiar a",
        areaPlaceholder: "Ingrese el área",
        cleaningType: {
            basic: "Limpieza básica ($0.25/pie²)",
            standard: "Limpieza estándar ($0.35/pie²)",
            premium: "Limpieza premium ($0.45/pie²)",
        },
        additionalWork: "Servicios adicionales:",
        uploadImage: "Subir una imagen (opcional):",
        uploadImageError: "El tamaño del archivo debe ser menor a 5 MB.",
        uploadImageTypeError: "Por favor suba un archivo de imagen.",
        emailPlaceholder: "Ingrese su email para recibir la estimación",
        reviewEstimate: "Revisar Estimación",
        estimatedCost: "Costo Estimado:",
        confirmEstimate: "Confirmar Estimación",
        sendForValidation: "Enviar para Validación",
        sending: "Enviando...",
        sent: "¡Enviado!",
        addNote: "Agregar una nota (opcional)",
        areaError: "Por favor ingrese un área válida.",
        emailError: "Por favor ingrese un email válido.",
        message_recalculate: "➡️ El precio estimado se actualiza automáticamente al modificar las cantidades.",
        message_final_price: "➡️ Esta es solo una estimación y no representa el precio final."
    },
};

// Hardcoded language for now (can be replaced with Redux state)
const currentLanguage = "fr"; // Change to 'en' or 'es' for other languages
const t = translations[currentLanguage];

export const CleaningEstimateModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
    const [showEstimate, setShowEstimate] = useState(false);
    const [errors, setErrors] = useState<{ area?: string; email?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [note, setNote] = useState("");

    // Convert square feet to square meters
    const convertToMetric = (value: number) => value * 0.092903;

    // Convert square meters to square feet
    const convertToImperial = (value: number) => value / 0.092903;

    // Update the displayed area when the unit changes
    useEffect(() => {
        if (area !== null) {
            const convertedArea = isMetric ? convertToMetric(area) : area;
            setDisplayArea(convertedArea.toString());
        }
    }, [isMetric, area]);

    // Handle area input change
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

    // Validate inputs
    const validateInputs = () => {
        const newErrors: { area?: string; email?: string } = {};
        if (area === null || area <= 0) {
            newErrors.area = t.areaError;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = t.emailError;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Calculate the cleaning estimate
    const calculateEstimate = () => {
        if (!validateInputs()) return;

        const basePrice =
            cleaningType === "basic" ? 0.25 : cleaningType === "standard" ? 0.35 : 0.45;

        let estimate = (area || 0) * basePrice;

        if (additionalOptions.deepCleaning) estimate += (area || 0) * 0.05;
        if (additionalOptions.ecoFriendly) estimate += (area || 0) * 0.03;
        if (additionalOptions.windowCleaning) estimate += (area || 0) * 0.07;

        setEstimatedCost(parseFloat(estimate.toFixed(2)));
        setShowEstimate(true);
    };

    // Recalculate estimate when inputs change
    useEffect(() => {
        if (area !== null && area > 0) {
            calculateEstimate();
        }
    }, [area, cleaningType, additionalOptions, isMetric]);

    // Handle sending the estimate for validation
    const sendForValidation = async () => {
        if (!validateInputs()) return;

        setIsLoading(true);
        try {
            // Simulate API call to send data to the enterprise
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsSent(true);
        } catch (error) {
            console.error("Error sending estimate:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle image upload
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

    // Reset form on close
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

                        <form
                            className="mt-4 space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                calculateEstimate();
                            }}
                        >
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

                            {/* Image Upload */}
                            <div>
                                <label className="font-medium text-gray-800">{t.uploadImage}</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="mt-1"
                                />
                                {image && <p className="text-green-600 mt-1">Image uploaded: {image.name}</p>}
                            </div>

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
                                    <textarea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder={t.addNote}
                                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
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
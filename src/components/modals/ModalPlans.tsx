import React from "react";
import { modal_plans_translations } from "./EstimateModalTranslations";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: any; // Pass the selected plan data
    languageSelected: string; // Pass the selected language
}

export const ModalPlans: React.FC<ModalProps> = ({ isOpen, onClose, plan, languageSelected }) => {
    if (!isOpen) return null;

    // Get translations for the selected language
    const translations = modal_plans_translations[languageSelected];

    return (
        <div 
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md relative transform transition-all duration-300 ease-out scale-95 hover:scale-100">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Modal Content */}
                <h2 className="text-2xl font-semibold mb-6">
                    {translations.modal.title} {plan.title}
                </h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            {translations.modal.nameLabel}
                        </label>
                        <input
                            type="text"
                            placeholder={translations.modal.namePlaceholder}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            {translations.modal.emailLabel}
                        </label>
                        <input
                            type="email"
                            placeholder={translations.modal.emailPlaceholder}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            {translations.modal.serviceTypeLabel}
                        </label>
                        <input
                            type="text"
                            value={plan.title}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                            readOnly
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">
                            {translations.modal.notesLabel}
                        </label>
                        <textarea
                            placeholder={translations.modal.notesPlaceholder}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg mr-4 hover:bg-gray-600 transition-colors duration-300"
                        >
                            {translations.modal.cancelButton}
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                            {translations.modal.submitButton}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
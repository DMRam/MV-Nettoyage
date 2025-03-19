import { useEffect } from 'react';

export const ContactFormModal = ({ isOpen, onClose, children }: any) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
        }

        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative z-10">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-all"
                    aria-label="Close modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Modal content */}
                {children}
            </div>
        </div>
    );
};

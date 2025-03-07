import React from 'react';
import { X } from 'lucide-react';

// Modal component
interface ModalProps {
    image: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
}

export const WorkDoneModal: React.FC<ModalProps> = ({ image, description, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 z-50" onClick={onClose}>
            <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-1 right-0.5 text-gray-600 hover:text-gray-900" onClick={onClose}>
                    <X size={24} />
                </button>
                <img src={image} alt="Work Done" className="w-full h-64 object-cover rounded-md" />
                <p className="mt-4 text-gray-700 text-center">{description}</p>
            </div>
        </div>
    );
};

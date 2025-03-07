import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, image }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              ✖
            </button>

            {/* Content */}
            <h3 className="text-2xl font-semibold text-blue-600">{title}</h3>
            <p className="mt-4 text-gray-700">{description}</p>

            {image && (
              <img
                src={image}
                alt={title}
                className="mt-4 w-full h-64 object-cover rounded-lg shadow-md"
              />
            )}

            {/* Close Button at Bottom */}
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
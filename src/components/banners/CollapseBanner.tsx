import { motion } from 'framer-motion';

export const PromoBannerCollapsed = ({ handleExpand }: any) => {
    return (
        <motion.div
            className="fixed bottom-4 left-4 flex items-center gap-2 cursor-pointer z-50"
            onClick={handleExpand}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }} // Slight scale-up on hover
        >
            {/* Promo Icon */}
            <motion.div
                className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 10 }} // Rotate on hover
            >
                <span className="text-white text-xl font-bold">🎉</span>
            </motion.div>

            {/* Promo Label */}
            <motion.div
                className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }} // Delayed animation
            >
                Tap to expand
            </motion.div>
        </motion.div>
    );
};

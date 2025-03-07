import React from "react";
import { useLocation } from "react-router-dom";
import { OtherScreenNavBar } from "../navbar/OtherScreenNavBar";
import { motion } from "framer-motion"; // Import Framer Motion

export const OurServiceDetail = () => {
    const location = useLocation();
    const { service } = location.state || {}; 

    if (!service) {
        return <div>No service data found.</div>;
    }

    // Animation variants for the service details
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
    };

    return (
        <div style={{ marginTop: 30 }} className="p-8">
            {/* Local Navigation Bar */}
            <OtherScreenNavBar />

            {/* Service Details */}
            <motion.div
                className="mt-24" // Add margin-top to avoid overlap with the fixed nav bar
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Animated Title */}
                <motion.h1
                    className="text-4xl font-serif font-bold text-gray-900 mb-6"
                    variants={containerVariants}
                >
                    {service.title}
                </motion.h1>

                {/* Animated Image */}
                <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-96 object-cover rounded-lg mb-6"
                    variants={containerVariants}
                />

                {/* Animated Description */}
                <motion.p
                    className="text-lg text-gray-600"
                    variants={containerVariants}
                >
                    {service.description}
                </motion.p>
            </motion.div>
        </div>
    );
};
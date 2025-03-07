import React from 'react';
import { Carousel } from '../carousel/Carousel';

export const Portfolio = () => {
    return (
        <section className="py-20 px-6 text-center bg-gradient-to-b from-gray-200 to-white rounded-t-3xl shadow-lg border border-gray-100 relative -mt-10" id="portfolio">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Recent Work</h2>
            <div className="max-w-5xl mx-auto">
                <Carousel />
            </div>
        </section>
    );
};
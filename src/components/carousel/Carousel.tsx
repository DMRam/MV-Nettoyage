import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './carousel.css';

// Import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { imageList } from '../../assets/images/carousel';
import { WorkDoneModal } from '../modals/WorkDoneModal';


export const Carousel = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [modalDescription, setModalDescription] = useState('');


    const handleImageClick = (image: string, description: string) => {
        setModalImage(image);
        setModalDescription(description);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                autoplay={{
                    delay: 3500, // Set the delay (in ms) between slides
                    disableOnInteraction: false, // Autoplay will not stop when the user interacts with the carousel
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="w-full max-w-5xl mx-auto"
            >
                {imageList.map((imageData, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={imageData.src}
                            alt={imageData.alt}
                            className="w-full h-84 object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
                            onClick={() => handleImageClick(imageData.src, imageData.description)}
                        />

                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Modal */}
            <WorkDoneModal
                image={modalImage}
                description={modalDescription}
                isOpen={modalOpen}
                onClose={closeModal}
            />
        </>
    );
};

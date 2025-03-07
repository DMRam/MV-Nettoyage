// utils/preloadImages.js
export const preloadImages = ({ imageUrls }: any) => {
    imageUrls.forEach(({ url }: any) => {
        const img = new Image();
        img.src = url;
    });
};
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const carouselImages = [
  "/img/DOM.jpeg",
  "/img/KH.jpg",
  "/img/GOW.jpg",
  "/img/superMarioOdyssey.jpg",
  "/img/totkZelda.jpg",
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center py-10 px-6 md:px-24">
      <div className="relative w-[600px] md:w-[800px] h-[400px] rounded-xl overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={carouselImages[currentIndex]}
            alt={`Carrusel ${currentIndex}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

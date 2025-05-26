import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FetchNews from "../../components/FetchNews";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import GameQuotes from "../../components/GameQuotes";
import ParticlesBackground from "../../components/ParticlesBackground";

const sections = [
  {
    title: "Explora nuevos mundos",
    texts: [
      "Sumérgete en historias inolvidables.",
      "Descubre aventuras más allá de la realidad.",
      "Tu próxima gran partida comienza aquí.",
    ],
    img: "/img/expedition33.jpg",
  },
  {
    title: "Revive lo retro",
    texts: [
      "La nostalgia en cada píxel.",
      "Clásicos que marcaron generaciones.",
      "Vuelve a jugar como la primera vez.",
    ],
    img: "/img/gameBoy.jpg",
  },
  {
    title: "Analizamos lo mejor",
    texts: [
      "Opiniones expertas y honestas.",
      "Profundizamos en cada detalle.",
      "Descubre joyas ocultas y blockbusters.",
    ],
    img: "/img/FFVII.jpeg",
  },
];

const carouselImages = [
  "/img/DOM.jpeg",
  "/img/KH.jpg",
  "/img/GOW.jpg",
  "/img/superMarioOdyssey.jpg",
  "/img/totkZelda.jpg",
];

export default function Home() {
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
    <div
      className="relative w-full min-h-screen text-white overflow-hidden bg-black"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <ParticlesBackground />

      {/* Contenido principal con z-index para que esté encima */}
      <div className="relative z-10">
        {sections.map((section, index) => {
          const isReverse = index % 2 !== 0;
          return (
            <div
              key={index}
              className={`w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 py-16 gap-8 ${
                isReverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Imagen */}
              <motion.img
                src={section.img}
                alt={section.title}
                className="w-full md:w-1/2 rounded-3xl shadow-2xl object-cover h-[300px] md:h-[400px]"
                initial={{ x: isReverse ? 200 : -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />

              {/* Textos animados */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <motion.h2
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {section.title}
                </motion.h2>
                {section.texts.map((text, i) => (
                  <motion.p
                    key={i}
                    className="text-lg md:text-xl text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 * (i + 1) }}
                    viewport={{ once: true }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </div>
          );
        })}

        {/* Texto editorial */}
        <div className="w-full px-6 md:px-24 py-16 text-center">
          <h3 className="text-3xl md:text-5xl font-bold text-purple-400 mb-8">
            Porque los videojuegos son más que entretenimiento
          </h3>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto text-justify leading-relaxed">
            Desde los píxeles de los 80 hasta las obras maestras narrativas de
            hoy, los videojuegos han evolucionado como una forma de arte,
            conexión y cultura. Aquí celebramos cada historia, cada partida, y
            cada mundo que ha marcado nuestras vidas. Acompáñanos en este viaje
            donde el mando es tu pincel, y la pantalla tu lienzo.
          </p>
        </div>

        {/* Carrusel con imagen única y cambio automático */}
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
        <GameQuotes />
        <FetchNews />
        <ScrollToTopButton />
      </div>
    </div>
  );
}

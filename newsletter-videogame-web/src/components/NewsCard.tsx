import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface NewsCardProps {
  imageUrl: string;
  title: string;
  link: string;
  reverse?: boolean;
  darkBackground?: boolean; // <-- nueva prop
}

export default function NewsCard({
  imageUrl,
  title,
  link,
  reverse = false,
  darkBackground,
}: NewsCardProps) {
  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center justify-between w-full px-8 md:px-24 ${
        reverse ? "md:flex-row-reverse md:space-x-reverse" : ""
      } ${darkBackground ? "md:space-x-32" : "md:space-x-36"}`} // más separación si es fondo oscuro
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* Imagen */}
      <motion.div
        className="w-full md:w-3/5 flex flex-col items-start justify-center text-center md:text-left gap-6 md:pl-2 px-6"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition duration-700 pointer-events-none" />
      </motion.div>

      {/* Texto */}
      <motion.div
        className="w-full md:w-2/5 flex flex-col items-start justify-center text-center md:text-left gap-4"
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          {title}
        </h2>
        <Link
          to={link}
          className="inline-flex items-center mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600
             text-white rounded-lg font-semibold shadow-lg
             hover:from-indigo-600 hover:to-purple-600
             transition-colors duration-300 ease-in-out
             hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 cursor-pointer"
        >
          Leer más
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
}

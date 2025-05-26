// src/components/GameQuotes.tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const quotes = [
  {
    quote: "The right man in the wrong place can make all the difference in the world.",
    author: "Half-Life 2",
  },
  {
    quote: "It's dangerous to go alone! Take this.",
    author: "The Legend of Zelda",
  },
  {
    quote: "War. War never changes.",
    author: "Fallout",
  },
  {
    quote: "Stay awhile and listen...",
    author: "Diablo II",
  },
  {
    quote: "Do a barrel roll!",
    author: "Star Fox 64",
  },
];

export default function GameQuotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-6 md:px-24 py-20 bg-gradient-to-b from-black to-zinc-900 text-white text-center">
      <h3 className="text-2xl md:text-4xl font-bold text-purple-400 mb-10">
        Citas que marcaron generaciones
      </h3>

      <div className="min-h-[150px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl italic text-gray-200 mb-4">
              “{quotes[index].quote}”
            </p>
            <p className="text-md md:text-lg text-gray-400">— {quotes[index].author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

// Hacer un bucle de la API para obtener las noticias, iterando sobre los resultados
// y mostrando el título y la imagen de cada noticia

export default function FetchNews() {
  //news es un conjuntos donde guardamos las noticias
  // y setNews es la función que nos permite actualizar el estado
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/articles/");
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="relative">
      {news.map((item, index) => {
        const isReverse = index % 2 !== 0;
        const bgColor = isReverse
          ? "bg-amber-50 text-neutral-900"
          : "bg-neutral-900 text-white";

        return (
          <div
            key={item.id}
            className={`sticky top-0 h-screen w-full flex items-center justify-center ${bgColor} transition-all duration-1000`}
          >
            <NewsCard
              imageUrl={item.img}
              title={item.title}
              link={`/articles/${item.id}`}
              reverse={isReverse}
              darkBackground={!isReverse} // <-- los que NO son reverse tienen fondo negro
            />
          </div>
        );
      })}
    </div>
  );
}

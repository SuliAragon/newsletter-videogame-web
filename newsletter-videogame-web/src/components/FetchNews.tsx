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
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Últimas Noticias</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((news) => (
          <NewsCard
            key={news.id}
            imageUrl={news.img}
            title={news.title}
            link="http://localhost:8080/articles/{news.id}"
          />
        ))}
      </div>
    </section>
  );
}

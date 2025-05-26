import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AnimatedSection from "../../components/AnimatedSection";

interface Article {
  id: number;
  title: string;
  content: string;
  img: string;
  types: string[];
}

export default function NoticiasPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/articles/")
      .then((res) => {
        const filtered = res.data.filter((article: Article) =>
          article.types.includes("NOTICIA")
        );
        setArticles(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando los artículos.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Cargando artículos...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (articles.length === 0)
    return <p className="p-4">No hay artículos de tipo NOTICIAS.</p>;

  return (
    <div className="grid grid-cols-1 gap-8 p-6 md:p-12 max-w-7xl mx-auto">
      {articles.map(({ id, title, content, img }, index) => {
        const isReverse = index % 2 !== 0;
        return (
          <AnimatedSection key={id} from={isReverse ? "right" : "left"}>
            <Link
              to={`/articles/${id}`}
              className={`border border-gray-300 rounded-lg shadow-lg
                hover:shadow-2xl hover:scale-105 hover:ring-2 hover:ring-indigo-500
                transition-transform transition-shadow duration-300 ease-in-out
                p-4 flex flex-col md:flex-row gap-6 no-underline text-inherit
                ${isReverse ? "md:flex-row-reverse" : ""}`}
            >
              <img
                src={img}
                alt={title}
                className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center md:w-1/2 bg-black bg-opacity-60 p-6 rounded-lg text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">{title}</h2>
                <p className="text-gray-200">{content.substring(0, 250)}...</p>
                <span className="mt-6 inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold w-max cursor-pointer">
                  Leer más
                </span>
              </div>
            </Link>
          </AnimatedSection>
        );
      })}
    </div>
  );
}

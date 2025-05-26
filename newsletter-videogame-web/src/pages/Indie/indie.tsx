import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Article {
  id: number;
  title: string;
  content: string;
  img: string;
  types: string[];
}

export default function IndiePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/articles/")
      .then((res) => {
        const filtered = res.data.filter((article: Article) =>
          article.types.includes("INDIE")
        );
        setArticles(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando los artículos.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-gray-300">Cargando artículos...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (articles.length === 0)
    return <p className="p-4 text-gray-300">No hay artículos de tipo INDIE.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-8">
      <h1 className="text-5xl font-handwriting text-indigo-300 mb-12 text-center drop-shadow-lg">
        Juegos Indie Destacados
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map(({ id, title, content, img }) => (
          <Link
            key={id}
            to={`/articles/${id}`}
            className="group bg-[#1E1B29] rounded-3xl border-2 border-indigo-700
              shadow-lg shadow-indigo-900/50
              p-6 flex flex-col cursor-pointer
              transition-transform transform hover:scale-105 hover:shadow-indigo-600/80
              duration-500
            "
          >
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl drop-shadow-xl">
              <img
                src={img}
                alt={title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute top-3 left-3 bg-indigo-700 bg-opacity-80 text-indigo-200 text-xs uppercase px-3 py-1 rounded font-serif tracking-wide shadow-md">
                Indie
              </span>
            </div>

            <h2 className="font-serif text-indigo-200 text-2xl mb-3">{title}</h2>
            <p
              className="text-indigo-300 flex-grow leading-relaxed"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {content}
            </p>

            <div className="mt-5 text-right">
              <span className="inline-block text-indigo-400 font-semibold tracking-wide hover:text-indigo-200 transition-colors">
                Leer más →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

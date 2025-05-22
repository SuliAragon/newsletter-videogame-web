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

export default function NoticiasPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/articles/")
      .then((res) => {
        const filtered = res.data.filter((article: Article) =>
          article.types.includes("NOTICIAS")
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {articles.map(({ id, title, content, img }) => (
        <Link
          to={`/articles/${id}`}
          key={id}
          className="
            border border-gray-300 rounded-lg shadow-md 
            hover:shadow-2xl hover:scale-105 hover:border-indigo-500 
            transition-transform duration-300 ease-in-out
            p-4 flex flex-col no-underline text-inherit
          "
        >
          <img
            src={img}
            alt={title}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="flex-grow text-gray-700">
            {content.substring(0, 150)}...
          </p>
        </Link>
      ))}
    </div>
  );
}

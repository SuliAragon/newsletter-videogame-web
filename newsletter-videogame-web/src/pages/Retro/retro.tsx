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

export default function RetroPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/articles/")
      .then((res) => {
        const filtered = res.data.filter((article: Article) =>
          article.types.includes("RETRO")
        );
        setArticles(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando los artículos.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-gray-700">Cargando artículos...</p>;
  if (error) return <p className="p-4 text-red-700">{error}</p>;
  if (articles.length === 0)
    return <p className="p-4 text-gray-700">No hay artículos de tipo RETRO.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-[#9BBC0F] min-h-screen justify-center">
      {articles.map(({ id, title, content, img }) => (
        <div
          key={id}
          className="
            w-full max-w-md bg-[#DDE2C4] rounded-lg border-4 border-[#526B2F] 
            shadow-inner shadow-[#6B8E23] 
            overflow-hidden flex flex-col cursor-pointer
            hover:brightness-110 transition-all duration-300 mx-auto
          "
          style={{ height: "420px" }}
        >
          <Link to={`/articles/${id}`} className="block relative flex-shrink-0">
            <img
              src={img}
              alt={title}
              className="w-full h-40 object-cover border-b-4 border-[#526B2F]"
            />
            <span className="absolute top-2 left-2 bg-[#526B2F] text-[#DDE2C4] text-xs uppercase px-2 py-1 rounded font-mono tracking-wide">
              Retro
            </span>
          </Link>

          <div className="p-4 flex flex-col flex-grow overflow-hidden font-mono text-[#334B00]">
            <Link to={`/articles/${id}`} className="no-underline flex flex-col flex-grow">
              <h3
                className="text-lg font-bold mb-2 truncate"
                title={title}
              >
                {title}
              </h3>
              <p
                className="flex-grow"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {content}
              </p>
            </Link>
            <div className="mt-3">
              <Link
                to={`/articles/${id}`}
                className="inline-block bg-[#526B2F] hover:bg-[#334B00] text-[#DDE2C4] font-semibold py-2 px-4 rounded transition-colors font-mono"
              >
                Leer más
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

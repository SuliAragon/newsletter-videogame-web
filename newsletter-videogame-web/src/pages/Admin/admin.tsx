import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ArticleDTO {
  id: number;
  createDate: string;
  updateDate: string;
  title: string;
  content: string;
  img?: string;
  types: string[];
}

export default function ArticlesAdmin() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ArticleDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/articles/");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que quieres eliminar este artículo?")) return;

    try {
      await axios.delete(`http://localhost:8080/articles/${id}`);
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Error eliminando artículo:", error);
      alert("No se pudo eliminar el artículo");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 sm:mb-0">
          Gestión de Artículos
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            onClick={() => navigate("/admin/create")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition transform hover:shadow-lg"
          >
            + Crear artículo
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="w-full table-auto border border-gray-200 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-left text-sm text-gray-700">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Fecha</th>
              <th className="p-3 border-b">Título</th>
              <th className="p-3 border-b">Tipo</th>
              <th className="p-3 border-b">Imagen</th>
              <th className="p-3 border-b">Acciones</th>{" "}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {filteredArticles.map((article) => (
              <tr
                key={article.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-3 border-b">{article.id}</td>
                <td className="p-3 border-b">
                  {new Date(article.createDate).toLocaleDateString()}
                </td>
                <td className="p-3 border-b">{article.title}</td>
                <td className="p-3 border-b">{article.types.join(", ")}</td>
                <td className="p-3 border-b">
                  {article.img ? (
                    <img
                      src={article.img}
                      alt="preview"
                      className="h-16 w-auto rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 italic">Sin imagen</span>
                  )}
                </td>
                <td className="p-3 border-b">
                  <div className="flex flex-col items-start gap-2">
                    <button
                      onClick={() => navigate(`/admin/edit/${article.id}`)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition h-8 w-full flex items-center justify-center"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition h-8 w-full flex items-center justify-center"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredArticles.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500 italic"
                >
                  No hay artículos que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

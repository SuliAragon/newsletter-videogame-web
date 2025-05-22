import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface ArticleDTO {
  id: number;
  title: string;
  content: string;
  img?: string;
  types: string[];
  userId: number;
}

interface UserDTO {
  id: number;
  username: string;
}

export default function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<ArticleDTO | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const articleTypes = ["ANALISIS", "NOTICIA", "INDIE", "RETRO"];

  useEffect(() => {
    // Cargar usuarios para autor
    axios
      .get("http://localhost:8080/users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error cargando usuarios:", err));
  }, []);

  useEffect(() => {
    if (!id) return;
    async function fetchArticle() {
      try {
        const response = await axios.get(
          `http://localhost:8080/articles/${id}`
        );
        const data = response.data as ArticleDTO;
        setArticle(data);
        setTitle(data.title);
        setContent(data.content);
        setImgUrl(data.img);
        setTypes(data.types);
        setSelectedUserId(data.userId);
      } catch (error) {
        console.error("Error al cargar artículo:", error);
      }
    }
    fetchArticle();
  }, [id]);

  // Solo permitir seleccionar UNA categoría
  const handleTypeChange = (type: string) => {
    if (types.includes(type)) {
      setTypes([]);
    } else {
      setTypes([type]);
    }
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(e.target.files[0]);
      setImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId) {
      alert("Selecciona un autor");
      return;
    }

    if (types.length === 0) {
      alert("Selecciona una categoría");
      return;
    }

    try {
      let uploadedImgUrl = imgUrl || "";

      if (imgFile) {
        // Subir imagen al backend
        const formData = new FormData();
        formData.append("file", imgFile);

        const uploadRes = await axios.post(
          "http://localhost:8080/upload-image",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        uploadedImgUrl = uploadRes.data.url;
      }

      await axios.put(`http://localhost:8080/articles/${id}`, {
        title,
        content,
        img: uploadedImgUrl,
        types,
        userId: selectedUserId,
      });

      alert("Artículo actualizado con éxito");
      navigate("/admin");
    } catch (error) {
      console.error("Error actualizando artículo:", error);
      alert("Error al guardar el artículo");
    }
  };

  if (!article)
    return (
      <p className="text-center mt-10 text-gray-600">Cargando artículo...</p>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 mt-12 bg-white rounded-3xl shadow-lg border border-gray-200"
    >
      <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
        Editar Artículo
      </h2>

      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-2">Título</label>
        <input
          type="text"
          className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Título del artículo"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-2">
          Contenido
        </label>
        <textarea
          className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-y min-h-[150px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Contenido del artículo"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-2">Imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImgChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition cursor-pointer"
        />
        {imgUrl && (
          <img
            src={imgUrl}
            alt="Preview"
            className="mt-4 max-h-48 rounded-lg object-contain border border-gray-300 shadow-sm"
          />
        )}
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-3">
          Categorías
        </label>
        <div className="flex flex-wrap gap-4">
          {articleTypes.map((type) => (
            <label
              key={type}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 font-medium select-none"
            >
              <input
                type="checkbox"
                checked={types.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="block font-semibold text-gray-700 mb-2">Autor</label>
        <select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        >
          <option value="" disabled>
            Selecciona un autor
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl shadow-lg border border-indigo-700 hover:bg-indigo-700 hover:text-white transition-transform hover:scale-105 transform"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}

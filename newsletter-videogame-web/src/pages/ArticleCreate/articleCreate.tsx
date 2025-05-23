import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface UserDTO {
  id: number;
  username: string;
}

export default function ArticleCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [typeError, setTypeError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const articleTypes = ["INDIE", "NOTICIA", "ANALISIS", "RETRO"];

  const handleTypeChange = (type: string) => {
    if (types.includes(type)) {
      setTypes(types.filter((t) => t !== type));
    } else {
      setTypes([...types, type]);
    }
  };

  const isFormValid =
    title.trim() !== "" &&
    content.trim() !== "" &&
    selectedUserId !== null &&
    types.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId) {
      alert("Selecciona un autor");
      return;
    }

    if (types.length === 0) {
      setTypeError(true);
      return;
    }

    setTypeError(false);

    try {
      let imgUrl = "";
      if (imgFile) {
        const formData = new FormData();
        formData.append("file", imgFile);

        const uploadRes = await axios.post(
          "http://localhost:8080/upload-image",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        imgUrl = uploadRes.data.url;
      }

      const newArticle = {
        title,
        content,
        img: imgUrl,
        userId: selectedUserId,
        types,
      };

      await axios.post("http://localhost:8080/articles/", newArticle);
      alert("Artículo creado con éxito");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Error al crear el artículo");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-3xl shadow-xl"
    >
      <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
        Crear nuevo artículo
      </h2>

      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-1">Título</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Textarea para editar contenido Markdown */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-1">
          Contenido (Markdown)
        </label>
        <textarea
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 h-40 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      {/* Nuevo textarea de solo lectura que muestra el contenido Markdown crudo */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-1">
          Previsualización (texto Markdown crudo)
        </label>
        <textarea
          readOnly
          className="w-full px-4 py-2 border rounded-xl shadow-sm bg-gray-100 h-40 resize-none"
          value={content}
        />
      </div>

      {/* Vista previa renderizada como HTML desde Markdown */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-2">
          Vista previa renderizada
        </label>
        <div className="p-4 border rounded bg-gray-50 max-h-64 overflow-auto">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-1">Imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImgFile(e.target.files ? e.target.files[0] : null)
          }
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-2">Tipos</label>
        <div className="flex flex-wrap gap-4">
          {articleTypes.map((type) => (
            <label
              key={type}
              className="flex items-center space-x-2 text-sm font-medium text-gray-600"
            >
              <input
                type="checkbox"
                className="accent-purple-600 w-4 h-4"
                checked={types.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        {typeError && (
          <p className="text-sm text-red-500 mt-2">
            Debes seleccionar al menos un tipo.
          </p>
        )}
      </div>

      <div className="mb-8">
        <label className="block font-semibold text-gray-700 mb-1">Autor</label>
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
          disabled={!isFormValid}
          className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-transform ${
            isFormValid
              ? "hover:scale-105 hover:shadow-lg"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          Publicar artículo
        </button>
      </div>
    </form>
  );
}

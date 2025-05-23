import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

interface Article {
  id: number;
  title: string;
  img: string;
  content: string;
  authorName: string;
  createDate?: string;
  updateDate?: string;
}

interface State {
  article: Article | null;
  loading: boolean;
  error: string | null;
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<State>({
    article: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setState({ article: null, loading: true, error: null });

        const { data: article } = await axios.get<Article>(
          `http://localhost:8080/articles/${id}`
        );
        setState({ article, loading: false, error: null });
      } catch (error) {
        setState({
          article: null,
          loading: false,
          error: "No se pudo cargar el artículo.",
        });
      }
    };

    fetchData();
  }, [id]);

  const { article, loading, error } = state;

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto animate-pulse space-y-4">
        <div className="h-12 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-64 bg-gray-300 rounded"></div>
        <div className="h-24 bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center text-gray-600">
        Artículo no encontrado
      </div>
    );
  }

  return (
    <article className="p-12 max-w-4xl mx-auto bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-3xl shadow-2xl transform ">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-8">
        {article.title}
      </h1>

      <div className="flex items-center space-x-6 mb-12 text-gray-500 italic font-semibold tracking-wide text-lg">
        <span className="bg-indigo-100 rounded-xl px-4 py-1 text-indigo-700 drop-shadow-md">
          Por {article.authorName || "Desconocido"}
        </span>
        {article.createDate && (
          <time
            dateTime={article.createDate}
            className="bg-purple-100 rounded-xl px-4 py-1 text-purple-700 drop-shadow-md"
          >
            {new Date(article.createDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </div>

      {article.img && (
        <img
          src={article.img}
          alt={article.title}
          className="rounded-3xl mb-12 w-full object-cover max-h-[400px] shadow-2xl"
          loading="lazy"
        />
      )}

      <div className="prose max-w-none">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
}

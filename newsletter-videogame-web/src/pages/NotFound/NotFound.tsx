import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p className="mb-6 text-gray-600">
        Lo sentimos, la ruta que buscabas no existe.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

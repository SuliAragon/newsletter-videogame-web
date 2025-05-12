import { Link } from "react-router-dom";

interface NewsCardProps {
  imageUrl: string;
  title: string;
  link: string;
}

export default function NewsCard({ imageUrl, title, link }: NewsCardProps) {
  return (
    <div className="relative w-full h-52 overflow-hidden rounded-xl shadow-lg group cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Capa oscura al hacer hover */}
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-30 transition duration-500"></div>

      {/* Efecto blur en la imagen */}
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-30 transition duration-500"></div>

      {/* Título animado */}
      <div className="absolute bottom-[-4rem] left-0 w-full px-4 text-white text-center transition-all duration-500 group-hover:bottom-4">
        <Link
          to={link}
          className="text-lg font-bold underline hover:text-blue-300"
        >
          {title}
        </Link>
      </div>
    </div>
  );
}

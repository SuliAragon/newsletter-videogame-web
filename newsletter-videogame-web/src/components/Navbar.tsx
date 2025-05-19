export default function Navbar() {
  return (
    <nav className="flex bg-zinc-800 text-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <a href="http://localhost:5173/">
          <h1 className="text-xl font-bold group">
            <span className="text-white group-hover:text-red-500 transition-colors duration-300">
              TuRevista
            </span>
            <span className="text-red-500 group-hover:text-red-500 transition-colors duration-300">
              DeVideojuegos
            </span>
          </h1>
        </a>

        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-gray-300">
              Noticias
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Analisis
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Retro
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Indie
            </a>
          </li>
          <li>
            <a
              href="http://localhost:5173/login"
              className="hover:text-gray-300"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

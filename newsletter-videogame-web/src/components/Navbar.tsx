import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  // Detectar si hay token al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Escuchar cambios manuales (ej: despuÃ©s de login)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="flex bg-zinc-800 text-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold group">
          <span className="text-white group-hover:text-red-500 transition-colors duration-300">
            <a href="http://localhost:5173/">TuRevista</a>
          </span>
          <span className="text-red-500 group-hover:text-red-500 transition-colors duration-300">
            <a href="http://localhost:5173/">DeVideojuegos</a>
          </span>
        </h1>

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
          {isLoggedIn ? (
            <>
              <Link to="/account">Mi cuenta</Link>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

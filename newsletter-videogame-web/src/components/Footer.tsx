export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-white py-10 px-6 flex flex-col items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-lg font-semibold mb-2">Contacto</h3>
          <p>Email: contacto@misitioweb.com</p>
          <p>Teléfono: +34 600 000 000</p>
          <p>Dirección: Calle Ejemplo, 123, Ciudad</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Enlaces útiles</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Sobre nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Servicios
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400">
              Facebook
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400">
              Twitter
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

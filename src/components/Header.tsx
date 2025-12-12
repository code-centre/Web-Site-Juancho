import React from 'react';
import { Link } from 'react-router-dom';
// import { FaSearch, FaUser } from 'react-icons/fa';


const Header: React.FC = () => {
  return (
   <header className="w-full bg-white shadow-md py-0 px-0">
    <div className="w-full flex justify-start items-center">
        {/* Logo */}
        <div className="">
            <a href="/" className="flex items-center">
                <img 
                src="/logo-header.png"
                alt="Juancho Restrepo Cámara"
                className="h-28 w-auto" // Ajusta la altura según necesites
                />
            </a>
        </div>

        {/* Navegación */}
        <nav className="md:mb-0 w-1/2">
          <ul className="flex space-x-16 justify-center">
            <li>
              <Link to="/" className="text-gray-700 hover:text-red-600">Inicio</Link>
            </li>
            <li>
              <Link to="/sobre-mi" className="text-gray-700 hover:text-red-600 transition">Sobre Mí</Link>
            </li>
            <li>
              <Link to="/proyectos" className="text-gray-700 hover:text-red-600 transition">Proyectos</Link>
            </li>
            <li>
              <Link to="/galeria" className="text-gray-700 hover:text-red-600 transition">Galería</Link>
            </li>
          </ul>
        </nav>

        {/* <div className="flex justify-end w-1/2 items-center ml-8 space-x-8 border-2 border-red-600 py-4">
          Buscador
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-gray-300 border border-gray-300 rounded-full py-2 px-4 pl-20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900" />
          </div>

          Botón de Iniciar Sesión
          <button className="bg-red-600 text-white px-4 py-4 rounded-full rounded-r flex items-center space-x-2 hover:bg-red-700 transition">
            <FaUser />
            <span>Iniciar sesión</span>
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
// import { FaSearch, FaUser } from 'react-icons/fa';


const Header: React.FC = () => {
  return (
   <header className="w-full bg-white shadow-md py-0 px-0">
    <div className="w-full flex justify-between items-center">
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
        {/* <nav className="md:mb-0 w-1/2 border-2 border-green-600">
          <ul className="flex space-x-16 justify-center">
            <li>
              <a href="/" className="text-gray-700 hover:text-red-600 ">Inicio</a>
            </li>
            <li>
              <a href="sobremi" className="text-gray-700 hover:text-red-600 transition">Sobre el</a>
            </li>
            <li>
              <a href="/proyectos" className="text-gray-700 hover:text-red-600 transition">Proyectos</a>
            </li>
            <li>
              <a href="/galeria" className="text-gray-700 hover:text-red-600 transition">Galería</a>
            </li>
          </ul>
        </nav> */}

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
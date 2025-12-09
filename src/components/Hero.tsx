import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaBullhorn, FaCheck } from 'react-icons/fa';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Barra lateral izquierda con redes sociales */}
      {/* <div className="absolute left-0 top-0 h-full w-16 bg-yellow-400 flex flex-col items-center justify-center space-y-6 z-10">
        <a href="#" className="text-gray-800 hover:text-blue-600 transition-colors">
          <FaInstagram size={24} />
        </a>
        <a href="#" className="text-gray-800 hover:text-blue-600 transition-colors">
          <FaFacebook size={24} />
        </a>
        <a href="#" className="text-gray-800 hover:text-blue-600 transition-colors">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="text-gray-800 hover:text-blue-600 transition-colors">
          <FaYoutube size={24} />
        </a>
      </div> */}

      {/* Contenido principal */}
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-0">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Sección de texto */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12 text-left">
            <h2 className='text-blue-900'>Conoce a</h2>
            <h1 className="text-5xl font-bold text-blue-900 mb-4"> Juancho</h1>
            <h1 className="text-5xl font-bold text-blue-900 mb-4">  Restrepo</h1>
            <span className="inline-block text-red-600 text-3xl font-bold px-3 py-1  mb-6 border-b-4 border-yellow-400">
              CÁMARA DE REPRESENTANTES
            </span>
            <p className="text-gray-700 text-lg mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, 
              mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Conoce más
            </button>
          </div>

          {/* Sección de imagen */}
          <div className="lg:w-1/2 relative">
            <div className="bg-blue-900 rounded-3xl overflow-hidden h-96 lg:h-[32rem] w-full relative">
              {/* Imagen de fondo - reemplaza con tu imagen real */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90">
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <img src="/foto2.png" alt="fotojuancho" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas inferiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Tarjeta 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
            <div className="bg-blue-100 p-4 rounded-full mr-4">
              <img 
                src="/logocd.png" 
                alt="Centro Democrático" 
                className="h-12 w-12"
              />
            </div>
            <div>
              <h3 className="font-bold text-blue-900">CENTRO DEMOCRÁTICO</h3>
              <p className="text-sm text-gray-600">Mano firme Corazón grande</p>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
            <div className="bg-red-100 p-4 rounded-full mr-4 text-red-600">
              <FaBullhorn size={24} />
            </div>
            <div>
              <h3 className="font-bold text-blue-900">ÚLTIMAS NOTICIAS</h3>
              <p className="text-sm text-gray-600">Mantente informado de nuestras actividades</p>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
            <div className="bg-green-100 p-4 rounded-full mr-4 text-green-600">
              <FaCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-blue-900">VOTA ASÍ</h3>
              <p className="text-sm text-gray-600">Sigue estos pasos para votar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
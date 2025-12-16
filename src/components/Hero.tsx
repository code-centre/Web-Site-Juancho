import React from 'react';
import {  FaBullhorn, FaCheck } from 'react-icons/fa';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen">
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
      <div className="container mx-auto px-8 pt-4 pb-16 relative z-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Sección de texto */}
          <div className="order-2 md:order-1 mb-10 text-left align-middle flex flex-col justify-center">
            <h2 className='text-blue-900'>Conoce a</h2>
            <h1 className="text-5xl font-bold text-blue-900 mb-4"> Juancho</h1>
            <h1 className="text-5xl font-bold text-blue-900 mb-4">  Restrepo</h1>
            <span className="inline-block text-red-600 text-3xl font-bold px-3 py-1 mb-6 border-b-4 border-yellow-400">
              CÁMARA DE REPRESENTANTES
            </span>
            <p className="text-gray-700 text-lg mb-8">
            Juancho Restrepo es un candidato comprometido con las personas, con la escucha activa y con las soluciones reales. Cree en una política cercana, transparente y enfocada en generar oportunidades para todos: jóvenes, emprendedores, familias y comunidades.
            </p>
            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Conoce más
            </button> */}
          </div>

          {/* Sección de imagen */}
          <div className="order-1 md:order-2 w-full relative mb-10">
            <div className="rounded-3xl overflow-visible h-96 lg:h-[32rem] w-full relative">
              {/* Imagen de fondo - reemplaza con tu imagen real */}
              <div className="absolute bg-gradient-to-r from-blue-800 to-blue-600 opacity-90 mx-auto h-[90%] w-[90%] rounded-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bg-red-500 flex w-[90%] h-[200px] mx-auto bottom-0 left-1/2 transform -translate-x-1/2 border-t-8 border-white rounded-b-3xl"></div>
              <div className="absolute bg-white flex rounded-full md:w-[350px] md:h-[350px] w-[250px] h-[250px] mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute flex items-center justify-center bottom-0 left-1/2 transform -translate-x-1/2 scale-110 w-[70%] md:w-[50%]">
                <img src="/foto2.png" alt="fotojuancho" className="h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* <div className=" absolute top-2/3 left-3/4 transform -translate-x-1/2 -translate-y-1/3 w-[35%] h-[75%] rounded-full bg-white shadow-[0_0_25px_15px_rgba(0,0,0,0.3)]">
        </div> */}
        {/* Tarjetas inferiores */}
        <div className=" absolute w-full top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/5 grid grid-cols-3 gap-16 z-40">
          {/* Tarjeta 1 */}
          <div className="my-6 mx-4 w-30% bg-white rounded-xl px-4 py-2 flex items-center shadow-[0_0_25px_15px_rgba(0,0,0,0.3)]">
            <div className="bg-blue-100 p-4 rounded-full mr-4">
              <img 
                src="/logocd.png" 
                alt="Centro Democrático" 
                className="h-12 w-12"
              />
            </div>
            <div className='text-left gap-0'>
              <h3 className="font-bold text-blue-900">CENTRO</h3>
              <h4 className="font-bold text-blue-900">DEMOCRÁTICO</h4>
              <p className="font-bold text-sm text-red-700">Mano firme</p>
              <p className="font-bold text-sm text-red-700">Corazón grande</p>
            </div>
          </div>
          {/* Tarjeta 2 */}
          <div className="my-6 mx-4 w-30% bg-white rounded-xl px-4 py-2 flex items-center shadow-[0_0_25px_15px_rgba(0,0,0,0.3)]">
            <div className="bg-red-100 p-4 rounded-full mr-4 text-red-600">
              <FaBullhorn size={24} />
            </div>
            <div className='text-left'>
              <h3 className="font-bold text-blue-900">ÚLTIMAS NOTICIAS</h3>
              <p className="text-sm text-gray-600">Mantente informado de nuestras actividades</p>
            </div>
          </div>
          {/* Tarjeta 3 */}
          <div className="my-6 mx-4 w-30% bg-white rounded-xl px-4 py-2 flex items-center shadow-[0_0_25px_15px_rgba(0,0,0,0.3)]">
            <div className="bg-green-100 p-4 rounded-full mr-4 text-green-600">
              <FaCheck size={24} />
            </div>
            <div className='text-left'>
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
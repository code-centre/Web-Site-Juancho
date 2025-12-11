import React from 'react';
import {  FaBullhorn, FaCheck } from 'react-icons/fa';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-[0_0_25px_15px_rgba(0,0,0,0.3)] z-10">
      </div>
      {/* <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/3 w-[350px] h-[350px] rounded-full bg-white shadow-[0_0_25px_15px_rgba(0,0,0,0.3)] z-0">
      </div> */}
      
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
      <div className="container mx-auto px-4 relative z-0 ">
        <div className="flex flex-col lg:flex-row items-start overflow-hidden">
          
          {/* Sección de texto */}
          <div className="lg:w-1/2 mb-10 mt-4 lg:mb-0 lg:pr-12 text-left">
            <h2 className='text-blue-900'>Conoce a</h2>
            <h1 className="text-5xl font-bold text-blue-900 mb-4"> Juancho</h1>
            <h1 className="text-5xl font-bold text-blue-900 mb-4">  Restrepo</h1>
            <span className="inline-block text-red-600 text-3xl font-bold px-3 py-1  mb-6 border-b-4 border-yellow-400">
              CÁMARA DE REPRESENTANTES
            </span>
            <p className="text-gray-700 text-sm mb-2">
              Juancho Restrepo es un candidato comprometido con las personas, con la escucha activa y con las soluciones reales. Cree en una política cercana, transparente y enfocada en generar oportunidades para todos: jóvenes, emprendedores, familias y comunidades.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Conoce más
            </button>
          </div>

          {/* Sección de imagen */}
          <div className="lg:w-1/2 relative overflow-hidden">
            {/* Esfera blanca central */}
            
            <div className="rounded-3xl overflow-hidden h-96 lg:h-[32rem] w-full relative">
              {/* Imagen de fondo - reemplaza con tu imagen real */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src="/fondocol.png" 
                  alt="fondoparcial" 
                  className="w-full h-full object-cover z-30"
                />
                <div className="absolute top-1/4 right-1 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-[0_0_25px_15px_rgba(0,0,0,0.3)] z-1">
                </div>
              </div>
              <div className="absolute flex items-center justify-center z-30">
                <div className="text-white text-center p-8">
                  <img src="/foto2.png" alt="fotojuancho"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" absolute top-2/3 left-3/4 transform -translate-x-1/2 -translate-y-1/3 w-[35%] h-[75%] rounded-full bg-white shadow-[0_0_25px_15px_rgba(0,0,0,0.3)]">
        </div>
        {/* Tarjetas inferiores */}
        <div className=" absolute w-full top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1 grid grid-cols-3 gap-16 z-40">
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
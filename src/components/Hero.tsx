import React, {  useState, useEffect } from 'react';
import {  FaBullhorn, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import { supabase } from '../lib/supabaseClient'; // Importa el cliente de Supabase

// Define el tipo para los datos de main_info
interface MainInfoType {
  id: number;
  updated_at: string;
  nombre: string;
  cargo: string;
  texto: string;
  image_url: string;
  instagram_url: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
}

const Hero: React.FC = () => {
  const [mainInfo, setMainInfo] = useState<MainInfoType | null>(null); // Estado para los datos

  useEffect(() => {
    const fetchMainInfo = async () => {
      const { data, error } = await supabase.from('main_info').select('*');
      if (error) {
        console.error('Error fetching main_info:', error);
      } else if (data && data.length > 0) {
        console.log('Datos de main_info:', data[0]);
        setMainInfo(data[0]); // Almacena el primer elemento (asumiendo uno solo)
      }
    };
    fetchMainInfo();
  }, []);

  console.log("mainInfo:", mainInfo)

  return (
    <div className="relative">
      {/* Contenido principal */}
      <div className="container mx-auto px-8 py-4 relative">
        <div className="flex flex-col lg:flex-row">
          {/* Sección de texto */}
          <div className="text-left mx-8 md:mx-8 lg:mx-8 align-middle flex flex-col justify-center lg:w-2/5 order-2 lg:order-1 z-10">
            <h2 className='text-blue-900'>Conoce a</h2>
            <h1 className="text-5xl font-bold text-blue-900 mb-4">{mainInfo?.nombre}</h1>
            {/* <h1 className="text-5xl font-bold text-blue-900 mb-4">Restrepo</h1> */}
            <span className="inline-block text-red-600 text-3xl font-bold px-3 py-1 mb-6 border-b-">
              {mainInfo?.cargo}
            </span>
            <div className='h-1 sm:w-full md:w-3/5 bg-yellow-400 mb-2'></div>
            <p className="text-gray-700 text-lg mb-4">
              {mainInfo?.texto}
            </p>
            <Link 
              to="/sobre-mi" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors w-fit inline-block"
            >
              Conoce más
            </Link>
          </div>

          {/* Sección de imagen */}
          <div className="w-full lg:w-3/5 relative order-1 lg:order-2 z-0 py-4">
            <div className="rounded-3xl overflow-visible h-96 lg:h-[32rem] w-full relative">
              {/* Imagen de fondo - reemplaza con tu imagen real */}
              <div className="absolute bg-gradient-to-r from-[#193658] to-[#193658] opacity-90 mx-auto h-[90%] w-[90%] rounded-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bg-red-500 flex w-[90%] h-[200px] mx-auto bottom-0 left-1/2 transform -translate-x-1/2 border-t-8 border-white rounded-b-3xl"></div>


              <div className="absolute bg-white flex rounded-full w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] bottom-[-50px] lg:bottom-[-100px] left-1/2 transform -translate-x-1/2">
                <img src={mainInfo?.image_url} alt="fotojuancho" className="w-[260px] md:w-[320px] lg:w-[480px] object-contain absolute bottom-10 left-1/2 transform -translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas inferiores */}
        <div className="grid md:grid-cols-3 w-full container mx-auto z-[100] justify-between gap-8 py-8 relative px-8 md:px-0">
          {/* Tarjeta 1 */}
          <div className="flex items-center bg-white rounded-xl px-4 py-2 shadow-[0_0_25px_15px_rgba(0,0,0,0.3)] gap-4 justify-center">
              <img 
                src="/logocd.png" 
                alt="Centro Democrático" 
                className="w-16 h-16"
              />
            <div className='text-left gap-0'>
              <h3 className="font-bold text-blue-900">CENTRO</h3>
              <h4 className="font-bold text-blue-900">DEMOCRÁTICO</h4>
              <p className="font-bold text-sm text-red-700">Mano firme</p>
              <p className="font-bold text-sm text-red-700">Corazón grande</p>
            </div>
          </div>
          {/* Tarjeta 2 */}
          <Link to="/sobre-mi#noticias" className="block"> {/* Agrega Link aquí */}
            <div className="bg-white rounded-xl px-4 py-2 flex items-center shadow-[0_0_25px_15px_rgba(0,0,0,0.3)] justify-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-red-100 p-4 rounded-full mr-4 text-red-600">
                <FaBullhorn size={24} />
              </div>
              <div className='text-left'>
                <h3 className="font-bold text-blue-900">ÚLTIMAS NOTICIAS</h3>
                <p className="text-sm text-gray-600">Mantente informado de nuestras actividades</p>
              </div>
            </div>
          </Link>
          {/* Tarjeta 3 */}
          <Link to="/sobre-mi#votaasi" className="block"> {/* Agrega Link con hash */}
            <div className="bg-white rounded-xl px-4 py-2 flex items-center shadow-[0_0_25px_15px_rgba(0,0,0,0.3)] justify-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-green-100 p-4 rounded-full mr-4 text-green-600">
                <FaCheck size={24} />
              </div>
              <div className='text-left'>
                <h3 className="font-bold text-blue-900">VOTA ASÍ</h3>
                <p className="text-sm text-gray-600">Sigue estos pasos para votar</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
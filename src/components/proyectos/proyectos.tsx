import React, {  useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient'; // Importa el cliente de Supabase
// import { Link } from 'react-router-dom';

interface ProyectosType {
  id: number;
  created_at: string;
  titulo: string;
  slug: string;
  intro: string;
  blog_pic: string;
  blog_text: string | null;
  author_id: string | null;
  profiles: { full_name: string } | null; // Agrega esto para el join
}

const Proyectos: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [proyectos, setproyectos] = useState<ProyectosType[]>([]); // Estado para los datos
      
        useEffect(() => {
          const fetchproyects = async () => {
            const { data, error } = await supabase.from('blogs').select('*, profiles(full_name)');
            if (error) {
              console.error('Error fetching proyects:', error);
            } else if (data && data.length > 0) {
              // console.log('Datos de proyectos:', data);
              setproyectos(data);
            }
          };
          fetchproyects();
        }, []);
      
        // console.log("blogs:", blogs)
  // Sample project data
  // const projects = [
  //   {
  //     id: 1,
  //     date: '25 de noviembre de 2025',
  //     title: 'Lorem ipsum dolor sit amet',
  //     description: 'Lorem ipsum dolor sit amet consectetur. Lacus velitt.'
  //   },
  //   {
  //     id: 2,
  //     date: '20 de noviembre de 2025',
  //     title: 'Consectetur adipiscing elit',
  //     description: 'Sed do eiusmod tempor incididunt ut magna aliqua.'
  //   },
  //   {
  //     id: 3,
  //     date: '15 de noviembre de 2025',
  //     title: 'Sed do eiusmod tempor',
  //     description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
  //   },
  //   {
  //     id: 4,
  //     date: '10 de noviembre de 2025',
  //     title: 'Proyecto 4',
  //     description: 'Duis aute irure dolor in reprehenderit in voluptate dolore.'
  //   }
  // ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === proyectos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? proyectos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className=" px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl text-left md:text-5xl font-bold text-blue-900 mb-2">Proyectos</h2>
        <div className='flex gap-2'>
        <h3 className="text-xl text-left font-bold text-red-600 mb-6">¡TU FUTURO </h3>
        <h3 className="text-xl text-left font-bold text-blue-600 mb-6">IMPORTA!</h3>
        </div>
        <div className="w-full h-1 bg-yellow-400 mx-auto mb-4"></div>

        <div className="relative mb-8 flex justify-center items-center">
            <div 
                onClick={prevSlide}
                className="h-10 w-10 bg-yellow-400 flex justify-center items-center hover:cursor-pointer p-2 shadow-lg mx-1"
            >
                <FaChevronLeft className="text-blue-800 text-xl" />
            </div>
          {/* Projects Container */}
          <div className="flex overflow-hidden w-3/4">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${activeIndex * 100/proyectos.length}%)` }}>
              {proyectos.map((proyecto) => (
                <div key={proyecto.id} className="w-[250px] flex-shrink-0 px-2">
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <img 
                      src={proyecto.blog_pic} 
                      alt="atl"
                      className="w-full h-32  object-cover aspect-rectangle"
                    />
                    <div className="p-4">
                      <p className="text-gray-500 text-xs text-left mb-2">{proyecto.created_at}</p>
                      <h4 className="text-sm font-bold text-left text-blue-900 mb-2">{proyecto.titulo}</h4>
                      <p className="text-gray-700 text-sm mb-4 text-left">{proyecto.intro}</p>
                      <div className="flex justify-start">
                        <button className="w-7 h-7 rounded-full border-2 border-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*   Navigation Arrow */}
          
            <div 
                onClick={nextSlide}
                className="h-10 w-10 bg-yellow-400 flex justify-center items-center p-2 shadow-lg hover:cursor-pointer mx-1"
            >
                <FaChevronRight className="text-blue-600 text-xl" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
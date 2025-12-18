import { FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

const Noticias = () => {
  const [selectedNews, setSelectedNews] = useState(0); // Índice de la noticia seleccionada

  const newsItems = [
    {
      id: 1,
      date: "25 de noviembre de 2025",
      title: "Noticia destacada",
      description: "Esta es la noticia destacada que se muestra por defecto. Contiene información relevante sobre los últimos acontecimientos.",
      link: "/",
      image: "/logo-header.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. <br />  Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
    {
      id: 2,
      date: "24 de noviembre de 2025",
      title: "Primer día de campaña",
      description: "Así fue el primer día de campaña electoral con gran acogida del público.",
      link: "/",
      image: "/fondocol.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. <br />  Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. ",
    },
    {
      id: 3,
      date: "23 de noviembre de 2025",
      title: "Propuestas innovadoras",
      description: "Conoce las propuestas más innovadoras presentadas esta semana.",
      link: "/",
      image: "/logo-footer.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. <br />  Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. ",
    },
    {
      id: 4,
      date: "22 de noviembre de 2025",
      title: "Evento comunitario",
      description: "Participa en nuestro próximo evento comunitario este fin de semana.",
      link: "/",
      image: "/vite.svg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. <br />  Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. ",
    }
  ];

  const handleNewsClick = (index: number) => {
    setSelectedNews(index);
  };

  return (
    <div className="w-full py-4 px-4 bg-white">
      <div className="w-full mx-auto">
        {/* 1. Cambio de flex a flex-col (móvil) y md:flex-row (escritorio) */}
        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-2">
          
          {/* Featured News - Left Side */}
          {/* 2. w-full en móvil, w-1/2 en escritorio. Eliminé ml-8 en móvil para centrarlo */}
          <div className="w-full lg:w-1/2 rounded-lg overflow-hidden lg:ml-8">
            <div className="mb-4 text-left">
              {/* 3. Tamaño de texto ajustable */}
              <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-2">Últimas noticias</h2>
              <p className="text-base lg:text-lg text-gray-600">Noticias, visitas, entrevistas y servicios comunitario.</p>
              <div className="h-1 w-full bg-yellow-400 mt-2"></div>
            </div>
            
            <div className="p-2 text-left">
              <p className="text-sm text-gray-700 mb-3">{newsItems[selectedNews].date}</p>
              {/* 4. Título más pequeño en móviles para que no rompa el diseño */}
              <h3 className="text-2xl md:text-4xl font-bold mb-3">{newsItems[selectedNews].title}</h3>
              <p className="text-gray-700 mb-4">{newsItems[selectedNews].text}</p>
            </div>
          </div>

          {/* News Grid - Right Side */}
          {/* 5. w-full en móvil, p-0 o p-4 para no perder tanto espacio lateral */}
          <div className="w-full lg:w-1/2 grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 p-0 lg:p-8">
            {newsItems.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => handleNewsClick(index)}
                className={`rounded-lg overflow-hidden shadow-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedNews === index ? 'bg-yellow-500' : 'bg-white'
                }`}
              >
                {/* 6. Altura de imagen fija para mantener uniformidad en el grid */}
                <div className="h-32 md:h-28 overflow-hidden">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="pl-4 py-2 text-left">
                  <p className="text-xs text-gray-700 mb-1">{item.date}</p>
                  <h4 className="font-sm font-bold mb-1 line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between pr-4 pb-2">
                    <div /> {/* Espaciador */}
                    <a 
                      href={newsItems[index].link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full shadow-md border-2 border-red-500 hover:bg-red-100 transition-colors duration-200"
                      onClick={(e) => {
                        if (!newsItems[index].link) e.preventDefault();
                      }}
                    >
                      <FaArrowRight className="h-4 w-4 text-red-500" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noticias;
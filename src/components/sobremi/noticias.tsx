import { FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Importa el cliente de Supabase

interface NoticeType {
  id: number;
  created_at: string;
  titulo: string;
  intro: string;
  notice_pic: string;
  notice_text: string;
  author_id: string | null;
  profiles: { full_name: string } | null; // Agrega esto para el join
}

const Noticias = () => {
  const [selectedNews, setSelectedNews] = useState(0);
  const [newsItems, setNewsItems] = useState<NoticeType[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase.from('notices').select('*, profiles(full_name)');
      if (error) {
        console.error('Error fetching notices:', error);
      } else if (data && data.length > 0) {
        console.log('Datos de notices:', data);
        setNewsItems(data);
      }
    };
    fetchNotices();
  }, []);

  const handleNewsClick = (index: number) => {
    setSelectedNews(index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Remueve el arreglo newsItems hardcodeado

  return (
    <div className="w-full py-4 px-4 bg-white">
      <div className="w-full mx-auto">
        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-2">
          <div className="w-full lg:w-1/2 rounded-lg overflow-hidden lg:ml-8">
            <div className="mb-4 text-left">
              <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-2">Últimas noticias</h2>
              <p className="text-base lg:text-lg text-gray-600">Noticias, visitas, entrevistas y servicios comunitario.</p>
              <div className="h-1 w-full bg-yellow-400 mt-2"></div>
            </div>
            
            <div className="p-2 text-left">
              {newsItems.length > 0 && (
                <>
                  <p className="text-sm text-gray-700 mb-3">{formatDate(newsItems[selectedNews].created_at)}</p>
                  <h3 className="text-2xl md:text-4xl font-bold mb-3">{newsItems[selectedNews].titulo}</h3>
                  <p className="text-gray-700 mb-4">{newsItems[selectedNews].notice_text}</p>
                </>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 p-0 lg:p-8">
            {newsItems.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => handleNewsClick(index)}
                className={`rounded-lg overflow-hidden shadow-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedNews === index ? 'bg-yellow-500' : 'bg-white'
                }`}
              >
                <div className="h-32 md:h-28 overflow-hidden">
                    <img src={item.notice_pic} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="pl-4 py-2 text-left">
                  <p className="text-xs text-gray-700 mb-1">{formatDate(item.created_at)}</p>
                  <h4 className="font-sm font-bold mb-1 line-clamp-1">{item.titulo}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">{item.intro}</p>
                  <div className="flex items-center justify-between pr-4 pb-2">
                    <div />
                    <a 
                      href={'#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full shadow-md border-2 border-red-500 hover:bg-red-100 transition-colors duration-200"
                      // onClick={(e) => {
                      //   if (!item.link) e.preventDefault();
                      // }}
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
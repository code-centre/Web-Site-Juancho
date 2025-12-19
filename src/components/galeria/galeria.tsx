import React, {  useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';

interface GalleryItem {
  id: number;
  // type: string;
  thumbnail: string;
}

const Galeria: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

    useEffect(() => {
      const fetchImages = async () => {
        const { data, error } = await supabase.storage.from('website_assets').list('gallery');
        if (error) {
          console.error('Error fetching images:', error);
        } else {
          const items = data.map((file, index) => ({
            id: index + 1,
            type: file.name.includes('.mp4') || file.name.includes('.webm') ? 'video' : 'image',
            thumbnail: supabase.storage.from('website_assets').getPublicUrl(`gallery/${file.name}`).data.publicUrl
          }));
          console.log('URLs fetched:', items.map(item => item.thumbnail));
          setGalleryItems(items);
        }
      };
      fetchImages();
    }, []);

  // const galleryItems = [
  //   {
  //     id: 1,
  //     type: 'image',
  //     thumbnail: '/logo-footer.png'
  //   },
  //   {
  //     id: 2,
  //     type: 'image',
  //     thumbnail: '/logo-header.png'
  //   },
  //   {
  //     id: 3,
  //     type: 'image',
  //     thumbnail: '/fondocol.png'
  //   }
  // ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
    );
  };

  const selectSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">        
        {/* Main Image/Video */}
        <div className="relative mb-8 overflow-hidden shadow-xl">
          <div className="h-[400px] bg-gray-200 relative">
            {galleryItems.length > 0 && (
              <img 
                src={galleryItems[activeIndex]?.thumbnail} 
                className="w-full h-full object-cover"
              />
            )}
            {/* {galleryItems[activeIndex].type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-4 transition-all duration-300 transform hover:scale-110">
                  <FaPlay className="text-blue-600 text-2xl" />
                </button>
              </div>
            )} */}
          </div>
          
          {/* Navigation Arrows */}
          <div 
            onClick={prevSlide}
            className="absolute h-[20%] left-1 top-1/2 transform -translate-y-1/2 bg-yellow-400 flex justify-center items-center  hover:cursor-pointer p-2 shadow-lg"
          >
            <FaChevronLeft className="text-blue-800 text-3xl" />
          </div>
          <div 
            onClick={nextSlide}
            className="absolute h-[20%] right-1 top-1/2 transform -translate-y-1/2 bg-yellow-400 flex justify-center items-center p-2 shadow-lg hover:cursor-pointer"
          >
            <FaChevronRight className="text-blue-600 text-3xl" />
          </div>
        </div>
        
        {/* Thumbnails */}
        <div className=" absolute transform translate-y-[-70%] grid grid-cols-3 gap-4 p-4 mx-16">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => selectSlide(index)}
              className={`relative aspect-rectangle border-4 border-white overflow-hidden transition-all duration-300 transform ${
                index === activeIndex 
                  ? 'scale-105' 
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img 
                src={item.thumbnail} 
                className="w-full h-full object-cover"
              />
              {/* {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <FaPlay className="text-white text-lg" />
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Galeria;
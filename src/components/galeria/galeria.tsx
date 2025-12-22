import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';

interface GalleryItem {
  id: number;
  name: string; // Agregado para el nombre del archivo
  type: string; // Agregado para el tipo (image/video)
  thumbnail: string;
}

const Galeria: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage.from('website_assets').list('gallery');
      if (error || !data) {
        console.error('Error fetching images:', error);
        return;
      }
      const items = data.map((file, index) => ({
        id: index + 1,
        name: file.name, // Agregado
        type: file.name.includes('.mp4') || file.name.includes('.webm') ? 'video' : 'image',
        thumbnail: supabase.storage.from('website_assets').getPublicUrl(`gallery/${file.name}`).data.publicUrl
      }));
      console.log('URLs fetched:', items.map(item => item.thumbnail));
      setGalleryItems(items);
    };
    fetchImages();
    // Listener para cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("evento galeria:", event)
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);      

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

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const { error } = await supabase.storage.from('website_assets').upload(`gallery/${file.name}`, file);
      if (error) console.error('Error uploading:', error);
    }
    setUploading(false);
    // Refrescar lista
    const { data, error: refreshError } = await supabase.storage.from('website_assets').list('gallery');
    if (refreshError || !data) {
      console.error('Error refreshing images:', refreshError);
      return;
    }
    const items = data.map((file, index) => ({
      id: index + 1,
      name: file.name,
      type: file.name.includes('.mp4') || file.name.includes('.webm') ? 'video' : 'image',
      thumbnail: supabase.storage.from('website_assets').getPublicUrl(`gallery/${file.name}`).data.publicUrl
    }));
    setGalleryItems(items);
  };

  const handleDelete = async (fileName: string) => {
    if (window.confirm('¿Eliminar esta imagen?')) {
      const { error } = await supabase.storage.from('website_assets').remove([`gallery/${fileName}`]);
      if (error) console.error('Error deleting:', error);
      // Refrescar lista
      const { data, error: refreshError } = await supabase.storage.from('website_assets').list('gallery');
      if (refreshError || !data) {
        console.error('Error refreshing images:', refreshError);
        return;
      }
      const items = data.map((file, index) => ({
        id: index + 1,
        name: file.name,
        type: file.name.includes('.mp4') || file.name.includes('.webm') ? 'video' : 'image',
        thumbnail: supabase.storage.from('website_assets').getPublicUrl(`gallery/${file.name}`).data.publicUrl
      }));
      setGalleryItems(items);
    }
  };

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">   
        {/* Botón condicional para usuarios autenticados */}
        {user && (
          <div className="mb-4">
            <button 
              onClick={() => setShowModal(true)} // Agregado onClick
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              editar galería
            </button>
          </div>
        )}     
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
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl mb-4">Gestionar Galería</h2>
              <div className="mb-4">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleUpload} 
                  disabled={uploading}
                  className="mb-2"
                />
                {uploading && <p>Subiendo...</p>}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {galleryItems.map((item) => (
                  <div key={item.id} className="relative">
                    <img src={item.thumbnail} className="w-full h-32 object-cover" />
                    <button 
                      onClick={() => handleDelete(item.name)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Galeria;
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTrash, FaInstagram } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';

// Declaración de tipos para Instagram embeds
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface GalleryItem {
  id: number;
  name: string; // Agregado para el nombre del archivo
  type: string; // Agregado para el tipo (image/video)
  thumbnail: string;
}

interface InstagramPost {
  id: string;
  post_url: string; // URL completa de la publicación de Instagram (ej: https://www.instagram.com/p/ABC123/)
  display_order?: number; // Orden de visualización (antes llamado 'order')
  order?: number; // Compatibilidad con datos antiguos
  permalink?: string; // Alias para post_url
  media_type?: string;
  media_url?: string;
  caption?: string;
  timestamp?: string;
}

const Galeria: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [uploading, setUploading] = useState(false);
  // const [viewMode, setViewMode] = useState<'gallery' | 'instagram'>('instagram'); // Modo de visualización
  const INSTAGRAM_USERNAME = 'juanchorestrepohoyos';
  const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

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

    // Cargar publicaciones de Instagram automáticamente
    const fetchInstagramPosts = async () => {
      setLoadingPosts(true);
      try {
        // Primero intentar obtener desde Supabase (si hay configuración manual)
        const { data: manualPosts, error: manualError } = await supabase
          .from('instagram_posts')
          .select('*')
          .order('display_order', { ascending: true })
          .limit(20);
        
        if (!manualError && manualPosts && manualPosts.length > 0) {
          setInstagramPosts(manualPosts);
          setLoadingPosts(false);
          return;
        }

        // Intentar obtener automáticamente usando Instagram Graph API a través de Supabase Edge Function
        // Nota: Esto requiere configurar una Edge Function en Supabase
        const { data: apiPosts, error: apiError } = await supabase.functions.invoke('get-instagram-posts', {
          body: { username: INSTAGRAM_USERNAME, limit: 20 }
        });

        if (!apiError && apiPosts && apiPosts.data && apiPosts.data.length > 0) {
          // Transformar los datos de la API a nuestro formato
          const transformedPosts = apiPosts.data.map((post: any, index: number) => ({
            id: post.id || `post-${index}`,
            post_url: post.permalink || `https://www.instagram.com/p/${post.id}/`,
            permalink: post.permalink,
            media_type: post.media_type,
            media_url: post.media_url,
            caption: post.caption,
            timestamp: post.timestamp
          }));
          setInstagramPosts(transformedPosts);
          
          // Opcional: Guardar en Supabase para caché
          if (transformedPosts.length > 0) {
            const postsToSave = transformedPosts.map((post: InstagramPost, index: number) => ({
              id: post.id,
              post_url: post.post_url,
              display_order: index + 1
            }));
            
            // Upsert en la tabla (crear si no existe)
            await supabase.from('instagram_posts').upsert(postsToSave, {
              onConflict: 'id'
            });
          }
        } else {
          console.log('No se pudieron obtener posts automáticamente. Usando método alternativo.');
          // Si falla, intentar obtener desde el perfil usando scraping (solo para desarrollo)
          // En producción, esto debería hacerse desde un backend
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchInstagramPosts();

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

  // Función para cargar el script de Instagram embeds
  useEffect(() => {
    if (viewMode === 'instagram' && instagramPosts.length > 0) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      
      // Solo agregar si no existe
      if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
        document.body.appendChild(script);
      }

      // Forzar re-renderizado de embeds después de cargar el script
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };

      return () => {
        // No remover el script ya que puede ser usado por otros componentes
      };
    }
  }, [viewMode, instagramPosts.length]);

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">   
        {/* Selector de modo de visualización */}
        {/* <div className="mb-6 flex gap-4 justify-center">
          <button
            onClick={() => setViewMode('instagram')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
              viewMode === 'instagram'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FaInstagram size={20} />
            Instagram
          </button>
          <button
            onClick={() => setViewMode('gallery')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              viewMode === 'gallery'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Galería Local
          </button>
        </div> */}

        {/* Botón condicional para usuarios autenticados */}
        {user && viewMode === 'gallery' && (
          <div className="mb-4">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              editar galería
            </button>
          </div>
        )}

        {/* Vista de Instagram */}
        {viewMode === 'instagram' && (
          <div className="mb-8 animate-fade-in-up">
            <div className="text-center mb-6 animate-fade-in-up">
              <a 
                href={INSTAGRAM_PROFILE_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300 hover:scale-110"
              >
                <FaInstagram size={24} />
                <span>@{INSTAGRAM_USERNAME}</span>
              </a>
            </div>
            
            {loadingPosts ? (
              <div className="text-center py-12">
                <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Cargando publicaciones...</p>
              </div>
            ) : (
              <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mostrar las primeras 12 publicaciones */}
              {instagramPosts.length > 0 ? (
                instagramPosts.slice(0, 12).map((post, index) => (
                  <div 
                    key={post.id} 
                    className="flex justify-center animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <blockquote 
                      className="instagram-media" 
                      data-instgrm-captioned 
                      data-instgrm-permalink={post.post_url}
                      data-instgrm-version="14"
                      style={{
                        background: '#FFF',
                        border: '0',
                        borderRadius: '3px',
                        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                        margin: '1px',
                        maxWidth: '540px',
                        minWidth: '326px',
                        padding: '0',
                        width: '100%'
                      }}
                    >
                      <div style={{ padding: '16px' }}>
                        <a
                          href={post.post_url}
                          style={{
                            background: '#FFFFFF',
                            lineHeight: 0,
                            padding: '0 0',
                            textAlign: 'center',
                            textDecoration: 'none',
                            width: '100%'
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div
                              style={{
                                backgroundColor: '#F4F4F4',
                                borderRadius: '50%',
                                flexGrow: 0,
                                height: '40px',
                                marginRight: '14px',
                                width: '40px'
                              }}
                            ></div>
                            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                              <div
                                style={{
                                  backgroundColor: '#F4F4F4',
                                  borderRadius: '4px',
                                  flexGrow: 0,
                                  height: '14px',
                                  marginBottom: '6px',
                                  width: '100px'
                                }}
                              ></div>
                              <div
                                style={{
                                  backgroundColor: '#F4F4F4',
                                  borderRadius: '4px',
                                  flexGrow: 0,
                                  height: '14px',
                                  width: '60px'
                                }}
                              ></div>
                            </div>
                          </div>
                          <div style={{ padding: '19% 0' }}></div>
                          <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                            <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1">
                              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                                  <g>
                                    <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631" />
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                            <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center' }}>
                              <a href={post.post_url} style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">Ver esta publicación en Instagram</a>
                            </p>
                          </a>
                        </div>
                      </blockquote>
                    </div>
                ))
              ) : (
                // Si no hay posts, mostrar mensaje con link al perfil
                <div className="col-span-full text-center py-12">
                  <FaInstagram size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    No se pudieron cargar las publicaciones automáticamente.
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Visita nuestro perfil para ver todas las publicaciones:
                  </p>
                  <a 
                    href={INSTAGRAM_PROFILE_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    <FaInstagram size={20} />
                    Ver en Instagram
                  </a>
                </div>
              )}
            </div>
            
            {/* Botón "Ver más" si hay más de 12 publicaciones */}
            {instagramPosts.length > 12 && (
              <div className="text-center mt-8">
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <FaInstagram size={20} />
                  <span>Ver más publicaciones</span>
                  <span className="text-sm opacity-90">({instagramPosts.length - 12} más)</span>
                </a>
              </div>
            )}
            
            {/* Botón "Ver más" siempre visible para ir al perfil */}
            {instagramPosts.length > 0 && instagramPosts.length <= 12 && (
              <div className="text-center mt-8">
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <FaInstagram size={20} />
                  <span>Ver más en Instagram</span>
                </a>
              </div>
            )}
              </>
            )}
          </div>
        )}

        {/* Vista de Galería Local */}
        {viewMode === 'gallery' && (
          <div>
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
        )}
      </div>
    </div>
  );
};

export default Galeria;
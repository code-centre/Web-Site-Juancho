import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaInstagram } from 'react-icons/fa';

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

interface InstagramPost {
  id: string;
  post_url: string;
  display_order?: number;
  order?: number;
  opinion?: boolean;
}

const CarruselPosts: React.FC = () => {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loadingInstagram, setLoadingInstagram] = useState(true);
  const INSTAGRAM_USERNAME = 'juanchorestrepohoyos';
  const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
  
  useEffect(() => {
    // Cargar posts de Instagram
    const fetchInstagramPosts = async () => {
        setLoadingInstagram(true);
        try {
          // Intentar obtener desde Supabase - solo posts con opinion = true
          const { data: manualPosts, error: manualError } = await supabase
            .from('instagram_posts')
            .select('*')
            .eq('opinion', true)
            .order('display_order', { ascending: true })
            .limit(6); // Limitar a 6 para el carrusel
          
          if (!manualError && manualPosts && manualPosts.length > 0) {
            setInstagramPosts(manualPosts);
            setLoadingInstagram(false);
            return;
          }

          // Intentar obtener automáticamente usando Instagram Graph API
          const { data: apiPosts, error: apiError } = await supabase.functions.invoke('get-instagram-posts', {
            body: { username: INSTAGRAM_USERNAME, limit: 6 }
          });

          if (!apiError && apiPosts && apiPosts.data && apiPosts.data.length > 0) {
            const transformedPosts = apiPosts.data.map((post: any, index: number) => ({
              id: post.id || `post-${index}`,
              post_url: post.permalink || `https://www.instagram.com/p/${post.id}/`,
              display_order: index + 1,
              opinion: true // Marcar como opinion para este componente
            }));
            
            // Filtrar solo los que tienen opinion = true (si vienen marcados desde la API)
            const opinionPosts = transformedPosts.filter((post: InstagramPost) => post.opinion !== false);
            setInstagramPosts(opinionPosts);
            
            // Guardar en Supabase para caché (solo los de opinion)
            const postsToSave = opinionPosts.map((post: InstagramPost) => ({
              id: post.id,
              post_url: post.post_url,
              display_order: post.display_order || 0,
              opinion: true
            }));
            
            await supabase.from('instagram_posts').upsert(postsToSave, {
              onConflict: 'id'
            });
          }
        } catch (error) {
          console.error('Error fetching Instagram posts:', error);
        } finally {
          setLoadingInstagram(false);
        }
      };
      fetchInstagramPosts();
    }, []);
  
    // console.log("blogs:", blogs)
  
  

  // Cargar script de Instagram embeds y procesar cuando los posts cambien
  useEffect(() => {
    if (instagramPosts.length > 0) {
      const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
      
      // Si el script ya existe y está cargado, procesar inmediatamente
      if (existingScript && window.instgrm) {
        // Usar setTimeout para asegurar que el DOM esté actualizado
        setTimeout(() => {
          window.instgrm?.Embeds.process();
        }, 100);
        return;
      }

      // Si el script no existe, cargarlo
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          // Procesar después de que el script se cargue
          setTimeout(() => {
            if (window.instgrm) {
              window.instgrm.Embeds.process();
            }
          }, 100);
        };

        document.body.appendChild(script);
      }
    }
  }, [instagramPosts.length, instagramPosts]);

  // Procesar embeds cuando el componente se monte o cuando cambien los posts
  useEffect(() => {
    if (instagramPosts.length > 0 && window.instgrm) {
      // Esperar a que el DOM se actualice completamente
      const timer = setTimeout(() => {
        window.instgrm?.Embeds.process();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [instagramPosts]);

  return (
    <section className="w-full flex flex-col items-center" aria-label="Punto de Opinión - Publicaciones de Instagram">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-900 animate-fade-in-up font-subtitle">Punto de Opinion</h2>
      {/* Sección de Posts de Instagram */}
      {loadingInstagram ? (
        <div className="text-center py-12">
          <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-body">Cargando publicaciones de Instagram...</p>
        </div>
      ) : instagramPosts.length > 0 ? (
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full px-4 place-items-center">
            {instagramPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="flex justify-center animate-fade-in-up"
                style={{
                  animationDelay: `${index * 0.15}s`,
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
            ))}
          </div>

          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FaInstagram size={20} />
              <span>Ver más en Instagram</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <FaInstagram size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">
            No hay publicaciones disponibles en este momento.
          </p>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            <FaInstagram size={20} />
            <span>Visitar perfil de Instagram</span>
          </a>
        </div>
      )}
    </section>
  );
};

export default CarruselPosts;
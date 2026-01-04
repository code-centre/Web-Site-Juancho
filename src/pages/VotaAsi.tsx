// src/pages/VotaAsi.tsx
import React from 'react';
import SEO from '../components/SEO';

const VotaAsi: React.FC = () => {
  return (
    <>
      <SEO
        title="Vota Así - Juancho Restrepo | Guía de Votación"
        description="Aprende cómo votar correctamente por Juancho Restrepo para la Cámara de Representantes por el Atlántico. Guía paso a paso para ejercer tu derecho al voto."
        path="/vota-asi"
        keywords="cómo votar, guía de votación, Juancho Restrepo, elecciones, Cámara de Representantes, Atlántico, proceso electoral"
      />
      <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="mb-8 px-4 lg:px-12 animate-fade-in-left">
          <h1 className="text-3xl lg:text-5xl font-bold text-blue-900 text-left animate-fade-in-up font-title" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            Vota así
          </h1>
          <div className="h-1 bg-yellow-400 mt-4 w-32 animate-fade-in-left" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}></div>
        </div>

        {/* Contenedor del video */}
        <div className="w-full flex items-center justify-center p-2 animate-scale-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <div className="w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl bg-black">
            <video 
              src="/videos/vota-asi.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto max-h-[85vh] object-contain"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto'
              }}
            >
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default VotaAsi;
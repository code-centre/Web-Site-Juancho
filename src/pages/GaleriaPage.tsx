// src/pages/GaleriaPage.tsx
import React from 'react';
import SEO from '../components/SEO';
import Galeria from '../components/galeria/galeria';
import TextGaleria from '../components/galeria/textgaleria';

const GaleriaPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Galería - Juancho Restrepo | Visitas Sociales y Trabajo Comunitario"
        description="Galería de visitas al territorio, encuentros comunitarios y acciones sociales de Juancho Restrepo. Conoce el trabajo en campo y las propuestas para la Cámara de Representantes por el Atlántico."
        path="/galeria"
        keywords="galería, visitas sociales, trabajo comunitario, Juancho Restrepo, Atlántico, Barranquilla, actividades políticas"
      />
      <div className="min-h-screen bg-white p-4 max-w-7xl mx-auto">
        <div className="flex flex-col mx-auto"> 
          <div className="w-full">
              <TextGaleria />
          </div>
          
          {/* Contenedor de galería: 100% en móvil, 60% en escritorio */}
          <div className="w-full ">
              <Galeria />
          </div>
        </div>
      </div>
    </>
  );
};

export default GaleriaPage;
// src/pages/GaleriaPage.tsx
import React from 'react';
import Galeria from '../components/galeria/galeria';
import TextGaleria from '../components/galeria/textgaleria';

const GaleriaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-4 max-w-7xl mx-auto"> {/* Ajusté el padding para móviles */}
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
  );
};

export default GaleriaPage;
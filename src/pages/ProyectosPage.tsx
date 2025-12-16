// src/pages/GaleriaPage.tsx
import React from 'react';
import Proyectos from '../components/proyectos/proyectos';
import TextProyectos from '../components/proyectos/textproyectos';

const ProyectosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8"> {/* Ajusté el padding para móviles */}
      <div className="flex flex-col md:flex-row container mx-auto"> 
        {/* Contenedor de texto: 100% en móvil, 40% en escritorio */}
        <div className="w-full md:w-3/5">
            <Proyectos />
        </div>
        {/* Contenedor de galería: 100% en móvil, 60% en escritorio */}
        <div className="w-full md:w-2/5">
            <TextProyectos />
        </div>
      </div>
    </div>
  );
};

export default ProyectosPage;
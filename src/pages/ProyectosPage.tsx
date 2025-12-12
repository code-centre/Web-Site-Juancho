// src/pages/GaleriaPage.tsx
import React from 'react';
import Proyectos from '../components/proyectos/proyectos';
import TextProyectos from '../components/proyectos/textproyectos';

const ProyectosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex flex-row container">
        <div className="w-3/5">
            <Proyectos />
        </div>
        <div className="w-2/5">
            <TextProyectos />
        </div>
      </div>
    </div>
  );
};

export default ProyectosPage;
// src/pages/GaleriaPage.tsx
import React from 'react';
import Galeria from '../components/galeria/galeria';
import TextGaleria from '../components/galeria/textgaleria';

const GaleriaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex flex-row container">
        <div className="w-2/5">
            <TextGaleria />
        </div>
        <div className="w-3/5">
            <Galeria />
        </div>
      </div>
    </div>
  );
};

export default GaleriaPage;
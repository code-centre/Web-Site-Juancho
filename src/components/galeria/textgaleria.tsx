import React from 'react';

const TextGaleria: React.FC = () => {
  return (
    <div className="mx-auto text-center mb-12 px-12 lg:px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-blue-900 text-left mb-4">
        Galeria
      </h2>
      <div className="flex flex-col justify-between text-left items-start">
        <h3 className="text-lg md:text-xl text-gray-600 text-left mb-2">
          Visitas sociales y trabajo comunitario
        </h3>
        <div className="w-full h-1 bg-yellow-400 mb-6"></div>
      </div>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed text-left">
        El trabajo no se queda en el discurso. En este espacio se registran las visitas al territorio, los encuentros comunitarios y las acciones sociales que se desarrollan con la gente
      para que la gente conozca mis propuestas y me siga apoyando en la Cámara de Representantes.
      </p>
    </div>
  );
};

export default TextGaleria;
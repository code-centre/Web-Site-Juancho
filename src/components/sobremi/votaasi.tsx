// import React from 'react';

const VotaAsi = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-start p-8">
      {/* Top Left Section */}
      <div className="self-start mb-12 ml-4 md:ml-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 text-left">Vota así</h1>
        <div className="h-1 w-[500px] bg-yellow-400 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex items-center justify-center p-2">
        {/* espacio para la imagen de la inforgrafia */}
        {/* <img 
          src="/vite.svg" 
          alt="Infografía de votación" 
          className="w-full h-auto max-h-[70vh] object-contain"
        /> */}
        <div className="flex flex-col items-center justify-start">
          <p className="text-gray-700 text-lg md:text-xl mb-2">Infografia de como se debe</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">votar por Juancho Restrepo</h2>
        </div>
      </div>
    </div>
  );
};

export default VotaAsi;
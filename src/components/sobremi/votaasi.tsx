// import React from 'react';

const VotaAsi = () => {
  return (
    <div className="bg-white flex flex-col items-center justify-start py-4 px-4">
      {/* Top Left Section */}
      <div className="self-start mb-12 px-4 lg:px-12">
        <h1 className="text-3xl lg:text-5xl font-bold text-blue-900 text-left">Vota así</h1>
        <div className="h-1 bg-yellow-400 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex items-center justify-center p-2">
        {/* espacio para la imagen de la inforgrafia */}
        {/* <img 
          src="/vite.svg" 
          alt="Infografía de votación" 
          className="w-full h-auto max-h-[70vh] object-contain"
        /> */}
        <img 
          src="/infografia.png" 
          alt="Infografía de votación" 
          className="w-full h-auto max-h-[70vh] object-contain"
        />
      </div>
    </div>
  );
};

export default VotaAsi;
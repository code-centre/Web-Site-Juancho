// import React from 'react';

const VotaAsi = () => {
  return (
    <div className="bg-white flex flex-col items-center justify-start py-4 px-4">
      {/* Top Left Section */}
      <div className="self-start mb-12 px-4 lg:px-12 animate-fade-in-left">
        <h1 className="text-3xl lg:text-5xl font-bold text-blue-900 text-left animate-fade-in-up font-title" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>Vota así</h1>
        <div className="h-1 bg-yellow-400 mt-4 animate-fade-in-left" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex items-center justify-center p-2 animate-scale-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        <img 
          src="/infografia.png" 
          alt="Infografía de votación" 
          className="w-full h-auto max-h-[70vh] object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default VotaAsi;
import React from 'react';

const TextGaleria: React.FC = () => {
  return (
    <div className=" max-w-4xl mx-auto text-center mb-12 px-4">
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
        Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
        rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
      </p>
    </div>
  );
};

export default TextGaleria;
import React from 'react';

const TextProyectos: React.FC = () => {
  return (
    <div className="bg-blue-900 text-white p-8 h-full">
      {/* <h2 className="text-4xl font-bold mb-6">Proyectos</h2> */}
      <div className="space-y-4">
        <p className="text-sm text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
          Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
          rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
        </p>
        <p className="text-md text-left">
          Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus 
          orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis 
          porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci.
        </p>
        <p className="text-md text-left">
          Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus 
          orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis 
          porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci.
        </p>
      </div>
    </div>
  );
};

export default TextProyectos;
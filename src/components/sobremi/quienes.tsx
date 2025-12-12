const Quienes = () => {
  return (
    <div className="py-4 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Column - Image */}
          <div className="w-full md:w-1/3 lg:w-2/5 flex flex-col items-center">
            <div className="w-full max-w-xs rounded-lg overflow-hidden mb-4">
              <img
                src="/foto2.png" // Replace with actual image path
                alt="Juancho Restrepo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full md:w-2/3 lg:w-3/5 text-left">
            <h3 className="text-xl md:text-2xl text-blue-700 mb-0">
              Quien es
            </h3>
            <h1 style={{ fontSize: '4rem' }} className="font-bold text-blue-900 mb-2">
              Juancho Restrepo
            </h1>
            <p className="text-lg text-red-600 font-medium mb-2">
              ASPIRANTE A LA CÁMARA DE REPRESENTANTES
            </p>
            <div className="h-1 w-4/5 bg-yellow-400 mb-2"></div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.<br />
                Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur. Excepteur sint occaecat cupidatat non proident. <br />
                Sunt in culpa qui officia deserunt mollit anim id est laborum. 
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
                accusantium doloremque laudantium.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere distinctio voluptates dolorem sequi ad architecto vero esse, dolor odio placeat quaerat temporibus deleniti provident cumque sint voluptatibus assumenda minus incidunt!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quienes;
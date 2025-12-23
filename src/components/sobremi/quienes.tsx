const Quienes = () => {
  return (
    <div className="py-4 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Column - Image */}
          <div className="w-full lg:w-2/5 flex flex-col items-center">
            <div className="w-full rounded-lg overflow-hidden mb-4">
              <img
                src="/juancho.jpg" // Replace with actual image path
                alt="Juancho Restrepo"
                className="w-full h-full object-cover"
              />
              <img
                src="/logo-header.png" // Replace with actual image path
                alt="Logo Juancho Restrepo"
                className="w-full h-full object-cover mt-[-100px]"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full md:w-2/3 lg:w-3/5 text-left">
            <h3 className="text-xl md:text-2xl text-blue-700 mb-0">
              ¿Quién es
            </h3>
            <h1 style={{ fontSize: '4rem' }} className="font-bold text-blue-900 mb-2">
              Juancho Restrepo?
            </h1>
            <p className="text-lg text-red-600 font-medium mb-2">
              ASPIRANTE A LA CÁMARA DE REPRESENTANTES
            </p>
            <div className="h-1 w-4/5 bg-yellow-400 mb-2"></div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                He trabajado tanto en el sector privado como en el público, especialmente en áreas de tecnología, innovación y gestión. Esa experiencia me ha permitido entender que el desarrollo del Atlántico no se logra con discursos, sino con oportunidades reales: empleo, inversión, seguridad y educación con propósito.
              </p>
              <p>
                Creo en una política cercana, transparente y firme. Una política donde el representante no desaparece después de las elecciones, sino que rinde cuentas, camina el territorio y enfrenta los problemas sin miedo.
              </p>
              <p>
                Aspiro a la Cámara de Representantes porque Barranquilla y el Atlántico necesitan liderazgo, preparación y valentía para defender sus intereses ante el Gobierno Nacional y lograr cambios reales en la calidad de vida de la gente.
              </p>
              <p className="text-lg font-bold">El compromiso es con ustedes. ¡Porque su futuro importa!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quienes;
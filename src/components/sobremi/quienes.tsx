const Quienes = () => {
  return (
    <div className="py-4 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Column - Image */}
          <div className="w-full lg:w-2/5 flex flex-col items-center animate-fade-in-left">
            <div className="w-full rounded-lg overflow-hidden mb-4 transition-transform duration-300 hover:scale-105">
              <img
                src="/juancho.webp"
                alt="Juancho Restrepo"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <img
                src="/logo-header.png"
                alt="Logo Juancho Restrepo"
                className="w-full h-full object-cover mt-[-100px] transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full md:w-2/3 lg:w-3/5 text-left animate-fade-in-right">
            <h3 className="text-xl md:text-2xl text-blue-700 mb-0 animate-fade-in-up font-subtitle" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              ¿Quién es
            </h3>
            <h1 className="font-bold text-blue-900 mb-2 animate-fade-in-up text-6xl font-subtitle" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Juancho Restrepo?
            </h1>
            <p className="text-3xl text-red-600 mb-2 animate-fade-in-up font-title" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              ASPIRANTE A LA CÁMARA DE REPRESENTANTES
            </p>
            <div className="h-1 w-4/5 bg-yellow-400 mb-2 animate-fade-in-left" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}></div>
            
            <div className="space-y-4 text-gray-700">
              <p className="animate-fade-in-up font-body" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                He trabajado tanto en el sector privado como en el público, especialmente en áreas de tecnología, innovación y gestión. Esa experiencia me ha permitido entender que el desarrollo del <strong>Atlántico</strong> no se logra con discursos, sino con oportunidades reales: empleo, inversión, seguridad y educación con propósito para <strong>Barranquilla</strong> y todos los municipios del departamento.
              </p>
              <p className="animate-fade-in-up font-body" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                Creo en una política cercana, transparente y firme. Una política donde el representante a la <strong>Cámara de Representantes</strong> no desaparece después de las elecciones, sino que rinde cuentas, camina el territorio del <strong>Atlántico</strong> y enfrenta los problemas sin miedo.
              </p>
              <p className="animate-fade-in-up font-body" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
                Aspiro a la <strong>Cámara de Representantes por Colombia</strong> porque <strong>Barranquilla</strong> y el <strong>Atlántico</strong> necesitan liderazgo, preparación y valentía para defender sus intereses ante el Gobierno Nacional y lograr cambios reales en la calidad de vida de la gente. El compromiso es con las comunidades de todo el departamento.
              </p>
              <p className="text-lg font-bold animate-fade-in-up font-body" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>El compromiso es con ustedes. ¡Porque su futuro importa!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quienes;
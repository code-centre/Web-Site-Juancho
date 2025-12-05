import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Logo y descripción */}
          <div className="space-y-4 flex justify-center">
            <a href="/" className="flex items-center">
                <img 
                src="/logo-footer.png"
                alt="Juancho Restrepo Cámara"
                className="h-30 w-auto" // Ajusta la altura según necesites
                />
            </a>
          </div>

          {/* Enlaces rápidos */}
          <div className='border-l-2 border-white pl-8'>
            <h4 className="text-lg text-left font-semibold mb-4 ">Categorías</h4>
            <ul className="space-y-2 text-left">
              {[
                { name: 'Inicio', path: '/' },
                { name: 'Sobre el', path: '/sobremi' },
                { name: 'Proyectos', path: '/proyectos' },
                { name: 'Galería', path: '/galeria' }
                ].map((item) => (
                <li key={item.name}>
                    <a 
                    href={item.path} 
                    className="text-blue-200 hover:text-white transition-colors hover:underline"
                    >
                    {item.name}
                    </a>
                </li>
                ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div className='gap-16'>
            <h4 className="text-lg text-left font-semibold mb-8">Síguenos</h4>
            <div className="flex text-left space-x-4">
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div className='text-left'>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-blue-200">
              <li className="flex items-center space-x-2">
                <FaUser className="text-white" />
                <span>Manager: Juan Pérez</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-white" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-white" />
                <span>Oficinas: Calle 123 #45-67, Medellín</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-white" />
                <span>contacto@juanchorestrepo.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';

interface MainInfoType {
  id: number;
  updated_at: string;
  nombre: string;
  cargo: string;
  texto: string;
  image_url: string;
  instagram_url: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
}

const Footer: React.FC = () => {
  const [mainInfo, setMainInfo] = useState<MainInfoType | null>(null);

  useEffect(() => {
    const fetchMainInfo = async () => {
      const { data, error } = await supabase.from('main_info').select('*');
      if (error) {
        console.error('Error fetching main_info:', error);
      } else if (data && data.length > 0) {
        setMainInfo(data[0]);
      }
    };
    fetchMainInfo();
  }, []);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/sobre-mi', label: 'Sobre Mí' },
    { to: '/galeria', label: 'Galería' },
    { to: '/vota-asi', label: 'Vota Así' },
  ];

  return (
    <footer className="bg-blue-900 text-white pt-12 pb-8 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="space-y-4 animate-scale-in">
            <Link to="/" className="flex items-center group inline-block">
              <img 
                src="/logo-footer.png"
                alt="Juancho Restrepo Cámara"
                className="h-24 w-auto transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
            {mainInfo && (
              <p className="text-blue-200 text-sm leading-relaxed font-body">
                {mainInfo.nombre} - {mainInfo.cargo}
              </p>
            )}
            <p className="text-blue-200 text-sm leading-relaxed font-body">
              Trabajando por un Atlántico que se respeta, con oportunidades reales y una voz firme en el Congreso.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h4 className="text-lg font-semibold mb-4 font-subtitle">Navegación</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-blue-200 hover:text-white transition-colors hover:underline font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h4 className="text-lg font-semibold mb-4 font-subtitle">Síguenos</h4>
            <div className="flex flex-col space-y-3">
              <a 
                href={mainInfo?.instagram_url || "https://www.instagram.com/juanchorestrepohoyos/"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors group"
              >
                <FaInstagram size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-body">Instagram</span>
              </a>
              <a 
                href={mainInfo?.facebook_url || "https://www.facebook.com/juanchorestrep0"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors group"
              >
                <FaFacebook size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-body">Facebook</span>
              </a>
              <a 
                href={mainInfo?.twitter_url || "https://x.com/juanchorestrep0"}  
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors group"
              >
                <FaTwitter size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-body">Twitter</span>
              </a>
            </div>
          </div>

          {/* Información adicional */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h4 className="text-lg font-semibold mb-4 font-subtitle">Información</h4>
            <div className="space-y-2 text-blue-200 text-sm font-body">
              <p>
                <strong className="text-white">Candidato a la Cámara de Representantes</strong>
              </p>
              <p>Por el Atlántico</p>
              <p className="mt-4">
                <strong className="text-white">Centro Democrático</strong>
              </p>
              <p>Mano firme, corazón grande</p>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-blue-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm text-center md:text-left font-body">
              © {new Date().getFullYear()} Juancho Restrepo. Todos los derechos reservados.
            </p>
            <p className="text-blue-200 text-sm text-center md:text-right mt-2 md:mt-0 font-body">
              Trabajando por un Atlántico mejor
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
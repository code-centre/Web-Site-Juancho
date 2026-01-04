import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './authModal'; // Importa el componente AuthModal
import { FaUser } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient'; // Importa el cliente de Supabase
// import type { User } from '@supabase/supabase-js'; // Cambia a 'import type'

// Define el tipo localmente
type UserType = import('@supabase/supabase-js').User;



const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para animación del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = () => {
    console.log('Abriendo modal');
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const getInitialUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      // console.log('Usuario inicial:', user); // Agrega este log
      setUser(user);
    };
  getInitialUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Evento de auth:', event, 'Sesión:', session); // Agrega este log
      setUser(session?.user || null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  // Función para cerrar sesión
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/sobre-mi', label: 'Sobre Mí' },
    // { to: '/proyectos', label: 'Proyectos' },
    { to: '/galeria', label: 'Galería' },
    { to: '/vota-asi', label: 'Vota Así' },
  ];

  return (
    <header className={`w-full pt-2 ${open ? 'z-[1001]' : 'z-50'} relative transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 animate-fade-in">
            <Link to="/" className="flex items-center group">
              <img
                src="/logo-header.png"
                alt="Juancho Restrepo Cámara"
                className="h-24 md:h-28 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-red-600 transition-all duration-300 px-2 py-2 relative group animate-fade-in font-body"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {user ? (
            // Si hay usuario, mostrar botón de cerrar sesión
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-4 rounded-full rounded-r flex items-center space-x-2 hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
            >
              <FaUser />
              <span className="font-body">Cerrar sesión</span>
            </button>
          ) : (
            // Si no hay usuario, mostrar botón de iniciar sesión
            <button 
              onClick={openModal}
              className="bg-red-600 text-white px-4 py-4 rounded-full rounded-r flex items-center space-x-2 hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
            >
              <FaUser />
              <span className="font-body">Iniciar sesión</span>
            </button>
          )}

          {/* Renderizamos el modal solo si no hay usuario */}
          {!user && <AuthModal isOpen={isModalOpen} onClose={closeModal} />}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="inline-flex items-center justify-center p-3 rounded-md text-blue-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {!open ? (
                // Hamburger
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                // Close (X)
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[999] md:hidden transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-[1000] transform transition-transform duration-300 ease-in-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold text-blue-900 font-subtitle">Menú</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-2 font-body"
                style={{
                  animation: `slideInRight 0.3s ease-out ${index * 0.1}s both`
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
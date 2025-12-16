// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/fonts.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactCard from './components/ContactCard';
import CarruselPosts from './components/CarruselPosts';
import Hero from './components/Hero';
import GaleriaPage from './pages/GaleriaPage';
import SobreMiPage from './pages/SobreMiPage';
import ProyectosPage from './pages/ProyectosPage';
import SocialSidebar from './components/SocialSidebar';
import {  FaBullhorn, FaCheck } from 'react-icons/fa';

function App() {
  return (
    <Router>
      <SocialSidebar />
      <div className="w-full overflow-x-hidden flex flex-col min-h-screen p-8">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div className="hidden md:flex flex-col md:flex-row container mx-auto">
                  <div className="w-3/5">
                    <CarruselPosts />
                  </div>
                  <div className="w-2/5">
                    <ContactCard />
                  </div>
                </div>
                <div className="flex flex-col md:hidden container mx-auto">
                  <div className='flex'>
                    <div className="w-2/5">
                      <CarruselPosts />
                    </div>
                    <div className=" w-3/5">
                      <div className="flex md:hidden w-full flex-col  gap-16 z-40">
                      {/* Tarjeta 1 */}
                      <div className="my-6 mx-4 w-30% bg-white rounded-xl px-4 py-2 flex items-center shadow-[0_0_25px_15px_rgba(0,0,0,0.3)]">
                        <div className="bg-blue-100 p-4 rounded-full mr-4">
                          <img 
                            src="/logocd.png" 
                            alt="Centro Democrático" 
                            className="h-12 w-12"
                          />
                        </div>
                        <div className='text-left gap-0'>
                          <h3 className="font-bold text-blue-900">CENTRO</h3>
                          <h4 className="font-bold text-blue-900">DEMOCRÁTICO</h4>
                          <p className="font-bold text-sm text-red-700">Mano firme</p>
                          <p className="font-bold text-sm text-red-700">Corazón grande</p>
                        </div>
                      </div>
                      {/* Tarjeta 2 */}
                      <div className="my-6 mx-4 w-30% bg-white rounded-xl px-4 py-2 flex items-center shadow-[0_0_25px_15px_rgba(0,0,0,0.3)]">
                        <div className="bg-red-100 p-4 rounded-full mr-4 text-red-600">
                          <FaBullhorn size={24} />
                        </div>
                        <div className='text-left'>
                          <h3 className="font-bold text-blue-900">ÚLTIMAS NOTICIAS</h3>
                          <p className="text-sm text-gray-600">Mantente informado de nuestras actividades</p>
                        </div>
                      </div>
                      {/* Tarjeta 3 */}
                      <div className="my-6 mx-4 w-30% bg-white rounded-xl px-4 py-2 flex items-center shadow-[0_0_25px_15px_rgba(0,0,0,0.3)]">
                        <div className="bg-green-100 p-4 rounded-full mr-4 text-green-600">
                          <FaCheck size={24} />
                        </div>
                        <div className='text-left'>
                          <h3 className="font-bold text-blue-900">VOTA ASÍ</h3>
                          <p className="text-sm text-gray-600">Sigue estos pasos para votar</p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <ContactCard />
                  </div>
                </div>
              </>
            } />
            <Route path="/galeria" element={<GaleriaPage />} />
            <Route path="/sobre-mi" element={<SobreMiPage />} />
            <Route path="/proyectos" element={<ProyectosPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
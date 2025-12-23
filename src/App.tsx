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

function App() {
  return (
    <Router>
      <SocialSidebar />
      <div className="w-full overflow-x-hidden flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div className="flex flex-col container mx-auto py-4 gap-8 px-10 md:px-8">
                  <div>
                    <CarruselPosts />
                  </div>
                  {/* <div className="lg:w-2/5">
                    <ContactCard />
                  </div> */}
                </div>
              </>
            } />
            <Route path="/galeria" element={<GaleriaPage />} />
            <Route path="/sobre-mi" element={<SobreMiPage />} />
            {/* <Route path="/proyectos" element={<ProyectosPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
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

function App() {
  return (
    <Router>
      <div className="w-full overflow-x-hidden flex flex-col min-h-screen p-8">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div className="flex flex-row container mx-auto">
                  <div className="w-3/5">
                    <CarruselPosts />
                  </div>
                  <div className="w-2/5">
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
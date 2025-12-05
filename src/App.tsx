import { useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Contenido principal de la aplicación */}
        <h1 className="text-3xl font-bold mb-6">Bienvenido a la página de Juancho Restrepo Cámara</h1>
        <p className="mb-4">Tu futuro es nuestra prioridad.</p>
        
        {/* Contenido de ejemplo - puedes reemplazarlo con tus componentes */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Contenido Principal</h2>
          <p>Este es el contenido principal de tu aplicación. Aquí puedes agregar más componentes y secciones según necesites.</p>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Juancho Restrepo Cámara. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

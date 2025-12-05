import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactCard from './components/ContactCard';

// Dentro de tu componente:


function App() {
  // const [count, setCount] = useState(0)

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
      <div className="flex justify-between container">
        {/* <ContactCard /> */}
        <div className=" w-1/2 border-l-2 border-red-300">
          <ContactCard />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default App

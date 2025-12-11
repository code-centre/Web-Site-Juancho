import './App.css';
import './styles/fonts.css';
import Header from './components/Header';
import Footer from './components/Footer';
// import ContactCard from './components/ContactCard';
// import CarruselPosts from './components/CarruselPosts';
import Hero from './components/Hero';
// import Galeria from './components/galeria/galeria';
// import TextGaleria from './components/galeria/textgaleria';
// import TextProyectos from './proyectos/textproyectos';
// import Proyectos from './proyectos/proyectos';




// Dentro de tu componente:


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="w-full overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        <Hero />
      </main>
      {/* <div className="flex flex-row container">
        <div className="w-3/5">
          <CarruselPosts />
        </div>
        <div className="w-2/5">
          <ContactCard />
        </div>
      </div> */}
      {/* <div className="flex flex-row container">
        <div className="w-2/5">
          <TextGaleria />
        </div>
        <div className="w-3/5">
          <Galeria />
        </div>
      </div>
      <div className="flex flex-row container">
        <div className="w-3/5">
          <Proyectos />
        </div>
        <div className="w-2/5">
          <TextProyectos />
        </div>
      </div> */}
      


      
      <Footer />
    </div>
  )
}

export default App

import './App.css';
import './styles/fonts.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactCard from './components/ContactCard';
import CarruselPosts from './components/CarruselPosts';
import Hero from './components/Hero';



// Dentro de tu componente:


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="w-full overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Hero />
      </main>
      <div className="flex flex-row container">
        <div className="w-3/5">
          <CarruselPosts />
        </div>
        <div className="w-2/5">
          <ContactCard />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default App

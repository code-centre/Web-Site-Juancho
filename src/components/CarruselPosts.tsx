import React from 'react';
import PostCard from './PostCard';


interface Post {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
}

const CarruselPosts: React.FC = () => {
  // Datos de ejemplo - reemplaza con tus datos reales
  const posts: Post[] = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet",
      date: "25 de noviembre de 2023",
      image: "/vite.svg", // Reemplaza con la ruta correcta de la imagen
      excerpt: "Lorem ipsum dolor sit amet consectetur. Lacus velit ut urna vitae commodo arcu consequat feugiat sit.",
      category: "Noticias"
    },
    {
      id: 2,
      title: "Segundo post de ejemplo",
      date: "20 de noviembre de 2023",
      image: "/vite.svg", // Reemplaza con la ruta correcta de la imagen
      excerpt: "Otra descripción interesante sobre este post que muestra más contenido relevante para los lectores.",
      category: "Actualidad"
    },
  ];

  const handleReadMore = (postId: number) => {
    console.log(`Ver más del post ${postId}`);
    // Aquí puedes agregar la lógica para navegar al detalle del post
  };

  return (
    <div className="w-full py-0 md:py-4 px-0 md:px-12 border-r-2 border-gray-200 mr-4">
      <h2 className="text-xs md:text-3xl font-bold text-center mb-6">Últimos posts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <div 
            key={post.id} 
            className={`${index > 0 ? 'hidden md:block' : 'block'}`}
          >
            <PostCard
              title={post.title}
              date={post.date}
              image={post.image}
              excerpt={post.excerpt}
              onReadMore={() => handleReadMore(post.id)}
            />
          </div>
        ))}
      </div>

      <div className="hidden md:block text-center mt-12">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Conoce más
          
        </button>
      </div>
      
    </div>
    
  );
};

export default CarruselPosts;
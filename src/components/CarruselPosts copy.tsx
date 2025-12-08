import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';

interface Post {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
}

const CarruselPosts: React.FC = () => {
  // Sample data - replace with your actual data
  const [activePost, setActivePost] = useState<number>(0);
  
  const posts: Post[] = [
    {
      id: 1,
      title: "Título del post destacado 1",
      date: "01 de Enero 2023",
      image: "/vite.svgsrc/components/CarruselPosts.tsx",
      excerpt: "Breve descripción del post destacado que se muestra en el carrusel...",
      category: "Categoría"
    },
    {
      id: 2,
      title: "Título del post 2",
      date: "15 de Febrero 2023",
      image: "/vite.svg",
      excerpt: "Otra descripción interesante sobre este post...",
      category: "Categoría"
    },
    {
      id: 3,
      title: "Título del post 3",
      date: "10 de Marzo 2023",
      image: "/vite.svg",
      excerpt: "Tercer post con su respectiva descripción...",
      category: "Categoría"
    }
  ];

  const nextPost = () => {
    setActivePost((prev) => (prev + 1) % posts.length);
  };

  const prevPost = () => {
    setActivePost((prev) => (prev - 1 + posts.length) % posts.length);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 border-2 border-green-600">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main featured post */}
        <div className="w-full md:w-2/3">
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src={posts[activePost].image} 
              alt={posts[activePost].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <span className="text-sm font-medium text-blue-300">{posts[activePost].category}</span>
              <h3 className="text-2xl font-bold mt-1">{posts[activePost].title}</h3>
              <p className="text-sm text-gray-300 mt-2">{posts[activePost].date}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePost(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === activePost ? 'bg-blue-600 w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Ir al post ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={prevPost}
                className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50"
                aria-label="Post anterior"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <button
                onClick={nextPost}
                className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50"
                aria-label="Siguiente post"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Side posts */}
        <div className="w-full md:w-1/3 space-y-4">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`flex gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                index === activePost ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => setActivePost(index)}
            >
              <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 line-clamp-2">{post.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <button className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Ver más noticias
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CarruselPosts;
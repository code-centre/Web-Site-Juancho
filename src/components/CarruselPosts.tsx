import React, {  useState, useEffect } from 'react';
import PostCard from './PostCard';
import { supabase } from '../lib/supabaseClient'; // Importa el cliente de Supabase
import { Link } from 'react-router-dom'; 

interface BlogType {
  id: number;
  created_at: string;
  titulo: string;
  slug: string;
  intro: string;
  blog_pic: string;
  blog_text: string | null;
  author_id: string | null;
  profiles: { full_name: string } | null; // Agrega esto para el join
}

const CarruselPosts: React.FC = () => {
  const [blogs, setblogs] = useState<BlogType[]>([]); // Estado para los datos
  
    useEffect(() => {
      const fetchblogs = async () => {
        const { data, error } = await supabase.from('blogs').select('*, profiles(full_name)');
        if (error) {
          console.error('Error fetching blogs:', error);
        } else if (data && data.length > 0) {
          // console.log('Datos de blogs:', data);
          setblogs(data);
        }
      };
      fetchblogs();
    }, []);
  
    // console.log("blogs:", blogs)
  
  

  const handleReadMore = (postId: number) => {
    console.log(`Ver más del post ${postId}`);
    // Aquí puedes agregar la lógica para navegar al detalle del post
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-900 ">Últimos posts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.slice(0, 2).map((blog, index) => (
          <div  
            key={blog.id} 
            className={`${index > 0 ? 'hidden md:block' : 'block'}`}
          >
            <PostCard
              title={blog.titulo}
              date={blog.created_at}
              image={blog.blog_pic}
              excerpt={blog.intro}
              onReadMore={() => handleReadMore(blog.id)}
            />
          </div>
        ))}
      </div>

      <div className="hidden md:block text-center mt-12">
        <Link to="/proyectos">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Conoce más
          </button>
        </Link>
      </div>
      
    </div>
    
  );
};

export default CarruselPosts;
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface PostCardProps {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  onReadMore: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  title, 
  date, 
  image, 
  excerpt, 
  onReadMore 
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-xl  h-full flex flex-col ">
      <div className="relative h-24">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Imagen de respaldo en caso de error
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x200?text=Imagen+no+disponible';
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow text-left">
        <p className="text-sm text-black mb-2">{date}</p>
        <h3 className="text-md font-semibold text-blue-800 mb-3 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-xs line-clamp-2 flex-grow">{excerpt}</p>
        <button 
          onClick={onReadMore}
          className="flex items-center text-red-500 mt-4"
          aria-label="Leer más"
        >
          <span className="ml-2 w-6 h-6 rounded-full bg-white flex items-center justify-center border-2 border-red-500">
            <FaArrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
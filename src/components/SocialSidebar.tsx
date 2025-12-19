// src/components/SocialSidebar.tsx
import React, {  useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient'; // Importa el cliente de Supabase

interface MainInfoType {
  id: number;
  updated_at: string;
  nombre: string;
  cargo: string;
  texto: string;
  image_url: string;
  instagram_url: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
}

const SocialSidebar: React.FC = () => {

  const [mainInfo, setMainInfo] = useState<MainInfoType | null>(null); // Estado para los datos
  
    useEffect(() => {
      const fetchMainInfo = async () => {
        const { data, error } = await supabase.from('main_info').select('*');
        if (error) {
          console.error('Error fetching main_info:', error);
        } else if (data && data.length > 0) {
          console.log('Datos de main_info:', data[0]);
          setMainInfo(data[0]); // Almacena el primer elemento (asumiendo uno solo)
        }
      };
      fetchMainInfo();
    }, []);
  
    console.log("mainInfo:", mainInfo)
  return (
    <div className="fixed left-0 top-2/3 transform -translate-y-1/2 z-[100]">
      <div className="flex flex-col items-center space-y-8 bg-yellow-400 rounded-r-xl py-8 px-4 shadow-lg">
        <a 
          href={mainInfo?.instagram_url || "https://instagram.com/tucuenta"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-900 hover:text-blue-700 transition-colors"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
        <a 
          href={mainInfo?.instagram_url || "https://instagram.com/tucuenta"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-900 hover:text-blue-700 transition-colors"
          aria-label="Facebook"
        >
          <FaFacebook size={24} />
        </a>
        <a 
          href={mainInfo?.instagram_url || "https://instagram.com/tucuenta"}  
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-900 hover:text-blue-700 transition-colors"
          aria-label="Twitter"
        >
          <FaTwitter size={24} />
        </a>
        <a 
          href={mainInfo?.instagram_url || "https://instagram.com/tucuenta"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-900 hover:text-blue-700 transition-colors"
          aria-label="YouTube"
        >
          <FaYoutube size={24} />
        </a>
      </div>
    </div>
  );
};

export default SocialSidebar;
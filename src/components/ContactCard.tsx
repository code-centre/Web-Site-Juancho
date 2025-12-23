import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { TiDocumentText } from "react-icons/ti";
import { supabase } from '../lib/supabaseClient'; // Importa Supabase

const ContactCard: React.FC = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    email: '',
    celular: '',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('contactos').insert([formData]);
    if (error) {
      alert('Error al enviar: ' + error.message);
    } else {
      alert('Mensaje enviado exitosamente');
      setFormData({ usuario: '', email: '', celular: '', mensaje: '' }); // Limpia el formulario
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] overflow-hidden animate-fade-in-up transition-all duration-300 hover:shadow-[0_0_15px_8px_rgba(0,0,0,0.15)]">
      <div className="md:flex">
        <div className="md:w-full px-8 py-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 animate-fade-in-up">Contactanos</h2>
          
          <form onSubmit={handleSubmit} className="space-y-2"> {/* Agrega onSubmit */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-300" />
                  </div>
                  <input
                    type="text"
                    id="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:bg-white focus:scale-105"
                    placeholder="Usuario"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-300" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:bg-white focus:scale-105"
                    placeholder="E-mail"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-300" />
                  </div>
                  <input
                    type="tel"
                    id="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:bg-white focus:scale-105"
                    placeholder="Celular"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <textarea
                  id="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:bg-white focus:scale-[1.02]"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                ></textarea>
                <div className="absolute left-3 top-3 text-gray-300">
                  <TiDocumentText />
                </div>
              </div>
            </div>

            <div className="flex justify-center text-center w-full">
              <button
                type="submit"
                className="inline-flex w-full justify-center text-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
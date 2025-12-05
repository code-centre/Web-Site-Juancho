import React from 'react';
import { FaUser, FaEnvelope, FaPhone,  } from 'react-icons/fa';
import { TiDocumentText } from "react-icons/ti";

const ContactCard: React.FC = () => {
  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-4">
      <div className="md:flex">
        <div className="md:w-full p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contactanos</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-300" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Usuario"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-300" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E-mail"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-300" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Celular"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
                
              </label>
              <div className="relative">
                <textarea
                    id="message"
                    rows={4}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe tu mensaje aquí..."
                ></textarea>
                <div className="absolute left-3 top-3 text-gray-300">
                    <TiDocumentText />
                </div>
                </div>
            </div>

            <div className="flex justify-center text-center w-full">
              <button
                type="submit"
                className="inline-flex w-full justify-center text-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
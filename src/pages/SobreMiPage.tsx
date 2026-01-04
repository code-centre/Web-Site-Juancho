// src/pages/SobreMiPage.tsx
import React from 'react';
import SEO from '../components/SEO';
import Proyectos from '../components/sobremi/proyectos';
import Quienes from '../components/sobremi/quienes';
import VotaAsi from '../components/sobremi/votaasi';

const SobreMiPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Sobre Mí - Juancho Restrepo | Candidato a la Cámara de Representantes"
        description="Conoce a Juancho Restrepo, barranquillero, empresario y servidor público. Aspirante a la Cámara de Representantes por el Atlántico. Proyectos, propuestas y cómo votar."
        path="/sobre-mi"
        keywords="sobre mí, biografía, Juancho Restrepo, proyectos políticos, propuestas, Atlántico, cómo votar, Cámara de Representantes"
      />
      <div className="min-h-screen bg-white p-8">
        <div className="flex flex-col">
          <Quienes />
          <div id='proyectos'>
            <Proyectos />
          </div>
          <div id='votaasi'>
            <VotaAsi />
          </div>   
        </div>
      </div>
    </>
  );
};

export default SobreMiPage;
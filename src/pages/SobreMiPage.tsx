// src/pages/GaleriaPage.tsx
import React from 'react';
import Proyectos from '../components/sobremi/proyectos';
import Quienes from '../components/sobremi/quienes';
import VotaAsi from '../components/sobremi/votaasi';

const SobreMiPage: React.FC = () => {
  return (
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
  );
};

export default SobreMiPage;
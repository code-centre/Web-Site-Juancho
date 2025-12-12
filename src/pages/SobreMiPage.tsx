// src/pages/GaleriaPage.tsx
import React from 'react';
import Noticias from '../components/sobremi/noticias';
import Quienes from '../components/sobremi/quienes';
import VotaAsi from '../components/sobremi/votaasi';

const SobreMiPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex flex-col">
        <Quienes />
        <Noticias />    
        <VotaAsi />
      </div>
    </div>
  );
};

export default SobreMiPage;
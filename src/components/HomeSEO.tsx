import { Helmet } from 'react-helmet-async';

const HomeSEO: React.FC = () => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Juancho Restrepo - Candidato a la Cámara de Representantes por el Atlántico</title>
      <meta name="title" content="Juancho Restrepo - Candidato a la Cámara de Representantes por el Atlántico" />
      <meta name="description" content="Juancho Restrepo, barranquillero, empresario y servidor público. Aspirante a la Cámara de Representantes por el Atlántico. Trabajando por un Atlántico que se respeta, con oportunidades reales y una voz firme en el Congreso." />
      <meta name="keywords" content="Juancho Restrepo, Cámara de Representantes, Atlántico, Barranquilla, política, Colombia, elecciones" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://juanchorestrepo.com/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://juanchorestrepo.com/" />
      <meta property="og:title" content="Juancho Restrepo - Candidato a la Cámara de Representantes por el Atlántico" />
      <meta property="og:description" content="Juancho Restrepo, barranquillero, empresario y servidor público. Aspirante a la Cámara de Representantes por el Atlántico. Trabajando por un Atlántico que se respeta, con oportunidades reales y una voz firme en el Congreso." />
      <meta property="og:image" content="https://juanchorestrepo.com/logo-header.png" />
      <meta property="og:image:secure_url" content="https://juanchorestrepo.com/logo-header.png" />
      <meta property="og:image:alt" content="Logo de Juancho Restrepo - Candidato a la Cámara de Representantes" />
      <meta property="og:locale" content="es_CO" />
      <meta property="og:site_name" content="Juancho Restrepo" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://juanchorestrepo.com/" />
      <meta property="twitter:title" content="Juancho Restrepo - Candidato a la Cámara de Representantes por el Atlántico" />
      <meta property="twitter:description" content="Juancho Restrepo, barranquillero, empresario y servidor público. Aspirante a la Cámara de Representantes por el Atlántico. Trabajando por un Atlántico que se respeta, con oportunidades reales y una voz firme en el Congreso." />
      <meta property="twitter:image" content="https://juanchorestrepo.com/logo-header.png" />
      <meta property="twitter:image:alt" content="Logo de Juancho Restrepo - Candidato a la Cámara de Representantes" />
    </Helmet>
  );
};

export default HomeSEO;

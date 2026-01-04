import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Mapeo de rutas a nombres legibles
  const routeNames: { [key: string]: string } = {
    'sobre-mi': 'Sobre Mí',
    'galeria': 'Galería',
    'vota-asi': 'Vota Así',
  };

  // No mostrar breadcrumbs en la homepage
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="bg-blue-50 py-3 px-4" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm font-body">
          <li>
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Inicio
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = routeNames[name] || name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <li key={name} className="flex items-center">
                <FaChevronRight className="text-gray-400 mx-2" size={12} />
                {isLast ? (
                  <span className="text-gray-700 font-medium" aria-current="page">
                    {displayName}
                  </span>
                ) : (
                  <Link 
                    to={routeTo} 
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;

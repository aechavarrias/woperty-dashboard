import React from 'react';
import { ExternalPortal } from '../../types';
import { BarChart, Home, ShoppingBag, Bell, Star } from 'lucide-react';

interface ExternalLinksProps {
  portals: ExternalPortal[];
  similarPropertiesUrl: string;
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({ portals, similarPropertiesUrl }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <Home className="h-5 w-5" />;
      case 'shopping-bag':
        return <ShoppingBag className="h-5 w-5" />;
      case 'bell':
        return <Bell className="h-5 w-5" />;
      default:
        return <BarChart className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Enlaces Externos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {portals.map((portal, index) => (
          <a key={index} href={portal.url} target="_blank" rel="noopener noreferrer" className="border rounded-lg p-4 hover:border-blue-300 transition-all duration-300 flex items-center">
          {/* <a key={index} href={portal.url} target="_blank" rel="noopener noreferrer" className={`rounded-lg p-4 transition-all duration-300 flex items-center ${ portal.highlighted ? 'border-2 border-yellow-400' : 'border hover:border-blue-300'}`}> */}
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mr-3">
              {getIcon(portal.icon)}
            </div>
            {/* <Star className="w-4 h-4 text-yellow-400" /> */}
            <div>
              <h3 className="font-medium text-gray-800">{portal.name}</h3>
              {/* <span className="text-sm text-gray-500">
                {portal.visits} contactos
              </span> */}
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-6">
        <a href={similarPropertiesUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          <span className="mr-2">Ver propiedades similares</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ExternalLinks;
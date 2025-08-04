import React from 'react';

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <div className="bg-white px-6 py-6 rounded-b-2xl shadow-md mb-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-green-600 tracking-tight">
        {userName},
      </h1>
      <p className="mt-3 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
        este es tu <span className="font-medium text-gray-800">resumen de corretaje</span>. 
        Revisa cómo se está moviendo tu propiedad, cuántas visitas ha tenido, sugerencias de mejora y proyecciones de arriendo. 
        Todo lo importante, en un solo lugar visual y fácil de entender.
      </p>
      <p className="mt-4 text-xs text-gray-500 max-w-2xl mx-auto">
        Esta es una herramienta nueva que estamos implementando. La información puede tardar unos días en estar completamente actualizada, 
        y siempre estamos afinando detalles. Si tienes sugerencias para mejorarla, ¡felices de recibirlas!
      </p>
    </div>
  );
};

export default DashboardHeader;

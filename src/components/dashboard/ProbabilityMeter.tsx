import React from 'react';

interface ProbabilityMeterProps {
  value: number;
}

const ProbabilityMeter: React.FC<ProbabilityMeterProps> = ({ value }) => {
  // Determine color based on probability
  const getColor = () => {
    if (value < 30) return 'bg-red-500';
    if (value < 70) return 'bg-yellow-400';
    return 'bg-primary';
  };
  const getTextColor = () => {
    if (value < 30) return 'text-red-500';
    if (value < 70) return 'text-yellow-400';
    return 'text-primary-dark';
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Probabilidad de Arriendo <span className="text-sm font-normal text-gray-500">(en los próximos 30 días)</span></h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-3/5">
          <div className="relative pt-1">
            <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-200">
              <div
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${getColor()}`}
                style={{ width: `${value}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Baja</span>
              <span>Media</span>
              <span>Alta</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getTextColor()}`}>{value}%</span>
          <span className="text-gray-500 text-sm">Probabilidad actual</span>
        </div>
      </div>
    </div>
  );
};

export default ProbabilityMeter;
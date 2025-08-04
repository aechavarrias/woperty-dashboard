import React from 'react';
import { Metric } from '../../types';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { metrics } from '../../utils/data';

interface MetricsSectionProps {
  metrics: Metric[];
}

console.log('metric change:', metrics[0].change);

const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Métricas y KPIs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <p className="text-sm text-gray-500">{metric.label}</p>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{metric.value}{metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}</p>
              <div className="ml-2 flex items-baseline text-sm font-semibold">{metric.change !== null && metric.change !== undefined && !isNaN(Number(metric.change)) ? (Number(metric.change) >= 0 ? <span className="text-green-600 flex items-center"><TrendingUp className="h-3 w-3 mr-1" />+{Number(metric.change)}%</span> : <span className="text-red-600 flex items-center"><TrendingDown className="h-3 w-3 mr-1" />{Number(metric.change)}%</span>) : <span className="text-gray-400"></span>}</div>
            </div>
            <div className="mt-1 text-xs text-gray-500">Comparado con periodo anterior</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsSection;